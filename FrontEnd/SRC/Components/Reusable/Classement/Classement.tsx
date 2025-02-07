import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import styles from './Classement.styles';
import ClassementService from '../../../Services/ClassementService';
import FetchClient from '../../../ServiceClients/FectchClient';

const classementService = new ClassementService(FetchClient);
const ITEM_HEIGHT = 50; // Hauteur (approx.) de chaque ligne pour getItemLayout

export type ClassementProps = {
  type: string;
};


function parseJwt(tk: string) {
  try {
    const base64Url = tk.split('.')[1];
    if (!base64Url) throw new Error('Token invalide');
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erreur lors du décodage du token', error);
    return null;
  }
}

const Classement: React.FC<ClassementProps> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [classement, setClassement] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const modalFlatListRef = useRef<FlatList<any>>(null);


  const loadCurrentUserId = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        const payload: any = parseJwt(token);
        if (payload) {
          console.log('ID utilisateur :', payload.id_utilisateur);
          setCurrentUserId(payload.id_utilisateur);
        }
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
    }
  };

  const fetchClassement = async () => {
    setLoading(true);
    try {
      let data;
      if (type === 'Classement par associations') {
        data = await classementService.getClassementEntiteActuel();
      } else if (type === 'Classement par universités') {
        data = await classementService.getClassementEntiteMereActuel();
      } else if (type === 'Classement dans mon université') {
        data = await classementService.getMonclassementEntiteMereActuel();
      } else if (type === 'Classement dans mon association') {
        data = await classementService.getMonclassementEntiteFilleActuel();
      } else if (type === 'Classement des membres MC') {
        data = await classementService.getClassementUtilisateurActuel();
      } else {
        data = await classementService.getClassementUtilisateurActuel();
      }
      console.log('Données reçues pour le classement :', data);
      setClassement(data.classement);
    } catch (error) {
      console.error('Erreur lors du chargement du classement:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentUserId();
    fetchClassement();
  }, [type]);


  let displayedClassement: any[] = [];
  if (classement.length <= 5) {

    displayedClassement = classement;
  } else {

    const currentUserIndex =
      currentUserId !== null
        ? classement.findIndex(item => item.id_utilisateur === currentUserId)
        : -1;

    if (currentUserIndex >= 0 && currentUserIndex < 5) {
      displayedClassement = classement.slice(0, 5);
    } else if (currentUserIndex >= 5) {
      const topThree = classement.slice(0, 3);
      const gapItem = { type: 'gap' };
      const userBlock = classement.slice(currentUserIndex - 1, currentUserIndex + 1);

      displayedClassement = [...topThree, gapItem, ...userBlock];
    } else {
      displayedClassement = classement.slice(0, 5);
    }
  }

  const currentUserIndexFull =
    currentUserId !== null
      ? classement.findIndex(item => item.id_utilisateur === currentUserId)
      : 0;

  useEffect(() => {
    if (modalVisible && modalFlatListRef.current && currentUserIndexFull >= 0) {
      modalFlatListRef.current.scrollToIndex({
        index: currentUserIndexFull,
        viewPosition: 0.5,
      });
    }
  }, [modalVisible, currentUserIndexFull]);
  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'gap') {
      return (
        <View style={[styles.itemContainer, { justifyContent: 'center' }]}>
          <Text style={[styles.itemText, { fontStyle: 'italic' }]}>
            ...
          </Text>
        </View>
      );
    }

    const rank = classement.findIndex(
      (x: any) => x.id_utilisateur === item.id_utilisateur
    ) + 1;

    let pseudo = '';
    if (item.utilisateur) {
      if (item.utilisateur.pseudo_utilisateur) {
        pseudo = item.utilisateur.pseudo_utilisateur;
      } else if (item.utilisateur.id_entité) {
        if (item.utilisateur.id_entité.libellé_entité) {
          pseudo = item.utilisateur.id_entité.libellé_entité;
        } else if (
          item.utilisateur.id_entité.id_entité_1 &&
          item.utilisateur.id_entité.id_entité_1.libellé_entité
        ) {
          pseudo = item.utilisateur.id_entité.id_entité_1.libellé_entité;
        }
      }
    }

    const isCurrentUser =
      currentUserId !== null && item.id_utilisateur === currentUserId;

    return (
      <View style={styles.itemContainer}>
        <Text style={[styles.itemText, styles.rankColumn, isCurrentUser && styles.highlightText]}>
          {rank}
        </Text>
        <Text style={[styles.itemText, styles.pseudoColumn, isCurrentUser && styles.highlightText]}>
          {pseudo}
        </Text>
        <Text style={[styles.itemText, styles.scoreColumn, isCurrentUser && styles.highlightText]}>
          {item.totalpas} pas
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (classement.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.itemText}>Aucun classement à afficher</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Rang</Text>
        <Text style={styles.headerText}>Pseudo</Text>
        <Text style={styles.headerText}>Score</Text>
      </View>

      <FlatList
        data={displayedClassement}
        keyExtractor={(item, index) => {
          if (item.type === 'gap') return `gap-${index}`;
          return index.toString();
        }}
        renderItem={renderItem}
        scrollEnabled={false}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.modalOpenButton}>
        <Text style={styles.modalButtonText}>Voir le classement complet</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
            <Text style={styles.modalButtonText}>Fermer</Text>
          </TouchableOpacity>
          <FlatList
            ref={modalFlatListRef}
            data={classement}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Classement;
