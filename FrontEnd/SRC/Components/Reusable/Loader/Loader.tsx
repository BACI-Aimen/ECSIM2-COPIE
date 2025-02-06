import React, { useContext } from "react";
import { View, ActivityIndicator, Modal, StyleSheet } from "react-native";
import { LoaderContext } from "../../../Context/loaderContext"; // Adapte le chemin selon ton projet

const Loader = () => {
  const { loader } = useContext(LoaderContext);

  return (
    <Modal visible={loader} transparent animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // Fond semi-transparent
  },
});

export default Loader;
