import moment from "moment";
import React, { useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableWithoutFeedback,
	ScrollView,
	TouchableOpacity,
} from "react-native";

type DrawerScreenProps = {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerScreen: React.FC<DrawerScreenProps> = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);
	const { modalVisible, setModalVisible } = props;

	// if (!modalVisible) return null;
	// console.log(props);
	return (
		<View style={styles.container}>
			<View style={styles.centeredView}>
				<Modal
					animationType='fade'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<Pressable
						style={{ width: "100%" }}
						onPress={() => setModalVisible(!modalVisible)}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>
									Hello World!
								</Text>
							</View>
						</View>
					</Pressable>
				</Modal>
			</View>
		</View>

		// <Modal
		// 	animationType='fade'
		// 	transparent={true}
		// 	visible={modalVisible}
		// 	onRequestClose={() => {
		// 		setModalVisible(false);
		// 	}}
		// >
		// 	<TouchableOpacity
		// 		style={styles.container}
		// 		activeOpacity={1}
		// 		onPressOut={() => {
		// 			setModalVisible(false);
		// 		}}
		// 	>
		// 		<ScrollView
		// 			directionalLockEnabled={true}
		// 			contentContainerStyle={styles.scrollModal}
		// 		>
		// 			<TouchableWithoutFeedback></TouchableWithoutFeedback>
		// 		</ScrollView>
		// 	</TouchableOpacity>
		// </Modal>
	);
};

export default DrawerScreen;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// // width: "20%",
		width: "70%",
		// backgroundColor: "black",
	},
	centeredView: {
		// justifyContent: "flex-end",
		// alignItems: "center",
		zIndex: 100,
	},
	scrollModal: {
		// margin: 20,
		width: "70%",
		height: "100%",

		borderRadius: 20,
		padding: 35,
		alignItems: "center",
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
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
