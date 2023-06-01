import React, {FunctionComponent} from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native"

import { Container } from "../components/shared";
import { colors } from "../components/colors";
import BigText from "../components/Texts/BigText";
import SmallText from "../components/Texts/SmallText";

import background from "./../assets/pictures/JPEG_20200225_210452.jpg";
import RegularButton from "../components/Buttons/RegularButton";

const WelcomeContainer = styled(Container)`
    background-color: $(colors.secondary);
    justify-content: space-between;
    width: 100%
    height: 100%
`;

const TopSection = styled.View`
    width: 100%
    flex: 1;
    max-height: 55%
`;

const TopImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const BottomSection = styled.View`
    width: 100%
    padding: 25px;
    flex: 1;
    justify-content: flex-start;
`;


const Welcome: FunctionComponent = () => {
    return (
        <>
            <StatusBar barStyle="light-content"/>
            <WelcomeContainer> 
                <TopSection>
                    <TopImage source={background}/>
                </TopSection>
                <BottomSection>
                    <BigText>
                        The Big Text
                    </BigText>
                    <SmallText>
                        The small Text
                    </SmallText>
                    <RegularButton onPress={() => {}}>
                        Get Started
                    </RegularButton>
                </BottomSection>
            </WelcomeContainer>
        </>
    );
};

export default Welcome;