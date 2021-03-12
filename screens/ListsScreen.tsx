import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FeedItem from "../components/FeedItem";
type ListsScreenProps = {};

const ListsScreen: React.FC<ListsScreenProps> = (props) => {
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
