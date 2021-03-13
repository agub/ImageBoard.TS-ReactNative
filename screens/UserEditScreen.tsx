import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { BottomTabParamList, RootStackParamList } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";

type UserEditScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "UserEdit">;
};

const UserEditScreen: React.FC<UserEditScreenProps> = (props) => {
	const { navigation } = props;

	const onPress = () => {
		navigation.goBack();
	};
	return (
		<View>
			<TouchableOpacity>
				<Text>登録済みEmailの変更</Text>
				<AntDesign name='arrowright' size={25} />
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>パスワードの変更</Text>
				<AntDesign name='arrowright' size={25} />
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>ユーザーネームを変更</Text>
				<AntDesign name='arrowright' size={25} />
			</TouchableOpacity>

			<Button title='戻る' onPress={onPress} />
		</View>
	);
};

export default UserEditScreen;

const styles = StyleSheet.create({});
