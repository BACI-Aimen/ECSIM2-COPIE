import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './Classement.styles';
import ClassementService from '../../../Services/ClassementService';
import FetchClient from '../../../ServiceClients/FectchClient';

const classementService = new ClassementService(FetchClient);

export type ClassementProps = {
  type: string;
};

const Classement: React.FC<ClassementProps> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [classement, setClassement] = useState<any[]>([]);

  const fetchClassement = async () => {
    setLoading(true);
    try {
      let data;
      if (type === "Classement par associations") {
        data = await classementService.getClassementEntiteActuel();
      } else if (type === "Classement par universités") {
        data = await classementService.getClassementEntiteMereActuel();
      } else if (type === "Classement dans mon université") {
        data = await classementService.getMonclassementEntiteMereActuel();
      } else if (type === "Classement dans mon association") {
        data = await classementService.getMonclassementEntiteFilleActuel();
      } else if (type === "Classement des membres MC") {
        data = await classementService.getClassementUtilisateurActuel();
      } else {
        data = await classementService.getClassementUtilisateurActuel();
      }
      setClassement(data.classement);
    } catch (error) {
      console.error("Erreur lors du chargement du classement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassement();
  }, [type]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {

    let pseudo = "";
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
    return (
      <View style={styles.itemContainer}>
        <Text style={[styles.itemText, styles.rankColumn]}>{index + 1}</Text>
        <Text style={[styles.itemText, styles.pseudoColumn]}>{pseudo}</Text>
        <Text style={[styles.itemText, styles.scoreColumn]}>{item.totalpas} pas</Text>
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

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Rang</Text>
        <Text style={styles.headerText}>Pseudo</Text>
        <Text style={styles.headerText}>Score</Text>
      </View>
      <FlatList
        data={classement}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        scrollEnabled={false}  
      />
    </View>
  );
};

export default Classement;

