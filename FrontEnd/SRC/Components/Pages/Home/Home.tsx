import React, { useEffect, useState } from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopupSuppression from '../../Reusable/PopupSuppression/PopupSuppression';
import HealthData from '../../../Health/HealthData';
import styles from './Home.styles';
import MainLayout from '../../Reusable/Layout/MainLayout';
import SearchBar from '../../Reusable/SearchBar/SearchBar';
import StepCounter from '../../Reusable/CircularCounter/CircularCounter';
import CircularCounter from '../../Reusable/CircularCounter/CircularCounter';

interface HomeMainProps {
  navigation: any;
}

const HomeMain: React.FC<HomeMainProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [steps, setSteps] = useState([]);
  
  useEffect(() => {
    const fetchSteps = async () => {
      const data = await HealthData.getSteps();
      setSteps(data);
    };
    fetchSteps();
  }, []);
  
  const handleAjoutPas = async () => {
    await HealthData.addSteps();
  };

  const handleSearch = (text: string) => {
    //console.log('Recherche de mur :', text);
  };

  const streak = 5;
  
  return (
    <MainLayout streak={streak} navigation={navigation}>
      <SafeAreaView style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <CircularCounter value={steps} />
        <Text>Vous êtes sur la page Home</Text>
        <Text>{JSON.stringify(steps)}</Text>
        <Button onPress={() => setModalVisible(true)} title="Supprimer" />
        <Button onPress={handleAjoutPas} title="Ajouter des pas" />
        <PopupSuppression getModal={modalVisible} setModal={setModalVisible} />
      </SafeAreaView>
    </MainLayout>
  );
};

export default HomeMain;
