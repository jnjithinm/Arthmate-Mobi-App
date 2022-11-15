import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ButtonStyles } from "./ButtonStyles";

export const Button = ({ title, onPress, customContainerStyle, cutomTitleStyle, isDisabled }) => {
    return (
        <TouchableOpacity style={isDisabled ? [ButtonStyles.disableStyle, customContainerStyle] : [ButtonStyles.mainContainer, customContainerStyle]} onPress={() => {
            if (!isDisabled) {
                onPress();
            }
        }}>
            <Text style={isDisabled ? [ButtonStyles.disableTextStyle, cutomTitleStyle] : [ButtonStyles.titleStyle, cutomTitleStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}