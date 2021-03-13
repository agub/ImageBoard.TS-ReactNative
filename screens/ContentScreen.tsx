import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FeedItem from "../components/FeedItem";
import ReplyFeedItem from "../components/ReplyFeedItem";

const ContentScreen = () => {
	return (
		<View style={styles.container}>
			<FeedItem navigation={undefined} />
			<ReplyFeedItem />
			<ReplyFeedItem />
			<ReplyFeedItem />
		</View>
	);
};

export default ContentScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
