import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import NewPost from "../components/NewPost";

import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type PostScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const PostsScreen: React.FC<PostScreenProps> = (props) => {
	const { navigation } = props;
	return (
		<View style={styles.container}>
			{/* <View>
				<Text>asdfafasdfas</Text>
			</View> */}
			<NewPost navigation={navigation} />
			{/* <Button title='abc' /> */}
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
