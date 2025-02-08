import { LoaderContext } from "../../../Context/loaderContext";
import React, { useState, useEffect } from 'react';
//import { Text, Button, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainLayout from '../../Reusable/Layout/MainLayout';
import SearchBar from '../../Reusable/SearchBar/SearchBar';
import CircularCounter from '../../Reusable/CircularCounter/CircularCounter';
import DropDown from '../../Reusable/DropDown/DropDown';
import Classement from '../../Reusable/Classement/Classement';
import styles from './Admin_Home.styles';
import HealthData from '../../../Health/HealthData';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

interface Admin_HomeProps {
    navigation: any;
  }

const menuItems = [
    { id: "1", title: "Gestion des réactions", icon: require("../../../../assets/Admin_gestion_reaction.png"), screen:"" },
    { id: "2", title: "Gestion des comptes", icon: require("../../../../assets/Admin_gestion_compte.png"), screen:"Gestion des comptes" },
    { id: "3", title: "Gestion des badges", icon: require("../../../../assets/Admin_gestion_badge.png"), screen:"" },
    { id: "4", title: "Gestion des entités", icon: require("../../../../assets/Admin_gestion_entite.png"), screen:"" },  
]

const Admin_Home: React.FC<Admin_HomeProps> = ({ navigation }) => {

  const deconnexion = () => {
    SecureStore.deleteItemAsync("token");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Connexion' }],
    });
  }

    return (
        

        <View style={styles.container}>
        <TouchableOpacity onPress={deconnexion} style={styles.backButton}>
          <Text style={styles.backText}>⬅</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Administrateur</Text>
        
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.screen)}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  export default Admin_Home;