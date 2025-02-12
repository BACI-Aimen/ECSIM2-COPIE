import { LoaderContext } from "../../../Context/loaderContext";
import React, { useState, useEffect } from 'react';
//import { Text, Button, ScrollView, Image } from 'react-native';
import styles from './ListedesComptes.styles';
import { View, Text, Button, Modal, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import UtilisateurService from "../../../Services/UtilisateurService";
import FetchClient from '../../../ServiceClients/FectchClient';

const utilisateurService = new UtilisateurService(FetchClient);

interface User {
    id_utilisateur: number;
    pseudo_utilisateur: string;
}

interface UserDetails {
  pseudo_utilisateur: string;
  mail_utilisateur: string;
  role: string;
  libellé_entité: string;
}

interface ListedesComptesProps {
    navigation: any;
}

const ListedesComptes: React.FC<ListedesComptesProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [accounts, setAccounts] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const fetchUserDetails = async (userId: number) => {
    try {
        const userDetails = await utilisateurService.GetCompteUtilisateur(userId);
        setSelectedUser(userDetails);
        setModalVisible(true);
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};
    
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
      
      //keyExtractor={(item, index) => (item?.id_utilisateur ? String(item.id_utilisateur) : `fallback-${index}`)}
      keyExtractor={(item) => item.id_utilisateur.toString()}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {fetchUserDetails(item.id_utilisateur);}}>
            <Text style={styles.accountText}>{item.pseudo_utilisateur}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => {}}>
            <Text style={styles.editText}>Édition</Text>
          </TouchableOpacity>
        </View>
      )}
    />
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>✖</Text>
          </TouchableOpacity>
          {selectedUser && (
            <>
              <Text style={styles.modalTitle}>Consulter compte</Text>
              <TextInput style={styles.input} value={selectedUser.pseudo_utilisateur} editable={false} />
              <TextInput style={styles.input} value={selectedUser.mail_utilisateur} editable={false} />
              <TextInput style={styles.input} value={selectedUser.role} editable={false} />
              <TextInput style={styles.input} value={selectedUser.libellé_entité} editable={false} />
              <TouchableOpacity style={styles.validateButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.validateText}>Valider</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  </View>
  );
};
  
  export default ListedesComptes;