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
    borderBottomColor: '#2B309B', 
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    color: '#2B309B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#2B309B', 
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
  highlightText: {
    color: 'red',
    fontWeight: 'bold',
  },

  modalOpenButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2B309B',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2B309B',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
});

export default styles;
