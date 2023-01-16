import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {compose, withProps} from 'recompose';
import {handleError, handleSuccess} from '../../../utils';
import {DashboardStyles} from './DashboardStyles';
import {BIKE_IMAGE, RIGHT_ARROW} from '../../constants/imgConsts';
import {DASHBOARD_CONST} from '../../constants/screenConst';
import container from '../../container/Dashboard/index';
import {WaveBackground} from '../../components/WaveBackground/WaveBackground';
import {Header} from '../../components/Header/Header';
import * as colors from '../../constants/colors';
import {APP_FONTS, FONT_SIZE} from '../../constants/styleConfig';
import {WebView} from 'react-native-webview';
import {config} from '../../../config';
import Slider from '@react-native-community/slider';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {Colors} from 'react-native-paper';

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
      totalPaid: '',
      status: this.props?.navigation?.state?.params?.status,
      leadName: this.props?.navigation?.state?.params?.leadName,
      applicantUniqueId: this.props?.navigation?.state?.params
        ?.applicantUniqueId,
      leadCode: this.props?.navigation?.state?.params?.leadCode,
    };
  }

  render() {
    console.log('sssssss', this.props.navigation?.state?.params?.status);

    return (
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />
        <Header
          label={
            this.state.status == 'Go'
              ? 'Case Approved'
            //   : this.state.status == 'NoGo'
            //   ? 'Case Freezed'
              : 'Case Freezed'
          }
          showLeftIcon={false}
          onPress={() => {
            Alert.alert('Logout!', `Are you sure you want to logout?`, [
              {
                text: 'No',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'YES',
                onPress: () =>
                  this.props.clearUserData(
                    handleSuccess('Logout Successfully.'),
                    this.props.navigation.navigate('Splash'),
                  ),
              },
            ]);
          }}
        />
        <ScrollView style={{}}>
          <View style={{paddingHorizontal: 20}}>
            <View>
              <View style={styles.textField}>
                <View style={styles.container}>
                  {this.state.status == 'Go' ? (
                    <Text
                      style={{
                        fontSize: FONT_SIZE.l,
                        fontFamily: APP_FONTS.NunitoRegular,
                      }}>
                      {
                        'Your loan offer has been approved please proceed to DDE and execution of agreement.'
                      }
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: FONT_SIZE.l,
                        fontFamily: APP_FONTS.NunitoRegular,
                      }}>
                      {this.props?.navigation?.state?.params?.message
                        ? this.props?.navigation?.state?.params?.message
                        : `We regret to inform you that your loan application cannot be approved at this time due to failure in meeting credit decisioning requirements. We hope that you apply again in 12 months!`}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.state.status == 'Go' && (
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
                      marginLeft: 5,
                    },
                  ]}
                  onPress={() => {
                    this.props.navigation.navigate('LoanSummary', {
                      leadName: this.state.leadName,
                      applicantUniqueId: this.state.applicantUniqueId,
                      leadCode: this.state.leadCode,
                    });
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: FONT_SIZE.l,
                      color: 'white',
                    }}>
                    Loan Summary
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
                    marginLeft: 5,
                  },
                ]}
                onPress={() => {
                  this.props.navigation.navigate('LeadList', {
                    productId: 1,
                    title: 'New Two Wheeler',
                  });
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: FONT_SIZE.l,
                    color: 'white',
                  }}>
                  Close Case
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </WaveBackground>
    );
  }
}

export default compose(container)(EmiCalculator);
const styles = StyleSheet.create({
  textField: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 15,
    // backgroundColor: 'green'
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'red'
  },
  subContainer: {
    flexDirection: 'row',
    width: '60%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.COLOR_BORDER_GREY,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    width: '50%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.COLOR_LIGHT_NAVY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    height: 40,
    width: '90%',
    fontSize: FONT_SIZE.l,
    backgroundColor: 'transparent',
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
});
