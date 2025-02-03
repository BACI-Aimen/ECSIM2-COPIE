import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UtilisateurService from "../../../Services/UtilisateurService";
import FetchClient from '../../../ServiceClients/FectchClient'; 
import * as SecureStore from 'expo-secure-store';

const ConnexionMain = () => {
  const [login, setLogin] = useState("");
  const [Mdp, setMdp] = useState("");

  const navigation = useNavigation();

  const alert = (message: string) => {
    Alert.alert("Votre connexion", message, [
      {
        text: 'Ok'
      }
    ])
  }

  const handleConnexion = async () => {
    const API_Utilisateur = new UtilisateurService(FetchClient);
    try {
      console.log("aled")
      const retour = await API_Utilisateur.connexionUtilisateur(
        {mail_utilisateur:login,mot_de_passe:Mdp}
      );
      console.log(retour)
      if(retour.message) {
        await SecureStore.setItemAsync('token', retour.token)
        navigation.navigate("Home")
      }
    } catch (error: any) {
      //alert(error)
      console.log(error)
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Text>Login</Text>
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          onChangeText={setLogin}
          value={login}
        />
        <Text>Mot de passe</Text>
        <TextInput
          style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          secureTextEntry
          onChangeText={setMdp}
          value={Mdp}
        />
        <Button onPress={handleConnexion} title="Se connecter" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ConnexionMain;
