import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { ListPostsQuery } from "../../src/API";
import { deletePost } from "../../src/graphql/mutations";
import { listPosts } from "../../src/graphql/queries";
import { onCreatePost, onDeletePost } from "../../src/graphql/subscriptions";
import { PostData, RootStackParamList } from "../../types";
import FeedItem from "../FeedItem";
import useIsMounted from "../custom/useIsMounted";
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

	const isMounted = useIsMounted();
	console.log(isMounted.current);
	const fetchPosts = async () => {
		try {
			const userData = await Auth.currentAuthenticatedUser();
			const postData = await API.graphql(graphqlOperation(listPosts));
			const mainData = postData.data.listPosts.items.map(
				//@ts-ignore
				(spreadData) => {
					if (spreadData.userID === userData.attributes.sub) {
						return spreadData;
					}
				}
			);
			if (isMounted.current) {
				setUserID(userData.attributes.sub);
				setUsersPosts(mainData);
			}
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		let mount = true;

		fetchPosts();
		return () => {
			mount = false;
		};
	}, []);

	// setUsersPosts, isMounted

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onCreatePost)
		).subscribe({
			next: (data) => {
				if (data.value.data.onCreatePost.userID !== userID) {
					return;
				} else {
					if (isMounted.current) {
						setUsersPosts([
							data.value.data.onCreatePost,
							...usersPosts,
						]);
					}
				}
			},
		});
		return () => {
			subscription.unsubscribe();
		};
	});
	// , [usersPosts, setUsersPosts]

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onDeletePost)
		).subscribe({
			next: (data) => {
				// console.log(data.value.data.onDeletePost);
				// const deletePosted = data.value.data.onDeletePost;
				// console.log(userID);
				// console.log(data.value.data.onDeletePost);

				if (data.value.data.onDeletePost.userID !== userID) {
					return;
				} else {
					const newData = usersPosts.filter(
						(obj) => obj.id !== data.value.data.onDeletePost.id
					);

					if (isMounted.current) {
						setUsersPosts([...newData]);
						// fetchPosts();
					}
				}
			},
		});
		return () => subscription.unsubscribe();
	});
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
