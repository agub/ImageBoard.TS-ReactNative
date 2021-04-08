import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { listPosts } from "../../assets/customGraphql/queries";
import { onCreatePost, onDeletePost } from "../../src/graphql/subscriptions";
import { PostData, RootStackParamList } from "../../types";
import FeedItem from "../FeedItem";
import useIsMounted from "../custom/useIsMounted";
import { useFocusEffect } from "@react-navigation/native";

type PostHistoryListProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const PostHistoryList: React.FC<PostHistoryListProps> = (props) => {
	const { navigation } = props;
	const [usersPosts, setUsersPosts] = useState<PostData[]>([]);
	const [userID, setUserID] = useState("");
	const [loading, setLoading] = useState(false);

	const isMounted = useRef(true);

	useFocusEffect(
		React.useCallback(() => {
			let mount = true;

			const fetchPosts = async () => {
				setLoading(true);
				try {
					const userData = await Auth.currentAuthenticatedUser();
					const postData = await API.graphql(
						graphqlOperation(listPosts)
					);

					const mainData = postData.data.listPosts.items.filter(
						//@ts-ignore
						(spreadData) => {
							if (spreadData.userID === userData.attributes.sub) {
								return spreadData;
							}
						}
					);
					if (mount) {
						setUserID(userData.attributes.sub);
						setUsersPosts(mainData);
					}
				} catch (e) {
					console.log(e);
				}
				setLoading(false);
			};
			fetchPosts();
			return () => {
				mount = false;
				isMounted.current = false;
			};
		}, [])
	);

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
		// <View>
		// 	{loading ? (
		// 		<ActivityIndicator
		// 			style={{ alignItems: "center" }}
		// 			size='large'
		// 		/>
		// 	) : (
		<View>
			{usersPosts !== undefined && (
				<FlatList
					data={usersPosts}
					renderItem={({ item }) => (
						<FeedItem
							clickable={true}
							navigation={navigation}
							posts={item}
						/>
					)}
				/>
			)}
		</View>
		// 	)}
		// </View>
	);
};

export default PostHistoryList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
