// src/Components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './MainLayout.styles';
import DrawerNav from '../DrawerNav/DrawerNav';

type MainLayoutProps = {
  children: React.ReactNode;
  streak: number;       
  navigation: any;      
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, streak, navigation }) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity
          onPress={toggleDrawer}
          style={styles.hamburger}
          testID="hamburger-button"
        >
          <Text style={styles.hamburgerText}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.streak} testID="streak-display">
          {streak} jours
        </Text>
      </View>

      
      {isDrawerVisible && (
        <View style={styles.drawer} testID="drawer-menu">
          <DrawerNav onClose={toggleDrawer} navigation={navigation} />
        </View>
      )}

      
      <View style={styles.body}>
        {children}
      </View>
    </View>
  );
};

export default MainLayout;
