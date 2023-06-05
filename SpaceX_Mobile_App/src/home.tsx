import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import { StatusBar, StyleSheet, View, Image, Animated, ImageBackground, ScrollView, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import axios from "axios";
import { SvgUri } from "react-native-svg";

//image source
import background from "./assets/pictures/spaceXheader.jpg";
import { gql, useQuery } from "@apollo/client";
import { createClient } from "pexels";
import FastImage from "react-native-fast-image";

const GET_ROCKETS = gql`
    query Rockets {
        rockets {
            id
            name
            description
            company
            country
        
            active
            success_rate_pct
            cost_per_launch
            first_flight
        
            type
            mass {
              kg
            }
            height {
              meters
            }
            diameter {
              meters
            }
            engines {
              type
            }
            boosters
            landing_legs {
              number
              material
            }
            wikipedia
          }
    }
`;



interface WelcomeProps {
    navigation: any;
}


async function getOriginalImageURL(input: String): Promise<string | null> {
    if (input === "Starship") {
        input = "SpaceX_" + input
    }
    try {
      const response = await axios.get(
        'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=' + input
      );
      
      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const originalImageURL = pages[pageId].original?.source;
      console.log(originalImageURL.split("/"));
      return originalImageURL || null;
    } 
    catch (error) {
      console.error('Error fetching original image URL:', error);
      return null;
    }
}



const RocketView = (props: WelcomeProps) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    const [originalImageURLs, setOriginalImageURLs] = useState<(string | null)[]>([]);

    const { data, loading, error } = useQuery(GET_ROCKETS);

    const fetchOriginalImageURLs = async () => {
        const imageURLs = await Promise.all(
            data.rockets.map(async (rocketData: { name: string }) => {
                const originalImageURL = await getOriginalImageURL(rocketData.name);
                
                console.log(originalImageURL);
                return originalImageURL;
            })
        );
        setOriginalImageURLs(imageURLs);
    };

    useEffect(() => {(async () => {
        await fetchOriginalImageURLs();
        })();
    }, []);

    if (loading) {
        console.log("loading");
        return (
        <>
            <ImageBackground style={{ height: "100%" }} source={require('./assets/pictures/loading.gif')}>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 150, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.itemName}>Loading</Text>
                </View>
            </ImageBackground>
        </>
        );
    }

    if (data) {
        return (
        <>
            <View style={[styles.imageContainer]}>
            <Image style={styles.image} source={background} />
            </View>

            <View style={[styles.scrollContainer]}>
            <ScrollView
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                {data.rockets.map((rocketData: { id: String, name: string; country: string }, index: number) => {
                const originalImageURL = originalImageURLs[index];
                const rocketDataArray = Object.values(rocketData);
                rocketDataArray.push(String(originalImageURL));
                console.log(rocketDataArray);
                return (
                    <View style={{ width: windowWidth, paddingHorizontal: windowWidth * 25 / 100, paddingTop: 10 }}>
                    <TouchableOpacity style={{ width: "100%", height: windowHeight * 60 / 100 }} onPress={() => props.navigation.navigate("Details", rocketDataArray)}>
                        <FastImage source={{ uri: originalImageURL }} style={styles.card}>
                            <View style={{ position: 'absolute', right: 0, bottom: 0, justifyContent: 'center', alignItems: "flex-end" }}>
                                <Text style={styles.itemName}>{rocketData.name}</Text>
                                <Text style={styles.itemCode}>{rocketData.country}</Text>
                            </View>
                        </FastImage>
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

const Home: FunctionComponent<WelcomeProps> = (props) => {

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"#000000"}/>
            
            {/* @ts-expect-error Server Component */}
            <RocketView navigation={props.navigation} />
        
        </>
    );
};

export default Home;


const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: "30%",
    },
    image: {
        flex: 1,
        width: undefined
    },
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
        marginVertical: 30,
        width:200,
        overflow: "hidden",
        alignSelf:"center",
    },
    indicatorContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        paddingTop: 5
    },
    normalDots:{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
});