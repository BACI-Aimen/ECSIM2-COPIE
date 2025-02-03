// src/Components/Layout/MainLayout.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // hamburger à gauche, streak à droite
    paddingHorizontal: 10,
    backgroundColor: '#fff', // fond neutre
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    fontSize: 24,
    color: '#000',
  },
  streak: {
    fontSize: 16,
    color: '#000',
  },
  // Zone pour le contenu principal (par exemple, barre de recherche, compteur, etc.)
  body: {
    flex: 1,
  },
  // Style du menu (drawer)
  drawer: {
    position: 'absolute',
    top: 60, // directement sous le header
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 100,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
});

export default styles;
