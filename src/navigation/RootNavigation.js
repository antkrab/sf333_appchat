import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen.js";
import ChatScreen from "../screens/ChatScreen.js";
import AuthLoading from "../screens/AuthLoading.js";
import ChatRoomsScreen from "../screens/ChatRoomsScreen.js";


const Stack = createStackNavigator();

const RootNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="AuthLoading" component={AuthLoading} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChatRoomsScreen" component={ChatRoomsScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    );
};

export default RootNavigator;