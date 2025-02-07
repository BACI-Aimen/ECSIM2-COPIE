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

interface Admin_HomeProps {
    navigation: any;
  }

const menuItems = [
    { id: "1", title: "Gestion des réactions", icon: require("../../../../assets/Admin_gestion_reaction.png") },
    { id: "2", title: "Gestion des comptes", icon: require("../../../../assets/Admin_gestion_compte.png") },
    { id: "3", title: "Gestion des badges", icon: require("../../../../assets/Admin_gestion_badge.png") },
    { id: "4", title: "Gestion des entités", icon: require("../../../../assets/Admin_gestion_entite.png") },  
]

const Admin_Home: React.FC<Admin_HomeProps> = ({ navigation }) => {

    return (
        

        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>⬅</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Administrateur</Text>
        
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => {}}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  export default Admin_Home;