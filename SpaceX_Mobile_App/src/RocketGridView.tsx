import React, {FunctionComponent, useRef} from "react";
import { Animated, StatusBar, StyleSheet, Text, View, useWindowDimensions, Image, FlatList, Pressable, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SectionGrid } from "react-native-super-grid";
import blahaj from "./assets/pictures/blahaj.jpg"

import { gql, useQuery } from "@apollo/client";


const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding:20,
        width: 300,
        height: 400,
        flex: 1
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },


    scrollContainer: {
        shadowColor:"#6A6C6E",
        shadowOffset:{
            width:10,
            height:-10,
        },
        shadowOpacity:1,
    },
    card: {
        flex: 1,
        marginVertical: 10,
        width:200,
        overflow: "hidden",
        alignSelf:"center",
    },
    indicatorContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:20
    },
    normalDots:{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },

    rocketImage:{
        
    }
    });

const GET_ROCKETS = gql`
    query Rockets {
        rockets {
            name
            country
        }
    }
`;

const RocketGridView = () => {

    const scrollX = useRef(new Animated.Value(0)).current;
    let { width: windowWidth, height:windowHeight } = useWindowDimensions();
    const { data, loading, error } = useQuery(GET_ROCKETS);

    const onPress = () => console.log("press");

    if (loading) {
        console.log("loading");
        return (
            <Text>Fetching data...</Text>
        ) //while loading return this
    }

    if (data) {                
        console.log(data)

        return(
            <>              
            <View style={[styles.scrollContainer]}>
            <ScrollView
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            >

                {data.rockets.map(( rocketData: { name: any; country: any; } ) => {
                    return (
                        <View style={{width: windowWidth, paddingHorizontal: windowWidth*25/100}}>
                            <TouchableOpacity style={{width: "100%", height: windowWidth}} onPress={onPress}>
                                <ImageBackground source={blahaj} style={styles.card}>
                                    <View style={{ position: 'absolute', right: 0,bottom: 0, justifyContent: 'center', alignItems: "flex-end" }}>
                                                <Text style={styles.itemName}>{rocketData.name}</Text>
                                                <Text style={styles.itemCode}>{rocketData.country}</Text>
                                    </View>
                                </ImageBackground>
                                
                            </TouchableOpacity>  
                        </View>
                    );
                })}

            </ScrollView>
            </View>
            <View style={styles.indicatorContainer}>
                {data.rockets.map((item: string, itemIndex: number) => {
                    const width = scrollX.interpolate({
                    inputRange: [
                        windowWidth * (itemIndex - 1),
                        windowWidth * (itemIndex),
                        windowWidth * (itemIndex + 1),
                    ],
                    outputRange: [8, 30, 8],
                    extrapolate: "clamp",
                    });
                    return (
                    <Animated.View style={[styles.normalDots, { width }, { backgroundColor: "#000000" }]} />
                    );
                })}
            </View>
            </>
        );
    }
};

export default RocketGridView;

