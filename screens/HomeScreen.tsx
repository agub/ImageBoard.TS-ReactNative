import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FeedItem from "../components/FeedItem";
import { RootStackParamList } from "../types";

type HomeScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
	return (
		<View style={styles.container}>{/* <FeedItem {...props} /> */}</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
