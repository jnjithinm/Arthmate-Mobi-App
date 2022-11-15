import React from "react";
import { View, Image, Text } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { SpinnerStyles } from "./SpinnerStyles";
import { LOGO } from "../../constants/imgConsts";

export const SpinnerOverlay = (props) => {

    const { textLoaderStyle, imageStyle, containerStyle } = SpinnerStyles;

    return (
        <View style={containerStyle}>
            <Spinner
                visible={props.isVisible}
                textContent={'Loading...'}
                textStyle={textLoaderStyle}
                customIndicator={<Image source={LOGO} resizeMode="contain" style={imageStyle} />}
            />
        </View>
    );
}