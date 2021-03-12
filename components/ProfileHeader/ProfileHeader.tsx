import React from "react";
import { View, Text, Button, Pressable } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import { BottomTabParamList, RootStackParamList } from "../../types";

type ProfileHeaderProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};
const ProfileHeader = (props: ProfileHeaderProps) => {
	const { navigation } = props;
	return (
		<View style={styles.container}>
			<View style={styles.profilePic}>
				<Ionicons name='person' size={50} />
				{/* <Text>Picture</Text> */}
			</View>

			<View style={styles.userNameBox}>
				<Text style={styles.userNameText}>USER NAME 123</Text>
				<Pressable onPress={() => navigation.navigate("UserEdit")}>
					<Text>編集</Text>
				</Pressable>
			</View>

			<Text style={styles.info}>12 Likes {"  "}25 Jan 2021</Text>

			{/* <View style={styles.buttonBox}>
				<Pressable
					style={styles.button}
					onPress={() => {
						navigation.navigate("Home");
					}}
				>
					<Text style={styles.buttonText}>ユーザー設定を変更</Text>
				</Pressable>
			</View> */}
		</View>
	);
};

export default ProfileHeader;
