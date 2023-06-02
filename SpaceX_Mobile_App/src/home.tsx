import React, {FunctionComponent, useRef} from "react";
import { Animated, StatusBar, StyleSheet, Text, View, useWindowDimensions, Image } from "react-native";
import styled from "styled-components/native"
import { ScrollView } from "react-native-gesture-handler";

import RegularButton from "./components/Buttons/RegularButton";
import { SectionGrid } from 'react-native-super-grid';

//image source
import background from "./assets/pictures/spaceXheader.jpg";
import blahaj from "./assets/pictures/blahaj.jpg"
import { colors } from "./components/colors";

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: "30%",
    },
    image: {
        flex: 1,
        width: undefined
    },

    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      height: 150,
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
    }
});

interface WelcomeProps {
    navigation: any;
}

const Home: FunctionComponent<WelcomeProps> = (props) => {
    const items = [
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
      ];
    
    const scrollX = useRef(new Animated.Value(0)).current;

    let { width: windowWidth, height:windowHeight } = useWindowDimensions();
    windowHeight=windowHeight-300;

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"#000000"}/>
            
            <View style={[styles.imageContainer]}>
                <Image style={styles.image}source={background}/>
            </View>


                <View style={[styles.scrollContainer]}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{useNativeDriver: false})}
                        scrollEventThrottle={16}
                    >
                        {items.map((image, imageIndex) => {
                            return (
                                <SectionGrid
                                    itemDimension={125}
                                    spacing={10}
                                    sections={[
                                        {
                                        title: 'Title1',
                                        data: items.slice(0, 4),
                                        },
                                    ]}
                                    style={styles.gridView}
                                    renderItem={({ item, section, index }) => (
                                        <View style={[styles.itemContainer]}>
                                            <Image style={styles.image}source={blahaj}/>
                                            <View style={{position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                <Text style={styles.itemName}>{item.name}</Text>
                                                <Text style={styles.itemCode}>{item.code}</Text>
                                            </View>
                                        </View>
                                    )}
                                />   
                            );
                        })}
                        
                    </ScrollView>
                </View>
                <View style={styles.indicatorContainer}>{
                    items.map((image, imageIndex)=>{
                        const width = scrollX.interpolate({
                            inputRange:[
                                windowWidth*(imageIndex-1),
                                windowWidth*(imageIndex),
                                windowWidth*(imageIndex+1),
                            ],
                            outputRange:[8, 16, 8],
                            extrapolate:"clamp",
                    })

                    return(
                        <Animated.View style={[styles.normalDots, {width}, {backgroundColor:image.code}]}/>

                    
                    );
                        })
                }</View>

                <RegularButton onPress={() => props.navigation.navigate("Details")}>
                    Next Page
                </RegularButton>
        
        </>
    );
};



export default Home;