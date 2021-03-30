import { useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import FeedItem from "../components/FeedItem";
import ReplyFeedItem from "../components/ReplyFeedItem";
import { GetPostQuery } from "../src/API";
import { ContentRouteParamList } from "../types";

type ContentScreenProps = {
	// navigation: StackNavigationProp<RootStackParamList, "Root"> | undefined;
	// data: GetPostQuery;
};
const ContentScreen: React.FC<ContentScreenProps> = (props) => {
	//@ts-ignore
	const route = useRoute<ContentRouteParamList>();

	const [clicked, setClicked] = useState<boolean>(false);
	// console.log(route.params.data.getPost);
	const addComment = () => {
		setClicked(!clicked);
	};
	console.log(clicked);

	return (
		<View style={styles.container}>
			<FeedItem
				posts={route.params.data.getPost}
				navigation={undefined}
				addComment={addComment}
				clickable={false}
			/>
			<FlatList
				data={route.params.data.getPost?.comments?.items}
				renderItem={({ item }) => <ReplyFeedItem data={item} />}
			/>
			{clicked && <Text>this is comment section</Text>}
		</View>
	);
};

export default ContentScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
