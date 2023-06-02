import React, {FunctionComponent, useId} from "react";
import styled from "styled-components/native";

import { CardSelectionProps } from "./Types";
import CardItem from "./CardItem";

const CardList = styled.FlatList`
    width: 100%
    height: 100%;
    padding-left: 25px;
    padding-bottom: 15px;
    flex: 1
`;


const CardSelection: FunctionComponent<CardSelectionProps> = (props) => {
    return (
        <CardList 
            data = {props.data}
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            contentContainerStyle={{
                paddingRight: 25,
                alignItems: "center",
            }}
            keyExtractor={({id}: any) => useId.toString()}
            renderItem={({item}: any) => <CardItem {...item}/>}
        />
    );
};

export default CardSelection