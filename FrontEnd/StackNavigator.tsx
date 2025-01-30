import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeMain from "./SRC/Components/Pages/Home/Home";
import ConnexionMain from "./SRC/Components/Pages/Connexion/Connexion";
import PopupSuppression from "./SRC/Components/Reusable/PopupSuppression/PopupSuppression";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Group>
                <Stack.Screen name="Home" component={HomeMain}/>
                <Stack.Screen name="Connexion" component={ConnexionMain}/>
                
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator