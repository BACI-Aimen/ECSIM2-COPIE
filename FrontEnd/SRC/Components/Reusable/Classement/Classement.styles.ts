import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2', 
    width: '80%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#2B309B', // Ligne de séparation bleue pour l'en-tête
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    color: '#2B309B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    // On peut garder une hauteur minimale pour le loader si besoin
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#2B309B', // Ligne bleue pour séparer chaque ligne
    borderBottomWidth: 1,
  },
  rankColumn: {
    flex: 0.2,
    textAlign: 'center',
  },
  pseudoColumn: {
    flex: 0.5,
    textAlign: 'center',
  },
  scoreColumn: {
    flex: 0.3,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#2B309B',
    textAlign: 'center',
  },
});

export default styles;