import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Button, ColorSchemeName, Text, View } from "react-native";
import NewPost from "../components/NewPost";
import Colors from "../constants/Colors";

import NotFoundScreen from "../screens/NotFoundScreen";
import PostsScreen from "../screens/PostsScreen";
import UserEditScreen from "../screens/UserEditScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "light" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
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
			<Stack.Screen name='UserEdit' component={UserEditScreen} />
			{/* <Stack.Screen
				name='Posts'
				component={PostsScreen}
				options={({ route }) => ({
					title: route.name,
					headerRight: () => (
						<View
							style={{
								// flexDirection: "row",
								width: 100,
								height: 100,
								// justifyContent: "space-between",
								// marginRight: 10,
							}}
						>
							<Text>dafdsafaafdadsf</Text>
							<Octicons name='search' size={22} color={"red"} />
						</View>
					),
				})}
			/> */}

			<Stack.Screen
				name='NotFound'
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
		</Stack.Navigator>
	);
}
