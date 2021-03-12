import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		height: "100%",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	modalBg: {
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		alignItems: "center",
		marginTop: 22,
	},
	textCenter: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",

		paddingVertical: 10,

		alignItems: "center",
		justifyContent: "space-between",
		// borderBottomWidth: 2,
		// borderBottomColor: Colors.light.background,
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 18,
	},
	title: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.light.background,
		paddingVertical: 10,
	},
	textAreaBox: {
		// paddingVertical: 30,
	},
	modalSubText: {
		// marginBottom: 15,
		paddingVertical: 5,
		fontSize: 18,
	},
	modalText: {
		paddingVertical: 5,
		fontSize: 18,
	},
	mainText: {
		justifyContent: "flex-start",
		// height: "100%",
		paddingVertical: 5,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		height: "95%",
		width: "100%",
		borderRadius: 20,
		padding: 20,
		// alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	buttonOpen: {
		backgroundColor: Colors.light.secondary,
		padding: 15,
	},
	buttonClose: {
		backgroundColor: Colors.light.Primary,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	goBackHistory: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	beforePost: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 30,
	},
});

export default styles;
