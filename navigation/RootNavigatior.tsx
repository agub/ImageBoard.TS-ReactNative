import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Button, ColorSchemeName, Text, View } from "react-native";
import NewPost from "../components/NewPost";
import Colors from "../constants/Colors";
import { DrawerScreen } from "../screens/DrawerScreen";

import NotFoundScreen from "../screens/NotFoundScreen";
import PostsScreen from "../screens/PostsScreen";
import UserEditScreen from "../screens/UserEditScreen";
import { DrawerParamList, RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerShown: true,
					// headerTitleAlign: "left",
				}}
			>
				<Stack.Screen
					name='Root'
					component={BottomTabNavigator}
					options={{
						title: "",

						headerRight: () => (
							<View
								style={{
									paddingHorizontal: 20,
								}}
							>
								<MaterialIcons name='menu' size={30} />
							</View>
						),
						headerLeft: () => (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: 20,
								}}
							>
								<View
									style={{
										width: 30,
										height: 30,
										backgroundColor: Colors.light.secondary,
									}}
								>
									<Ionicons
										name='ios-logo-vk'
										color={"white"}
										size={30}
									/>
								</View>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 20,
										marginLeft: 10,
									}}
								>
									My FEEDER
								</Text>
							</View>
						),
					}}
				/>
				<Stack.Screen
					name='UserEdit'
					component={UserEditScreen}
					options={{
						title: "",

						headerRight: () => (
							<View
								style={{
									paddingHorizontal: 20,
								}}
							>
								<Text>Submit</Text>
							</View>
						),
					}}
				/>

				<Stack.Screen
					name='NotFound'
					component={NotFoundScreen}
					options={{ title: "Oops!" }}
				/>
			</Stack.Navigator>
		</>
	);
};
