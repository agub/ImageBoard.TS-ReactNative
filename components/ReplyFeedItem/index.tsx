import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import styles from "./styles";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommentData, RootStackParamList } from "../../types";
import PostsScreen from "../../screens/PostsScreen";
import API, { graphqlOperation } from "@aws-amplify/api";
import { getUser } from "../../src/graphql/queries";
import { GetUserQuery } from "../../src/API";
import moment from "moment";
import { updateComment } from "../../src/graphql/mutations";
import { useFocusEffect } from "@react-navigation/native";

type FeedItemProps = {
	data: CommentData | null;
};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	const { data } = props;

	const [commentUser, setCommentUser] = useState<GetUserQuery>();
	const [voteNumber, setVoteNumber] = useState<number>(0);

	// useEffect(() => {
	// 	let mount = true;
	// 	const fetchUserData = async () => {
	// 		const userData = await API.graphql(
	// 			graphqlOperation(getUser, { id: data?.userID })
	// 		);
	// 		if ("data" in userData) {
	// 			if (mount) {
	// 				setCommentUser(userData.data);
	// 			}
	// 		}
	// 	};
	// 	fetchUserData();
	// 	return () => {
	// 		mount = false;
	// 	};
	// }, []);

	useFocusEffect(
		React.useCallback(() => {
			let mount = true;
			const fetchUserData = async () => {
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: data?.userID })
				);
				if ("data" in userData) {
					if (mount) {
						setCommentUser(userData.data);
					}
				}
			};
			fetchUserData();

			return () => {
				mount = false;
			};
		}, [])
	);

	const voteUp = async () => {
		try {
			if (voteNumber >= 1) {
				setVoteNumber((prev) => prev - 1);
				await API.graphql(
					graphqlOperation(updateComment, {
						input: {
							id: data?.id,
							vote: data?.vote - 1,
						},
					})
				);
			} else {
				setVoteNumber((prev) => prev + 1);
				await API.graphql(
					graphqlOperation(updateComment, {
						input: {
							id: data?.id,
							vote: data?.vote + 1,
						},
					})
				);
			}
		} catch (e) {
			console.log(e);
		}
	};
	const voteDown = async () => {
		try {
			if (voteNumber <= -1) {
				setVoteNumber((prev) => prev + 1);
				await API.graphql(
					graphqlOperation(updateComment, {
						input: {
							id: data?.id,
							vote: data?.vote + 1,
						},
					})
				);
			} else {
				setVoteNumber((prev) => prev - 1);
				await API.graphql(
					graphqlOperation(updateComment, {
						input: {
							id: data?.id,
							vote: data?.vote - 1,
						},
					})
				);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Pressable
			style={styles.container}
			// onPress={navigation.navigate("Content")}
		>
			<View style={styles.content}>
				<View style={styles.header}>
					<View style={styles.replyBox}>
						<FontAwesome
							name='mail-reply-all'
							size={24}
							color={Colors.light.textLight}
						/>
						<Text style={styles.titleText}>{data?.title}</Text>
					</View>
					<Text style={styles.timestampText}>
						{moment(data?.createdAt).fromNow()}
					</Text>
				</View>
				<View style={styles.content}>
					<Text style={styles.mainTextBox}>{data?.content}</Text>
				</View>
				<View style={styles.bottomBtn}>
					{commentUser?.getUser?.imageUri && (
						<View style={styles.profileBox}>
							<Image
								style={styles.profile}
								source={{ uri: commentUser?.getUser?.imageUri }}
							/>
							<Text>{commentUser?.getUser?.name}</Text>
						</View>
					)}
					<View style={styles.voteBox}>
						<Text style={styles.voteText}>
							{data?.vote + voteNumber}
						</Text>
						<View style={styles.voteIcon}>
							<TouchableOpacity onPress={voteUp}>
								<Entypo
									name='arrow-up'
									size={18}
									color={Colors.light.tint}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.voteIcon}>
							<TouchableOpacity onPress={voteDown}>
								<Entypo
									name='arrow-down'
									size={18}
									color={Colors.light.tint}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default FeedItem;
