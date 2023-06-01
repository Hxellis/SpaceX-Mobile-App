import React, {FunctionComponent} from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native"

import { colors } from "../components/colors";
import { Container } from "../components/shared";

const HomeContainer = styled(Container)`
    background-color: ${colors.greylight};
    width: 100%
    flex: 1
`;


const Home: FunctionComponent = () => {
    return(
        <HomeContainer>
            <StatusBar barStyle={"dark-content"}/>
        </HomeContainer>
    );
};

export default Home;