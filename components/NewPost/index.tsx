import React, { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import styles from "./styles";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {}

const NewPost = (props: Props) => {
	const [modalVisible, setModalVisible] = useState(false);

	const TextArea = (): JSX.Element => (
		<View style={styles.modalView}>
			<View style={styles.header}>
				<Pressable
					style={[styles.button, styles.buttonClose]}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<Text style={styles.textStyle}>X</Text>
				</Pressable>
				<View style={styles.textCenter}>
					<Text style={styles.headerText}>新規投稿</Text>
				</View>
				<Pressable
					style={[styles.button, styles.buttonClose]}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<Text style={styles.textStyle}>投稿</Text>
				</Pressable>
			</View>
			<View style={styles.textAreaBox}>
				<View style={styles.title}>
					<Text style={styles.modalText}>Title comes here</Text>
				</View>
				<View style={styles.mainText}>
					<Text style={styles.modalText}>
						MainText here Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Dolorum, cumque natus eligendi non
						voluptates exercitationem sit error, eaque enim odio
						voluptatem ipsa deserunt iure provident possimus dolor
						sed velit quisquam.
					</Text>
				</View>
			</View>
		</View>
	);

	const BeforePost = (): JSX.Element => (
		<View style={styles.OpenBtnBox}>
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
