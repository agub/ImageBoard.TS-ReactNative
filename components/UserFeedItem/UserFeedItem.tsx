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

type UserFeedItemProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const UserFeedItem: React.FC<UserFeedItemProps> = (props) => {
	const { navigation } = props;
	const [posts, setPosts] = useState<ListPostsQuery>();
	const [usersPosts, setUsersPosts] = useState<PostData[]>();

	useEffect(() => {
		let mount = true;
		const fetchPosts = async () => {
			try {
				const userData = await Auth.currentAuthenticatedUser();
				// console.log(userData.attributes.sub);

				const postData = await API.graphql(graphqlOperation(listPosts));
				// console.log(postData);

				// setPosts(postData.data);

				// console.log(posts?.listPosts);
				postData.data.listPosts.items.map((data) => {
					if (data.user.id === userData.attributes.sub) {
						if (mount) {
							setUsersPosts([data]);
						}
						// console.log(usersPosts);
					}
				});

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

export default UserFeedItem;

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		flex: 1,
		backgroundColor: "white",
	},
});
