import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	buttonBox: {
		// width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	button: {
		width: "100%",
		// backgroundColor: Colors.light.secondary,
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
