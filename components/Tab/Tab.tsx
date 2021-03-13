import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

type TabProps = {
	title: string;
	BarColor: string;
};

const Tab: React.FC<TabProps> = ({ title, BarColor }) => {
	return (
		<View
			style={{
				marginTop: 10,
				width: "100%",
				borderBottomWidth: 1,
				borderBottomColor: Colors.light.background,
				borderTopWidth: 1,
				borderTopColor: Colors.light.background,
			}}
		>
			<View style={styles.container}>
				<Text>{title}</Text>
				<View style={styles.box}></View>
			</View>
		</View>
	);
};

export default Tab;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		paddingHorizontal: 20,
		justifyContent: "space-between",
		alignItems: "center",

		// backgroundColor: "blue",
		width: 150,
		height: 30,
	},
	box: {
		paddingVertical: 5,
		borderBottomWidth: 2,
		borderColor: Colors.light.tint,
		width: 80,
		alignItems: "center",
		// height: 20,
	},
});
