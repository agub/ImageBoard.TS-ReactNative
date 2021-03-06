import {
	AntDesign,
	Feather,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ListsScreen from "../screens/ListsScreen";
import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName='Lists'
			tabBarOptions={{ activeTintColor: Colors.light.secondary }}
		>
			<BottomTab.Screen
				name='Lists'
				component={ListsScreen}
				options={{
					tabBarLabel: "リスト",
					tabBarIcon: ({ color }) => (
						<Feather name='home' size={30} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarLabel: "saved",
					tabBarIcon: ({ color }) => (
						<AntDesign name='save' size={30} color={color} />
					),
				}}
			/>

			<BottomTab.Screen
				name='Posts'
				component={PostsScreen}
				options={{
					tabBarLabel: "投稿",
					tabBarIcon: ({ color }) => (
						// <TabBarIcon name='ios-code' color={color} />
						<MaterialCommunityIcons
							name='pencil-plus-outline'
							size={30}
							color={color}
						/>
					),
				}}
			/>

			<BottomTab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					tabBarLabel: "プロフィール",
					tabBarIcon: ({ color }) => (
						<Feather name='user' color={color} size={30} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}
