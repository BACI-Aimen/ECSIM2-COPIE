import React, { useContext, useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image 
} from "react-native";
import styles from './FirstConnexion.style'
import { LoaderContext } from "../../../Context/loaderContext";
import UtilisateurService from "../../../Services/UtilisateurService";
import FetchClient from "../../../ServiceClients/FectchClient";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const FirstConnexion = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [error, setError] = useState("");

  const { toggleLoader } = useContext(LoaderContext);
  const navigation = useNavigation();
  const FormData = global.FormData;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    toggleLoader();
    const API_Utilisateur = new UtilisateurService(FetchClient);
    try{
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append(`photo_mur`, {
        uri: selectedImage,
        name:"photo_mur.jpg",
        type: blob.type,
      } as any);
      formData.append("pseudo", pseudo)
      formData.append("nouveauMotDePasse", password)
      formData.append("confirmerNouveauMotDePasse",confirmPassword)
      const retour = await API_Utilisateur.finaliserInscription(formData);
      toggleLoader();
      if(retour.message){
          navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
          });
      }
      setError(retour.error)
    }catch(error: any){
      setError(error.error)
      toggleLoader();
    }
  }

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>C’est votre première connexion !</Text>

      {/* Zone erreur */}
      <Text style={styles.error}>{error}</Text>

        <View style={styles.row}>
            {/* Avatar */}
            <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
                {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.avatarSelected} />
                ) : (
                <Image source={require("../../../../assets/AppareilPhoto.png")} style={styles.avatar} />
                )}
            </TouchableOpacity>

            {/* Champ Pseudo */}
            <View style={styles.inputPseudoContainer}>
                <Text style={styles.label}>Pseudo <Text style={styles.required}>*</Text></Text>
                <TextInput 
                style={styles.input} 
                placeholder="Votre idée..." 
                value={pseudo} 
                onChangeText={setPseudo} 
                />
            </View>
        </View>
      

      <Text style={styles.passwordInfo}>
        Pour accéder à l’application, nous avons besoin d’un nouveau <Text style={styles.bold}>mot de passe</Text> personnel
      </Text>

      {/* Champ Mot de passe */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe <Text style={styles.required}>*</Text></Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={[styles.input, styles.passwordInput]} 
            placeholder="********" 
            value={password} 
            onChangeText={setPassword} 
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

      {/* Champ Confirmation Mot de passe */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmer votre mot de passe <Text style={styles.required}>*</Text></Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={[styles.input, styles.passwordInput]} 
            placeholder="********" 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            secureTextEntry={!showConfirmPassword} 
          />
          <TouchableOpacity 
            style={styles.eyeButton} 
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={styles.eyeText}>{showConfirmPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Règle de mot de passe */}
      <Text style={styles.passwordRules}>
        Le mot de passe doit avoir au minimum 8 caractères et au moins un chiffre
      </Text>

      {/* Bouton Créer son compte */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Créer son compte</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirstConnexion;