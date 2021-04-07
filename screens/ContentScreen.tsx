import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FeedItem from "../components/FeedItem";
import ReplyFeedItem from "../components/ReplyFeedItem";
import ReplyPost from "../components/ReplyPost";
import { GetPostQuery } from "../src/API";
import { onCreateComment, onDeletePost } from "../src/graphql/subscriptions";
import {
	CommentData,
	ContentRouteParamList,
	RootStackParamList,
} from "../types";
import useIsMounted from "../components/custom/useIsMounted";
import { useFocusEffect } from "@react-navigation/native";
import { getPost } from "../src/graphql/queries";

type ContentScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root"> | undefined;
};
const ContentScreen: React.FC<ContentScreenProps> = (props) => {
	//@ts-ignore
	const route = useRoute<ContentRouteParamList>();

	const { navigation } = props;

	const [clicked, setClicked] = useState<boolean>(false);
	const [commentData, setCommentData] = useState<CommentData[]>([]);
<<<<<<< HEAD
	const [postData, setPostData] = useState<GetPostQuery>();
=======
	const [postData, setPostData] = useState([]);

	// console.log(route.params.data.getPost);

	// const useIsMounted = () => {
	// 	const isMounted = useRef(false);
	// 	useEffect(() => {
	// 		isMounted.current = true;
	// 		return () => {
	// 			isMounted.current = false;
	// 		};
	// 	}, []);
	// 	return isMounted;
	// };
	// console.log(route.params.data.getPost?.id);
>>>>>>> mainlyAllFixed

	const isMounted = useIsMounted();

	const addComment = () => {
		setClicked(!clicked);
	};
<<<<<<< HEAD
	// console.log(route.params.data.getPost?.comments?.items);

	useEffect(() => {
		let mount = true;
		const routeData: CommentData[] =
			route.params.data.getPost?.comments?.items;
		if (mount) {
			setCommentData(routeData);
			setPostData(route.params.data);
		}
		return () => {
			mount = false;
		};
	}, []);
	// console.log(route);

	//
=======

	useFocusEffect(
		React.useCallback(() => {
			let mount = true;
			const fetchPosts = async () => {
				try {
					const postData = await API.graphql(
						graphqlOperation(getPost, {
							id: route.params.data.id,
						})
					);
					// console.log(postData.data);
					if (isMounted.current) {
						setCommentData(postData.data.getPost.comments.items);
						setPostData(postData.data.getPost);
					}
					// if (mount) {
					// 	setPosts(postData.data.listPosts?.items);
					// }
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
>>>>>>> mainlyAllFixed

	useEffect(() => {
		let mount = true;
		const subscription = API.graphql(
			graphqlOperation(onCreateComment)
		).subscribe({
			next: (data) => {
				if (
					data.value.data.onCreateComment.postID !==
<<<<<<< HEAD
					postData?.getPost?.id
=======
					route.params.data.id
>>>>>>> mainlyAllFixed
				) {
					return;
				} else {
					if (mount) {
						setCommentData([
							data.value.data.onCreateComment,
							...commentData,
						]);
					}
				}
			},
		});

		return () => {
			mount = false;
			subscription.unsubscribe();
		};
	});

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onDeletePost)
		).subscribe({
			next: (data) => {
				if (route.params.data.id === data.value.data.onDeletePost.id) {
					navigation?.goBack();
				}
			},
		});
		return () => subscription.unsubscribe();
	});

	return (
		<View style={styles.container}>
			<FeedItem
				posts={postData}
				navigation={navigation}
				addComment={addComment}
				clickable={false}
			/>
			{clicked && <ReplyPost data={postData} />}
			<FlatList
				data={commentData}
				renderItem={({ item }) => <ReplyFeedItem data={item} />}
			/>
			{/* _____________________________________________________________________________________________________________ */}
		</View>
	);
};

export default ContentScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: "column",
		backgroundColor: "white",
	},
});
