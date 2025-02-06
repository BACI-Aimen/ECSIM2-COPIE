import React from 'react';
import { View, Text } from 'react-native';
import styles from './MonCompte.styles';
import BackArrow from '../../Reusable/BackArrow/BackArrow';

const MonCompte = () => {
  return (
    <View style={styles.container}>
        <BackArrow />
      <Text>Page Mon Compte</Text>
    </View>
  );
};

export default MonCompte;
