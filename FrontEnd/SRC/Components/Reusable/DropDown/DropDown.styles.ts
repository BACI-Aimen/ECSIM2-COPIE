import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const containerWidth = width * 0.85;

const styles = StyleSheet.create({

  closedContainer: {
    width: containerWidth,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#2B309B', 
  },

  closedContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  icon: {
    width: 18,
    height: 18,
    
  },
 
  closedTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  closedText: {
    fontSize: 16,
    color: 'white', 
    textAlign: 'center',
  },

  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: width,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopWidth: 4,
    borderTopColor: '#222679',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222679',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#222679',
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#222679',
  },
  optionSelected: {
    color: '#999', 
  },
  bottomLine: {
    height: 2,
    backgroundColor: '#222679',
    marginTop: 10,
  },
});

export default styles;
