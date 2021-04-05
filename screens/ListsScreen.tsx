import API, { graphqlOperation } from "@aws-amplify/api";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	FlatList,
	SafeAreaView,
	RefreshControl,
} from "react-native";
import FeedItem from "../components/FeedItem";
import { listPosts } from "../src/graphql/queries";
import { RootStackParamList } from "../types";
import { ListPostsQuery } from "../src/API";
import { onCreatePost, onDeletePost } from "../src/graphql/subscriptions";
import useIsMounted from "../components/custom/useIsMounted";
import { useFocusEffect } from "@react-navigation/native";

type ListsScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const ListsScreen: React.FC<ListsScreenProps> = (props) => {
	const { navigation } = props;
	const [posts, setPosts] = useState([]);
	const [refreshing, setRefreshing] = React.useState(false);

	const isMounted = useRef(true);

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(800).then(() => {
			setRefreshing(false);
		});
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			let mount = true;
			const fetchPosts = async () => {
				try {
					const postData = await API.graphql(
						graphqlOperation(listPosts)
					);

					if (mount) {
						setPosts(postData.data.listPosts?.items);
					}
				} catch (e) {
					console.log(e);
				}
			};
			fetchPosts();
			return () => {
				mount = false;
				isMounted.current = false;
			};
		}, [])
	);
	// [setPosts]

	useEffect(() => {
		let mount = true;
		const subscription = API.graphql(
			graphqlOperation(onCreatePost)
		).subscribe({
			next: (data) => {
				// console.log(data.value.data.onCreatePost);
				if (isMounted.current) {
					setPosts([data.value.data.onCreatePost, ...posts]);
				}
			},
		});
		return () => {
			subscription.unsubscribe();
			mount = false;
		};
	});
	// [posts, setPosts];

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onDeletePost)
		).subscribe({
			next: (data) => {
				const newData = posts.filter(
					(obj) => obj.id !== data.value.data.onDeletePost.id
				);

				if (isMounted.current) {
					setPosts([...newData]);
					// fetchPosts();
				}
			},
		});
		return () => subscription.unsubscribe();
	});

	return (
		<>
			{/* <SafeAreaView style={styles.container}> */}

			<FlatList
				data={posts}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				renderItem={({ item }) => (
					<FeedItem
						navigation={navigation}
						clickable={true}
						posts={item}
					/>
				)}
			/>

			{/* </SafeAreaView> */}
		</>
	);
};

export default ListsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
