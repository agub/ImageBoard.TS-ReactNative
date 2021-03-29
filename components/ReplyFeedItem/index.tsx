import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import styles from "./styles";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	Entypo,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommentData, RootStackParamList } from "../../types";

type FeedItemProps = {
	data: CommentData | null;
};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	return (
		<Pressable
			style={styles.container}
			// onPress={navigation.navigate("Content")}
		>
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.titleText}></Text>
					<Text style={styles.timestampText}>3hrs ago</Text>
				</View>
				<View style={styles.mainTextBox}>
					<Text>replying to this</Text>
				</View>
				<View style={styles.bottomBtn}>
					{/* <TouchableOpacity style={styles.comment}>
						<MaterialIcons
							name='comment'
							size={20}
							color={Colors.light.textLight}
						/>
						<Text style={styles.commentText}>0 Comments</Text>
					</TouchableOpacity> */}

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
