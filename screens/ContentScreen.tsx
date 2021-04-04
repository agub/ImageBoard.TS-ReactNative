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

type ContentScreenProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root"> | undefined;
};
const ContentScreen: React.FC<ContentScreenProps> = (props) => {
	//@ts-ignore
	const route = useRoute<ContentRouteParamList>();

	const { navigation } = props;

	const [clicked, setClicked] = useState<boolean>(false);
	const [commentData, setCommentData] = useState<CommentData[]>([]);

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

	const isMounted = useIsMounted();

	const addComment = () => {
		setClicked(!clicked);
	};
	useEffect(() => {
		const routeData: CommentData[] =
			route.params.data.getPost?.comments?.items;
		if (isMounted.current) {
			setCommentData(routeData);
		}
	}, []);

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onCreateComment)
		).subscribe({
			next: (data) => {
				if (
					data.value.data.onCreateComment.postID !==
					route.params.data.getPost.id
				) {
					return;
				} else {
					if (isMounted.current) {
						setCommentData([
							data.value.data.onCreateComment,
							...commentData,
						]);
					}
				}
			},
		});
		return () => subscription.unsubscribe();
	}, [commentData]);

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onDeletePost)
		).subscribe({
			next: (data) => {
				if (
					route.params.data.getPost.id ===
					data.value.data.onDeletePost.id
				) {
					navigation?.goBack();
				}
			},
		});
		return () => subscription.unsubscribe();
	});

	return (
		<View style={styles.container}>
			<FeedItem
				posts={route.params.data.getPost}
				navigation={navigation}
				addComment={addComment}
				clickable={false}
			/>
			{clicked && <ReplyPost data={route.params.data} />}
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
