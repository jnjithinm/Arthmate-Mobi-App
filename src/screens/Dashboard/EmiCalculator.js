import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { handleError, handleSuccess } from '../../../utils';
import { DashboardStyles } from "./DashboardStyles";
import { BIKE_IMAGE, RIGHT_ARROW } from '../../constants/imgConsts';
import { DASHBOARD_CONST } from "../../constants/screenConst";
import container from '../../container/Dashboard/index';
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import { Header } from "../../components/Header/Header";
import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";
import { WebView } from 'react-native-webview';
import { config } from '../../../config';
import Slider from '@react-native-community/slider';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Colors } from 'react-native-paper';

class EmiCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loanAmount: '',
            maxAmount: 500000,
            intrestRate: '',
            tenure: '',
            tenureType: '',
            emi: '',
            paybleIntrest: '',
            totalPaid: ''

        };
    }

    emiCalculate = () => {
        if (this.state.intrestRate != '' &&
            this.state.tenure != '' &&
            this.state.loanAmount != '') {

            if (this.state.tenure % 2) {
                let aa = (parseFloat(this.state.loanAmount))

                let a = (aa / 100) * parseFloat(this.state.intrestRate);
                let b = parseFloat(this.state.tenure + 1) / 12;
                let c = parseFloat(aa) + parseFloat(a * b);
              
                let paybleIntrest, totalPaid
                let emi = (aa + (parseFloat(aa) * (parseFloat(this.state.intrestRate) / 100))
                    * ((parseFloat(this.state.tenure) + 1) / 12)) / parseFloat(this.state.tenure)
                emi = Math.ceil(emi);
                 paybleIntrest =  Math.ceil(((this.state.loanAmount / 100)* (this.state.intrestRate)) * (this.state.tenure/ 12)),
                 totalPaid=  Math.ceil(Number(paybleIntrest) + Number(this.state.loanAmount))

                return this.setState({ emi, paybleIntrest, totalPaid })
            } else {

                let aa = ((parseFloat(this.state.loanAmount)))
                let a = (aa / 100) * (this.state.intrestRate);
                let b = this.state.tenure / 12;
                let c = parseFloat(aa) + parseFloat(a * b);
                let emi = c / this.state.tenure;

                let paybleIntrest, totalPaid
                emi = Math.ceil(emi);
                paybleIntrest =  Math.ceil(((this.state.loanAmount / 100)* (this.state.intrestRate)) * (this.state.tenure/ 12)),
                 totalPaid=  Math.ceil(Number(paybleIntrest) + Number(this.state.loanAmount))

                return this.setState({ emi, paybleIntrest, totalPaid })
            }
        }
        else {
            handleError("Please fill all mandatory fields details")
        }
    }

    render() {
        return (
            <WaveBackground>
                <StatusBar
                    backgroundColor={colors.COLOR_WHITE}
                    barStyle={'dark-content'}
                    translucent={false}
                    hidden={false}
                />
                <Header
                    label={'EMI Calculator'}
                    showLeftIcon={false}
                    onPress={() => {
                        Alert.alert("Logout!", `Are you sure you want to logout?`, [
                            {
                                text: "No",
                                onPress: () => null,
                                style: "cancel"
                            },
                            {
                                text: "YES",
                                onPress: () => this.props.clearUserData(
                                    handleSuccess('Logout Successfully.'),
                                    this.props.navigation.navigate("Splash")
                                )
                            }
                        ])
                    }}
                />
                <ScrollView style={{  }}>

                    <View style={{ paddingHorizontal: 20 }}>
                        <View>
                            <View style={styles.textField}>
                                <View style={styles.container}>
                                    <Text style={{ fontSize: FONT_SIZE.l }}>{`Loan Amount`}</Text>
                                </View>

                                <View style={styles.subContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        keyboardType="numeric"
                                        defaultValue={this?.state?.loanAmount?.toString()}
                                        onChangeText={(text) => {
                                            if (!isNaN(text)) {
                                                if (text > 0 && text <= this.state.maxAmount) {
                                                    this.setState({
                                                        loanAmount: text
                                                    }, () => {
                                                        // this.emiamount()

                                                    })
                                                }
                                            }
                                        }}

                                    />
                                    <Text style={{ fontSize: FONT_SIZE.l }}>{'\u20B9'}</Text>
                                </View>

                            </View>
                            <Slider
                                style={{ width: '100%', height: 50 }}
                                value={parseFloat(this?.state?.loanAmount || 0)}
                                onValueChange={(amount) => this.setState({ loanAmount: amount })}
                                minimumValue={25000}
                                maximumValue={(this.state.maxAmount)}
                                minimumTrackTintColor="#16244f"
                                maximumTrackTintColor="#4a4a4a"
                                step={100}
                            />
                            <View style={styles.label}>
                                <Text style={{}}>20K</Text>
                                <Text style={{}}>{this?.state?.maxAmount?.toString()}</Text>
                            </View>
                        </View>

                        <View>
                            <View style={styles.textField}>
                                <View style={styles.container}>
                                    <Text style={{ fontSize: FONT_SIZE.l }}>{`Interest Rate`}</Text>
                                </View>

                                <View style={styles.subContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        keyboardType="numeric"
                                        defaultValue={this?.state?.intrestRate?.toString()}
                                        onChangeText={(text) => {
                                            if (!isNaN(text)) {
                                                // if (text > 0 && text <= 20) {
                                                this.setState({
                                                    intrestRate: text
                                                }, () => {
                                                    // this.emiamount()

                                                })
                                                // }
                                            }
                                        }}

                                    />
                                    <Text style={{ fontSize: FONT_SIZE.l }}>{'%'}</Text>
                                </View>

                            </View>
                            <Slider
                                style={{ width: '100%', height: 50 }}
                                value={parseFloat(this?.state?.intrestRate || 0)}
                                onValueChange={(amount) => {  this.setState({ intrestRate: amount }) }}
                                minimumValue={1}
                                maximumValue={20}
                                minimumTrackTintColor="#16244f"
                                maximumTrackTintColor="#4a4a4a"
                                step={1}
                            />
                            <View style={styles.label}>
                                <Text style={{}}>5</Text>
                                <Text style={{}}>{20}</Text>
                            </View>
                        </View>

                        <View>
                            <View style={styles.textField}>
                                <View style={styles.container}>
                                    <Text style={{ fontSize: FONT_SIZE.l }}>{`Loan Tenure`}</Text>
                                </View>

                                <View style={styles.subContainer}>
                                    <TextInput
                                        style={[styles.inputField, { width: '84%' }]}
                                        keyboardType="numeric"
                                        defaultValue={this?.state?.tenure?.toString()}
                                        onChangeText={(text) => {
                                            if (!isNaN(text)) {
                                                if (text > 0 && text <= this.state.maxAmount) {
                                                    this.setState({
                                                        tenure: text
                                                    }, () => {
                                                        // this.emiamount()

                                                    })
                                                }
                                            }
                                        }}

                                    />
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: FONT_SIZE.l }}>{'Mo'}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <Slider
                                style={{ width: '100%', height: 50 }}
                                value={parseFloat(this?.state?.tenure || 0)}
                                onValueChange={(amount) => this.setState({ tenure: amount })}
                                minimumValue={0}
                                maximumValue={(40)}
                                minimumTrackTintColor="#16244f"
                                maximumTrackTintColor="#4a4a4a"
                                step={1}
                            />
                            <View style={styles.label}>
                                <Text style={{}}>0</Text>
                                <Text style={{}}>{'40'}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={[styles.button, { marginRight: 5 }]}
                                onPress={() => {
                                    this.setState({
                                        loanAmount: '',
                                        intrestRate: '',
                                        tenure: '',
                                        emi: '', 
                                        paybleIntrest: '', 
                                        totalPaid: ''
                                    })
                                }}
                            >
                                <Text style={{ alignSelf: 'center', fontSize: FONT_SIZE.l }}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE, marginLeft: 5 }]}
                                onPress={() => { this.emiCalculate() }}

                            >
                                <Text style={{ alignSelf: 'center', fontSize: FONT_SIZE.l, color: 'white' }}>Calculate</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={[styles.textField, { marginTop: 30 }]}>
                            <View style={styles.container}>
                                <Text style={{ fontSize: FONT_SIZE.l }}>{`Loan EMI`}</Text>
                            </View>

                            <View style={styles.subContainer}>
                                <TextInput
                                    style={[styles.inputField, { color: colors.COLOR_BLACK }]}
                                    keyboardType="numeric"
                                    editable={false}
                                    defaultValue={this?.state?.emi?.toString()}
                                />
                                <Text style={{ fontSize: FONT_SIZE.l }}>{'\u20B9'}</Text>
                            </View>

                        </View>

                        <View style={styles.textField}>
                            <View style={styles.container}>
                                <Text style={{ fontSize: FONT_SIZE.l }}>{`Total Interest Payable`}</Text>
                            </View>

                            <View style={styles.subContainer}>
                                <TextInput
                                    style={[styles.inputField, { color: colors.COLOR_BLACK }]}
                                    keyboardType="numeric"
                                    editable={false}
                                    defaultValue={this?.state?.paybleIntrest?.toString()}
                                />
                                <Text style={{ fontSize: FONT_SIZE.l }}>{'\u20B9'}</Text>
                            </View>

                        </View>

                        <View style={styles.textField}>
                            <View style={styles.container}>
                                <Text style={{ fontSize: FONT_SIZE.l }}>{`Total Payment`}</Text>
                                {/* <Text style={{ fontSize: FONT_SIZE.l }}>{`(Principal + Interest)`}</Text> */}
                            </View>

                            <View style={styles.subContainer}>
                                <TextInput
                                    style={[styles.inputField, { color: colors.COLOR_BLACK }]}
                                    keyboardType="numeric"
                                    editable={false}
                                    defaultValue={this?.state?.totalPaid?.toString()}
                                />
                                <Text style={{ fontSize: FONT_SIZE.l }}>{'\u20B9'}</Text>
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </WaveBackground>
        )
    }
}



export default compose(container)(EmiCalculator);
const styles = StyleSheet.create({
    textField: {
        flexDirection: "row",
        justifyContent: 'center',
        padding: 10, marginTop: 15,
        backgroundColor: 'transparent'
    },
    container: {
        width: '40%', justifyContent: 'center', alignItems: 'flex-start'
    },
    subContainer: {
        flexDirection: 'row', width: '60%', borderWidth: 1, borderRadius: 5, borderColor: colors.COLOR_BORDER_GREY, justifyContent: 'flex-start', alignItems: 'center'
    },
    button: {
        flexDirection: 'row', width: '50%', borderWidth: 1, padding: 10, borderRadius: 5, borderColor: colors.COLOR_LIGHT_NAVY_BLUE, justifyContent: 'center', alignItems: 'center'
    },
    inputField: {
        height: 40, width: "90%", fontSize: FONT_SIZE.l, backgroundColor: 'transparent'
    },
    label: {
        flexDirection: 'row', justifyContent: 'space-between', marginTop: -10
    }
});