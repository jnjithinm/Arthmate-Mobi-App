import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import * as colors from '../../constants/colors'

import { WaveBackgroundStyles } from "./WaveBackgroundStyles";
import { WAVES } from '../../constants/imgConsts';

export const WaveBackground = ({ children }) => {
    return (
        // <ImageBackground source={WAVES} style={[WaveBackgroundStyles.mainContainer]}>
        <View style={{ backgroundColor: colors.COLOR_WHITE, flex: 1 }}>
            {children}
        </View>

        // </ImageBackground>
    );
}