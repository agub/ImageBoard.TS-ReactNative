import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { RootStackParamList } from "../../types";

type EditButtonProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const EditButton: React.FC<EditButtonProps> = (props) => {
	const { navigation } = props;

	return (
		<View style={styles.buttonBox}>
			<Pressable
				style={styles.button}
				onPress={() => {
					navigation.navigate("UserEdit");
				}}
			>
				<Text style={styles.buttonText}>ユーザー設定を変更</Text>
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
		backgroundColor: Colors.light.secondary,
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
