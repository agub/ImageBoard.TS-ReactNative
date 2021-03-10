import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NewPost from "../components/NewPost";
interface Props {}

const PostsScreen = (props: Props) => {
	return (
		<View style={styles.container}>
			<NewPost />
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
