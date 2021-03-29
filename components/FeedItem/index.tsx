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

type FeedItemProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root"> | undefined;
	posts: PostData | null | undefined;
};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	const { navigation, posts } = props;
	const [allData, setAllData] = useState<GetPostQuery>();
	// console.log(allData);

	useEffect(() => {
		const fetchCommentData = async () => {
			try {
				const postData = await API.graphql(
					graphqlOperation(getPost, { id: posts?.id })
				);
				if ("data" in postData) {
					setAllData(postData.data);
					console.log(postData.data);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchCommentData();
	}, []);

	const onPress = () => {
		navigation?.navigate("Content", { data: allData });
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
					<Text style={styles.timestampText}>3hrs ago</Text>
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
					<TouchableOpacity style={styles.comment} onPress={onPress}>
						<MaterialIcons
							name='comment'
							size={20}
							color={Colors.light.textLight}
						/>
						<Text style={styles.commentText}>
							{allData?.getPost?.comments?.items?.length}Comments
						</Text>
					</TouchableOpacity>
					<View style={styles.voteBox}>
						<Text style={styles.voteText}>{posts?.vote}</Text>
						<View style={styles.voteIcon}>
							<Entypo
								name='arrow-up'
								size={18}
								color={Colors.light.tint}
							/>
						</View>
						<View style={styles.voteIcon}>
							<Entypo
								name='arrow-down'
								size={18}
								color={Colors.light.tint}
							/>
						</View>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default FeedItem;
