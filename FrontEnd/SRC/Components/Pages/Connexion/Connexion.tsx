import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import UtilisateurService from "../../../Services/UtilisateurService";
import FetchClient from '../../../ServiceClients/FectchClient'; 
import styles from './Connexion.style';
import * as SecureStore from 'expo-secure-store';
import { LoaderContext } from '../../../Context/loaderContext';

const ConnexionMain = () => {
  const [login, setLogin] = useState("");
  const [Mdp, setMdp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { toggleLoader } = useContext(LoaderContext);

  const navigation = useNavigation();

  const handleConnexion = async () => {
    toggleLoader();
    const API_Utilisateur = new UtilisateurService(FetchClient);
    try {
      const retour = await API_Utilisateur.connexionUtilisateur(
        {mail_utilisateur:login,mot_de_passe:Mdp}
      );
      console.log(retour)
      if(!retour.hasOwnProperty('error')) {
        toggleLoader();
        await SecureStore.setItemAsync('token', retour.token)
        if(retour.first_connexion){
          navigation.reset({
            index: 0,
            routes: [{ name: 'FirstConnexion' }],
          });
        }else{
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } 
      }else{
        setError(retour.message)
        toggleLoader();
      }
    } catch (error: any) {
      setError(error.message)
    }
  };

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Bienvenue</Text>

      {/* champ error */}
      <Text style={styles.error}>{error}</Text>

      {/* Champ Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="miage@mail.com"
          value={login}
          onChangeText={setLogin}
          keyboardType="email-address"
        />
      </View>

      {/* Champ Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Mot de passe"
            value={Mdp}
            onChangeText={setMdp}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeText}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bouton Se connecter */}
      <TouchableOpacity style={styles.button} onPress={handleConnexion}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      {/* Lien Mot de passe oublié */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Mot de passe oublié</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnexionMain;
