import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../types";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { API, Auth } from "aws-amplify";
import SettingButton from "../components/SettingButton";
import useIsMounted from "../components/custom/useIsMounted";

type UserEditScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "UserEdit">;
};

const UserEditScreen: React.FC<UserEditScreenProps> = (props) => {
	const { navigation } = props;
	const [userData, setUserData] = useState();

	const [currentUserName, setCurrentUserName] = useState<string>("");
	const [currentEmail, setCurrentEmail] = useState<string>("");

	const [changePassword, setChangePassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");

	const isMounted = useIsMounted();

	// console.log(currentUserName, currentEmail);

	useEffect(() => {
		(async () => {
			const userData = await API.Auth.currentAuthenticatedUser();
			if (isMounted) {
				setUserData(userData);
				setCurrentEmail(userData.attributes.email);
				setCurrentUserName(userData.username);
			}
		})();
	}, []);

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
			.then((data) => {
				setCurrentPassword("");
				setNewPassword("");
				setChangePassword(!changePassword);
				alertMessage("パスワードが変更されました", "");
			})
			.catch((err) => {
				console.log(err);
				alertMessage("エラー", "現在のパスワードが一致しません");
			});
	};

	const alertMessage = (msg: string, sub: string) => {
		Alert.alert(msg, sub, [{ text: "OK" }]);
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.text}>基本設定</Text>
				<View>
					{/* <Text style={styles.text}>基本設定</Text> */}
					{/* <SettingButton
						text='emailの変更'
						additional='email@gmail.com'
					/>

					<SettingButton
						text='ユーザーネームを変更'
						additional='agub1994'
					/> */}
					<SettingButton
						text='パスワードの変更'
						setState={setChangePassword}
						currentState={changePassword}
					/>
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
									value={currentPassword}
									onChangeText={setCurrentPassword}
									style={{ paddingVertical: 10 }}
								/>
								<TextInput
									blurOnSubmit={false}
									secureTextEntry={true}
									value={newPassword}
									onChangeText={setNewPassword}
									placeholder='新しいパスワード'
									placeholderTextColor={
										Colors.light.textLight
									}
									style={{
										paddingVertical: 20,
									}}
								/>
							</View>
							<View>
								<Button
									color='red'
									onPress={() =>
										changePasswordHandler(
											currentPassword,
											newPassword
										)
									}
									title='変更する'
								/>
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
