import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		height: 110,
		paddingHorizontal: 10,
		paddingVertical: 15,
		justifyContent: "space-between",
		alignItems: "flex-start",
		borderBottomWidth: 2,
		borderBottomColor: Colors.light.background,
	},
	logo: {
		marginLeft: 20,
	},
	mainTextBox: {
		paddingVertical: 5,
		width: "100%",
		fontSize: 16,
		marginLeft: 28,
	},

	content: {
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
		width: "100%",
		marginLeft: 27,
		fontSize: 16,
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
});

export default styles;
