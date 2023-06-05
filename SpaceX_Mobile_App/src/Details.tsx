import React, { FunctionComponent } from "react";
import {StyleSheet,ScrollView,View,useWindowDimensions,Text, ImageBackground, GestureResponderEvent, Linking, TouchableOpacity} from "react-native";
import {DataTable} from 'react-native-paper';

interface detailsProps {
    route: any;
    navigation?: any;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const Details: FunctionComponent<detailsProps> = (props) => {
    
    let data = props.route.params;
    const { height: windowHeight } = useWindowDimensions();
    console.log(typeof(data[18]));
    return (

        //background image and container
        <ImageBackground source={{uri: String(data[19])}} style={[styles.backgroundImage]}>
            <View style={styles.backgroundImageDarken}>
                <View style={{flex:1, position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: "center" }}>

                    {/* rocket name */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> {data[2]} </Text>
                    </View>

                    {/* scroll view uses 65% of screen height*/}
                    <ScrollView style={{height:windowHeight*65/100, marginVertical:20, left: 10}} showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1, justifyContent: 'center'}}>
                        
                        {/* description */}
                        <View style={[styles.sectionContainer, {paddingHorizontal: 15}]}>
                            <Text style={styles.subtitle}> Description </Text>
                            <Text style={styles.contentText}>{data[3]}</Text>
                        </View>
                        
                        {/* information - company, country, active, successrate, costperlaunch, firstflight */}
                        <DataTable style={styles.table}>
                            <Text style={styles.subtitle}>Information</Text>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Company </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText} style={{flex:1.5}}>{data[4]}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Country: </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText} style={{flex:1.5}}>{data[5]}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Active Status: </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText} style={{flex:1.5}}>{data[6]? "Active": "Inactive"}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Success Rate: </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText} style={{flex:1.5}}>{data[7]}%</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Cost per Launch:</DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText} style={{flex:1.5}}>${data[8]}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>First Flight: </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText} style={{flex:1.5}}>{data[9]}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                        {/* Details - type, mass, height, diameters, enginetype, boosters, landinglegs, landinglegsmaterial, payloadname,
                        payloadweight */}
                        <DataTable style={styles.table}>
                            <Text style={styles.subtitle}>Details</Text>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Type </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{capitalize(data[10])}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Mass </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data[11].kg} kg</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Height </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data[12].meters} m</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Diameters </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data[13].meters} m</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Engine Type </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{capitalize(data[14].type)}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Boosters </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data[15]}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Landing Legs </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data[16].number}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Landing Legs Material </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data[16].material? capitalize(data[16].material) : "N/A" } </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Payload </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data[17][0].name}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={styles.tableRow}>
                                <DataTable.Cell textStyle={styles.contentText}>Payload Weight </DataTable.Cell>
                                <DataTable.Cell textStyle={styles.contentText}>{data[17][0].kg} kg</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                        {/* wiki link */}
                        <View style={styles.sectionContainer}> 
                            <Text style={styles.wikiLink} onPress={() => Linking.openURL(data[18])}>Wikipedia Page</Text> 
                        </View>
    
                    </ScrollView>

                    {/* return button */}
                    <TouchableOpacity style={styles.button} onPress={()=> props.navigation?.goBack()}>
                        <Text style={styles.buttonText}>Return</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </ImageBackground>

    );
}

export default Details;

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
        backgroundColor: 'rgba(0, 0, 0, .7)', 
    },
    tableRow:{
        borderBottomWidth: 0,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, .7)',
    },
    
    title: {
        color:"#FFFFFF", 
        fontSize:50,
        fontFamily: "PTSans-Bold",
    },
    subtitle: {
        color:"#FFFFFF", 
        fontSize:25,
        margin: 10,
        fontFamily: "PTSans-Bold",
        textAlign:'center',
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
    buttonText: {
        fontSize: 16,
        fontFamily: "PTSans-Bold",
        letterSpacing: 1,
        color: 'white',
    },
    });
    
    const capitalize = (str: String) => {
        return str
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };