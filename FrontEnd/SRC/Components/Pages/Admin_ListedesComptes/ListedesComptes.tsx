import { LoaderContext } from "../../../Context/loaderContext";
import React, { useState, useEffect } from 'react';
//import { Text, Button, ScrollView, Image } from 'react-native';
import styles from './ListedesComptes.styles';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import UtilisateurService from "../../../Services/UtilisateurService";
import FetchClient from '../../../ServiceClients/FectchClient';

const utilisateurService = new UtilisateurService(FetchClient);

interface User {
    id: string;
    pseudo_utilisateur: string;
}

interface ListedesComptesProps {
    navigation: any;
  }

    const ListedesComptes: React.FC<ListedesComptesProps> = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [accounts, setAccounts] = useState<User[]>([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const users = await utilisateurService.GetAllUtilisateur();
          //console.log("Fetched users:", users); // Vérifier les données reçues
          setAccounts(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }, []);
  
    const filteredAccounts = accounts.filter(account => 
        account.pseudo_utilisateur.toLowerCase().includes(search.toLowerCase())
    );
    
    return (
        <View style={styles.container}>
      <Text style={styles.title}>Gestion des comptes</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un compte..."
        value={search}
        onChangeText={setSearch}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Créer des comptes en masse</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Compte</Text>
        <Text style={styles.headerText}>Action</Text>
      </View>
      
      <FlatList
        data={filteredAccounts}
        
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `fallback-${index}`)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.accountText}>{item.pseudo_utilisateur}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => {}}>
              <Text style={styles.editText}>Édition</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
      );
  };
  
  export default ListedesComptes;