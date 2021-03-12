import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { BottomTabParamList, RootStackParamList } from "../types";

type UserEditScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "UserEdit">;
};

const UserEditScreen = (props: UserEditScreenProps) => {
	const { navigation } = props;

	const onPress = () => {
		navigation.goBack();
	};
	return (
		<View>
			<Text>this is UserEdit Screen</Text>
			<Button title='go back' onPress={onPress} />
		</View>
	);
};

export default UserEditScreen;

const styles = StyleSheet.create({});
