import { useRoute } from "@react-navigation/core";
import React from "react";
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
	// console.log(route.params.data.getPost);

	return (
		<View style={styles.container}>
			<FeedItem
				posts={route.params.data.getPost}
				navigation={undefined}
			/>
			<FlatList
				data={route.params.data.getPost?.comments?.items}
				renderItem={({ item }) => <ReplyFeedItem data={item} />}
			/>
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
