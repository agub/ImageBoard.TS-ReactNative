import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { ListPostsQuery } from "../../src/API";
import { deletePost } from "../../src/graphql/mutations";
import { listPosts } from "../../assets/customGraphql/queries";
import { onCreatePost, onDeletePost } from "../../src/graphql/subscriptions";
import { PostData, RootStackParamList } from "../../types";
import FeedItem from "../FeedItem";
import useIsMounted from "../custom/useIsMounted";
import { useFocusEffect } from "@react-navigation/native";
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

	// const isMounted = useIsMounted();
	const isMounted = useRef(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const userData = await Auth.currentAuthenticatedUser();
				const postData = await API.graphql(graphqlOperation(listPosts));
				const mainData = postData.data.listPosts.items.filter(
					//@ts-ignore
					(spreadData) => {
						if (spreadData.userID === userData.attributes.sub) {
							return spreadData;
						}
					}
				);
				if (isMounted.current) {
					console.log(mainData);

					setUserID(userData.attributes.sub);
					setUsersPosts(mainData);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchPosts();
		return () => {
			isMounted.current = false;
		};
		// 			isMounted.current = false;
		// 		};
	}, []);

	// console.log(userID);
	// console.log(usersPosts);

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		const fetchPosts = async () => {
	// 			try {
	// 				const userData = await Auth.currentAuthenticatedUser();
	// 				const postData = await API.graphql(
	// 					graphqlOperation(listPosts)
	// 				);
	// 				const mainData = postData.data.listPosts.items.map(
	// 					//@ts-ignore
	// 					(spreadData) => {
	// 						if (spreadData.userID === userData.attributes.sub) {
	// 							return spreadData;
	// 						}
	// 					}
	// 				);
	// 				if (isMounted.current) {
	// 					setUserID(userData.attributes.sub);
	// 					setUsersPosts(mainData);
	// 				}
	// 			} catch (e) {
	// 				console.log(e);
	// 			}
	// 		};
	// 		fetchPosts();
	// 		return () => {
	// 			isMounted.current = false;
	// 		};
	// 	}, [])
	// );

	// setUsersPosts, isMounted

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onCreatePost)
			//@ts-ignore
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

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onDeletePost)
			//@ts-ignore
		).subscribe({
			next: (data) => {
				if (data.value.data.onDeletePost.userID !== userID) {
					return;
				} else {
					const newData = usersPosts.filter(
						(obj) => obj.id !== data.value.data.onDeletePost.id
					);
					if (isMounted.current) {
						setUsersPosts([...newData]);
					}
				}
			},
		});
		return () => subscription.unsubscribe();
	});
	return (
		// <ScrollView style={styles.container}>
		<View>
			{usersPosts !== undefined && (
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
			)}
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
