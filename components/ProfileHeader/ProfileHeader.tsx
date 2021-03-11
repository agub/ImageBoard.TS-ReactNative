import React from "react";
import { View, Text, Button, Pressable } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../../screens/PostsScreen";
import ListsScreen from "../../screens/ListsScreen";
import TopNavigator from "../../navigation/TopNavigator";
interface Props {}

const ProfileHeader = (props: Props) => {
	const Stack = createStackNavigator();
	return (
		<View style={styles.container}>
			<View style={styles.profilePic}>
				<Ionicons name='person' size={50} />
				{/* <Text>Picture</Text> */}
			</View>

			<View style={styles.userNameBox}>
				<Text style={styles.userNameText}>USER NAME 123</Text>
				<Pressable>
					<Text>編集</Text>
				</Pressable>
			</View>

			<Text style={styles.info}>12 Likes {"  "}25 Jan 2021</Text>

			<View style={styles.buttonBox}>
				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>ユーザー設定を変える</Text>
				</Pressable>
			</View>
			{/* <NavigationContainer independent={true}>
				<Stack.Navigator
					screenOptions={{
						headerShown: true,
						// headerTitleAlign: "left",
					}}
				>
					<Stack.Screen
						name='Home'
						component={TopNavigator}
						options={{ title: "過去の投稿" }}
					/>
				</Stack.Navigator>
			</NavigationContainer> */}
			{/* <View style={styles.menuText}>
				<Text>投稿済み</Text>
			</View> */}
		</View>
	);
};

export default ProfileHeader;
