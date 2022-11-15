import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { handleSuccess } from '../../../utils';
import { DashboardStyles } from "./DashboardStyles";
import { BIKE_IMAGE, RIGHT_ARROW } from '../../constants/imgConsts';
import { DASHBOARD_CONST } from "../../constants/screenConst";
import container from '../../container/Dashboard/index';
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import { Header } from "../../components/Header/Header";
import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";
import {WebView} from 'react-native-webview';
import { config } from '../../../config';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // twoWheelerData: [],
            NTW: { leadCount: 0 },
            ETW: { leadCount: 0 },
            OTW: { leadCount: 0 },
            UTW: { leadCount: 0 },
            employeeId: (this.props.userDataSelector?.userData?.data?.employeeId) || "",
            branchName: (this.props.userDataSelector?.userData?.data?.branchName) || "",
            productId: 0,
        };
    }

    fetchData() {
        this.props.dashboardAPI({
            data: {
                employeeId: this.state.employeeId,
                branchName: this.state.branchName
            },
            callback: (response) => {
                let twoWheelerData = response.data || [];
                twoWheelerData.forEach(data => {
                    if (data.productName == 'NTW') {
                        this.setState({ NTW: data || { leadCount: 0 } })
                    } else if (data.productName == 'ETW') {
                        this.setState({ ETW: data || { leadCount: 0 } })
                    }
                    else if (data.productName == 'UTW') {
                        this.setState({ UTW: data || { leadCount: 0 } })
                    }
                    else if (data.productName == 'OTW') {
                        this.setState({ OTW: data || { leadCount: 0 } })
                    }
                })
                // this.setState({ twoWheelerData: response.data || [] })
            },
        });
    }

    fetchUserData() {
        this.props.getUserDetails({
            data: {
                employeeId: this.state.employeeId,
            },
            callback: (response) => {

                Linking.openURL(`${config.GLOBAL_LOGIN}mobile=${response.data.mobile}&sessionkey=${response.data.sessionkey}&usercode=${response.data.usercode}`)
              
                // this.props.globalLogin({
                //     data: {
                //         mobile: response.data.mobile,
                //         sessionkey: response.data.sessionkey,
                //         usercode: response.data.usercode
                //     },
                //     callback: (response) => {
                //     },
                // });

            },
        });
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.fetchData();
        })
        this.fetchData();
    }

    componentWillUnmount() {
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }

    CircleDiv(title, count, productId) {
        const { outerCircle, innerCircle, circleTitleStyle, circleCountStyle, rightArrowIcon } = DashboardStyles;

        return (
            <TouchableOpacity onPress={() => { title == "Cross Sell"  ? this.fetchUserData() : title == "EMI Calculator" ? this.props.navigation.navigate('EmiCalculator') : this.props.navigation.navigate('LeadList', { productId: productId, title: title, employeeId: this.state.employeeId, branchName: this.state.branchName }); }}>
                <View style={outerCircle}>
                    <View style={innerCircle}>
                        <Text style={[circleTitleStyle, { fontSize: title == "Cross Sell" || title == "EMI Calculator" ? FONT_SIZE.l : FONT_SIZE.m, marginBottom: title == "Cross Sell" || title == "EMI Calculator" ? 10 : null }]}>{title == "EMI Calculator" ?  "EMI\nCalculator" :  title}</Text>
                        {title == "Cross Sell" || title == "EMI Calculator" ? null : <Text style={circleCountStyle}>{count}</Text>}
                        <Image source={RIGHT_ARROW} style={rightArrowIcon} />
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    renderCircles() {
        const { circles, leftCircle, rightCircle, leftCircle1, rightCircle1, circleContainer } = DashboardStyles;

        return (
            <View style={[circleContainer,{backgroundColor: 'white', paddingHorizontal: 20}]}>
                <View style={circles}>
                    <View style={leftCircle}>
                        {this.CircleDiv("New Two Wheeler", this.state.NTW.leadCount, this.state.NTW.productId)}
                    </View>
                    <View style={rightCircle}>
                        {this.CircleDiv("Electric Two Wheeler", this.state.ETW.leadCount, this.state.ETW.productId)}
                    </View>
                </View>

                <View style={circles}>
                    <View style={leftCircle1}>
                        {this.CircleDiv("Used Two Wheeler", this.state.UTW.leadCount, this.state.UTW.productId)}
                    </View>
                    <View style={rightCircle1}>
                        {this.CircleDiv("Other Two Wheeler", this.state.OTW.leadCount, this.state.OTW.productId)}
                    </View>
                </View>
                {/* <View style={circles}>
                    <View style={[leftCircle1, {  }]}>
                        {this.CircleDiv('Cross Sell')}
                    </View>

                    <View style={{leftCircle1}}>
                        { this.CircleDiv('EMI Calculator')}
                    </View>
                </View> */}
            </View>
        );
    }

    render() {
        const { bikeImageStyle, nameStlye } = DashboardStyles;
        const employeeName = (this.props.userDataSelector?.userData?.data?.employeeName) || "";

        return (
            <WaveBackground>
                <StatusBar
                    backgroundColor={colors.COLOR_WHITE}
                    barStyle={'dark-content'}
                    translucent={false}
                    hidden={false}
                />
                <Header
                    label={DASHBOARD_CONST.HEADER}
                    showLeftIcon={false}
                    onPress={() => {
                        Alert.alert("Logout!", `Are you sure you want to logout?`, [
                            {
                                text: "No",
                                onPress: () => null,
                                style: "cancel"
                            },
                            {
                                text: "YES", onPress: () => this.props.clearUserData(
                                    handleSuccess('Logout Successfully.'),
                                    this.props.navigation.navigate("Splash")
                                )
                            }
                        ]);

                    }
                    }
                />
                <Text style={nameStlye}>{`Hello, ${employeeName}!`}</Text>
                {this.renderCircles()}
                {/* <Button onPress={() => { this.props.clearUserData(); }} title={"Press"} /> */}
                {/* <Image style={bikeImageStyle} source={BIKE_IMAGE} resizeMode="contain" /> */}
            </WaveBackground>
        )
    }
}

/**
 * propTypes declaration
 */
Dashboard.propTypes = {
    clearUserData: PropTypes.func,
    dashboardAPI: PropTypes.func,
};

export default compose(
    container,
    withProps((clearUserData) => clearUserData),
    withProps((dashboardAPI) => dashboardAPI),
)(Dashboard);
