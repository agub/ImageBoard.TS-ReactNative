import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Pressable,
	Image,
	Button,
	ActivityIndicator,
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
import moment from "moment";
import {
	deleteComment,
	deletePost,
	deleteSaved,
	updatePost,
} from "../../src/graphql/mutations";
import Modal from "react-native-modal";
import useIsMounted from "../custom/useIsMounted";

type FeedItemProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root"> | undefined;
	posts: PostData;
	addComment?: () => void;
	clickable: boolean | null;
};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	const { navigation, posts, addComment, clickable } = props;
	const [voteNumber, setVoteNumber] = useState<number>(0);
	const [showComment, setShowComment] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [isModalVisible, setModalVisible] = useState(false);

	const isMounted = useIsMounted();

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const onPress = async () => {
		navigation?.navigate("Content", {
			data: posts,
		});
	};

	const onCommentPress = () => {
		setShowComment(!showComment);
		addComment();
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

	const deleteHandler = async () => {
		try {
			if (posts?.saved?.items?.length > 0) {
				if (isMounted.current) {
					await posts?.saved?.items?.forEach((savedObj) =>
						API.graphql(
							graphqlOperation(deleteSaved, {
								input: { id: savedObj?.id },
							})
						)
					);
				}
			}

			if (posts?.comments?.items?.length > 0) {
				if (isMounted.current) {
					await posts?.comments?.items?.forEach((commentsObj) => {
						API.graphql(
							graphqlOperation(deleteComment, {
								input: { id: commentsObj?.id },
							})
						);
					});
				}
			}
			//Deleting actual post
			await API.graphql(
				graphqlOperation(deletePost, {
					input: {
						id: posts?.id,
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
			>
				<View style={{ justifyContent: "flex-end" }}>
					<View style={{ alignItems: "center", marginBottom: 80 }}>
						<Text style={{ color: "white", fontSize: 20 }}>
							??????????????????????????????????????????
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingHorizontal: 30,
						}}
					>
						<Button title='???????????????' onPress={toggleModal} />
						<Button
							color='red'
							title='???????????????'
							onPress={deleteHandler}
						/>
					</View>
				</View>
			</Modal>
			{posts ? (
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
									{posts?.comments?.items.length} Comments
								</Text>
							</TouchableOpacity>
							<View style={styles.voteBox}>
								{!loading && (
									<Text style={styles.voteText}>
										{posts?.vote}
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
															? Colors.light
																	.Primary
															: Colors.light.tint,
												},
												{
													color:
														voteNumber === -1
															? Colors.light
																	.textLight
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
			) : (
				<ActivityIndicator
					style={{ alignItems: "center" }}
					size='large'
				/>
			)}
		</>
	);
};

export default FeedItem;
