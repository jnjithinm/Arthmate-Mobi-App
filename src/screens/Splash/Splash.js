import React, { Component } from 'react';
import { Image, View, PermissionsAndroid, StatusBar, StyleSheet, Linking, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import containers from '../../container/VersionUpdate/index';
import { SplashStyles } from "./SplashStyles";
import { CWC_LOGO } from '../../constants/imgConsts';
import container from '../../container/Login/index';
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import DeviceInfo from 'react-native-device-info';
import { ActivityIndicator, Colors, Card, Button } from 'react-native-paper';
import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";


class Splash extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        VersionCode: '',
        updateAvailable: false
    }
    onPressUpdate = () => {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.arthmate');
      }

    componentDidMount() {
        const { navigation } = this.props;


        setTimeout(() => {
            // this.props.getAndroidVersion({
            //     callback: (response) => {
            //         var UpdatedVersionCode = response.data.androidVersion
            //         // console.log("UpdatedVersionCode", typeof UpdatedVersionCode);
            //         let oldVersionCode = DeviceInfo.getBuildNumber();
            //         // console.log("oldVersionCode", oldVersionCode, UpdatedVersionCode,Number(oldVersionCode) < Number(UpdatedVersionCode), 6<12);
            //         if (Number(oldVersionCode) < Number(UpdatedVersionCode)) {
            //             this.setState({
            //                 updateAvailable: true,
            //             })
            //         }
            //         else { 
            //             if (this.props.userDataSelector && this.props.userDataSelector.token &&
            //                 this.props.userDataSelector.token !== "") {
            //                 navigation.replace('Dashboard');
            //             } else {
            //                 navigation.replace('Login');
            //             }
            //         }

            //     },
            // });
            if (this.props.userDataSelector && this.props.userDataSelector.token &&
                this.props.userDataSelector.token !== "") {
                navigation.replace('LeadList', { productId: 1, title: 'New Two Wheeler' });
            } else {
                navigation.replace('Login');
            }
        }, 2000)
    }

    render() {
        const { imageStyle, imageContainer } = SplashStyles;

       
        if (this.state.updateAvailable) {
            return (

                <WaveBackground>
                <View style={styles.container}>

                    <Card style={styles.card}>
                        <Image style={styles.img} source={require('../../assets/img/logo.png')} />
                        <Text style={styles.textCard}>An important update is available.</Text>
                        <Text style={styles.textCard}>Please update your app to</Text>
                        <Text style={styles.textCard}>continue using it.</Text>
                        <Button
                            contentStyle={styles.buttonContent}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            mode="contained"
                            uppercase
                            disabled={this.state.reqesting}
                            color={colors.COLOR_LIGHT_NAVY_BLUE}
                            onPress={() => this.onPressUpdate()}
                        >
                            Update
                        </Button>
                    </Card>
                </View>

                 </WaveBackground> 

            );
        }
        return (
            <WaveBackground>
                <StatusBar hidden={true} />

                <View style={imageContainer}>
                    <Image style={imageStyle} source={CWC_LOGO} resizeMode={"contain"} />
                </View>

            </WaveBackground>
        )
        
    }
}

/**
 * propTypes declaration
 */
Splash.propTypes = {
    userDataSelector: PropTypes.object,
};

export default compose(
    container,
    containers,
    withProps(() => { }),
)(Splash);
const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
        margin: 10,
        alignSelf: 'center'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // backgroundColor: 'transparent',
        bottom: 20
    },
    card: {
        height: 320,
        elevation: 3,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    textCard: {
        fontSize: 15,
        // fontFamily: APP_FONTS.NunitoRegular,
        textAlign: 'center'
        
    },
    button: {
        height: 45,
        borderRadius: 12,
        marginTop: 20
    },
    buttonLabel: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonContent: { height: 45 },
});