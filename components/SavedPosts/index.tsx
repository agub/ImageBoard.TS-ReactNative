import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { PostData, RootStackParamList } from "../../types";
import FeedItem from "../FeedItem";
import { listSaveds } from "../../src/graphql/queries";
//@ts-ignore

type SavedPostsProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};
// UserFeedItem
const SavedPosts: React.FC<SavedPostsProps> = (props) => {
	const { navigation } = props;
	const [savedPosts, setSavedPosts] = useState<PostData[]>([]);

	useEffect(() => {
		let mount = true;
		const fetchPosts = async () => {
			try {
				const userData = await Auth.currentAuthenticatedUser();
				const savedData = await API.graphql(
					graphqlOperation(listSaveds)
				);

				// console.log(postData);
				// console.log(savedData.data.listSaveds.items);

				const mainData = savedData.data.listSaveds.items.map(
					(spreadData) => {
						if (spreadData.userID === userData.attributes.sub) {
							if (mount) {
								return spreadData;
							}
						}
					}
				);
				setSavedPosts(mainData);
			} catch (e) {
				console.log(e);
			}
		};
		fetchPosts();
		return () => {
			mount = false;
		};
	}, []);
	return (
		// <ScrollView style={styles.container}>
		<View>
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
