import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { ListPostsQuery } from "../../src/API";
import { listPosts } from "../../src/graphql/queries";
import { onCreatePost } from "../../src/graphql/subscriptions";
import { PostData, RootStackParamList } from "../../types";
import FeedItem from "../FeedItem";
//@ts-ignore

type PostHistoryListProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};
// UserFeedItem
const PostHistoryList: React.FC<PostHistoryListProps> = (props) => {
	const { navigation } = props;
	const [posts, setPosts] = useState<ListPostsQuery>();
	const [usersPosts, setUsersPosts] = useState<PostData[]>([]);
	const [userID, setUserID] = useState("");

	useEffect(() => {
		let mount = true;
		const fetchPosts = async () => {
			try {
				const userData = await Auth.currentAuthenticatedUser();
				const postData = await API.graphql(graphqlOperation(listPosts));

				// console.log(postData.data.listPosts.items);

				// console.log(posts?.listPosts);
				const mainData = postData.data.listPosts.items.map(
					//@ts-ignore
					(spreadData) => {
						if (spreadData.userID === userData.attributes.sub) {
							return spreadData;
						}
					}
				);
				if (mount) {
					setUsersPosts(mainData);
					setUserID(userData.attributes.sub);
				}
				// console.log(usersPosts);
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
				// setPosts([data.value.data.onCreatePost, ...posts]);

				if (data.value.data.onCreatePost.userID !== userID) {
					return;
				} else {
					setUsersPosts([
						data.value.data.onCreatePost,
						...usersPosts,
					]);
				}
			},
		});
		return () => subscription.unsubscribe();
	}, [usersPosts]);
	// console.log(usersPosts);

	return (
		// <ScrollView style={styles.container}>
		<View>
			<FlatList
				data={usersPosts}
				renderItem={({ item }) => (
					<FeedItem
						// addComment={undefined}
						clickable={true}
						navigation={navigation}
						posts={item}
					/>
				)}
			/>
		</View>
	);
};

export default PostHistoryList;

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		flex: 1,
		backgroundColor: "white",
	},
});
