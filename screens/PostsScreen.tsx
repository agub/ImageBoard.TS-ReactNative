import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import NewPost from "../components/NewPost";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type PostScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const PostsScreen: React.FC<PostScreenProps> = (props) => {
	const { navigation } = props;

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
