import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import FeedItem from "../components/FeedItem";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";

interface Props {}

const ProfileScreen = (props: Props) => {
	return (
		<View style={styles.container}>
			<ProfileHeader />
			{/* <ScrollView>
				<FeedItem />
				<FeedItem />
				<FeedItem />
				<FeedItem />
				<FeedItem />
				<FeedItem />
			</ScrollView> */}
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});
