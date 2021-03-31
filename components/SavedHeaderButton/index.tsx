import { FontAwesome, Feather } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/Colors";
import { getPost } from "../../src/graphql/queries";

type SavedHeaderButtonProps = {
	postID: string;
};
const SavedHeaderButton: React.FC<SavedHeaderButtonProps> = (props) => {
	// console.log(data?.getPost?.id);
	const { postID } = props;
	const [isUserSaved, setIsUserSaved] = useState<boolean>(false);

	useEffect(() => {
		let mounted = true;
		const fetchCommentData = async () => {
			try {
				const postData = await API.graphql(
					graphqlOperation(getPost, { id: postID })
				);
				if (postData.data.getPost.saved.items.length) {
					if (mounted) {
						setIsUserSaved(true);
					}
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchCommentData();
		return () => {
			mounted = false;
		};
	}, []);

	// const fetchSavePost = async () => {
	// 	const usersSavedPost = await allData?.getPost?.saved?.items.map(
	// 		(obj) => {
	// 			if (obj?.userID === allData.getPost?.userID) {
	// 				return obj;
	// 			}
	// 		}
	// 	);
	// 	if (usersSavedPost?.length) {
	// 		if (mount) {
	// 			setIsUserSaved(true);
	// 		}
	// 	}
	// };

	return (
		<Pressable
			style={{
				paddingHorizontal: 20,
			}}
		>
			{isUserSaved ? (
				<FontAwesome
					name='star'
					size={25}
					color={isUserSaved ? Colors.light.tint : "white"}
				/>
			) : (
				<Feather
					name='star'
					size={25}
					color={isUserSaved ? Colors.light.tint : "white"}
				/>
			)}
		</Pressable>
	);
};

export default SavedHeaderButton;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		height: 110,

		// backgroundColor: "green",
		paddingHorizontal: 10,
		paddingVertical: 15,
		// justifyContent: "center",
		justifyContent: "space-between",
		alignItems: "flex-start",
		borderBottomWidth: 2,
		borderBottomColor: Colors.light.background,
	},
});
