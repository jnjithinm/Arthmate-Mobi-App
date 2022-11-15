import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import { DottedProgressBarStyles } from "./DottedProgressBarStyles";
import * as colors from "../../constants/colors";


const getStepColors = (step, currentIndex) => {
    let style = { backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE };
    if (step < currentIndex) {
        style = { backgroundColor: colors.COLOR_GREEN };
    }
    if (step === currentIndex) {
        style = { backgroundColor: colors.COLOR_BLUE };
    }
    if (step > currentIndex) {
        style = { backgroundColor: colors.COLOR_METEOR_GREY };
    }
    return style;
}

const getSteps = (totalSteps, value, currentIndex) => {
    const { stepNumberStyle, greenLine, greenCircle, mainContainer1 } = DottedProgressBarStyles;

    return (
        <View style={mainContainer1} key={value}>
            <View style={[greenCircle, getStepColors(value, currentIndex)]}>
                <Text style={stepNumberStyle}>{value}</Text>
            </View>
            {value != totalSteps.length && <View style={[greenLine, {width: totalSteps.length < 3 ? 80: 30}, getStepColors(value, currentIndex)]} />}
        </View>
    );
}

export const DottedProgressBar = ({ totalSteps, currentIndex }) => {
    const { mainContainer } = DottedProgressBarStyles;

    return (
        // <View style={{ flex: 1 }}>
            <View style={mainContainer}>
                {totalSteps.map((value, index) => (
                    getSteps(totalSteps, value, currentIndex)
                ))}
            </View>
        // </View>
    );
};