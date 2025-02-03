import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './BackArrow.styles';
import { useNavigation } from '@react-navigation/native';

const BackArrow: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      testID="back-arrow"
    >
      <Text style={styles.arrowText}>←</Text>
    </TouchableOpacity>
  );
};

export default BackArrow;
