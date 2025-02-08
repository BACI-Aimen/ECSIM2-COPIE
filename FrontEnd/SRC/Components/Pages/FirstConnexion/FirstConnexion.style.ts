import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingHorizontal: 24,
      },
      row: {
        flexDirection: "row", // Aligner horizontalement
        alignItems: "center", // Centrer verticalement
        marginBottom: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
      },
      error:{
        fontSize: 16,
        color: "#2B309B",
        marginBottom: 8,
        textAlign: "center",
      },
      subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
      },
      avatarContainer: {
        alignSelf: "center",
        marginBottom: 16,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
        overflow: "hidden",
      },
      avatarSelected: {
        width: "100%",
        height: "100%",
      },
      avatar: {
        width: 40,
        height: 40,
      },
      inputContainer: {
        marginBottom: 12,
      },
      inputPseudoContainer: {
        marginBottom: 12,
        flex: 1
      },
      label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
      },
      required: {
        color: "red",
      },
      input: {
        height: 45,
        backgroundColor: "#F4F4F4",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#DDD",
      },
      passwordInfo: {
        fontSize: 14,
        color: "#333",
        marginVertical: 12,
      },
      bold: {
        fontWeight: "bold",
      },
      passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        paddingHorizontal: 12,
      },
      passwordInput: {
        flex: 1,
      },
      eyeButton: {
        padding: 10,
      },
      eyeText: {
        fontSize: 18,
      },
      passwordRules: {
        fontSize: 12,
        color: "#666",
        marginBottom: 16,
      },
      button: {
        backgroundColor: "#2B309B",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      },
      buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
      },
});

export default styles