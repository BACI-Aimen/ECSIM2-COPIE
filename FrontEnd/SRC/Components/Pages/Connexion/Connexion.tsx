import { useNavigation } from "@react-navigation/native";
import React from "react"
import { StyleSheet, Button, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


const ConnexionMain = () => {

    const navigation = useNavigation();
     

    return(
        <SafeAreaView style={styles.centeredView}>
            <Text>Vous êtes sur la page de Connexion</Text>
            <Button onPress={() => navigation.navigate("Home")} title="Direction le Home"/>
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

export default ConnexionMain