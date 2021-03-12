import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import EditButton from "../components/EditButton/EditButton";

import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { BottomTabParamList, RootStackParamList } from "../types";

interface Props {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
}

const ProfileScreen = (props: Props) => {
	const { navigation } = props;

	return (
		<View style={styles.container}>
			<ProfileHeader navigation={navigation} />
			<EditButton navigation={navigation} />
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
