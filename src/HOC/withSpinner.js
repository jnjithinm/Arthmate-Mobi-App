import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    View,
} from "react-native";

import { SpinnerOverlay } from "../components/Spinner/Spinner";
import { isFetchingSelector } from "../container/HOC/selector";
import * as colors from "../constants/colors";

const withSpinner = customStyle => (WrappedComponent) => {

    const Component = props => (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.COLOR_BLACK,
                opacity: 1,
            }}>
            <WrappedComponent {...props} />
            {props.fetching &&
                <SpinnerOverlay
                    isVisible={props.fetching} />}
        </View>
    );
    Component.propTypes = {
        fetching: PropTypes.bool,
    };
    return connect(isFetchingSelector)(Component);
};

export default withSpinner;
