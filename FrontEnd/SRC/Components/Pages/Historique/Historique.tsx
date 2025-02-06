import React from 'react';
import { View, Text } from 'react-native';
import styles from './Historique.styles';
import BackArrow from '../../Reusable/BackArrow/BackArrow';

const Historique = () => {
  return (
    <View style={styles.container}>
      <BackArrow />
      <Text>Page Historique</Text>
    </View>
  );
};

export default Historique;
