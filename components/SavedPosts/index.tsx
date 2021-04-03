import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { PostData, RootStackParamList } from "../../types";
import FeedItem from "../FeedItem";
import { listSaveds } from "../../src/graphql/queries";
import {
	onCreatePost,
	onCreateSaved,
	onDeleteSaved,
} from "../../src/graphql/subscriptions";
//@ts-ignore

type SavedPostsProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};
// UserFeedItem
const SavedPosts: React.FC<SavedPostsProps> = (props) => {
	const { navigation } = props;
	const [savedPosts, setSavedPosts] = useState<PostData[]>([]);
	const [userID, setUserID] = useState("");

	let mount = true;
	const fetchPosts = async () => {
		try {
			const userData = await Auth.currentAuthenticatedUser();

			const savedData = await API.graphql(graphqlOperation(listSaveds));
			const mainData = savedData.data.listSaveds.items.map(
				(spreadData) => {
					if (spreadData.userID === userData.attributes.sub) {
						return spreadData;
					}
				}
			);
			console.log(mainData);

			if (mount) {
				setSavedPosts(mainData);
				setUserID(userData.attributes.sub);
			}
			// }
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchPosts();
		return () => {
			mount = false;
		};
	}, []);

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onCreateSaved)
		).subscribe({
			next: (data) => {
				console.log(data.value.data.onCreateSaved);

				// setPosts([data.value.data.onCreatePost, ...posts]);
				// console.log(userID);

				if (data.value.data.onCreateSaved.userID !== userID) {
					return;
				} else {
					setSavedPosts([
						data.value.data.onCreateSaved,
						...savedPosts,
					]);
				}
			},
		});
		return () => subscription.unsubscribe();
	});
	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onDeleteSaved)
		).subscribe({
			next: (data) => {
				console.log(data.value.data.onDeleteSaved);

				// setPosts([data.value.data.onCreatePost, ...posts]);
				// console.log(userID);

				if (data.value.data.onDeleteSaved.userID !== userID) {
					return;
				} else {
					fetchPosts();
				}
			},
		});
		return () => subscription.unsubscribe();
	});

	// console.log(savedPosts);

	return (
		// <ScrollView style={styles.container}>
		<View>
			{savedPosts.length > 0 && (
				<FlatList
					data={savedPosts}
					renderItem={({ item }) => (
						<FeedItem
							clickable={true}
							navigation={navigation}
							posts={item.post}
						/>
					)}
				/>
			)}
		</View>
	);
};

export default SavedPosts;

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		flex: 1,
		backgroundColor: "white",
	},
});
