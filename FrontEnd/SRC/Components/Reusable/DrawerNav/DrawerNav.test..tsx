import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Alert, Modal, Text, View, Pressable } from 'react-native';
import { useState } from "react";

type GreetingProps = {
    setModal: any,
    getModal: boolean
}

const PopupSuppression = (props: GreetingProps) => {

    return(
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.getModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            props.setModal(!props.getModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Ceci est la popup de suppression</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => props.setModal(!props.getModal)}>
                <Text style={styles.textStyle}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
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
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default PopupSuppression