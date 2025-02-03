// src/Components/DrawerNav/DrawerNav.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default styles;
