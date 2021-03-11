import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		height: "100%",
		// backgroundColor: "green",
		// paddingHorizontal: 30,
		// paddingVertical: 15,
		justifyContent: "center",
		// alignItems: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		// borderBottomWidth: 2,
		// borderBottomColor: Colors.light.background,
	},
	modalBg: {
		// flex: 1,
		// justifyContent: "flex-end",
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
		// width: "100%",
		paddingVertical: 10,
		// paddingBottom: 10,
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
		// width: 200,
		padding: 15,
	},
	buttonClose: {
		backgroundColor: Colors.light.Primary,
	},
	OpenBtnBox: {
		padding: 30,
		marginTop: "auto",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default styles;
