import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	Entypo,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

type FeedItemProps = {};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.icon}>
				<MaterialCommunityIcons
					name='text-box-multiple-outline'
					size={30}
				/>
			</View>
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.titleText}>Title is Coming HERE!!</Text>
					<Text style={styles.timestampText}>3hrs ago</Text>
				</View>
				<View style={styles.mainTextBox}>
					<Text>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Nemo in ad possimus quasi similique pariatur neque
						adipisci aliquammo in ad possimus quasi similique
						pariatur neque adipisci aliquam
					</Text>
				</View>
				<View style={styles.bottomBtn}>
					<View style={styles.comment}>
						<MaterialIcons
							name='comment'
							size={20}
							color={Colors.light.textLight}
						/>
						<Text style={styles.commentText}>30 Comments</Text>
					</View>
					<View style={styles.voteBox}>
						<Text style={styles.voteText}>1231</Text>
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
		</TouchableOpacity>
	);
};

export default FeedItem;
