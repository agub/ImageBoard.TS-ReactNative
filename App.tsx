import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation/RootNavigatior";
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
// @ts-ignore
import config from "./src/aws-exports.js";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
Amplify.configure(config);

const randomImages = [
	"https://source.unsplash.com/random",
	"https://source.unsplash.com/random",
	"https://source.unsplash.com/random",
	"https://source.unsplash.com/random",
];

function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	const getRandomImages = () => {
		return randomImages[Math.floor(Math.random() * randomImages.length)];
	};

	useEffect(() => {
		const fetchUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			if (userInfo) {
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: userInfo.attributes.sub })
				);
				// @ts-ignore
				if (userData.data.getUser) {
					console.log("User is already registered in DB");
					return;
				}
				const newUser = {
					id: userInfo.attributes.sub,
					name: userInfo.username,
					imageUri: getRandomImages(),
					status: "sample status",
				};

				await API.graphql(
					graphqlOperation(createUser, { input: newUser })
				);
			}
		};
		fetchUser();
		// Auth.signOut();
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar style='light' />
			</SafeAreaProvider>
		);
	}
}

export default withAuthenticator(App);
