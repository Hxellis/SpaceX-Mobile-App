import React, { FunctionComponent,  useRef } from "react";
import {SafeAreaView,StyleSheet,ScrollView,View,Animated,useWindowDimensions,FlatList, Text, ImageBackground, GestureResponderEvent, Linking, Dimensions} from "react-native";
import { useRoute } from "@react-navigation/native";
import {DataTable} from 'react-native-paper';

import suzuran from "./assets/pictures/suzuran.png"


import RegularButton from "./components/Buttons/RegularButton";

const styles = StyleSheet.create({
backgroundImage: {
    height: "100%",
    width: "100%",
},
backgroundImageDarken: {
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, .7)', 
},

titleContainer: {
    padding: 30,
},
sectionContainer: {
    width: "90%",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, .7)', 
},
table: {
    width: "90%",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding:0,
    backgroundColor: 'rgba(0, 0, 0, .7)', 
},
tableRow:{
    borderBottomWidth: 0,
},

title: {
    color:"#FFFFFF", 
    fontSize:50,
    fontFamily: "PTSans-Bold",
},
subtitle: {
    color:"#FFFFFF", 
    fontSize:25,
    fontFamily: "PTSans-Regular",
    textAlign:'center',
    marginBottom: 20
},
contentText: {
    color:"#FFFFFF", 
    fontSize:13,
    fontFamily: "PTSans-Regular",
    textAlign:'justify',
},
wikiLink: {
    color:"#FFFFFF", 
    fontSize:20,
    fontFamily: "PTSans-BoldItalic",
    textAlign:'center',
    textDecorationLine: 'underline'
},

});

const capitalize = (str: String) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

const info =[
    "Active: ", "Success Rate: ", "Cost per Launch: ", "First Flight: "
];

interface detailsProps {
    route: any;
    navigation?: any;
    onPress: ((event: GestureResponderEvent) => void) | undefined;

}

const Details: FunctionComponent<detailsProps> = (props) => {
    
    let data = props.route.params;
    const { height: windowHeight } = useWindowDimensions();

    return (

        <ImageBackground source={suzuran} style={[styles.backgroundImage]}>
            

            <View style={styles.backgroundImageDarken}>
                <View style={{flex:1, position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: "center" }}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> {data.name} </Text>
                    </View>
                    <ScrollView style={{height:windowHeight*65/100, marginVertical:20, left: 10}} showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1, justifyContent: 'center'}}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.contentText}>{"\n"}{data.description}</Text>
                        </View>
                        
                        <DataTable style={styles.table}>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Company </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.company}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Country: </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.country}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Active: </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{capitalize(String(data.active))}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Success Rate: </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.success_rate_pct}%</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Cost per Launch:</DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>${data.cost_per_launch}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>First Flight: </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.first_flight}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                        <DataTable style={styles.table}>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Type </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{capitalize(data.type)}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Mass </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.mass.kg} kg</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Height </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.height.meters} m</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Diameters </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.diameter.meters} m</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Engine Type </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{capitalize(data.engines.type)}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Number of Boosters </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.boosters}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Number of Landing Legs </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.landing_legs.number}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Landing Legs Material </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data.landing_legs.material? capitalize(data.landing_legs.material) : "N/A" } </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                        <View style={styles.sectionContainer}> 
                            <Text style={styles.wikiLink} onPress={() => Linking.openURL(data.wikipedia)}>Wikipedia Page</Text> 
                        </View>
        
                    </ScrollView>
                    <RegularButton onPress={()=> props.navigation?.goBack()}> Back </RegularButton>
                </View>
            </View>
        </ImageBackground>

    );
}

export default Details;