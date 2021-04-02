import API, { graphqlOperation } from "@aws-amplify/api";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import FeedItem from "../components/FeedItem";
import { listPosts } from "../src/graphql/queries";
import { RootStackParamList } from "../types";
import { ListPostsQuery } from "../src/API";
import { onCreatePost } from "../src/graphql/subscriptions";

type ListsScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const ListsScreen: React.FC<ListsScreenProps> = (props) => {
	const { navigation } = props;
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		let mount = true;
		const fetchPosts = async () => {
			try {
				const postData = await API.graphql(graphqlOperation(listPosts));

				if ("data" in postData) {
					if (mount) {
						setPosts(postData.data.listPosts?.items);
						// setPosts(posts?.listPosts?.items);
					}
				}

				// console.log(postData.data.listPosts?.items);
			} catch (e) {
				console.log(e);
			}
		};
		fetchPosts();
		return () => {
			mount = false;
		};
	}, []);

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onCreatePost)
		).subscribe({
			next: (data) => {
				console.log(data.value.data.onCreatePost);

				setPosts([data.value.data.onCreatePost, ...posts]);
			},
		});
		return () => subscription.unsubscribe();
	}, [posts]);
	// console.log(posts?.listPosts?.items);

	return (
		// <ScrollView style={styles.container}>
		<FlatList
			data={posts}
			renderItem={({ item }) => (
				<FeedItem
					navigation={navigation}
					clickable={true}
					posts={item}
				/>
			)}
		/>
	);
};

export default ListsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
