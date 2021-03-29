import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		// height: "100%",
		// backgroundColor: "green",
		paddingHorizontal: 10,
		paddingVertical: 15,
		// justifyContent: "center",
		justifyContent: "space-between",
		alignItems: "flex-start",
		borderBottomWidth: 2,
		borderBottomColor: Colors.light.background,
	},
	mainTextBox: {
		paddingVertical: 5,
		width: "84%",
		marginLeft: 32,
	},
	profileBox: {
		flexDirection: "row",
		alignItems: "center",

		marginRight: "auto",
	},
	profile: {
		width: 20,
		height: 20,
		borderRadius: 5,
		marginRight: 5,
	},
	icon: {
		width: 60,
		height: 60,
		borderRadius: 50,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",

		backgroundColor: Colors.light.background,
	},
	iconBox: {
		paddingRight: 10,
	},
	content: {
		// marginHorizontal: 10,
		flex: 1,
		// backgroundColor: "red",
		paddingLeft: 20,
		width: "100%",
	},
	replyBox: {
		flexDirection: "row",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	titleText: {
		// fontWeight: "bold",
		marginLeft: 27,
		// color: Colors.light.textLight,
	},
	timestampText: {
		color: Colors.light.textLight,
	},
	bottomBtn: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	comment: {
		flexDirection: "row",
		alignItems: "center",
	},
	commentText: {
		marginLeft: 10,
		color: Colors.light.textLight,
	},
	voteBox: {
		marginLeft: "auto",
		flexDirection: "row",
		alignItems: "center",
	},
	voteText: {
		color: Colors.light.tint,
		marginRight: 5,
	},
	voteIcon: {
		backgroundColor: "white",
		borderRadius: 50,
		borderWidth: 1,
		borderColor: Colors.light.tint,
		justifyContent: "center",
		alignItems: "center",
		width: 25,
		height: 25,
		marginHorizontal: 2,
		elevation: 2,
	},
});

export default styles;
