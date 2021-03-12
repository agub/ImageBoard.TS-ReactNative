import React, { useState, useRef } from "react";
import {
	View,
	Text,
	Modal,
	Pressable,
	TextInput,
	TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

// import { TextInput } from "react-native-gesture-handler";
type NewPostProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const NewPost: React.FC<NewPostProps> = (props) => {
	const { navigation } = props;
	const [modalVisible, setModalVisible] = useState(false);

	let input: any;
	const focus = () => {
		input.focus();
	};
	const closeTab = () => {
		setModalVisible(!modalVisible);
		navigation.goBack();
	};

	const TextArea = (): JSX.Element => (
		<View style={styles.modalView}>
			<View style={styles.header}>
				<View style={styles.textCenter}>
					<Text style={styles.headerText}>新規投稿</Text>
				</View>
				<Pressable
					// style={[styles.button, styles.buttonClose]}
					onPress={closeTab}
					// onPress={() => setModalVisible(!modalVisible)}
				>
					<Ionicons
						name='close'
						color={Colors.light.tabIconDefault}
						size={30}
					/>
					{/* <Text style={styles.textStyle}>x</Text> */}
				</Pressable>
				<View style={[styles.button, styles.buttonClose]}>
					<TouchableWithoutFeedback
						style={[styles.button, styles.buttonClose]}
						onPress={() => console.warn("submitted")}
					>
						<Text style={styles.textStyle}>投稿</Text>
					</TouchableWithoutFeedback>
				</View>
			</View>
			<View style={styles.textAreaBox}>
				<View style={styles.title}>
					<TextInput
						placeholder='タイトル'
						placeholderTextColor={Colors.light.textLight}
						blurOnSubmit={false}
						autoFocus={true}
						style={styles.modalSubText}
					/>
					{/* <Text style={styles.modalText}>Title comes here</Text> */}
				</View>
				<TouchableWithoutFeedback
					onPress={focus}
					style={styles.mainText}
				>
					<TextInput
						placeholder='投稿内容'
						placeholderTextColor={Colors.light.textLight}
						blurOnSubmit={false}
						style={styles.modalText}
						ref={(x) => (input = x)}
					/>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);

	const BeforePost = (): JSX.Element => (
		<View style={styles.beforePost}>
			<Pressable
				style={styles.goBackHistory}
				onPress={() => navigation.goBack()}
			>
				<Ionicons
					name='close'
					color={Colors.light.tabIconDefault}
					size={30}
				/>
			</Pressable>

			<Pressable
				style={[styles.button, styles.buttonOpen]}
				onPress={() => setModalVisible(true)}
			>
				<MaterialCommunityIcons
					name='pencil-plus-outline'
					size={30}
					color='white'
					style={{ marginRight: 5 }}
				/>
				<Text style={styles.textStyle}>新しい投稿をする</Text>
			</Pressable>
		</View>
	);

	return (
		<View style={styles.container}>
			<Modal
				animationType='fade'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.modalBg}>
					<TextArea />
				</View>
			</Modal>

			<BeforePost />
		</View>
	);
};

export default NewPost;
