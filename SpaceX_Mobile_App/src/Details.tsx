import React, { FunctionComponent,  useRef } from "react";
import {SafeAreaView,ScrollView,StyleSheet,View,Animated,useWindowDimensions,Image, Text, ImageBackground} from "react-native";
import { useRoute } from "@react-navigation/native";
import suzuran from "./assets/pictures/suzuran.png"

import RegularButton from "./components/Buttons/RegularButton";

const styles = StyleSheet.create({
container: {
    height: "100%",
    width: "100%",
    flex: 1,
    opacity: 1,
},
imageDarken: {
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, .7)', 
},
});

interface detailsProps {
    route: any;
    navigation?: any;
}

const Details: FunctionComponent<detailsProps> = (props) => {
    
    let data = props.route.params;


    return (
        <ImageBackground source={suzuran} style={[styles.container]}>
            <View style={styles.imageDarken}>
                <View style={{ position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: "center" }}>

                    <RegularButton onPress={()=> props.navigation?.goBack()}> Back </RegularButton>

                    <Text style={{color:"#FFFFFF", fontSize:30}}> Name: {data.name} </Text>
                    <Text style={{color:"#FFFFFF", fontSize:12}}> {data.description} </Text>
                    <Text style={{color:"#FFFFFF", fontSize:12}}> Company: {data.company} </Text>
                    <Text style={{color:"#FFFFFF", fontSize:12}}> Country: {data.country} </Text>


                    <Text style={{color:"#FFFFFF", fontSize:12}}> Active: {String(data.active)} </Text> 


                    <Text style={{color:"#FFFFFF", fontSize:12}}> Success Rate: {data.success_rate_pct}% </Text>
                    <Text style={{color:"#FFFFFF", fontSize:12}}> Cost per Launch: ${data.cost_per_launch} </Text>
                    <Text style={{color:"#FFFFFF", fontSize:12}}> First Flight: {data.first_flight} </Text>


                    <Text style={{color:"#FFFFFF", fontSize:12}}> Type: {data.type} </Text>
                    <Text style={{color:"#FFFFFF", fontSize:12}}> Mass: {data.mass.kg} kg </Text>
                    <Text style={{color:"#FFFFFF", fontSize:12}}> Height: {data.height.meters} m </Text> 
                    <Text style={{color:"#FFFFFF", fontSize:12}}> Diameter: {data.diameter.meters} m </Text> 
                    <Text style={{color:"#FFFFFF", fontSize:12}}> Engine Type: {data.engines.type} </Text> 
                    <Text style={{color:"#FFFFFF", fontSize:12}}> Boosters: {data.boosters} </Text> 

                    <Text style={{color:"#FFFFFF", fontSize:12}}> Number Landing Legs: {data.landing_legs.number} </Text> 

                    <Text style={{color:"#FFFFFF", fontSize:12}}> Landing Legs Material: {data.landing_legs.material} </Text> 

                    <Text style={{color:"#FFFFFF", fontSize:12}}> Wikipedia: {data.wikipedia} </Text> 



                </View>
            </View>
        </ImageBackground>
    );
}

export default Details;