import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    FlatList,
    Image,
    StatusBar,
    Text,
    BackHandler,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { compose, withProps } from 'recompose';
import { Header } from '../../components/Header/Header';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { DOWN_ARROW, UP_ARROW, NO_DATA } from '../../constants/imgConsts';
import { LEAD_LIST_CONST } from '../../constants/screenConst';
import container from '../../container/AdditionalDetails/index'
// '../../container/Lead/index';
import { LeadListStyles } from '../LeadList/LeadListStyles';
import { NavigationEvents } from 'react-navigation';
import { handleWarning } from '../../../utils';
import moment from 'moment';
import { FONT_SIZE, APP_FONTS } from '../../constants/styleConfig'



class Dedupe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leadtype: 'Lead',
            expandedItem: 0,
            params: this.props.navigation.state.params,
            employeeId: (this.props.userDataSelector?.userData?.data?.employeeId) || "",
            branchName: (this.props.userDataSelector?.userData?.data?.branchName) || "",
            searchString: "",
            pageNumber: 1,
            totalCount: 0,
            initalCount: 10,
            lead: [],
            prospect: [],
            bureauStatus: null,
            isUserAccess: this.props.userDataSelector?.userData?.ModelAccess[0]?.read || false
        };
    }

    apiCall() {

        const dataToAPI = {
            applicant_uniqueid: this.props.navigation.state.params.applicantUniqueId,
            lead_code: this.props.navigation.state.params.leadCode,
            roleId: this.props.navigation.state.params.roleId
        };

        this.props.getLoanSummary({
            dataToAPI,
            callback: (response) => {
                this.setState({bureauStatus: response.mainapplicant.dedupeStatus})
                this.props.getDedupeId({
                    data: {
                        listOfApplicantUniqueIds: response?.mainapplicant?.listOfApplicantUniqueIds,
                    },
                    callback: (response) => {
                        this.setState({ lead: response.data && response.data.length > 0 ? [...response.data] : [] })


                    }
                });
            }
        })

    }

    backAction = () => {
        if (this.props.navigation && this.props.navigation.navigate) {
            this.props.navigation.navigate('LoanSummary');
            return true;
        }
        return false;
    };


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.apiCall();
        });
        BackHandler.addEventListener("hardwareBackPress", this.backAction);

    }

    componentWillUnmount() {
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }


    renderRow(item, index) {
        const {
            lableStyle,
            lableStyleButton,
            listBoxStyle,
            dataContainer,
            dataStyle,
            flexRow,
            imageStyle,
            actionLabelStyle,
            tabularLayout,
        } = LeadListStyles;

        // if (!item.isExpanded) {
        if (index == this.state.expandedItem) {
            return (
                <View style={listBoxStyle}>
                    <View style={flexRow}>
                        <View style={{ flex: 4 }}>
                            <View style={dataContainer}>
                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{'Case ID'}</Text>
                                    <Text style={dataStyle}>{item.caseId}</Text>
                                </View>
                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{'Date'}</Text>
                                    <Text style={dataStyle}>{moment(item.leadUpdatedDate).format("DD/MM/YYYY, h:mm a")}</Text>
                                </View>
                            </View>
                            <View style={dataContainer}>
                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{'Name'}</Text>
                                    <Text
                                        flexwrap={'wrap'}
                                        ellipsizeMode={'tail'}
                                        // numberOfLines={2}
                                        style={dataStyle}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{'Mobile No.'}</Text>
                                    <Text
                                        flexwrap={'wrap'}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={2}
                                        style={dataStyle}>
                                        {item.mobileNumber}
                                    </Text>
                                </View>

                            </View>


                            <View style={[dataContainer, { marginTop: 5 }]}>

                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{'Email Address'}</Text>
                                    <Text
                                        flexwrap={'wrap'}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={2}
                                        style={dataStyle}>
                                        {item.email}
                                    </Text>
                                </View>
                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{'DOB'}</Text>
                                    <Text style={dataStyle}>{(item.dob)}</Text>
                                </View>
                            </View>

                            <View style={[dataContainer, { marginTop: 5, marginBottom: 10 }]}>
                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{"POI Doc Type"}</Text>
                                    <Text style={dataStyle}>{item.poiDocType}</Text>
                                </View>

                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{"POI Doc Id"}</Text>
                                    <Text style={dataStyle}>{item.poiDocId}</Text>
                                </View>


                            </View>
                            <View style={[tabularLayout, { paddingHorizontal: 10 }]}>
                                <Text style={lableStyle}>{"Address Matched"}</Text>
                                <Text style={dataStyle}>{item.address}</Text>
                            </View>
                            <View style={[dataContainer, { margin: 5 }]}>

                                <View style={tabularLayout}>
                                    <Text style={lableStyle}>{"Status"}</Text>
                                    <Text style={dataStyle}>{item.leadCaseStatus}</Text>
                                </View>
                            </View>

                        </View>
                        <Image
                            source={item.isExpanded ? DOWN_ARROW : UP_ARROW}
                            style={imageStyle}
                            resizeMode={'contain'}
                        />
                    </View>
                </View>
            );
        }
        return (
            <TouchableOpacity
                style={listBoxStyle}
                onPress={() => {
                    this.setState({
                        expandedItem: index,
                    });
                }}>
                <View style={flexRow}>
                    <View style={{ flex: 4 }}>
                        <View style={dataContainer}>
                            <View style={tabularLayout}>
                                <Text style={lableStyle}>{'Case ID'}</Text>
                                <Text style={dataStyle}>{item.caseId}</Text>
                            </View>
                            {/* <View style={tabularLayout}>
                                <Text style={lableStyle}>{'Date'}</Text>
                                <Text style={dataStyle}>{moment(item.leadUpdatedDate).format("DD-MM-YYYY, h:mm a")}</Text>
                            </View> */}
                            <View style={tabularLayout}>
                                <Text style={lableStyle}>{'Name'}</Text>
                                <Text
                                    flexwrap={'wrap'}
                                    ellipsizeMode={'tail'}
                                    // numberOfLines={2}
                                    style={dataStyle}>
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Image
                        source={item.isExpanded ? UP_ARROW : DOWN_ARROW}
                        style={imageStyle}
                        resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        );
    }

    renderList(leadList) {
        const { flatListStyle } = LeadListStyles;
        return (
            <>
                {
                    leadList.length !== 0 ?
                        <FlatList
                            style={flatListStyle}
                            data={leadList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => this.renderRow(item, index)}
                            onEndReached={() => {
                                this.setState({
                                    pageNumber: this.state.pageNumber + 1
                                }, () => {
                                    if (this.state.pageNumber * this.state.initalCount < this.state.totalCount) {
                                        this.apiCall()
                                    }
                                })
                            }}
                        />
                        :
                        <>
                            <Image
                                source={NO_DATA}
                                style={{ height: 40, width: 40, alignSelf: 'center', marginTop: 10 }}
                            />
                            <Text style={{ alignSelf: 'center' }}> No Data </Text>
                        </>
                }
            </>
        );
    }



    render() {
        const {
            buttonbackground,
            buttonTitle,
            button,
            selected,
            selectedButtonTitle,
        } = LeadListStyles;

        return (
            <WaveBackground>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor={colors.COLOR_WHITE}
                />
                <NavigationEvents
                    onDidFocus={() =>
                        this.setState({
                            lead: [],
                            prospect: [],
                            leadtype: this.state.leadtype,
                            searchString: "",
                            pageNumber: 1,
                            totalCount: 0,
                            initalCount: 10,
                        }, () => { this.componentDidMount() })}
                />
                <Header
                    label={'Dedupe'}
                    showLeftIcon={false}
                    onPress={() => {
                    }}
                />


                {this.renderList(this.state.lead)}
                {this.state.lead.length != 0 ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                        <TouchableOpacity onPress={() => {
                            this.state.bureauStatus == false ? 
                            this.props.createUpdateCUSTOMER({
                                data: {
                                  applicant_uniqueid: this.props.navigation.state.params.isguarantor || this.props.navigation.state.params.iscoapplicant ? this.props.navigation.state.params.coapplicantUniqueId : this.props.navigation.state.params.applicantUniqueId,
                                  ismainapplicant: this.props.navigation.state.params.ismainapplicant,
                                  isguarantor: this.props.navigation.state.params.isguarantor,
                                  type: "bureau"
                                },
                                callback: (response) => {
                                  this.props.navigation.navigate('AdditionalDetails', {
                                    leadName: this.props.navigation.state.params.leadName,
                                    applicantUniqueId: this.props.navigation.state.params.applicantUniqueId,
                                    leadCode: this.props.navigation.state.params.leadCode,
                                    mobileNumber: this.props.navigation.state.params.mobileNumber,
                                    coapplicantUniqueId: this.props.navigation.state.params.coapplicantUniqueId,
                                    ismainapplicant: this.props.navigation.state.params.ismainapplicant,
                                    iscoapplicant: this.props.navigation.state.params.iscoapplicant,
                                    isguarantor: this.props.navigation.state.params.isguarantor,
                                })
                                }
                              })
                             :
                            this.props.navigation.navigate('AdditionalDetails', {
                                leadName: this.props.navigation.state.params.leadName,
                                applicantUniqueId: this.props.navigation.state.params.applicantUniqueId,
                                leadCode: this.props.navigation.state.params.leadCode,
                                mobileNumber: this.props.navigation.state.params.mobileNumber,
                                coapplicantUniqueId: this.props.navigation.state.params.coapplicantUniqueId,
                                ismainapplicant: this.props.navigation.state.params.ismainapplicant,
                                iscoapplicant: this.props.navigation.state.params.iscoapplicant,
                                isguarantor: this.props.navigation.state.params.isguarantor,
                            })
                        }}
                            style={{ width: '25%', backgroundColor: "#334e9e", justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontFamily: APP_FONTS.NunitoRegular, fontSize: FONT_SIZE.m }}>{"OK"}</Text>
                        </TouchableOpacity>
                    </View> : null}

            </WaveBackground >
        );
    }
}

/**
 * propTypes declaration
 */
Dedupe.propTypes = {

};

export default compose(
    container,
    withProps(() => { }),
)(Dedupe);
