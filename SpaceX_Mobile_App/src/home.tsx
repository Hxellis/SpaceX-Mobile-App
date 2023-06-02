import React, {FunctionComponent} from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native"

import { colors } from "./components/colors";
import { Container } from "./components/shared";
import BigText from "./components/Texts/BigText";

const HomeContainer = styled(Container)`
    background-color: ${colors.greylight};
    width: 100%
    flex: 1
`;


const Home: FunctionComponent = () => {
    return(
        <HomeContainer>
            <StatusBar barStyle={"dark-content"}/>
            <HomeContainer>
                <BigText>
                    Home screen
                </BigText>
            </HomeContainer>
        </HomeContainer>
    );
};

export default Home;