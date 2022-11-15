import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const PreDisbursalDocumentStyles = StyleSheet.create({
    mainContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        flex: 1,
        backgroundColor: colors.COLOR_WHITE
    },
    deleteImageStyle1: {
        height: 30,
        width: 30,
        //    position: 'absolute'
    },
    mainLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontSize: FONT_SIZE.xl,
        textAlign: "center",
        marginBottom: 20
    },
    collapsedViewStyle: {
        backgroundColor: colors.COLOR_LILAC,
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
    },
    collapsedContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    imagePlaceHolderStyle1: {
        borderRadius: 10,
        borderWidth: 1,
        height: 150,
        width: "60%",
        // marginTop: 10,
        alignSelf: "center",
        // marginLeft: 60,
        borderColor: 'black'
    },
    plusImageStyle: {
        height: 20,
        width: 20
    },
    expandedContainer: {
        backgroundColor: colors.COLOR_WHITE
    },
    expandedViewStyle: {
        backgroundColor: colors.COLOR_WHITE,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 20
    },
    plusImageStyle: {
        height: 20,
        width: 20
    },
    seperatorStyle: {
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
        marginTop: 50,
        marginBottom: 10
    },
    pddLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontSize: FONT_SIZE.l,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '80%',
        marginLeft: 50,
        height: 50,
        marginTop: 20

    },
    errorLabel: {
        color: 'red'
    },
    separatorStyle1: {
        marginBottom: 5,
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
    },
    textInputStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginBottom: -10,
        marginTop: 6,
    },
    inputStyle1: {
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 5,
    },
    buttonSave: {
        marginTop: 20,
        width: '40%',
        alignSelf: 'center'
    },
    buttonNavigation: {
        flexDirection: 'row',
        width: '95%',
        marginBottom: 20,
        alignItems: 'center'
    },
    salarySlipText: {
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15,
    },
    plusImageStyle: {
        height: 30,
        width: 30,
        marginTop: 5.
    },
    deleteImageStyle: {
        height: 30,
        width: 30,
        bottom: 12,
        right: 16,
        // position: 'absolute'
    },
    mainSalaryView: {
        flex: 1,
        flexDirection: 'row',
    },
    salarySlipName: {
        flex: 1,
        marginRight: 15,
    },
    imagePlaceHolderStyle: {
        borderRadius: 10,
        borderWidth: 1,
        height: 150,
        width: "60%",
        marginTop: 20,
        alignSelf: "center",
        marginLeft: 60,
        borderColor: 'black'
    },
    textFileName: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontSize: FONT_SIZE.l,
        textAlign: "center",
    },
    plusImageStyle1: {
        height: 43,
        width: 36,
        // marginTop: 15,
        // marginBottom: 15,
        // marginLeft: 15,
        // marginRight: 15,
    },
})