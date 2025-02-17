import { LoaderContext } from "../../../Context/loaderContext";
import React, { useState, useEffect } from 'react';
//import { Text, Button, ScrollView, Image } from 'react-native';
import styles from './ListedesComptes.styles';
import { View, Text, Button, Modal, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import UtilisateurService from "../../../Services/UtilisateurService";
import EntiteService from "../../../Services/EntiteService";
import FetchClient from '../../../ServiceClients/FectchClient';
import { Picker } from '@react-native-picker/picker';

const utilisateurService = new UtilisateurService(FetchClient);
const entiteService = new EntiteService(FetchClient);

interface User {
    id_utilisateur: number;
    pseudo_utilisateur: string;
}

interface UserDetails {
  id_utilisateur: number;
  pseudo_utilisateur: string;
  mail_utilisateur: string;
  role: string;
  id_entite: number;
  libellé_entité: string;
}

interface ListedesComptesProps {
    navigation: any;
}

interface EntiteFille {
    id_entité: number;
    libellé_entité: string;
}


const ListedesComptes: React.FC<ListedesComptesProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [accounts, setAccounts] = useState<User[]>([]);
  const [ListeEntiteFille, setListEntiteFille] = useState<EntiteFille[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await utilisateurService.GetAllUtilisateur();
        //console.log("Fetched users:", users); // Vérifier les données reçues
        setAccounts(users);
        const Entite = await entiteService.GetAllEntiteFille();
        setListEntiteFille(Entite)
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

const fetchUserDetailsEdit = async (userId: number) => {
  try {
      const userDetails = await utilisateurService.GetCompteUtilisateur(userId);
      // Ajout de l'ID utilisateur dans l'objet retourné
      const userWithId = { id_utilisateur: userId, ...userDetails };
      
      setSelectedUser(userWithId);
      
      //setSelectedUser(userDetails);
      setEditModalVisible(true);
  } catch (error) {
      console.error("Error fetching user details:", error);
  }
};
  
const updateUserDetails = async () => {
  if (selectedUser) {
    try {
      const { libellé_entité, ...userToUpdate } = selectedUser; // Exclut libellé_entité
      await utilisateurService.UpdateCompteUtilisateur(userToUpdate);

      // Met à jour la liste des comptes en local après modification
      setAccounts((prevAccounts) =>
        prevAccounts.map((accounts) =>
            accounts.id_utilisateur === selectedUser.id_utilisateur
                ? { ...accounts, pseudo_utilisateur: selectedUser.pseudo_utilisateur }
                : accounts
        )
    );

      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  }
};

// const deleteUser = async () => {
//   if (selectedUser) {
//     try {
//       await utilisateurService.DeleteCompteUtilisateur(selectedUser.id);
//       setModalVisible(false);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   }
// };

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
          <TouchableOpacity style={styles.editButton} onPress={() => {fetchUserDetailsEdit(item.id_utilisateur)}}>
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
              <Text style={styles.under_title} >Pseudo</Text>
              <TextInput style={styles.input} value={selectedUser.pseudo_utilisateur} editable={false} />
              <Text style={styles.under_title}> E-mail</Text>
              <TextInput style={styles.input} value={selectedUser.mail_utilisateur} editable={false} />
              <Text style={styles.under_title}> Rôle</Text>
              <TextInput style={styles.input} value={selectedUser.role} editable={false} />
              <Text style={styles.under_title} >Entitée rattachée</Text>
              <TextInput style={styles.input} value={selectedUser.libellé_entité} editable={false} />
              <TouchableOpacity style={styles.validateButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.validateText}>Valider</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
    <Modal visible={modalEditVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setEditModalVisible(false)}>
            <Text style={styles.closeButton}>✖</Text>
          </TouchableOpacity>
          {selectedUser && (
            <>
              <Text style={styles.modalTitle}>Edition compte</Text>
              <Text style={styles.under_title} >Pseudo</Text>
              <TextInput style={styles.input} value={selectedUser.pseudo_utilisateur} onChangeText={(text) => setSelectedUser({ ...selectedUser, pseudo_utilisateur: text })} />
              <Text style={styles.under_title}> E-mail</Text>
              <TextInput style={styles.input} value={selectedUser.mail_utilisateur} onChangeText={(text) => setSelectedUser({ ...selectedUser, mail_utilisateur: text })} />
              <Text style={styles.under_title}> Rôle</Text>
              <Picker
                selectedValue={selectedUser.role}
                onValueChange={(itemValue : string) => setSelectedUser({ ...selectedUser, role: itemValue })}>
                <Picker.Item label="Administrateur" value="Administrateur" />
                <Picker.Item label="Utilisateur" value="Utilisateur" />
              </Picker>
              <Text style={styles.under_title} >Entitée rattachée</Text>
              <Picker
                selectedValue={selectedUser.libellé_entité}
                onValueChange={(itemValue) => {
                  const selectedEntite = ListeEntiteFille.find(entite => entite.libellé_entité === itemValue);
                  if (selectedEntite) {
                    setSelectedUser({ 
                      ...selectedUser, 
                      id_entite: selectedEntite.id_entité,
                      libellé_entité: selectedEntite.libellé_entité
                    });
                  }
                }}
              >
              {ListeEntiteFille.map((entite, index) => (
              <Picker.Item key={index} label={entite.libellé_entité} value={entite.libellé_entité} />
              ))}
              </Picker>
              {/* <TextInput style={styles.input} value={selectedUser.libellé_entité} onChangeText={(text) => setSelectedUser({ ...selectedUser, libellé_entité: text })} /> */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.validateButton} onPress={updateUserDetails}>
                  <Text style={styles.validateText}>Valider</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  </View>
  );
};
  
  export default ListedesComptes;