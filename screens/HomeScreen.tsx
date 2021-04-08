import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PostHistoryList from "../components/PostHistoryList";
import SavedPosts from "../components/SavedPosts";
import { ProfileTabParamList, RootStackParamList } from "../types";

type HomeScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
	const Tab = createMaterialTopTabNavigator<ProfileTabParamList>();
	return (
		<View style={styles.container}>
			<Tab.Navigator initialRouteName='Liked'>
				<Tab.Screen
					name='Liked'
					options={{ title: "保存済み" }}
					component={SavedPosts}
				/>
				<Tab.Screen
					name='Users'
					// options={{ navigation: navigation }}
					options={{ title: "投稿履歴" }}
					component={PostHistoryList}
				/>
			</Tab.Navigator>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
