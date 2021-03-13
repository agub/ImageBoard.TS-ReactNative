import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FeedItem from "../components/FeedItem";
import { RootStackParamList } from "../types";
type ListsScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const ListsScreen: React.FC<ListsScreenProps> = (props) => {
	const { navigation } = props;
	return (
		<ScrollView style={styles.container}>
			<FeedItem navigation={navigation} />
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
