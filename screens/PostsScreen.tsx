import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import NewPost from "../components/NewPost";

import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

interface Props {
	navigation: () => null;
}

const PostsScreen = (props: Props) => {
	const { navigation } = props;
	return (
		<View style={styles.container}>
			<NewPost />
			{/* <Button
				title='go back'
				onPress={() => navigation.navigate("Lists")}
			/> */}
		</View>
	);
};

export default PostsScreen;

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		flex: 1,
		backgroundColor: "white",
	},
});
