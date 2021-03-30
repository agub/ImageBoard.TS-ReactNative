import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import moment from "moment";
import React, { useState } from "react";
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

	return (
		<View style={styles.container}>
			<FeedItem
				posts={route.params.data.getPost}
				navigation={undefined}
				addComment={addComment}
				clickable={false}
			/>
			{clicked && <ReplyPost data={route.params.data} />}
			<FlatList
				data={route.params.data.getPost?.comments?.items}
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
