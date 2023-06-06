import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import { StatusBar, View,  Animated, ScrollView, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import FastImage from "react-native-fast-image";
import { useQuery } from "@apollo/client";

//imports from other files
import { GET_ROCKETS } from "./spaceX_query";
import { homeStyles } from "./styles";
import { getOriginalImageURL } from "./wikipedia_api";

//header image
import headerImage from "./assets/pictures/SpaceX_Logo.png";

interface HomeProps {
    navigation: any;
}

//hold the carousel element for rocket text, picture, and pagination indicator
const RocketView = (props: HomeProps) => {

    //styling variables
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    
    //loads data from GraphQL
    const { data, loading, error } = useQuery(GET_ROCKETS);

    //loads data from wikipedia
    const [imageURL, setImageURL] = useState<(string | null)[]>([]);
    const [errorState, setErrorState] = useState(false);
    useEffect(() => {
        const fetchOriginalImageURLs = async () => {
            const url = await Promise.all(
                data.rockets.map(async (rocketData: { name: string }) => {
                    const originalImageURL = await getOriginalImageURL(rocketData.name);
                    return originalImageURL;
                })
            ).then(function(url) {
                //update hook with url array with the image links
                setImageURL(url);
            })
            .catch(function (error){
                console.log(error);
                setErrorState(true);
            });
            
        };
        //fetches wikipedia pictures once GraphQL data is available
        if (data) {
            fetchOriginalImageURLs();
        }
        //to re-run if data changes
    }, [data]);

    return (
        <>
        {/* render loading screen for GraphQL data loading status */}
        {loading && (
            <FastImage style={{ flex: 1 }} source={require('./assets/pictures/loading.gif')}>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 150, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={homeStyles.loadingText}>Loading...</Text>
                </View>
            </FastImage>
        )}
        {/* render error screen if GraphQL data somehow dies or fail to get pictures from wikipedia */}
        {error || errorState && (
            <View style={{ backgroundColor: "#FFFFFF", height: "100%", justifyContent: 'center' }}>
                <View style={[homeStyles.errorContainer]}>
                    <FastImage style={{ flex: 1 }} resizeMode="contain" source={require("./assets/pictures/load_failed.png")}/>
                    <Text style={homeStyles.errorText}>Encountered an error :(</Text>
                </View>
            </View>
        )}
        {/* render home screen if GraphQl data and wikipedia pictures are loaded */}
        {data && (
        <>
            {/* spaceX logo */}
            <View style={[homeStyles.headerImageContainer]}>
                <FastImage style={homeStyles.headerImage} source={headerImage} />
            </View>

            {/* rocket name and country*/}
            <View style={homeStyles.textAreaContainer}>
                {data.rockets.map((rocketData: {name: string; country: string;}, itemIndex: number)=>{
                    const inputRange=[
                        windowWidth*(itemIndex-1),
                        windowWidth*(itemIndex),
                        windowWidth*(itemIndex+1),
                    ];
                    return(
                        <>
                        <Animated.Text style={[homeStyles.rocketName, {
                            transform: [{translateX: scrollX.interpolate({ inputRange, outputRange: [500, 0, -500]})}]
                        }, {
                            opacity: scrollX.interpolate({inputRange,outputRange: [0, 1, 0]})
                        }]}>
                            {rocketData.name}
                        </Animated.Text>
                        <Animated.Text style={[homeStyles.rocketCountry, {
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

            {/* rocket pictures */}
            <ScrollView
                style={[homeStyles.scrollContainer]}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                {data.rockets.map((rocketData: { id: String, name: string; country: string }, index: number) => {
                    
                    const rocketDataArray = Object.values(rocketData);
                    rocketDataArray.push(String(imageURL[index]));

                    return (
                        <View style={{ width: windowWidth, paddingHorizontal: windowWidth * 25 / 100 }}>
                        <TouchableOpacity style={{ width: "100%", height: windowHeight * 60 / 100 }} onPress={() => props.navigation.navigate("Details", rocketDataArray)}>
                            <FastImage source={{ uri: String(imageURL[index])}} style={homeStyles.rocketImage} />
                        </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>

            {/* pagination */}
            <View style={homeStyles.dotsContainer}>
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
                    <Animated.View style={[homeStyles.dots, { width }, { backgroundColor: "#FFFFFF" }]} />
                    );
                })}
            </View>
            </>
        )}
        </>
    );
};

//functional component to export to navigation
const Home: FunctionComponent<HomeProps> = (props) => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"#000000"}/>
            <FastImage style={{ flex:1 }} source={require('./assets/pictures/stars.gif')}>
                <RocketView navigation={props.navigation} />
            </FastImage>
        </>
    );
};

export default Home;