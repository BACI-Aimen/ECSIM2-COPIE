import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "white" },
    backButton: { position: "absolute", top: 20, left: 20, zIndex: 10 },
    backText: { fontSize: 24 },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 20, color: "#002D62" },
    card: { flexDirection: "row", alignItems: "center", backgroundColor: "#002D62", padding: 15, marginVertical: 10, borderRadius: 10 },
    icon: { width: 30, height: 30, marginRight: 15 },
    cardText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default styles;