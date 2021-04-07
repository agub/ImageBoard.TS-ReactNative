import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { PostData, RootStackParamList } from "../../types";
import FeedItem from "../FeedItem";
import { listSaveds } from "../../assets/customGraphql/queries";
import useIsMounted from "../custom/useIsMounted";
import { useFocusEffect } from "@react-navigation/native";
//@ts-ignore

type SavedPostsProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};
// UserFeedItem
const SavedPosts: React.FC<SavedPostsProps> = (props) => {
	const { navigation } = props;
	const [savedPosts, setSavedPosts] = useState<PostData[]>([]);
	const [userID, setUserID] = useState("");
	const [loading, setLoading] = useState(false);

	const isMounted = useIsMounted();

	useFocusEffect(
		React.useCallback(() => {
			let mount = true;

			const fetchPosts = async () => {
				setLoading(true);
				try {
					const userData = await Auth.currentAuthenticatedUser();

					const savedData = await API.graphql(
						graphqlOperation(listSaveds)
					);
					const mainData = savedData.data.listSaveds.items.filter(
						(spreadData) => {
							if (spreadData.userID === userData.attributes.sub) {
								return spreadData;
							}
						}
					);
					if (isMounted) {
						setSavedPosts(mainData);
						setUserID(userData.attributes.sub);
					}
					// }
				} catch (e) {
					console.log(e);
				}
				setLoading(false);
			};
			fetchPosts();
			return () => {
				mount = false;
			};
		}, [])
	);

	return (
		<View>
			{loading ? (
				<ActivityIndicator
					style={{ alignItems: "center" }}
					size='large'
				/>
			) : (
				<FlatList
					data={savedPosts}
					renderItem={({ item }) => (
						<FeedItem
							clickable={true}
							navigation={navigation}
							posts={item.post}
						/>
					)}
				/>
			)}
		</View>
	);
};

export default SavedPosts;

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		flex: 1,
		backgroundColor: "white",
	},
});
