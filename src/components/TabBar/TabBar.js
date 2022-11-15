import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { TabBarStyles } from "./TabBarStyles";

export const TabBar = ({ isSelected, title, onPress }) => {
    const { titleStyle, mainContainer, selectedMainConatiner, tabBarContainer } = TabBarStyles;
    return (
        <View style={tabBarContainer}>
            <TouchableOpacity
                onPress={() => {
                    onPress();
                }}
                style={isSelected ? selectedMainConatiner : mainContainer}>
                <Text style={titleStyle}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}