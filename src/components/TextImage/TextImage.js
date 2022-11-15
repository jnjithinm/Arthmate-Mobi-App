import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import { TextImageStyles } from "./TextImageStyles";
import { PLACEHOLDER_IMAGE } from "../../constants/imgConsts";

export const TextImage = ({ label, customTextStyle, }) => {
    return (
        <View style={TextImageStyles.containerStyle}>
            <Image source={PLACEHOLDER_IMAGE} style={TextImageStyles.imageStyle} />
            <Text style={[TextImageStyles.headerStyle, customTextStyle]}>{label}</Text>
        </View>
    );
}