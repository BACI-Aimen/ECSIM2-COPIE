import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 70,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    fontSize: 24,
    color: '#000',
  },
  streak: {
    fontSize: 25,
    color: '#000',
  },
  body: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 70, 
    //left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 100,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  icon: {
    width: 20,
    height: 30,
    marginVertical: 0,
    padding:8,
  },
  iconMC: {
    width: 200,
    height: 200,
    left : 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding:8,
  },
});

export default styles;
