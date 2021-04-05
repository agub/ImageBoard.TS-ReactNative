import API, { graphqlOperation } from "@aws-amplify/api";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
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
import { GetPostQuery } from "../../src/API";
import { createComment } from "../../src/graphql/mutations";

type ContentScreenProps = {
	data: GetPostQuery | null;
};
const ReplyPost: React.FC<ContentScreenProps> = (props) => {
	const { data } = props;

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	const submitComment = async () => {
		if (content !== "" && title !== "") {
			try {
				const commentData = await API.graphql(
					graphqlOperation(createComment, {
						input: {
							userID: data?.getPost?.userID,
							postID: data?.getPost?.id,
							vote: 0,
							title,
							content,
						},
					})
				);
				setTitle("");
				setContent("");
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
			<TouchableOpacity style={styles.logo} onPress={submitComment}>
				<Entypo
					name='new-message'
					size={24}
					color={
						content !== "" && title !== ""
							? Colors.light.Primary
							: Colors.light.textLight
					}
				/>
			</TouchableOpacity>
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

				{/* {commentUser?.getUser?.imageUri && (
							<View style={styles.profileBox}>
								<Image
									style={styles.profile}
									source={{
										uri: commentUser?.getUser?.imageUri,
									}}
								/>
								<Text>{commentUser?.getUser?.name}</Text>
							</View>
						)} */}
			</View>
		</View>
	);
};

export default ReplyPost;

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
	logo: {
		marginLeft: 20,
	},
	mainTextBox: {
		paddingVertical: 5,
		width: "100%",
		fontSize: 16,
		marginLeft: 28,
	},

	content: {
		width: "100%",
	},
	replyBox: {
		flexDirection: "row",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	titleText: {
		// fontWeight: "bold",
		width: "100%",
		marginLeft: 27,
		fontSize: 16,
		// color: Colors.light.textLight,
		// borderBottomColor: Colors.light.textLight,
		// borderBottomWidth: 3,
	},

	bottomBtn: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	comment: {
		flexDirection: "row",
		alignItems: "center",
	},
	commentText: {
		marginLeft: 10,
		color: Colors.light.textLight,
	},
});
