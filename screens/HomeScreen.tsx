import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const HomeScreen = (props: Props) => {
	return (
		<View style={styles.container}>
			<Text>HomeScreen</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f3f3f3",
	},
});
