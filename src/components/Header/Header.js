import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import { HeaderStyles } from "./HeaderStyles";
import { DRAWER_ICON, PROFILE_ICON } from "../../constants/imgConsts";

export const Header = ({ label, showLeftIcon = true, showLeftText, showRightText, customTextStyle, onPress, onPressBack }) => {
    return (
        <View style={HeaderStyles.containerStyle}>
            <View style={{ width: showLeftText? '15%' : '10%',  }}>
                {showLeftIcon ?
                    <Image source={DRAWER_ICON} style={[HeaderStyles.imageStyle, {}]} />
                    :
                    showLeftText ?
                        <TouchableOpacity onPress={() => { onPressBack() }} >
                        <Text style={{ fontSize: 18, color: '#3E59E8', marginVertical: 10 }}>Back</Text> 
                        </TouchableOpacity>
                        :
                        <View />
                }
            </View>
            { 
            // showLeftText ? null :
                <View style={{ width: '80%', }}>
                    <Text numberOfLines={2} style={[HeaderStyles.headerStyle, customTextStyle]}>{label}</Text>
                    {/* <Text>mj</Text> */}
                </View>
            }

            <View style={{ width: showLeftText? '20%' :  '10%', backgroundColor: 'transparent' }}>
                <TouchableOpacity onPress={() => { onPress() }}>
                    {
                    showLeftText ?
                        // <Text style={{ fontSize: 18, color: '#3E59E8', marginVertical: 10 , alignSelf: 'flex-end'}} >Next</Text>
                        null :
                        <Image source={PROFILE_ICON} style={HeaderStyles.imageStyle} />}
                </TouchableOpacity>
            </View>

        </View>
    );
}