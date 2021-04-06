import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Pressable,
	Image,
	Button,
} from "react-native";
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
import {
	deleteComment,
	deletePost,
	deleteSaved,
	updatePost,
} from "../../src/graphql/mutations";
import Modal from "react-native-modal";
import useIsMounted from "../custom/useIsMounted";
import { onCreateComment } from "../../src/graphql/subscriptions";
import { useFocusEffect } from "@react-navigation/native";

type FeedItemProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root"> | undefined;
	posts: PostData;
	addComment: () => void;
	clickable: boolean | null;
};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	const { navigation, posts, addComment, clickable } = props;
	const [allData, setAllData] = useState<GetPostQuery>();
	const [voteNumber, setVoteNumber] = useState<number>(0);
	const [showComment, setShowComment] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [isModalVisible, setModalVisible] = useState(false);

	const isMounted = useRef(true);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const onPress = async () => {
		navigation?.navigate("Content", {
			data: allData,
			//wontuse!!!
		});
	};

	const onCommentPress = () => {
		setShowComment(!showComment);
		addComment();
	};

	useFocusEffect(
		React.useCallback(() => {
			const fetchCommentData = async () => {
				try {
					setLoading(true);
					const postData = await API.graphql(
						graphqlOperation(getPost, { id: posts?.id })
					);

					if (isMounted.current) {
						setAllData(postData.data);
					}

					setLoading(false);
				} catch (e) {
					console.log(e);
				}
			};
			fetchCommentData();
			return () => {
				isMounted.current = false;
			};
		}, [])
	);

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

	const deleteHandler = async () => {
		try {
			if (allData?.getPost?.saved?.items?.length > 0) {
				if (isMounted.current) {
					await allData?.getPost?.saved?.items?.forEach((savedObj) =>
						API.graphql(
							graphqlOperation(deleteSaved, {
								input: { id: savedObj.id },
							})
						)
					);
				}
			}

			if (allData?.getPost?.comments?.items?.length > 0) {
				if (isMounted.current) {
					await allData?.getPost?.comments?.items?.forEach(
						(commentsObj) => {
							API.graphql(
								graphqlOperation(deleteComment, {
									input: { id: commentsObj.id },
								})
							);
						}
					);
				}
			}
			//Deleting actual post

			await API.graphql(
				graphqlOperation(deletePost, {
					input: {
						id: allData?.getPost?.id,
					},
				})
			);
		} catch (e) {
			console.log(e);
		}

		setModalVisible(false);
	};

	return (
		<>
			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				backdropOpacity={0.8}
				// hasBackdrop={false}
			>
				<View style={{ justifyContent: "flex-end" }}>
					<View style={{ alignItems: "center", marginBottom: 80 }}>
						<Text style={{ color: "white", fontSize: 20 }}>
							この投稿を削除いたしますか？
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingHorizontal: 30,
						}}
					>
						<Button title='キャンセル' onPress={toggleModal} />
						<Button
							color='red'
							title='削除します'
							onPress={deleteHandler}
						/>
					</View>
				</View>
			</Modal>
			<Pressable style={styles.container} onPress={onPress}>
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
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text style={styles.timestampText}>
								{" "}
								{moment(posts?.createdAt).fromNow()}{" "}
							</Text>
							{!clickable && (
								<TouchableOpacity
									style={{
										justifyContent: "center",
									}}
									onPress={() =>
										setModalVisible(!isModalVisible)
									}
								>
									<Entypo
										name='dots-three-vertical'
										color={Colors.light.textLight}
										size={15}
									/>
								</TouchableOpacity>
							)}
						</View>
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
								{allData?.getPost?.comments?.items?.length}{" "}
								Comments
							</Text>
						</TouchableOpacity>
						<View style={styles.voteBox}>
							{!loading && (
								<Text style={styles.voteText}>
									{allData?.getPost?.vote + voteNumber}
								</Text>
							)}

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
		</>
	);
};

export default FeedItem;
