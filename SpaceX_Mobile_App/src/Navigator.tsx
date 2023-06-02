import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "./welcome";
import Home from "./Home";

type RootStackParamList = {
    Welcome: undefined;
    Home: undefined
};

const Stack = createStackNavigator();

const App: FunctionComponent = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">

            {/*first screen*/}
            <Stack.Screen 
                name="Welcome" 
                component={Welcome} 
                options={{ headerShown: false }}
            />

            {/*second screen*/}
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{ headerShown: false }}
            />
            
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;