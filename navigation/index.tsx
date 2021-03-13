import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { HeaderTitle, StackNavigationProp } from "@react-navigation/stack";

import * as React from "react";
import { Button, ColorSchemeName, Text, View } from "react-native";
import NewPost from "../components/NewPost";
import Colors from "../constants/Colors";
import DrawerScreen from "../screens/DrawerScreen";

import NotFoundScreen from "../screens/NotFoundScreen";
import PostsScreen from "../screens/PostsScreen";
import UserEditScreen from "../screens/UserEditScreen";
import { DrawerParamList, RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootNavigator } from "./RootNavigatior";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

// interface Navigation {
// 	navigation: StackNavigationProp<DrawerParamList, "Menu">;
// }

export const Navigation = ({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) => {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "light" ? DarkTheme : DefaultTheme}
		>
			<DrawerComp />
		</NavigationContainer>
	);
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// interface DrawerCompProps {
// 	navigation: StackNavigationProp<DrawerParamList, "Menu">;
// }: React.FC<DrawerCompProps>

export const DrawerComp = () => {
	return (
		// <NavigationContainer>
		<Drawer.Navigator initialRouteName='Menu'>
			{/* <Drawer.Screen name='Edit' component={UserEditScreen} /> */}
			<Drawer.Screen
				name='Menu'
				component={RootNavigator}
				options={{
					title: "戻る",
				}}
			/>
		</Drawer.Navigator>
		// </NavigationContainer>
	);
};
