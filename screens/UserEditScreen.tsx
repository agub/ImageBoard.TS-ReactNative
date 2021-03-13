import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { BottomTabParamList, RootStackParamList } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

type UserEditScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "UserEdit">;
};

type SettingButtonButtonProps = {
	text: string;
	additional?: string;
};

const UserEditScreen: React.FC<UserEditScreenProps> = (props) => {
	const { navigation } = props;

	const onPress = () => {
		navigation.goBack();
	};
	const SettingButton: React.FC<SettingButtonButtonProps> = (props) => {
		return (
			<TouchableOpacity style={styles.buttonBox}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<AntDesign name='leftsquare' size={20} />
					<View
						style={{
							alignItems: "flex-start",
							flexDirection: "column",
						}}
					>
						<Text style={styles.ButtonText}>{props.text}</Text>
						{props.additional && (
							<Text style={styles.ButtonText}>
								{props.additional}
							</Text>
						)}
					</View>
				</View>
				<AntDesign name='arrowright' size={25} />
			</TouchableOpacity>
		);
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.text}>基本設定</Text>
				<View>
					{/* <Text style={styles.text}>基本設定</Text> */}
					<SettingButton
						text='emailの変更'
						additional='email@gmail.com'
					/>
					<SettingButton
						text='ユーザーネームを変更'
						additional='agub1994'
					/>
					<SettingButton text='パスワードの変更' />
					<Button title='戻る' onPress={onPress} />
				</View>
			</View>
		</>
	);
};

export default UserEditScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// padding: 20,
		// backgroundColor: "white",
	},
	ButtonText: {
		// paddingHorizontal: 20,
	},
	text: {
		padding: 20,
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
});
