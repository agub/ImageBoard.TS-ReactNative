import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import EditButton from "../components/EditButton/EditButton";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { BottomTabParamList, RootStackParamList } from "../types";

import FeedItem from "../components/FeedItem";
import Tab from "../components/Tab/Tab";
import Colors from "../constants/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

type ProfileScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
	const { navigation } = props;

	const Tab = createMaterialTopTabNavigator();

	return (
		<View style={styles.container}>
			<ProfileHeader navigation={navigation} />
			<EditButton
				navigation={navigation}
				buttonTitle='ユーザー設定を変更'
				navigateTo='UserEdit'
				color={Colors.light.secondary}
			/>
			{/* <Tab title='ユーザー投稿記事' BarColor={Colors.light.Primary} /> */}

			{/* <NavigationContainer independent={true}> */}

			<Tab.Navigator>
				<Tab.Screen name='Home' component={FeedItem} />
				<Tab.Screen name='Settings' component={FeedItem} />
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
