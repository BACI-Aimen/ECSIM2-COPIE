import { LoaderContext } from "../../../Context/loaderContext";
import React, { useState, useEffect } from 'react';
import { Text, Button, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainLayout from '../../Reusable/Layout/MainLayout';
import SearchBar from '../../Reusable/SearchBar/SearchBar';
import CircularCounter from '../../Reusable/CircularCounter/CircularCounter';
import DropDown from '../../Reusable/DropDown/DropDown';
import Classement from '../../Reusable/Classement/Classement';
import styles from './Home.styles';
import HealthData from '../../../Health/HealthData';

interface HomeMainProps {
  navigation: any;
}

const HomeMain: React.FC<HomeMainProps> = ({ navigation }) => {
  const [selectedClassement, setSelectedClassement] = useState<string>('Classement des membres MC');
  const [steps, setSteps] = useState<number>(0);

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
    console.log('Recherche :', text);
  };

  const streak = 5;

  return (
    <MainLayout streak={streak} navigation={navigation}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
          <SearchBar onSearch={handleSearch} />
          <CircularCounter value={steps} />
          <DropDown 
            selected={selectedClassement} 
            onSelect={(option: string) => setSelectedClassement(option)} 
          />
          <Image
            source={require('../../../../assets/HeaderClassement.png')}
            style={styles.classementHeader}
          />
          <Classement type={selectedClassement} />
          <Button onPress={() => {}} title="Supprimer" />
          <Button onPress={handleAjoutPas} title="Ajouter des pas" />
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

export default HomeMain;
