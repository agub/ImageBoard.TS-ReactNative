import API, { graphqlOperation } from "@aws-amplify/api";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import FeedItem from "../components/FeedItem";
import { listPosts } from "../src/graphql/queries";
import { RootStackParamList } from "../types";
import { ListPostsQuery } from "../src/API";

type ListsScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const ListsScreen: React.FC<ListsScreenProps> = (props) => {
	const { navigation } = props;
	const [posts, setPosts] = useState<ListPostsQuery>();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const postData = await API.graphql(graphqlOperation(listPosts));
				// console.log(postData);
				if ("data" in postData) {
					setPosts(postData.data);
				}

				// console.log(postData.data.listPosts?.items);
			} catch (e) {
				console.log(e);
			}
		};
		fetchPosts();
	}, []);
	return (
		// <ScrollView style={styles.container}>
		<FlatList
			data={posts?.listPosts?.items}
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
		// width: "100%",
		flex: 1,
		backgroundColor: "white",
	},
});
