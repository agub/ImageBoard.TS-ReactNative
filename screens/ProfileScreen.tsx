import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import EditButton from "../components/EditButton/EditButton";
import ProfileHeader from "../components/ProfileHeader";
import { ProfileTabParamList, RootStackParamList } from "../types";

import FeedItem from "../components/FeedItem";
import Tab from "../components/Tab/Tab";
import Colors from "../constants/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../src/graphql/queries";
import { GetUserQuery } from "../src/API";

import PostHistoryList from "../components/PostHistoryList";
import SavedPosts from "../components/SavedPosts";
import useIsMounted from "../components/custom/useIsMounted";

type ProfileScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
	const { navigation } = props;
	const [userData, setUserData] = useState<GetUserQuery | undefined>();

	const Tab = createMaterialTopTabNavigator<ProfileTabParamList>();
	const isMounted = useIsMounted();

	useEffect(() => {
		const fetchUserData = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			// console.log(userInfo.attributes.sub);
			const user = await API.graphql(
				graphqlOperation(getUser, { id: userInfo.attributes.sub })
			);
			//@ts-ignore
			if (isMounted.current) {
				setUserData(user.data);
			}
		};
		fetchUserData();
	}, []);

	return (
		<View style={styles.container}>
			<ProfileHeader userData={userData} navigation={navigation} />
			<EditButton
				navigation={navigation}
				buttonTitle='ユーザー設定を変更'
				navigateTo='UserEdit'
				color={Colors.light.secondary}
			/>

			<Tab.Navigator>
				<Tab.Screen
					name='Users'
					options={{ title: "投稿履歴" }}
					component={PostHistoryList}
				/>
				<Tab.Screen
					name='Liked'
					options={{ title: "保存済み" }}
					component={SavedPosts}
				/>
			</Tab.Navigator>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
