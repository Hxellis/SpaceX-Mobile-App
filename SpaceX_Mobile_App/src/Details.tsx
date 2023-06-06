import React, { FunctionComponent } from "react";
import {ScrollView,View,useWindowDimensions,Text, GestureResponderEvent, Linking, TouchableOpacity} from "react-native";
import {DataTable} from 'react-native-paper';
import { detailStyles } from "./styles";
import placeholder_rocket from"./assets/pictures/placeholder_rocket.jpg"
import FastImage from "react-native-fast-image";

{/* function to capitalize every first word */}
function capitalize(str: String)  {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

interface detailsProps {
    route: any;
    navigation?: any;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const Details: FunctionComponent<detailsProps> = (props) => {
    {/* initialize data passed from previous screen */}
    let data = props.route.params;

    {/* screen dimensions */}
    const { height: windowHeight } = useWindowDimensions();

    return (

        //background image and container
        <FastImage source={data[19]==="undefined"? placeholder_rocket:{uri:String(data[19])}} style={[detailStyles.backgroundImage]}>
            <View style={detailStyles.backgroundImageDarken}>
                <View style={{flex:1, position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: "center" }}>

                    {/* rocket name */}
                    <View style={detailStyles.titleContainer}>
                        <Text style={detailStyles.title}> {data[2]} </Text>
                    </View>

                    {/* scroll view uses 65% of screen height*/}
                    <ScrollView style={{height:windowHeight*65/100, marginVertical:20, left: 10}} showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1, justifyContent: 'center'}}>
                        
                        {/* description */}
                        <View style={[detailStyles.sectionContainer, {paddingHorizontal: 15}]}>
                            <Text style={detailStyles.subtitle}> Description </Text>
                            <Text style={detailStyles.contentText}>{data[3]}</Text>
                        </View>
                        
                        {/* information - company, country, active, successrate, costperlaunch, firstflight */}
                        <DataTable style={detailStyles.table}>
                            <Text style={detailStyles.subtitle}>Information</Text>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Company </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText} style={{flex:1.5}}>{data[4]}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Country: </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText} style={{flex:1.5}}>{data[5]}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Active Status: </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText} style={{flex:1.5}}>{data[6]? "Active": "Inactive"}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Success Rate: </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText} style={{flex:1.5}}>{data[7]}%</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Cost per Launch:</DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText} style={{flex:1.5}}>${data[8]}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>First Flight: </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText} style={{flex:1.5}}>{data[9]}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                        {/* Details - type, mass, height, diameters, enginetype, boosters, landinglegs, landinglegsmaterial, payloadname, payloadweight */}
                        <DataTable style={detailStyles.table}>
                            <Text style={detailStyles.subtitle}>Details</Text>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Type </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{capitalize(data[10])}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Mass </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{data[11].kg} kg</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Height </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{data[12].meters} m</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Diameters </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{data[13].meters} m</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Engine Type </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{capitalize(data[14].type)}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Boosters </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{data[15]}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Landing Legs </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{data[16].number}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Landing Legs Material </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{data[16].material? capitalize(data[16].material) : "N/A" } </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Payload </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{data[17][0].name}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row style={detailStyles.tableRow}>
                                <DataTable.Cell textStyle={detailStyles.contentText}>Payload Weight </DataTable.Cell>
                                <DataTable.Cell textStyle={detailStyles.contentText}>{data[17][0].kg} kg</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                        {/* wiki link */}
                        <View style={detailStyles.sectionContainer}> 
                            <Text style={detailStyles.wikiLink} onPress={() => Linking.openURL(data[18])}>Wikipedia Page</Text> 
                        </View>
    
                    </ScrollView>

                    {/* return button */}
                    <TouchableOpacity style={detailStyles.button} onPress={()=> props.navigation?.goBack()}>
                        <Text style={detailStyles.buttonText}>Return</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </FastImage>

    );
}

export default Details;