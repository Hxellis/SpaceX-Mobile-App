import React, {FunctionComponent, useId} from "react";
import styled from "styled-components/native";

import { ScreenWidth } from "../shared";
import { colors } from "../colors";
import { CardProps } from "./Types";
import card_bg from "./../../assets/pictures/blahaj.jpg"

const CardBackground = styled.ImageBackground`
    height: 40%;
    width: ${ScreenWidth * 0.67}px;
    resize-mode: cover;
    background-color: ${colors.accent};
    border-radius: 25px;
    overflow: hidden;
`;

const CardTouchable = styled.TouchableHighlight`
    height: 100px
    border-radius: 25px;
`;

const TouchableView = styled.View`
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    flex: 1;
`;

const CardRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Logo = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: contain;
    flex: 1;
`;

const CardItem: FunctionComponent = () => {
    return (
        <CardBackground source={card_bg}>
            <CardTouchable underlayColor={colors.secondary}>
                <TouchableView>
                    <CardRow></CardRow>
                    <CardRow></CardRow>
                </TouchableView>
            </CardTouchable>

        </CardBackground>
    );
};

export default CardItem;