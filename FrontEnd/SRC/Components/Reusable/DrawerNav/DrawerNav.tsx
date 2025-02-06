// src/Components/DrawerNav/DrawerNav.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './DrawerNav.styles';

type DrawerNavProps = {
  onClose?: () => void;
  navigation: any; // à typer plus précisément selon votre configuration
};

const DrawerNav: React.FC<DrawerNavProps> = ({ onClose, navigation }) => {
  const handleNavigation = (screen: string) => {
    if (onClose) onClose(); // Ferme le menu
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation</Text>
      <TouchableOpacity onPress={() => handleNavigation('MonCompte')} style={styles.link}>
        <Text style={styles.linkText}>Mon compte</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('MonMur')} style={styles.link}>
        <Text style={styles.linkText}>Mon mur</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Historique')} style={styles.link}>
        <Text style={styles.linkText}>Historique</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => handleNavigation('Connexion')} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerNav;
