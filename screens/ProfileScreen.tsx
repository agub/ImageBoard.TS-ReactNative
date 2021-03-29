import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import EditButton from "../components/EditButton/EditButton";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import {
	BottomTabParamList,
	ProfileTabParamList,
	RootStackParamList,
	UserData,
} from "../types";

import FeedItem from "../components/FeedItem";
import Tab from "../components/Tab/Tab";
import Colors from "../constants/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../src/graphql/queries";
import { GetUserQuery } from "../src/API";
import UserFeedItem from "../components/UserFeedItem/UserFeedItem";

type ProfileScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
	const { navigation } = props;
	const [userData, setUserData] = useState<GetUserQuery | undefined>();

	const Tab = createMaterialTopTabNavigator<ProfileTabParamList>();

	useEffect(() => {
		const fetchUserData = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			// console.log(userInfo.attributes.sub);
			const user = await API.graphql(
				graphqlOperation(getUser, { id: userInfo.attributes.sub })
			);
			//@ts-ignore
			setUserData(user.data);
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
			{/* <Tab title='ユーザー投稿記事' BarColor={Colors.light.Primary} /> */}

			{/* <NavigationContainer independent={true}> */}

			<Tab.Navigator>
				<Tab.Screen
					name='Users'
					// options={{ navigation: navigation }}
					component={UserFeedItem}
				/>
				<Tab.Screen name='Liked' component={FeedItem} />
			</Tab.Navigator>

			{/* </NavigationContainer> */}

			{/* <FeedItem /> */}
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
