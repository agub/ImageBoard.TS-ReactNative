import API, { graphqlOperation } from "@aws-amplify/api";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableHighlight,
	TextInput,
	Alert,
} from "react-native";

import Colors from "../../constants/Colors";
import { createComment } from "../../src/graphql/mutations";
import { PostData } from "../../types";

type ContentScreenProps = {
	data: PostData | null;
};
const ReplyPost: React.FC<ContentScreenProps> = (props) => {
	const { data } = props;

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [userID, setUserID] = useState("");

	useEffect(() => {
		let mount = true;
		const fetchUserData = async () => {
			const userData = await API.Auth.currentAuthenticatedUser();

			if (mount) {
				setUserID(userData.attributes.sub);
			}
		};

		fetchUserData();
		return () => {
			mount = false;
		};
	}, []);

	const submitComment = async () => {
		if (content !== "" && title !== "") {
			try {
<<<<<<< HEAD
				const commentData = await API.graphql(
					graphqlOperation(createComment, {
						input: {
							userID: data?.getPost?.userID,
							postID: data?.getPost?.id,
=======
				setLoading(true);
				const commentData = await API.graphql(
					graphqlOperation(createComment, {
						input: {
							userID: userID,
							postID: data?.id,
>>>>>>> mainlyAllFixed
							vote: 0,
							title,
							content,
						},
					})
				);
				setTitle("");
				setContent("");
<<<<<<< HEAD
=======
				setLoading(false);
>>>>>>> mainlyAllFixed
			} catch (e) {
				console.log(e);
			}
		}

		if (content === "" && title === "") {
			Alert.alert("タイトル又は本文を記入してください");
		}
	};

	return (
		<View style={styles.container}>
<<<<<<< HEAD
			<TouchableOpacity style={styles.logo} onPress={submitComment}>
=======
			<TouchableOpacity
				style={styles.logo}
				disabled={loading}
				onPress={submitComment}
			>
>>>>>>> mainlyAllFixed
				<Entypo
					name='new-message'
					size={24}
					color={
						content !== "" && title !== ""
							? Colors.light.Primary
<<<<<<< HEAD
							: Colors.light.textLight
					}
				/>
			</TouchableOpacity>
=======
							: "black"
					}
				/>
			</TouchableOpacity>

>>>>>>> mainlyAllFixed
			<View style={styles.content}>
				<KeyboardAvoidingView behavior='height' style={{ height: 49 }}>
					<View style={{ justifyContent: "flex-start" }}>
						<View style={styles.header}>
							<View style={styles.replyBox}>
								<TextInput
									style={styles.titleText}
									placeholder='*タイトル'
									autoFocus={true}
									placeholderTextColor={
										Colors.light.textLight
									}
									maxLength={30}
									onChangeText={setTitle}
									value={title}
								/>
							</View>
						</View>
						<View style={styles.content}>
							<TextInput
								style={styles.mainTextBox}
								placeholder='*本文'
								placeholderTextColor={Colors.light.textLight}
								multiline
								maxLength={100}
								blurOnSubmit={false}
								onChangeText={setContent}
								value={content}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
};

export default ReplyPost;
