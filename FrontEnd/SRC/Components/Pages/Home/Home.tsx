import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Button, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import PopupSuppression from "../../Reusable/PopupSuppression/PopupSuppression";
import HealthData from "../../../Health/HealthData";
import { LoaderContext } from "../../../Context/loaderContext";

const HomeMain = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [steps, setSteps] = useState([]);

    const { toggleLoader } = useContext(LoaderContext)

    useEffect(() => {
        const fetchSteps = async () => {
            const data = await HealthData.getSteps();
            setSteps(data);
          };
      
          //Appel de la fonction pour récuperer les pas, mais ça va être chiant à faire, j'ai mis une version de merde dans les fichiers
          fetchSteps();
    }, [])

    const handleAjoutPas = async () => {
      await HealthData.addSteps();
    }

    const toggleLoaderFront = () => {
      toggleLoader()
    }
    
    return(
        <SafeAreaView style={styles.centeredView}>
            <Text>Vous êtes sur la page Home</Text>
            <Text>{JSON.stringify(steps)}</Text>
            <Button onPress={() => {setModalVisible(true)}} title="Supprimer"/>
            <Button onPress={handleAjoutPas} title="Ajouter des pas"/>
            <Button onPress={toggleLoaderFront} title="Toggle le loader"/>
            <PopupSuppression getModal={modalVisible} setModal={setModalVisible}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

export default HomeMain