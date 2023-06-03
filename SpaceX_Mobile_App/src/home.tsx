import React, {FunctionComponent} from "react";
import { StatusBar, StyleSheet, View, Image } from "react-native";

import RegularButton from "./components/Buttons/RegularButton";
import RocketGridView from "./RocketGridView";

//image source
import background from "./assets/pictures/spaceXheader.jpg";

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: "30%",
    },
    image: {
        flex: 1,
        width: undefined
    },
});

interface WelcomeProps {
    navigation: any;
}

const Home: FunctionComponent<WelcomeProps> = (props) => {

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"#000000"}/>
            
            <View style={[styles.imageContainer]}>
                <Image style={styles.image}source={background}/>
            </View>
            {/* @ts-expect-error Server Component */}
                <RocketGridView />

                <RegularButton onPress={() => props.navigation.navigate("Details")}>
                    Next Page
                </RegularButton>
        
        </>
    );
};


export default Home;