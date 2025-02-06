import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  error:{
    fontSize: 16,
    color: "#2B309B",
    marginBottom: 8,
    textAlign: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeButton: {
    padding: 12,
  },
  eyeText: {
    color: "#666",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2B309B",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#2B309B",
    textAlign: "center",
    fontSize: 14,
  },
});

export default styles