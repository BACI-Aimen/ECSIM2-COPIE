import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
},
title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#0F136B",
},
searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
},
buttonContainer: {
  flexDirection: "row",  // Met les boutons côte à côte
  justifyContent: "space-between", // Espacement égal
  paddingBottom: 9,
},
button: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 3,
},
buttonText: {
  color: "#0F136B",
  fontSize: 12,
  fontWeight: "bold",
  textAlign: "center",
  textAlignVertical: "center"
},
tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0F136B",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
},
headerText: {
    color: "#ffffff",
    fontWeight: "bold",
},
row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
},
accountText: {
    color: "#0F136B",
    fontSize: 16,
},
editButton: {
    backgroundColor: "#0F136B",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
},
editText: {
    color: "#ffffff",
    fontWeight: "bold",
},
modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
},
modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
},
closeButton: {
    alignSelf: "flex-end",
    fontSize: 20,
    color: "#0F136B",
},
modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F136B",
    marginBottom: 10,
},
input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: "center",
    color: "#0F136B",
},
validateButton: {
    backgroundColor: "#0F136B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
},
validateText: {
    color: "#ffffff",
    fontWeight: "bold",
},
});
  
  export default styles;