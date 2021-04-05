import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as React from "react";
import { Alert, ColorSchemeName, Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import NotFoundScreen from "../screens/NotFoundScreen";
import UserEditScreen from "../screens/UserEditScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import ContentScreen from "../screens/ContentScreen";
import SavedHeaderButton from "../components/SavedHeaderButton";
import Auth from "@aws-amplify/auth";

export const Navigation = ({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) => {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "light" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
};

const Stack = createStackNavigator<RootStackParamList>();

type RootNavigatorProps = {};
export const RootNavigator: React.FC<RootNavigatorProps> = (props) => {
	// const [isUserSaved, setIsUserSaved] = useState<boolean>(false);

	// const [modalVisible, setModalVisible] = useState(false);

	const signOut = async () => {
		await Alert.alert("お知らせ", "ログアウトいたしますか？", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "OK",
				onPress: () => {
					try {
						Auth.signOut({ global: true });
						Alert.alert("ログアウトいたしました");
					} catch (error) {
						console.log("error signing out: ", error);
					}
				},
			},
		]);
		// try {
		// 	await Auth.signOut({ global: true });
		// } catch (error) {
		// 	console.log("error signing out: ", error);
		// }
	};

	return (
		<>
			{/* {modalVisible && (
				<DrawerScreen
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			)} */}
			<Stack.Navigator
				screenOptions={{
					headerShown: true,
					// headerTitleAlign: "left",
				}}
			>
				<Stack.Screen
					name='Root'
					component={BottomTabNavigator}
					options={{
						title: "",
						headerRight: () => (
							<Pressable
								style={{
									paddingHorizontal: 20,
								}}
								// onPress={() => setModalVisible(!modalVisible)}
								onPress={signOut}
							>
								<AntDesign name='logout' size={20} />
							</Pressable>
						),
						headerLeft: () => (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: 20,
								}}
							>
								<View
									style={{
										width: 30,
										height: 30,
										backgroundColor: Colors.light.secondary,
									}}
								>
									<Ionicons
										name='ios-logo-vk'
										color={"white"}
										size={30}
									/>
								</View>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 20,
										marginLeft: 10,
									}}
								>
									My FEEDER
								</Text>
							</View>
						),
					}}
				/>
				<Stack.Screen
					name='UserEdit'
					component={UserEditScreen}
					options={{
						title: "ユーザー設定",
						headerRight: () => (
							<View
								style={{
									paddingHorizontal: 20,
								}}
							></View>
						),
					}}
				/>
				<Stack.Screen
					name='Content'
					component={ContentScreen}
					options={({ route }: any) => ({
						title: route.params.data.getPost.title,
						headerStyle: {
							backgroundColor: Colors.light.secondary,
						},
						headerTitleStyle: {
							fontWeight: "bold",
						},

						headerRight: () => (
							<SavedHeaderButton
								postID={route.params.data.getPost.id}
							/>
						),
					})}
				/>

				<Stack.Screen
					name='NotFound'
					component={NotFoundScreen}
					options={{ title: "Oops!" }}
				/>
			</Stack.Navigator>
		</>
	);
};
