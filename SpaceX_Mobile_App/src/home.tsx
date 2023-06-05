import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import { StatusBar, StyleSheet, View, Image, Animated, ImageBackground, ScrollView, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import axios from "axios";
import FastImage from "react-native-fast-image";
import { SvgUri } from "react-native-svg";

//image source
import background from "./assets/pictures/SpaceX_Logo.png";
import { useQuery } from "@apollo/client";
import { GET_ROCKETS } from "./query";

interface WelcomeProps {
    navigation: any;
}

async function getOriginalImageURL(input: String): Promise<string | null> {

    {/* due to wikipedia returning a sci-fi image instead of the spaceX one*/}
    if (input === "Starship") {
        input = "SpaceX_" + input
    }
    {/* due to wikipedia returning the logo .svg instead of actual image*/}
    if (input === "Falcon 9") {
        return "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/11/copernicus_sentinel-6_lifts_off_on_a_spacex_falcon_9_rocket/22340698-1-eng-GB/Copernicus_Sentinel-6_lifts_off_on_a_SpaceX_Falcon_9_rocket_pillars.jpg";
    }
    {/* due to wikipedia returning the logo .svg instead of actual image*/}
    if (input === "Falcon Heavy") {
        return "https://www.spacex.com/static/images/content/fh_performance.jpg";
    }
    try {
      const response = await axios.get(
        'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=' + input
      );
      
      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const originalImageURL = pages[pageId].original?.source;
      //console.log(originalImageURL.split("/"));
      return originalImageURL;
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
                
                //console.log(originalImageURL);
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
            <ImageBackground style={{flex: 1 }} source={require('./assets/pictures/loading.gif')}>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 150, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </ImageBackground>
        </>
        );
    }

    if (data) {
        return (
        <>
            <View style={styles.textAreaContainer}>

                {data.rockets.map((rocketData: {name: string; country: string;}, itemIndex: number)=>{

                    const inputRange=[
                        windowWidth*(itemIndex-1),
                        windowWidth*(itemIndex),
                        windowWidth*(itemIndex+1),
                    ];
                    return(
                        <>
                        <Animated.Text style={[styles.rocketName, {
                            transform: [{translateX: scrollX.interpolate({ inputRange, outputRange: [500, 0, -500]})}]
                        }, {
                            opacity: scrollX.interpolate({inputRange,outputRange: [0, 1, 0]})
                        }]}>
                            {rocketData.name}
                        </Animated.Text>
                        <Animated.Text style={[styles.rocketCountry, {
                            transform: [{ translateX: scrollX.interpolate({ inputRange, outputRange: [500, 0, -500] }) }]
                        }, {
                            opacity: scrollX.interpolate({
                                inputRange,
                                outputRange: [0, 1, 0]
                            })
                        }]}>
                            {"\n"}{rocketData.country}
                        </Animated.Text>
                        </>
                    );
                })}

            </View>
            <ScrollView
                style={[styles.scrollContainer]}
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
                    return (
                        <View style={{ width: windowWidth, paddingHorizontal: windowWidth * 25 / 100 }}>
                        <TouchableOpacity style={{ width: "100%", height: windowHeight * 60 / 100 }} onPress={() => props.navigation.navigate("Details", rocketDataArray)}>
                            <FastImage source={{ uri: String(originalImageURL) }} style={styles.rocketImage} />
                        </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.dotsContainer}>
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
                    <Animated.View style={[styles.dots, { width }, { backgroundColor: "#FFFFFF" }]} />
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
            <ImageBackground style={{ flex:1 }} source={require('./assets/pictures/stars.gif')}>
            <View style={[styles.headerImageContainer]}>
                <Image style={styles.headerImage} source={background} />
            </View>
            {/* @ts-expect-error Server Component */}
                <RocketView navigation={props.navigation} />
            </ImageBackground>
        </>
    );
};

export default Home;


const styles = StyleSheet.create({
    loadingText: {
        fontSize: 30,
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    headerImageContainer: {
        flex: 1,
        //backgroundColor: "#121121",
        padding: 30,
    },
    headerImage: {
        flex: 1,
        width: "100%",
    },

    textAreaContainer:{
        //backgroundColor: "#121121",
        paddingTop: 20,        
        width:"100%",
        flex: 1,
    },
    rocketName:{
        position:"absolute",
        fontSize: 25,
        color: "#FFFFFF",
        fontFamily: "PTSans-Bold",
        textAlign:"center",
        width:"100%",
    },
    rocketCountry:{
        position:"absolute",
        fontSize: 18,
        color: "#FFFFFF",
        fontFamily: "PTSans-Regular",
        textAlign:"center",
        width:"100%",
        paddingTop: 10
    },

    
    scrollContainer: {
        //backgroundColor: "#121121",
    },
    rocketImage: {
        flex: 1,
        width: "100%",
    },

    dotsContainer:{
        //backgroundColor: "#121121",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom: 30
    },
    dots:{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
});