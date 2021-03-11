import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
	container: {
		width: "100%",
		// flexDirection: "row",
		padding: 20,
		justifyContent: "center",
	},
	profilePic: {
		width: 80,
		height: 80,
		borderRadius: 50,
		backgroundColor: Colors.light.background,
		justifyContent: "center",
		alignItems: "center",
	},
	userNameText: {
		paddingVertical: 15,
		fontSize: 23,
		fontWeight: "bold",
	},
	userNameBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	info: {
		flexDirection: "row",
		paddingBottom: 20,
		color: Colors.light.textLight,
		fontSize: 13,
	},
	buttonBox: {
		// width: "100%",
		flexDirection: "row",
		justifyContent: "center",
	},
	button: {
		width: "100%",
		backgroundColor: Colors.light.secondary,
		alignItems: "center",

		// justifyContent: "center",
		padding: 10,
		borderRadius: 50,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default styles;
