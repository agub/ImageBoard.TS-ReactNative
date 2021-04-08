import { FontAwesome, Feather } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { createSaved, deleteSaved } from "../../src/graphql/mutations";
import { getPost } from "../../src/graphql/queries";
import useIsMounted from "../custom/useIsMounted";

type SavedHeaderButtonProps = {
	postID: string;
};
const SavedHeaderButton: React.FC<SavedHeaderButtonProps> = (props) => {
	const { postID } = props;

	const [isUserSaved, setIsUserSaved] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState<any>();
	const [savedID, setSavedID] = useState("");

	const isMounted = useIsMounted();

	const fetchCommentData = async () => {
		try {
			setLoading(true);
			const fetchUserData = await API.Auth.currentAuthenticatedUser();
			const postData: any = await API.graphql(
				graphqlOperation(getPost, { id: postID })
			);
			if (isMounted.current) {
				setUserData(fetchUserData);
			}
			let i;
			for (
				i = 0;
				i < (await postData.data.getPost.saved.items.length);
				i++
			) {
				if (
					postData.data.getPost.saved.items[i].userID ===
					fetchUserData.attributes.sub
				) {
					if (isMounted.current) {
						await setSavedID(
							postData.data.getPost.saved.items[i].id
						);
						setIsUserSaved(true);
					}
				}
			}
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};
	const savePost = async () => {
		try {
			if (!isUserSaved) {
				setLoading(true);
				await API.graphql(
					graphqlOperation(createSaved, {
						input: {
							postID: postID,
							userID: userData.attributes.sub,
						},
					})
				);
				setIsUserSaved(true);
				setLoading(false);
			}

			if (isUserSaved) {
				setLoading(true);
				await API.graphql(
					graphqlOperation(deleteSaved, {
						input: { id: savedID },
					})
				);
				setSavedID("");
				setLoading(false);
				setIsUserSaved(false);
			}
			fetchCommentData();
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchCommentData();
	}, []);

	return (
		<>
			{!loading && (
				<Pressable
					style={{
						paddingHorizontal: 20,
					}}
					onPress={savePost}
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
			)}
		</>
	);
};

export default SavedHeaderButton;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		height: 110,
		paddingHorizontal: 10,
		paddingVertical: 15,

		justifyContent: "space-between",
		alignItems: "flex-start",
		borderBottomWidth: 2,
		borderBottomColor: Colors.light.background,
	},
});
