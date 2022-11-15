import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Linking, ScrollView, StatusBar, Text, View, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { compose, withProps } from 'recompose';
import { Button } from '../../components/Button/Button';
import { BLUE_PLUS_ICON, MINUS_ICON, TOOL_TIP, DOWN_ARROW, UP_ARROW, UPLOADIMAGEPDF, DELETEBUTTON, PLACEHOLDER_IMAGE } from '../../constants/imgConsts';
import { Header } from '../../components/Header/Header';
import { TextImage } from '../../components/TextImage/TextImage';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { RadioButton } from '../../components/RadioButtonSchemes/RadioButton';
import { REPAYMENT_DETAILS_CONST } from '../../constants/screenConst';
import container from '../../container/RepaymentDetails/index';
import { RepaymentDetailsStyles } from './RepaymentDetailsStyles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { selectFilePDF } from '../../../uploadImageUtils';
import { handleWarning } from '../../../utils'
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { AdditionalDetailsStyles } from '../AdditionalDetails/AdditionalDetailsStyles';
import { AADHAR_REGEX, } from '../../../validations ';
import { ADDITIONAL_DETAILS_CONST } from '../../constants/screenConst';

import { WebView } from 'react-native-webview';

const countPDC = /^[0-9][0-9]*$/;

class RepaymentProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {
            mainContainer,
            mainLabel,
            radioLabel,
        } = RepaymentDetailsStyles;
        return (

            <WaveBackground>
                <StatusBar
                    backgroundColor={colors.COLOR_WHITE}
                    barStyle={'dark-content'}
                    translucent={false}
                    hidden={false}
                />
                <View style={{ height: '8%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('RepaymentDetails', {})
                        }}>
                        <Image
                            source={require('../../assets/img/backArrow.png')}
                            style={{ height: 30, width: 30, marginLeft: 20 }}
                        />
                    </TouchableOpacity>
                </View>
               
                <WebView
                    source={{
                        uri: this.props.navigation.state.params.url
                    }}
                    style={{}}
                />
                {/* <WebView source={{ uri: 'https://reactnative.dev/' }} /> */}
                {/* </View> */}
                {/* </ScrollView> */}
            </WaveBackground>
        )
    }
}



export default compose(
    container,
    withProps(
        (saveRepaymentDETAILS) => saveRepaymentDETAILS,
        (getRepaymentDETAILS) => getRepaymentDETAILS,
        (saveDisbursementRepaymentDETAILS) => saveDisbursementRepaymentDETAILS,
        (getDisbursementRepaymentDETAILS) => getDisbursementRepaymentDETAILS,
    ),
)(RepaymentProcess);
