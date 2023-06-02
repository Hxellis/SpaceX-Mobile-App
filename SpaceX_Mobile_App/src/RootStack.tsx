import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "./components/colors";
import Suzuran from "../assets/pictures/FpsMo5RXgAI-rTI.png"

import Welcome from "./welcome";
import Home from "./home";
import Greeting from "./components/Header/Greeting";
import Profile from "./components/Header/Profile";

type RootStackParamList = {
    Welcome: undefined;
    Home: undefined
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.greylight,
                    borderBottomWidth: 0,
                    shadowColor: "transparent",
                    shadowOpacity: 0,
                    elevation: 0,
                    height: 120
                },
                headerTintColor: colors.secondary,
                headerRightContainerStyle: {
                    paddingRight: 25,
                },
                headerLeftContainerStyle: {
                    paddingLeft: 10
                },
                headerRight: () => (
                    <Profile
                        img={Suzuran}
                        imgContainerStyle={{backgroundColor: colors.tertiary}}
                    />
                ),
            }} initialRouteName="Home">

                <Stack.Screen 
                    name="Welcome" 
                    component={Welcome} 
                    options={{ headerShown: false}}
                />

                <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        headerTitle: (props) => (
                            <Greeting
                                mainText="Hello!!"
                                subText="HIIII"
                                {...props}
                            />
                        ),
                        headerLeft: () => <></>,
                    }}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;