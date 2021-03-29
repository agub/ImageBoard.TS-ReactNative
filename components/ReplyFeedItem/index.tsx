import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import styles from "./styles";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	FontAwesome,
	Entypo,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommentData, RootStackParamList } from "../../types";
import PostsScreen from "../../screens/PostsScreen";
import API, { graphqlOperation } from "@aws-amplify/api";
import { getUser } from "../../src/graphql/queries";
import { GetUserQuery } from "../../src/API";
import moment from "moment";

type FeedItemProps = {
	data: CommentData | null;
};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	const { data } = props;
	// console.log(data);
	const [commentUser, setCommentUser] = useState<GetUserQuery>();
	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await API.graphql(
				graphqlOperation(getUser, { id: data?.userID })
			);
			if ("data" in userData) {
				setCommentUser(userData.data);
			}
		};
		fetchUserData();
	}, []);

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
						<Text style={styles.titleText}>{data?.content}</Text>
					</View>
					<Text style={styles.timestampText}>
						{moment(data?.createdAt).fromNow()}
					</Text>
				</View>
				<View style={styles.content}>
					<Text style={styles.mainTextBox}>
						NEED TO ADD CONTENT ON SCHEMA!!Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Deleniti amet eos
						minus ea, sapiente, eligendi adipisci mollitia deserunt
						nam est voluptate? Ducimus mollitia maiores voluptatum
						impedit hic, cupiditate sit fuga!
					</Text>
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
						<Text style={styles.voteText}>20</Text>
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
