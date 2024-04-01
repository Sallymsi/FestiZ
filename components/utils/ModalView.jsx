import * as React from 'react';
import { Text, View, Alert, Modal, Pressable } from 'react-native';
import style from '../../Style';

export default function ModalView({ text, modalVisible, setModalVisible }) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
            <View style={style.centeredView}>
            <View style={style.modalView}>
                <Text style={style.modalText}>{text}</Text>
                <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={style.textStyle}>Fermer</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
    );
}