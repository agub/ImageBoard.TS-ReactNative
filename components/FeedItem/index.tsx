import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import styles from "./styles";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	Entypo,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { PostData, RootStackParamList } from "../../types";

import API, { graphqlOperation } from "@aws-amplify/api";
import { getPost } from "../../src/graphql/queries";
import { GetPostQuery } from "../../src/API";
import moment from "moment";
import { updatePost } from "../../src/graphql/mutations";

type FeedItemProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root"> | undefined;
	posts: PostData;
	addComment: () => void | undefined | null;
	clickable: boolean | null;
};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	const { navigation, posts, addComment, clickable } = props;
	const [allData, setAllData] = useState<GetPostQuery>();
	const [voteNumber, setVoteNumber] = useState<number>(0);
	const [showComment, setShowComment] = useState<boolean>(false);
	const [isUserSaved, setIsUserSaved] = useState<boolean>(false);

	useEffect(() => {
		let mounted = true;
		const fetchCommentData = async () => {
			try {
				const postData = await API.graphql(
					graphqlOperation(getPost, { id: posts?.id })
				);
				if ("data" in postData) {
					if (mounted) {
						setAllData(postData.data);
					}
					// console.log(allData.getPost);
					// console.log(postData.data);
				}
				await fetchSavePost();
			} catch (e) {
				console.log(e);
			}
		};
		fetchCommentData();
		return () => {
			mounted = false;
		};
	}, []);

	let mount = true;
	useEffect(() => {
		return () => {
			mount = false;
		};
	}, []);

	const fetchSavePost = async () => {
		const usersSavedPost = await allData?.getPost?.saved?.items.map(
			(obj) => {
				if (obj?.userID === allData.getPost?.userID) {
					return obj;
				}
			}
		);
		if (usersSavedPost?.length) {
			if (mount) {
				setIsUserSaved(true);
			}
		}
	};

	const voteUp = async () => {
		try {
			if (voteNumber >= 1) {
				setVoteNumber((prev) => prev - 1);
				await API.graphql(
					graphqlOperation(updatePost, {
						input: {
							id: posts?.id,
							vote: posts?.vote - 1,
						},
					})
				);
			} else {
				setVoteNumber((prev) => prev + 1);
				await API.graphql(
					graphqlOperation(updatePost, {
						input: {
							id: posts?.id,
							vote: posts?.vote + 1,
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
					graphqlOperation(updatePost, {
						input: {
							id: posts?.id,
							vote: posts?.vote + 1,
						},
					})
				);
			} else {
				setVoteNumber((prev) => prev - 1);
				await API.graphql(
					graphqlOperation(updatePost, {
						input: {
							id: posts?.id,
							vote: posts?.vote - 1,
						},
					})
				);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const onPress = async () => {
		// console.log(isUserSaved);

		await navigation?.navigate("Content", {
			data: allData,
			isUserSaved: isUserSaved,
		});
	};
	const onCommentPress = () => {
		setShowComment(!showComment);
		addComment();
	};
	return (
		<Pressable
			style={styles.container}
			onPress={onPress}
			// onPress={navigation.navigate("Content")}
		>
			<View style={styles.iconBox}>
				<View style={styles.icon}>
					<MaterialCommunityIcons
						name='text-box-multiple-outline'
						size={30}
					/>
				</View>
			</View>
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.titleText}>{posts?.title}</Text>
					<Text style={styles.timestampText}>
						{" "}
						{moment(posts?.createdAt).fromNow()}
					</Text>
				</View>
				<View style={styles.mainTextBox}>
					<Text>{posts?.content}</Text>
				</View>
				<View style={styles.profileBox}>
					{posts?.user?.imageUri && (
						<Image
							style={styles.profile}
							source={{ uri: posts?.user?.imageUri }}
						/>
					)}
					<Text>{posts?.user?.name}</Text>
				</View>
				<View style={styles.bottomBtn}>
					<TouchableOpacity
						style={styles.comment}
						disabled={clickable}
						onPress={onCommentPress}
					>
						{showComment ? (
							<MaterialCommunityIcons
								name='arrow-up-bold-box'
								size={20}
								color={Colors.light.textLight}
							/>
						) : (
							<MaterialIcons
								name='comment'
								size={20}
								color={Colors.light.textLight}
							/>
						)}

						<Text style={styles.commentText}>
							{allData?.getPost?.comments?.items?.length}Comments
						</Text>
					</TouchableOpacity>
					<View style={styles.voteBox}>
						<Text style={styles.voteText}>
							{allData?.getPost?.vote + voteNumber}
						</Text>
						<View style={styles.voteIcon}>
							<TouchableOpacity onPress={voteUp}>
								<Entypo
									name='arrow-up'
									size={18}
									style={[
										{
											color:
												voteNumber === 1
													? Colors.light.Primary
													: Colors.light.tint,
										},
										{
											color:
												voteNumber === -1
													? Colors.light.textLight
													: Colors.light.tint,
										},
									]}
									// color={Colors.light.tint}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.voteIcon}>
							<TouchableOpacity onPress={voteDown}>
								<Entypo
									name='arrow-down'
									size={18}
									style={{
										color:
											voteNumber === 1
												? Colors.light.textLight
												: Colors.light.tint,
									}}
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
