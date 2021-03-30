import React, { useState, useRef } from "react";
import {
	View,
	Text,
	Modal,
	Pressable,
	TextInput,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import API, { graphqlOperation } from "@aws-amplify/api";
import { createPost } from "../../src/graphql/mutations";

// import { TextInput } from "react-native-gesture-handler";
type NewPostProps = {
	navigation: StackNavigationProp<RootStackParamList, "Root">;
};

const NewPost: React.FC<NewPostProps> = (props) => {
	const { navigation } = props;
	const [modalVisible, setModalVisible] = useState(false);
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	let input: any;
	// console.log(navigation);

	const focus = () => {
		input.focus();
	};
	const closeTab = () => {
		setModalVisible(!modalVisible);
		navigation.goBack();
	};
	type submitProps = {
		title: string;
		content: string;
	};
	const submit = async () => {
		try {
			if (title !== "" && content !== "") {
				const userData = await API.Auth.currentAuthenticatedUser();
				// console.log(userData.attributes.sub);
				await API.graphql(
					graphqlOperation(createPost, {
						input: {
							userID: userData.attributes.sub,
							title: title,
							content: content,
							vote: 0,
						},
					})
				);
				setTitle("");
				setContent("");
				closeTab();
			} else {
				console.log("title or content is missing");
			}
		} catch (e) {
			console.log(e);
		}
	};

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
									onPress={submit}
								>
									<Text style={styles.textStyle}>投稿</Text>
								</TouchableWithoutFeedback>
							</View>
						</View>
						<View style={styles.textAreaBox}>
							<View style={styles.title}>
								<TextInput
									placeholder='タイトル'
									placeholderTextColor={
										Colors.light.textLight
									}
									blurOnSubmit={false}
									autoFocus={true}
									// editable={true}
									style={styles.modalSubText}
									value={title}
									onChangeText={(e) => setTitle(e)}
									// onEndEditing={(e) => setTitle(e)}
								/>
							</View>
							<KeyboardAvoidingView
								behavior='height'
								keyboardVerticalOffset={100}
								style={{ flex: 1 }}
							>
								<View style={styles.mainText}>
									<TextInput
										placeholder='投稿内容'
										placeholderTextColor={
											Colors.light.textLight
										}
										multiline
										blurOnSubmit={false}
										style={styles.modalText}
										// editable={true}
										value={content}
										onChangeText={(text) =>
											setContent(text)
										}
										autoFocus={true}
									/>
								</View>
								{/* </TouchableWithoutFeedback> */}
							</KeyboardAvoidingView>
						</View>
					</View>
				</View>
			</Modal>

			<BeforePost />
		</View>
	);
};

export default NewPost;
