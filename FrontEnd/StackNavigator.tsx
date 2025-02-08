import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeMain from "./SRC/Components/Pages/Home/Home";
import ConnexionMain from "./SRC/Components/Pages/Connexion/Connexion";
import PopupSuppression from "./SRC/Components/Reusable/PopupSuppression/PopupSuppression";
import MonCompte from './SRC/Components/Pages/MonCompte/MonCompte';
import MonMur from './SRC/Components/Pages/MonMur/MonMur';
import Historique from './SRC/Components/Pages/Historique/Historique';
import ListeCompteUser from './SRC/Components/Pages/Admin_ListedesComptes/ListedesComptes';
import FirstConnexion from "./SRC/Components/Pages/FirstConnexion/FirstConnexion";
import Admin_Home from "./SRC/Components/Pages/Admin_Home/Admin_Home";


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Group>
                
                <Stack.Screen name="Connexion" component={ConnexionMain} />
                <Stack.Screen name="FirstConnexion" component={FirstConnexion} />
        
                <Stack.Screen name="Home" component={HomeMain}/>
                <Stack.Screen name="MonCompte" component={MonCompte} />
                <Stack.Screen name="MonMur" component={MonMur} />
                <Stack.Screen name="Historique" component={Historique} />  

                <Stack.Screen name="HomeAdmin" component={Admin_Home} />
                <Stack.Screen name="Gestion des comptes" component={ListeCompteUser} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator