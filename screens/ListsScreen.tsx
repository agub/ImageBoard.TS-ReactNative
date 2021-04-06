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
import { getPost, listPosts } from "../src/graphql/queries";
import { RootStackParamList } from "../types";
import { ListPostsQuery } from "../src/API";
import {
	onCreateComment,
	onCreatePost,
	onDeletePost,
} from "../src/graphql/subscriptions";
import useIsMounted from "../components/custom/useIsMounted";
import { useFocusEffect } from "@react-navigation/native";

type ListsScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const ListsScreen: React.FC<ListsScreenProps> = (props) => {
	const { navigation } = props;
	const [posts, setPosts] = useState([]);
	const [mainPosts, setMainPosts] = useState([]);
	const [refreshing, setRefreshing] = React.useState(false);

	const isMounted = useRef(true);

	const fetchPosts = async () => {
		try {
			const postData = await API.graphql(graphqlOperation(listPosts));

			if (isMounted.current) {
				setPosts(postData.data.listPosts?.items);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const wait = (timeOut: number) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeOut);
		});
	};
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(800).then(() => {
			fetchPosts();
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
					// console.log(postData.data.listPosts?.items);
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

	useEffect(() => {
		let mount = true;
		const subscription = API.graphql(
			graphqlOperation(onCreatePost)
		).subscribe({
			next: (data) => {
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
