import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Home";
import Details from "./Details";

type RootStackParamList = {
    Home: undefined;
    Details: undefined
};

const Stack = createStackNavigator();

const App: FunctionComponent = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

            {/*first screen*/}
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }}
            />

            {/*second screen*/}
            <Stack.Screen 
                name="Details" 
                //this error does not exist it cannot hurt me
                component={Details}
                options={{ headerShown: false }}
            />
            
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;