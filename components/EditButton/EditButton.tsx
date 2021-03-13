import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { DrawerParamList, RootStackParamList } from "../../types";

type EditButtonProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;

	buttonTitle: string;
	navigateTo: keyof RootStackParamList;
	color: string;
};

const EditButton: React.FC<EditButtonProps> = (props) => {
	const { navigation, buttonTitle, navigateTo, color } = props;

	return (
		<View style={styles.buttonBox}>
			<Pressable
				style={[styles.button, { backgroundColor: color }]}
				onPress={() => {
					navigation.navigate(navigateTo);
					// navigation.navigate();
				}}
			>
				<Text style={styles.buttonText}>{buttonTitle}</Text>
			</Pressable>
		</View>
	);
};

export default EditButton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	buttonBox: {
		// width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	button: {
		width: "100%",
		// backgroundColor: Colors.light.secondary,
		alignItems: "center",

		// justifyContent: "center",
		padding: 10,
		borderRadius: 50,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});
