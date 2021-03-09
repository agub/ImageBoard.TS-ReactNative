import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PostItem from "../components/PostsItem";
interface Props {}

const PostsScreen = (props: Props) => {
	return (
		<View style={styles.container}>
			<PostItem />
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
