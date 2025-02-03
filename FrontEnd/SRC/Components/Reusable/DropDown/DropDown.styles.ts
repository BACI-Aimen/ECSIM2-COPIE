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
    backgroundColor: '#fff',
  },
  closedText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center', // Texte centré
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
    borderTopColor: 'blue',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
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
    color: 'blue',
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'blue',
  },
  optionSelected: {
    color: '#999', 
  },
  bottomLine: {
    height: 2,
    backgroundColor: 'blue',
    marginTop: 10,
  },
});

export default styles;
