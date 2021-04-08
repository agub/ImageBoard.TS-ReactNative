import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

type SettingButtonButtonProps = {
	text: string;
	additional?: string;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	currentState: boolean;
};
const SettingButton: React.FC<SettingButtonButtonProps> = (props) => {
	const { text, additional, setState, currentState } = props;
	return (
		<TouchableOpacity
			onPress={() => setState(!currentState)}
			style={styles.buttonBox}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					height: 40,
				}}
			>
				<Feather
					name='settings'
					size={20}
					style={{ paddingRight: 10 }}
				/>
				<View
					style={{
						alignItems: "flex-start",
						flexDirection: "column",
					}}
				>
					<Text>{text}</Text>
					{additional && (
						<Text style={[{ color: Colors.light.textLight }]}>
							{additional}
						</Text>
					)}
				</View>
			</View>
			<AntDesign name='arrowright' size={25} />
		</TouchableOpacity>
	);
};

export default SettingButton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		paddingVertical: 20,
		paddingHorizontal: 25,
		width: "100%",
		fontWeight: "bold",
		backgroundColor: Colors.light.background,
		color: Colors.light.textLight,
	},
	buttonBox: {
		paddingVertical: 5,
		paddingHorizontal: 20,
		backgroundColor: "white",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	backBtn: {
		marginTop: 20,
	},
});
