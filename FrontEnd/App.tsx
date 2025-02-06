import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import StackNavigator from './StackNavigator';
import LoaderProvider from './SRC/Context/loaderProvider';


export default function App() {

  return (
    <LoaderProvider>
      <NavigationContainer>
        <StackNavigator />
        <StatusBar/>
      </NavigationContainer>
    </LoaderProvider>
  );
}