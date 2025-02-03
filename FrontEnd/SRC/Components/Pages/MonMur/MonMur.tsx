import React from 'react';
import { View, Text } from 'react-native';
import styles from './MonMur.styles';
import BackArrow from '../../Reusable/BackArrow/BackArrow';

const MonMur = () => {
  return (
    <View style={styles.container}>
      <BackArrow />
      <Text>Page Mon Mur</Text>
    </View>
  );
};

export default MonMur;