import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UtilisateurService from "../../../Services/UtilisateurService"; // Remplace par le bon chemin
import FetchClient from '../../../ServiceClients/FectchClient'; // Remplace par le bon chemin

const ConnexionMain = () => {
  const [retourAPI, setRetourAPI] = useState(null);
  const [login, setLogin] = useState("");
  const [Mdp, setMdp] = useState("");

  const navigation = useNavigation();

  const handleConnexion = async () => {
    const API_Utilisateur = new UtilisateurService(FetchClient);
    try {
      const retour = await API_Utilisateur.connexionUtilisateur(
        {mail_utilisateur:login,mot_de_passe:Mdp}
      );
      setRetourAPI(retour.error || retour.message);
    } catch (error: any) {
      setRetourAPI(error);
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
        <Button onPress={() => navigation.navigate("Home")} title="Direction le Home" />
        <Text>
          {typeof retourAPI === "string" ? retourAPI : JSON.stringify(retourAPI, null, 2)}
        </Text>
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
