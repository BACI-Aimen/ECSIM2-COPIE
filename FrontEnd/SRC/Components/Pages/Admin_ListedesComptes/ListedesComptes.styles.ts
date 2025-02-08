import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA" },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#545F71" },
    searchInput: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
    buttonRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
    tableHeader: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#002D62", borderRadius: 5 },
    headerText: { color: "white", fontWeight: "bold" },
    row: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
    accountText: { flex: 1 },
    editButton: { backgroundColor: "#002D62", padding: 5, borderRadius: 5 },
    editText: { color: "white" },

    buttonContainer: {
      flexDirection: "row",  // Met les boutons côte à côte
      justifyContent: "space-between", // Espacement égal
      marginHorizontal: 10,
      paddingBottom: 9,
    },

    button: {
      backgroundColor: "#D9D9D9",
      paddingVertical: 10,
      flex: 1, // Permet aux boutons d'occuper la même largeur
      alignItems: "center", // Centre le texte horizontalement
      borderRadius: 10,
      marginHorizontal: 5, // Ajoute un petit espace entre les boutons
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2, // Ombre sur Android
    },

    buttonText: {
      color: "#0F136B",
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
    },
});
  
  export default styles;