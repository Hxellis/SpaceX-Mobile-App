import React, {FunctionComponent} from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native"
import { ScrollView } from "react-native-gesture-handler";

import { Container } from "./components/shared";
import BigText from "./components/Texts/BigText";
import SmallText from "./components/Texts/SmallText";
import RegularButton from "./components/Buttons/RegularButton";
import { FlatGrid } from 'react-native-super-grid';

//image source
import background from "./assets/pictures/spaceXheader.jpg";
import blahaj from "./assets/pictures/blahaj.jpg"

const HomeContainer = styled(Container)`
    background-color: $(colors.secondary);
    justify-content: space-between;
    width: 100%
    height: 100%
`;

const ImageContainer = styled.View`
    width: 100%
    max-height: 30%
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

const SearchFilterContainer = styled.View`
    width: 100%;
    padding: 25px;
`;

const BottomSection = styled.View`
    width: 100%
    padding: 15px;
    flex: 1;
    justify-content: flex-start;
`;

const styles = StyleSheet.create({
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
});

interface WelcomeProps {
    navigation: any;
}

const Home: FunctionComponent<WelcomeProps> = (props) => {
    const [items, setItems] = React.useState([
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
      ]);
    
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"#000000"}/>
            <HomeContainer>
                <ImageContainer>
                    <Image source={background}/>
                </ImageContainer>

                <BottomSection>
                    <FlatGrid
                        itemDimension={140}
                        data={items}
                        style={styles.gridView}
                        spacing={20}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Image style={{flex:1}} source={blahaj}/>
                                <View style={{position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemCode}>{item.code}</Text>
                                </View>
                                
                            </View>
                        )}
                    />

                    <RegularButton onPress={() => props.navigation.navigate("Details")}>
                        Next Page
                    </RegularButton>
                </BottomSection>
            </HomeContainer>
        </>
    );
};



export default Home;