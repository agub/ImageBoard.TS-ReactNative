import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FeedItem from "../components/FeedItem";
interface Props {}

const ListsScreen = (props: Props) => {
	return (
		<ScrollView style={styles.container}>
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
		</ScrollView>
	);
};

export default ListsScreen;

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		flex: 1,
		backgroundColor: "white",
	},
});
