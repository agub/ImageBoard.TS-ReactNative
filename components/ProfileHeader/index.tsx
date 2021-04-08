import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, UserData } from "../../types";
import moment from "moment";
import { GetUserQuery } from "../../src/API";

type ProfileHeaderProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
	userData: GetUserQuery | undefined;
};
const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
	const { navigation, userData } = props;

	return (
		<View style={styles.container}>
			<View style={styles.profilePic}>
				{userData?.getUser?.imageUri ? (
					<Image
						source={{
							uri: userData.getUser.imageUri,
						}}
						style={styles.profilePic}
					/>
				) : (
					<Ionicons name='person' size={50} />
				)}
			</View>

			<View style={styles.userNameBox}>
				<Text style={styles.userNameText}>
					{userData?.getUser?.name}
				</Text>
				<Pressable onPress={() => navigation.navigate("UserEdit")}>
					<Text>編集</Text>
				</Pressable>
			</View>

			<Text style={styles.info}>
				{userData?.getUser?.posts?.items?.length} Posts {"  "}since{" "}
				{moment(userData?.getUser?.createdAt).fromNow()}
			</Text>
		</View>
	);
};

export default ProfileHeader;
