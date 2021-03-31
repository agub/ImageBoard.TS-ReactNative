import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { ListPostsQuery } from "../../src/API";
import { listPosts } from "../../src/graphql/queries";
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
							if (mount) {
								return spreadData;
							}
						}
					}
				);
				console.log("mainData");

				// console.log(mainData);

				setUsersPosts(mainData);
				// console.log("usersPost");

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
