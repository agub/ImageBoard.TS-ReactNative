import React, { useEffect } from "react";
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
import { API, Auth, graphqlOperation } from "aws-amplify";

type PostScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const PostsScreen: React.FC<PostScreenProps> = (props) => {
	const { navigation } = props;
	useEffect(() => {
		const fetchUserData = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			// console.log(userInfo.attributes.sub);
			// const user = await API.graphql(
			// 	graphqlOperation(getUser, { id: userInfo.attributes.sub })
			// );
		};
		fetchUserData();
	}, []);

	return (
		<View style={styles.container}>
			<NewPost navigation={navigation} />
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
