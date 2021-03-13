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
import { RootStackParamList } from "../../types";

type FeedItemProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root"> | undefined;
};

const FeedItem: React.FC<FeedItemProps> = (props) => {
	const { navigation } = props;
	const onPress = () => {
		if (navigation) {
			navigation?.navigate("Content");
		}
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
					<TouchableOpacity style={styles.comment} onPress={onPress}>
						<MaterialIcons
							name='comment'
							size={20}
							color={Colors.light.textLight}
						/>
						<Text style={styles.commentText}>30 Comments</Text>
					</TouchableOpacity>
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
		</Pressable>
	);
};

export default FeedItem;
