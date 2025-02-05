import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  
    alignItems: 'center',          
    paddingTop: 10,
    backgroundColor: '#fff',
  },

  icon: {
    width: 24,
    height: 24,
  },

  classementHeader: {
    width: '90%',        
    height: 90,
    marginTop: 50,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default styles;