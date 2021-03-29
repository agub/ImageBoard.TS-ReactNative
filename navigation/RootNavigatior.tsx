import { Ionicons, MaterialIcons, Octicons, Feather } from "@expo/vector-icons";
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
import { Button, ColorSchemeName, Pressable, Text, View } from "react-native";
import NewPost from "../components/NewPost";
import Colors from "../constants/Colors";

import NotFoundScreen from "../screens/NotFoundScreen";
import PostsScreen from "../screens/PostsScreen";
import UserEditScreen from "../screens/UserEditScreen";
import { DrawerParamList, RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { DrawerActions } from "@react-navigation/native";
import ContentScreen from "../screens/ContentScreen";
const Stack = createStackNavigator<RootStackParamList>();

type RootNavigatorProps = {
	navigation: StackNavigationProp<DrawerParamList, "Menu">;
};
export const RootNavigator: React.FC<RootNavigatorProps> = (props) => {
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
								<MaterialIcons
									name='menu'
									size={30}
									onPress={() =>
										props.navigation.dispatch(
											DrawerActions.toggleDrawer()
										)
									}
								/>
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
						title: "ユーザー設定",
						headerRight: () => (
							<View
								style={{
									paddingHorizontal: 20,
								}}
							>
								{/* <Text>Submit</Text> */}
							</View>
						),
					}}
					// options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Content'
					component={ContentScreen}
					options={({ route }: any) => ({
						title: route.params.data.getPost.title,
						headerStyle: {
							backgroundColor: Colors.light.secondary,
						},
						headerTitleStyle: {
							fontWeight: "bold",
						},
						headerRight: () => (
							<Pressable
								style={{
									paddingHorizontal: 20,
								}}
							>
								<Feather name='star' size={25} color='white' />
							</Pressable>
						),
					})}
					// options={{ headerShown: false }}
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
