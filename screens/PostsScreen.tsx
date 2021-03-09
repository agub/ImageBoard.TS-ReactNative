import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FeedItem from "../components/FeedItem/index";
interface Props {}

const PostsScreen = (props: Props) => {
	return (
		<ScrollView style={styles.container}>
			<FeedItem />
		</ScrollView>
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
