import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { RadioButtonStyles } from "./RadioButtonStyles";

export const RadioButton = ({ isSelected, title, onPress }) => {
    return (
        <View style={{}}>
            <TouchableOpacity style={RadioButtonStyles.contentContainer}
                onPress={() => {
                    onPress();
                }}>
                <View style={RadioButtonStyles.mainContainer}>
                    {isSelected && <View style={RadioButtonStyles.selectedButtonStyle} />}
                </View>
                <Text style={RadioButtonStyles.titleStyle}>{title}</Text>
            </TouchableOpacity>

        </View>
    );
}