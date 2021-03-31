import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "./ProfileScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerParamList, RootStackParamList } from "../types";
import ProfileHeader from "../components/ProfileHeader";
import EditButton from "../components/EditButton/EditButton";
import Colors from "../constants/Colors";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

type DrawerScreenProps = {
	navigation: StackNavigationProp<DrawerParamList>;
};

const DrawerScreen: React.FC<DrawerScreenProps> = (props) => {
	const { navigation } = props;
	// console.log(props);
	return (
		<View style={styles.container}>
			<DrawerContentScrollView {...props}>
				{/* <ProfileHeader navigation={navigation} /> */}
				<View style={styles.logoutBox}>
					<DrawerItem
						label='Edit'
						onPress={() => {
							// props.navigation.navigate("Edit");
						}}
					/>
					<Button
						title='logout'
						onPress={() => console.warn("logout")}
					/>
				</View>
			</DrawerContentScrollView>
		</View>
	);
};

export default DrawerScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		height: "100%",
	},
	button: {
		marginTop: 20,
	},
	logoutBox: {
		padding: 20,
		marginTop: "auto",
		marginRight: "auto",
	},
});
