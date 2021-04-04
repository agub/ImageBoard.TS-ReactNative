import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { BottomTabParamList, RootStackParamList } from "../types";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Auth } from "aws-amplify";

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

	const changePasswordHandler = (
		oldPassword: string,
		newPassword: string
	) => {
		Auth.currentAuthenticatedUser()
			.then((user) => {
				return Auth.changePassword(user, oldPassword, newPassword);
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	const [changePassword, sethangePassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const SettingButton: React.FC<SettingButtonButtonProps> = (props) => {
		return (
			<TouchableOpacity
				onPress={() => sethangePassword(!changePassword)}
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
						<Text style={styles.ButtonText}>{props.text}</Text>
						{props.additional && (
							<Text
								style={[
									styles.ButtonText,
									{ color: Colors.light.textLight },
								]}
							>
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
					{changePassword && (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								backgroundColor: "white",
								paddingHorizontal: 25,
							}}
						>
							<View>
								<TextInput
									blurOnSubmit={false}
									autoFocus={true}
									placeholder='現在のパスワード'
									// keyboardType='visible-password'
									secureTextEntry={true}
									placeholderTextColor={
										Colors.light.textLight
									}
									style={{ paddingVertical: 10 }}
									value={currentPassword}
									onChangeText={setCurrentPassword}
								/>
								<TextInput
									blurOnSubmit={false}
									placeholder='新しいパスワード'
									placeholderTextColor={
										Colors.light.textLight
									}
									style={{
										paddingVertical: 20,
									}}
								/>
							</View>
							<View
								style={
									{
										// paddingVertical: 20,
									}
								}
							>
								<Text>変更する</Text>
							</View>
						</View>
					)}

					<View style={styles.backBtn}>
						<Button title='戻る' onPress={onPress} />
					</View>
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
