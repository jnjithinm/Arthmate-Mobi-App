import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, ScrollView, StatusBar, Text, View, TouchableOpacity, Image, Linking, FlatList } from 'react-native';
import { compose, withProps } from 'recompose';
import { Button } from '../../components/Button/Button';
import { BLUE_PLUS_ICON, MINUS_ICON, UPLOADIMAGEPDF, DELETEBUTTON } from '../../constants/imgConsts';
import { Header } from '../../components/Header/Header';
import { TextImage } from '../../components/TextImage/TextImage';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { PRE_DISBURSAL_DOCUMENT_CONST } from '../../constants/screenConst';
import container from '../../container/PreDisbursementDocument/index';
import { PreDisbursalDocumentStyles } from '../PreDisbursalDocument/PreDisbursalDocumentStyles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { selectFilePDF,uploadDocument, zipFileDisbursementTakePhoto, zipFileDisbursementUpload, zipFileDisbursementTakePhoto2, } from '../../../uploadImageUtils';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import { bytesToMegaBytes, handleError, handleSuccess } from '../../../utils';
import { baseURL, uatURL } from '../../../baseURL';
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';
import FastImage from 'react-native-fast-image'

var temp = []
var total = 0
var selectedItem = ''
class PreDisbursalDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preDisbursalDocument: {
                securityPDC: true,
                taxPaidToRtoDoc: true,
                proValuationReport : true,
                insuranceCopy: true,
                kliForm: true,
                otherDocument: true,
                insuranceUpload: true,
                registrationDetails: true,
                physicalRto: true,
                eAgreement: true,
                invoice: true,
                references: true,

            },

            kliMultiSelection: false,
            otherMultiSelection: false,
            uploadSecurityPDC1: {
                filename: "",
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            uploadPDC1: false,
            uploadSecurityPDC2: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            uploadPDC2: false,
            uploadSecurityPDC3: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            uploadPDC3: false,
            uploadSecurityPDC4: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            uploadPDC4: false,
            taxPaidToRtoDoc: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            taxPaidToRtoUpload: false,
            valuationReport: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            valuationReportUpload: false,
            insuranceCopy: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            insuranceCopyUpload: false,
            kliForm1: [],
            kliForm: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            kliUpload: false,
            otherName: '',
            documentName: {
                value: "",
                isValid: true,
            },
            kliDataSave: false,
            otherDocument1: [],
            otherDocument: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            otherUpload: false,
            otherDataSave: false,
            insuranceDoc: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            insuranceUpload: false,
            registrationDetails: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            eSignUpload: false,
            physicalRto: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            nachUpload: false,
            eAgreement: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            eAgreementUpload: false,

            Reference1: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            refrences1Upload: false,
            References2: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            refrences2Upload: false,
            invoiceDocument: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            invoiceUpload: false,

            leadName: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.leadName) || "",
            applicantUniqueId: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.applicantUniqueId) || "",
            disbursementType: "pre",
            leadCode: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.leadCode) || "",
            ismainapplicant: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.ismainapplicant) || "",
            isViewOnly: false,
        }
    }

    loanSummary() {
        const dataToAPI = {
            applicant_uniqueid: this.state.applicantUniqueId,
            lead_code: this.state.leadCode,
            roleId: this.props.userDataSelector.userData.data.roleId
        };
        this.props.getLoanSummary({
            dataToAPI,
            callback: (response) => {
                this.setState({
                    isViewOnly:
                        response.mainapplicant.preSalesFreeze ? true : response?.modelAccess[0]?.read ? true :
                        false
                })
            }
        })
    }
    componentDidMount() {
        this.loanSummary();
        this.props.getDisbursementDOCUMENT({
            data: {
                applicantUniqueId: this.state.applicantUniqueId
            },
            callback: (response) => {
                if (response && response.data && response.data.pdc1 && response.data.pdc1.filePath) {
                    this.setState({
                        uploadPDC1: true,
                        uploadSecurityPDC1: {
                            filename: response.data.pdc1.fileName,
                            idToEdit: response.data.pdc1.id || "",
                            filePath: response.data.pdc1.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.pdc1.fileName.split('.').pop() == "pdf" ? true : false,

                        },
                        preDisbursalDocument: {
                            securityPDC: false,
                        }
                    })
                }
                if (response && response.data && response.data.pdc2 && response.data.pdc2.filePath) {

                    this.setState({
                        uploadPDC2: true,
                        uploadSecurityPDC2: {
                            filename: response.data.pdc2.fileName,
                            idToEdit: response.data.pdc2.id || "",
                            filePath: response.data.pdc2.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.pdc2.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            securityPDC: false,
                        }
                    })

                }
                if (response && response.data && response.data.pdc3 && response.data.pdc3.filePath) {

                    this.setState({
                        uploadPDC3: true,
                        uploadSecurityPDC3: {
                            filename: response.data.pdc3.fileName,
                            idToEdit: response.data.pdc3.id || "",
                            filePath: response.data.pdc3.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.pdc3.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            securityPDC: false,
                        }
                    })

                }
                if (response && response.data && response.data.pdc4 && response.data.pdc4.filePath) {

                    this.setState({
                        uploadPDC4: true,
                        uploadSecurityPDC4: {
                            filename: response.data.pdc4.fileName,
                            idToEdit: response.data.pdc4.id || "",
                            filePath: response.data.pdc4.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.pdc4.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            securityPDC: false,
                        }
                    })

                }
                if (response && response.data && response.data.oneTimeTaxPaidToRto && response.data.oneTimeTaxPaidToRto.filePath) {

                    this.setState({
                        taxPaidToRtoUpload: true,
                        taxPaidToRtoDoc: {
                            filename: response.data.oneTimeTaxPaidToRto.fileName,
                            idToEdit: response.data.oneTimeTaxPaidToRto.id || "",
                            filePath: response.data.oneTimeTaxPaidToRto.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.oneTimeTaxPaidToRto.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            taxPaidToRtoDoc: false,
                        }
                    })
                }

                if (response && response.data && response.data.valuationReport && response.data.valuationReport.filePath) {
                    this.setState({
                        valuationReportUpload: true,
                        valuationReport: {
                            filename: response.data.valuationReport.fileName,
                            idToEdit: response.data.valuationReport.id || "",
                            filePath: response.data.valuationReport.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.valuationReport.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            proValuationReport : false,
                        }
                    })
                }
                if (response && response.data && response.data.insuranceCopy && response.data.insuranceCopy.filePath) {
                    this.setState({
                        insuranceCopyUpload: true,
                        insuranceCopy: {
                            filename: response.data.insuranceCopy.fileName,
                            idToEdit: response.data.insuranceCopy.id || "",
                            filePath: response.data.insuranceCopy.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.insuranceCopy.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            insuranceCopy: false,
                        }
                    })
                }
                if (response && response.data && response.data.kliForm && response.data.kliForm?.length !== 0) {
                    this.setState({
                        kliUpload: true,
                        kliDataSave: response?.data?.kliForm !== undefined ? response?.data?.kliForm[0]?.fileName?.split('.')?.pop() == "pdf" ? true : false : false,
                        kliForm1: response.data.kliForm,
                        preDisbursalDocument: {
                            kliForm: false,
                        }
                    })
                }
                if (response && response.data && response.data.kliForm === undefined || response && response.data && response.data.kliForm.length == 0) {
                    this.setState({
                        kliUpload: false,
                        kliDataSave: false,
                        kliForm1: [],
                        kliMultiSelection: false,
                        preDisbursalDocument: {
                            kliForm: true,
                        }
                    })
                }
                if (response && response.data && response.data.other) {
                    this.setState({
                        otherUpload: true,
                        otherMultiSelection: true,
                        otherDataSave: response?.data?.other !== undefined ? response?.data?.other[0]?.fileName?.split('.')?.pop() == "pdf" ? true : false : false,
                        otherDocument1: response.data.other,
                        // documentName: {
                        //     value: response.data.otherName || "",
                        //     isValid: true,
                        // },
                        // otherName: response.data.otherName,
                        preDisbursalDocument: {
                            otherDocument: false,
                        }
                    })
                }
                

                if (response && response.data && response.data.Reference1 && response.data.Reference1.filePath) {

                    this.setState({
                        refrences1Upload: true,
                        Reference1: {
                            filename: response.data.Reference1.fileName,
                            idToEdit: response.data.Reference1.id || "",
                            filePath: response.data.Reference1.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.Reference1.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            references: false,
                        }
                    })
                }
                if (response && response.data && response.data.References2 && response.data.References2.filePath) {

                    this.setState({
                        refrences2Upload: true,
                        References2: {
                            filename: response.data.References2.fileName,
                            idToEdit: response.data.References2.id || "",
                            filePath: response.data.References2.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.References2.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            references: false,
                        }
                    })
                }
                if (response && response.data && response.data.invoiceDocument && response.data.invoiceDocument.filePath) {

                    this.setState({
                        invoiceUpload: true,
                        invoiceDocument: {
                            filename: response.data.invoiceDocument.fileName,
                            idToEdit: response.data.invoiceDocument.id || "",
                            filePath: response.data.invoiceDocument.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.invoiceDocument.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            invoice: false,
                        }
                    })
                }


                if (response && response.data && response.data.other === undefined || response && response.data && response.data.other.length == 0) {
                    this.setState({
                        otherUpload: false,
                        otherMultiSelection: false,
                        otherDataSave: false,
                        otherMultiSelection: false,
                        otherDocument1: [],
                        preDisbursalDocument: {
                            otherDocument: false,
                        }
                    })
                }

                if (response && response.data && response.data.insuranceUpload && response.data.insuranceUpload.filePath) {
                    this.setState({
                        insuranceUpload: true,
                        insuranceDoc: {
                            filename: response.data.insuranceUpload.fileName,
                            idToEdit: response.data.insuranceUpload.id || "",
                            filePath: response.data.insuranceUpload.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.insuranceUpload.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            insuranceUpload: false,
                        }
                    })
                }
                if (response && response.data && response.data.registrationDetails && response.data.registrationDetails.filePath) {
                    this.setState({
                        eSignUpload: true,
                        registrationDetails: {
                            filename: response.data.registrationDetails.fileName,
                            idToEdit: response.data.registrationDetails.id || "",
                            filePath: response.data.registrationDetails.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.registrationDetails.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            registrationDetails: false,
                        }
                    })
                }
                if (response && response.data && response.data.eAgreement && response.data.eAgreement.filePath) {
                    this.setState({
                        eAgreementUpload: true,
                        eAgreement: {
                            filename: response.data.eAgreement.fileName,
                            idToEdit: response.data.eAgreement.id || "",
                            filePath: response.data.eAgreement.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.eAgreement.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            eAgreement: false,
                        }
                    })
                }
                if (response && response.data && response.data.physicalRto && response.data.physicalRto.filePath) {
                    this.setState({
                        nachUpload: true,
                        physicalRto: {
                            filename: response.data.physicalRto.fileName,
                            idToEdit: response.data.physicalRto.id || "",
                            filePath: response.data.physicalRto.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.physicalRto.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        preDisbursalDocument: {
                            physicalRto: false,
                        }
                    })
                }

            }
        })
    }
    isdocumentName(text) {
        let valid = false;
        const documentName1 = /^[a-zA-Z ]*$/;
        if (text != '' && text != null && documentName1.test(text)) {
            valid = true;
        }

        this.setState({
            documentName: {
                ...this.state.documentName,
                isValid: valid,
            },
        });
    }

    handleCollapseExpand(key, valueToSet) {
        const keyToObj = this.state.preDisbursalDocument;
        keyToObj[key] = valueToSet;

        this.setState({
            preDisbursalDocument: keyToObj
        })
    }


    invoiceDoc() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            mainSalaryView,
            salarySlipName,
            imagePlaceHolderStyle,
            textFileName
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.invoice) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("invoice", false);
                    }}>
                        <Text style={pddLabel}>{"Invoice*"}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{"Invoice*"}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("invoice", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Invoice" />
                        {this.state.invoiceUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1,  marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    invoiceDocument: {
                                                                        ...state.invoiceDocument,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "invoiceDocument",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.invoiceDocument, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            invoiceDocument: {
                                                                ...state.invoiceDocument,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "invoiceDocument",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.invoiceDocument, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        invoiceUpload: true,
                                                        invoiceDocument: {
                                                            filename: response?.invoiceDocument?.fileName,
                                                            filePath: response?.invoiceDocument?.filePath?.replace('/var/www/html', uatURL.URL),
                                                            pdf: response?.invoiceDocument?.fileName?.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={"Upload Photo"}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await uploadDocument();
                                                this.setState((state, props) => ({
                                                    invoiceDocument: {
                                                        ...state.invoiceDocument,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "invoiceDocument",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.path?.split('/').pop(),
                                                        otherName: "",
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        invoiceUpload: true,
                                                        invoiceDocument: {
                                                            filename: response.invoiceDocument.fileName,
                                                            filePath: response.invoiceDocument.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.invoiceDocument.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.invoiceDocument, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.invoiceUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 10 }}>

                                {!this.state.invoiceDocument.pdf ?
                                    <FastImage
                                        source={{
                                            uri: `${this.state.invoiceDocument.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                invoiceDocument: {
                                                    ...state.invoiceDocument,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.invoiceDocument.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.invoiceDocument.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "invoiceDocument",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.invoiceDocument.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        invoiceDocument: {
                                                            ...state.invoiceDocument,
                                                            filename: null,
                                                        },
                                                        invoiceUpload: false
                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.invoiceDocument.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.invoiceDocument.filename}</Text>
                                </Text>
                                : null}

                        </View>
                    )}
                </View>
            )
        }
    }

    references() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            mainSalaryView,
            salarySlipName,
            imagePlaceHolderStyle,
            textFileName
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.references) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("references", false);
                    }}>
                        <Text style={pddLabel}>{"Invoice"}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{"Invoice"}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("references", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Reference 1" />
                        {this.state.refrences1Upload === false && (
                            <View style={buttonContainer}>
                                <View style={{ marginRight: 10, flex: 1, }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    Reference1: {
                                                                        ...state.Reference1,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "Reference1",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.Reference1, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            Reference1: {
                                                                ...state.Reference1,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "Reference1",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1),
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.Reference1, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        refrences1Upload: true,
                                                        Reference1: {
                                                            filename: response.Reference1.fileName,
                                                            filePath: response.Reference1.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.Reference1.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    Reference1: {
                                                        ...state.Reference1,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "Reference1",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: "",
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        refrences1Upload: true,
                                                        Reference1: {
                                                            filename: response.Reference1.fileName,
                                                            filePath: response.Reference1.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.Reference1.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.Reference1, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>

                            </View>)}
                    </View>
                    {this.state.refrences1Upload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.physicalRto.pdf ? 'space-around' : 'center', alignItems: this.state.registrationDetails.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>

                            {!this.state.Reference1.pdf ?

                                    <FastImage
                                        source={{
                                            uri: `${this.state.Reference1.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                Reference1: {
                                                    ...state.Reference1,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.Reference1.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.Reference1.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "Reference1",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.Reference1.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        Reference1: {
                                                            ...state.Reference1,
                                                            filename: null,
                                                        },
                                                        refrences1Upload: false
                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.Reference1.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.Reference1.filename}</Text>
                                </Text>
                                : null}

                        </View>
                    )}

                    <View style={{ marginBottom: 20, marginTop: 30 }}>
                        <TextImage label="Upload Reference 2"/>
                        {this.state.refrences2Upload === false && (
                            <View style={buttonContainer}>
                                <View style={{ marginRight: 10, flex: 1, }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    References2: {
                                                                        ...state.References2,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "References2",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.References2, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            References2: {
                                                                ...state.References2,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "References2",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.References2, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        refrences2Upload: true,
                                                        References2: {
                                                            filename: response.References2.fileName,
                                                            filePath: response.References2.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.References2.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    References2: {
                                                        ...state.References2,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "References2",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: "",
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        refrences2Upload: true,
                                                        References2: {
                                                            filename: response.References2.fileName,
                                                            filePath: response.References2.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.References2.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.References2, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.refrences2Upload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 10 }}>

                                {!this.state.References2.pdf ?
                                    <FastImage
                                        source={{
                                            uri: `${this.state.References2.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                References2: {
                                                    ...state.References2,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.References2.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.References2.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "References2",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.References2.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        References2: {
                                                            ...state.References2,
                                                            filename: null,
                                                        },
                                                        refrences2Upload: false
                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.References2.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.References2.filename}</Text>
                                </Text>
                                : null}

                        </View>
                    )}
                </View>
            )
        }
    }

    renderSecurityPDC() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            mainSalaryView,
            imagePlaceHolderStyle,
            textFileName,
            plusImageStyle1
        } = PreDisbursalDocumentStyles;
        if (this.state.preDisbursalDocument.securityPDC) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("securityPDC", false);
                    }}>
                        <Text style={pddLabel}>{PRE_DISBURSAL_DOCUMENT_CONST.SECURITY_PDC}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={[seperatorStyle, { marginTop: 10 }]} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{PRE_DISBURSAL_DOCUMENT_CONST.SECURITY_PDC}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("securityPDC", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextImage
                            label="Upload Security PDC 1" />
                        {this.state.uploadPDC1 === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {

                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    uploadSecurityPDC1: {
                                                                        ...state.uploadSecurityPDC1,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "pdc1",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.uploadSecurityPDC1, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            uploadSecurityPDC1: {
                                                                ...state.uploadSecurityPDC1,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "pdc1",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: ""
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.uploadSecurityPDC1, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }

                                                });
                                                const callback = (response) => {
                                                    this.setState({
                                                        uploadPDC1: true,

                                                        uploadSecurityPDC1: {
                                                            filename: response.pdc1.fileName,
                                                            filePath: response.pdc1.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.pdc1.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}

                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    uploadSecurityPDC1: {
                                                        ...state.uploadSecurityPDC1,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "pdc1",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        uploadPDC1: true,

                                                        uploadSecurityPDC1: {
                                                            filename: response.pdc1.fileName,
                                                            filePath: response.pdc1.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.pdc1.fileName.split('.').pop() == 'pdf' ? true : false,

                                                        }
                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.uploadSecurityPDC1, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}

                                    />
                                </View>
                            </View>)}

                        {this.state.uploadPDC1 === true && (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: this.state.uploadSecurityPDC1.pdf ? 'space-around' : 'center', alignItems: this.state.uploadSecurityPDC1.pdf ? 'center' : 'flex-start', marginBottom: 10, }}>
                                    {!this.state.uploadSecurityPDC1.pdf ?
                                        <Image
                                            source={{
                                                uri: `${this.state.uploadSecurityPDC1.filePath}`,
                                                // priority: Image.priority.high
                                            }}
                                            style={imagePlaceHolderStyle}
                                            onError={() =>
                                                this.setState((state, props) => ({
                                                    uploadSecurityPDC1: {
                                                        ...state.uploadSecurityPDC1,
                                                        filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                    }
                                                })
                                                )
                                            }
                                        />
                                        :
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginRight: 40,
                                            marginTop: 10
                                        }}>
                                            <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                            <TouchableOpacity onPress={() => {
                                                Linking.openURL(this.state.uploadSecurityPDC1.filePath)
                                            }
                                            }>
                                                <Text style={textFileName}>
                                                    {this.state.uploadSecurityPDC1.filename}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!this.state.isViewOnly) {
                                                this.props.deleteDisbursementDOCUMENT({
                                                    data: {
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        docType: "pdc1",
                                                        disbursementType: this.state.disbursementType,
                                                        docName: this.state.uploadSecurityPDC1.filename
                                                    },
                                                    callback: (response) => {
                                                        this.setState((state, props) => ({
                                                            uploadSecurityPDC1: {
                                                                ...state.uploadSecurityPDC1,
                                                                filename: null,
                                                            },
                                                            uploadPDC1: false

                                                        }))
                                                    }
                                                })
                                            }
                                        }}>
                                        <Image source={DELETEBUTTON} style={plusImageStyle} />
                                    </TouchableOpacity>
                                </View>
                                {!this.state.uploadSecurityPDC1.pdf ?
                                    <Text style={{ marginBottom: 10, alignSelf: 'center', flex: 1 }}>
                                        {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                        <Text style={textFileName}> {this.state.uploadSecurityPDC1.filename}</Text>
                                    </Text> : null}
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TextImage
                            label="Upload Security PDC 2" />
                        {this.state.uploadPDC2 === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    uploadSecurityPDC2: {
                                                                        ...state.uploadSecurityPDC2,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "pdc2",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.uploadSecurityPDC2, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            uploadSecurityPDC2: {
                                                                ...state.uploadSecurityPDC2,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "pdc2",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.uploadSecurityPDC2, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                });
                                                const callback = (response) => {
                                                    this.setState({
                                                        uploadPDC2: true,
                                                        uploadSecurityPDC2: {
                                                            filename: response.pdc2.fileName,
                                                            filePath: response.pdc2.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.pdc2.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    uploadSecurityPDC2: {
                                                        ...state.uploadSecurityPDC2,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "pdc2",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        uploadPDC2: true,
                                                        uploadSecurityPDC2: {
                                                            filename: response.pdc2.fileName,
                                                            filePath: response.pdc2.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.pdc2.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }
                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.uploadSecurityPDC2, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                        {this.state.uploadPDC2 === true && (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: this.state.uploadSecurityPDC2.pdf ? 'space-around' : 'center', alignItems: this.state.uploadSecurityPDC2.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>
                                    {!this.state.uploadSecurityPDC2.pdf ?
                                        <Image
                                            source={{
                                                uri: `${this.state.uploadSecurityPDC2.filePath}`,
                                                // priority: Image.priority.high
                                            }}
                                            style={imagePlaceHolderStyle}
                                            onError={() =>
                                                this.setState((state, props) => ({
                                                    uploadSecurityPDC2: {
                                                        ...state.uploadSecurityPDC2,
                                                        filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                    }
                                                })
                                                )
                                            }
                                        />
                                        :
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginRight: 40,
                                            marginTop: 10
                                        }}>
                                            <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                            <TouchableOpacity onPress={() => {
                                                Linking.openURL(this.state.uploadSecurityPDC2.filePath)
                                            }
                                            }>
                                                <Text style={textFileName}>
                                                    {this.state.uploadSecurityPDC2.filename}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!this.state.isViewOnly) {
                                                this.props.deleteDisbursementDOCUMENT({
                                                    data: {
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        docType: "pdc2",
                                                        disbursementType: this.state.disbursementType,
                                                        docName: this.state.uploadSecurityPDC2.filename
                                                    },
                                                    callback: (response) => {
                                                        this.setState((state, props) => ({
                                                            uploadSecurityPDC2: {
                                                                ...state.uploadSecurityPDC2,
                                                                filename: null,
                                                            },
                                                            uploadPDC2: false

                                                        }))
                                                    }
                                                })
                                            }
                                        }}>
                                        <Image source={DELETEBUTTON} style={plusImageStyle} />
                                    </TouchableOpacity>
                                </View>
                                {!this.state.uploadSecurityPDC2.pdf ?
                                    <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                        {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                        <Text style={textFileName}> {this.state.uploadSecurityPDC2.filename}</Text>
                                    </Text> : null}
                            </View>
                        )}
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <TextImage
                            label="Upload Security PDC 3" />
                        {this.state.uploadPDC3 === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    uploadSecurityPDC3: {
                                                                        ...state.uploadSecurityPDC3,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "pdc3",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.uploadSecurityPDC3, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            uploadSecurityPDC3: {
                                                                ...state.uploadSecurityPDC3,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "pdc3",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.uploadSecurityPDC3, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        uploadPDC3: true,
                                                        uploadSecurityPDC3: {
                                                            filename: response.pdc3.fileName,
                                                            filePath: response.pdc3.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.pdc3.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}

                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    uploadSecurityPDC3: {
                                                        ...state.uploadSecurityPDC3,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "pdc3",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        uploadPDC3: true,
                                                        uploadSecurityPDC3: {
                                                            filename: response.pdc3.fileName,
                                                            filePath: response.pdc3.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.pdc3.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.uploadSecurityPDC3, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}

                        {this.state.uploadPDC3 === true && (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: this.state.uploadSecurityPDC3.pdf ? 'space-around' : 'center', alignItems: this.state.uploadSecurityPDC3.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>
                                    {!this.state.uploadSecurityPDC3.pdf ?
                                        <Image
                                            source={{
                                                uri: `${this.state.uploadSecurityPDC3.filePath}`,
                                                // priority: Image.priority.high
                                            }}
                                            style={imagePlaceHolderStyle}
                                            onError={() =>
                                                this.setState((state, props) => ({
                                                    uploadSecurityPDC3: {
                                                        ...state.uploadSecurityPDC3,
                                                        filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                    }
                                                })
                                                )
                                            }
                                        />
                                        :
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginRight: 40,
                                            marginTop: 10
                                        }}>
                                            <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                            <TouchableOpacity onPress={() => {
                                                Linking.openURL(this.state.uploadSecurityPDC3.filePath)
                                            }
                                            }>
                                                <Text style={textFileName}>
                                                    {this.state.uploadSecurityPDC3.filename}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!this.state.isViewOnly) {
                                                this.props.deleteDisbursementDOCUMENT({
                                                    data: {
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        docType: "pdc3",
                                                        disbursementType: this.state.disbursementType,
                                                        docName: this.state.uploadSecurityPDC3.filename
                                                    },
                                                    callback: (response) => {
                                                        this.setState((state, props) => ({
                                                            uploadSecurityPDC3: {
                                                                ...state.uploadSecurityPDC3,
                                                                filename: null,
                                                            },
                                                            uploadPDC3: false

                                                        }))
                                                    }
                                                })
                                            }
                                        }}>
                                        <Image source={DELETEBUTTON} style={plusImageStyle} />
                                    </TouchableOpacity>
                                </View>
                                {!this.state.uploadSecurityPDC3.pdf ?
                                    <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                        {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                        <Text style={textFileName}> {this.state.uploadSecurityPDC3.filename}</Text>
                                    </Text> : null}
                            </View>
                        )}
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Security PDC 4" />
                        {this.state.uploadPDC4 === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    uploadSecurityPDC4: {
                                                                        ...state.uploadSecurityPDC4,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "pdc4",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.uploadSecurityPDC4, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            uploadSecurityPDC4: {
                                                                ...state.uploadSecurityPDC4,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "pdc4",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.uploadSecurityPDC4, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        uploadPDC4: true,
                                                        uploadSecurityPDC4: {
                                                            filename: response.pdc4.fileName,
                                                            filePath: response.pdc4.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.pdc4.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }
                                        }
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    uploadSecurityPDC4: {
                                                        ...state.uploadSecurityPDC4,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "pdc4",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        uploadPDC4: true,
                                                        uploadSecurityPDC4: {
                                                            filename: response.pdc4.fileName,
                                                            filePath: response.pdc4.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.pdc4.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.uploadSecurityPDC4, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }
                                        }
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.uploadPDC4 === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.uploadSecurityPDC4.pdf ? 'space-around' : 'center', alignItems: this.state.uploadSecurityPDC4.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>
                                {!this.state.uploadSecurityPDC4.pdf ?
                                    <Image
                                        source={{
                                            uri: `${this.state.uploadSecurityPDC4.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                uploadSecurityPDC4: {
                                                    ...state.uploadSecurityPDC4,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.uploadSecurityPDC4.filePath)
                                        }
                                        }>
                                            <Text style={textFileName}>
                                                {this.state.uploadSecurityPDC4.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "pdc4",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.uploadSecurityPDC4.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        uploadSecurityPDC4: {
                                                            ...state.uploadSecurityPDC4,
                                                            filename: null,
                                                        },
                                                        uploadPDC4: false

                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.uploadSecurityPDC4.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.uploadSecurityPDC4.filename}</Text>
                                </Text> : null}
                        </View>
                    )}
                </View>
            )
        }
    }

    taxPaidToRto() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            mainSalaryView,
            salarySlipName,
            imagePlaceHolderStyle,
            textFileName,
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.taxPaidToRtoDoc) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("taxPaidToRtoDoc", false);
                    }}>
                        <Text style={pddLabel}>{'One Time Tax Paid to RTO*'}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{'One Time Tax Paid to RTO*'}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("taxPaidToRtoDoc", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload One Time Tax Paid to RTO" />
                        {this.state.taxPaidToRtoUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    taxPaidToRtoDoc: {
                                                                        ...state.taxPaidToRtoDoc,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "oneTimeTaxPaidToRto",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.taxPaidToRtoDoc, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            taxPaidToRtoDoc: {
                                                                ...state.taxPaidToRtoDoc,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "oneTimeTaxPaidToRto",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.taxPaidToRtoDoc, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        taxPaidToRtoUpload: true,
                                                        taxPaidToRtoDoc: {
                                                            filename: response.oneTimeTaxPaidToRto.fileName,
                                                            filePath: response.oneTimeTaxPaidToRto.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.oneTimeTaxPaidToRto.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }
                                        }
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    taxPaidToRtoDoc: {
                                                        ...state.taxPaidToRtoDoc,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "oneTimeTaxPaidToRto",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        taxPaidToRtoUpload: true,
                                                        taxPaidToRtoDoc: {
                                                            filename: response.oneTimeTaxPaidToRto.fileName,
                                                            filePath: response.oneTimeTaxPaidToRto.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.oneTimeTaxPaidToRto.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }
                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.taxPaidToRtoDoc, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.taxPaidToRtoUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.taxPaidToRtoDoc.pdf ? 'space-around' : 'center', alignItems: this.state.taxPaidToRtoDoc.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>
                                {!this.state.taxPaidToRtoDoc.pdf ?
                                    <Image
                                        source={{
                                            uri: `${this.state.taxPaidToRtoDoc.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                taxPaidToRtoDoc: {
                                                    ...state.taxPaidToRtoDoc,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.taxPaidToRtoDoc.filePath)
                                        }
                                        }>
                                            <Text style={textFileName}>
                                                {this.state.taxPaidToRtoDoc.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "oneTimeTaxPaidToRto",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.taxPaidToRtoDoc.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        taxPaidToRtoDoc: {
                                                            ...state.taxPaidToRtoDoc,
                                                            filename: null,
                                                        },
                                                        taxPaidToRtoUpload: false

                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.taxPaidToRtoDoc.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center' }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.taxPaidToRtoDoc.filename}</Text>
                                </Text> : null}
                        </View>
                    )
                    }
                </View >
            )
        }
    }

    ValuationReport () {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            imagePlaceHolderStyle,
            textFileName,
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.proValuationReport ) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("proValuationReport ", false);
                    }}>
                        <Text style={pddLabel}>{'Valuation Report'}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{'Valuation Report'}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("proValuationReport ", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Valuation Report" />
                        {this.state.valuationReportUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    valuationReport: {
                                                                        ...state.valuationReport,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "valuationReport",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.valuationReport, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            valuationReport: {
                                                                ...state.valuationReport,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "valuationReport",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.valuationReport, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        valuationReportUpload: true,
                                                        valuationReport: {
                                                            filename: response.valuationReport.fileName,
                                                            filePath: response.valuationReport.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.valuationReport.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    valuationReport: {
                                                        ...state.valuationReport,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "valuationReport",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        valuationReportUpload: true,
                                                        valuationReport: {
                                                            filename: response.valuationReport.fileName,
                                                            filePath: response.valuationReport.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.valuationReport.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.valuationReport, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.valuationReportUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.valuationReport.pdf ? 'space-around' : 'center', alignItems: this.state.valuationReport.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>
                                {!this.state.valuationReport.pdf ?
                                    <Image
                                        source={{
                                            uri: `${this.state.valuationReport.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                valuationReport: {
                                                    ...state.valuationReport,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.valuationReport.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.valuationReport.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "valuationReport",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.valuationReport.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        valuationReport: {
                                                            ...state.valuationReport,
                                                            filename: null,
                                                        },
                                                        valuationReportUpload: false

                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.valuationReport.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center' }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.valuationReport.filename}</Text>
                                </Text> : null}

                        </View>
                    )}
                </View>
            )
        }
    }

    renderInsuranceCopy() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            mainSalaryView,
            salarySlipName,
            imagePlaceHolderStyle,
            textFileName
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.insuranceCopy) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("insuranceCopy", false);
                    }}>
                        <Text style={pddLabel}>{PRE_DISBURSAL_DOCUMENT_CONST.INSURANCE_COPY}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{PRE_DISBURSAL_DOCUMENT_CONST.INSURANCE_COPY}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("insuranceCopy", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Insurance Copy" />
                        {this.state.insuranceCopyUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    insuranceCopy: {
                                                                        ...state.insuranceCopy,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "insuranceCopy",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.insuranceCopy, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            insuranceCopy: {
                                                                ...state.insuranceCopy,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "insuranceCopy",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.insuranceCopy, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        insuranceCopyUpload: true,
                                                        insuranceCopy: {
                                                            filename: response.insuranceCopy.fileName,
                                                            filePath: response.insuranceCopy.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.insuranceCopy.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    insuranceCopy: {
                                                        ...state.insuranceCopy,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "insuranceCopy",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        insuranceCopyUpload: true,
                                                        insuranceCopy: {
                                                            filename: response.insuranceCopy.fileName,
                                                            filePath: response.insuranceCopy.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.insuranceCopy.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.insuranceCopy, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.insuranceCopyUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.insuranceCopy.pdf ? 'space-around' : 'center', alignItems: this.state.insuranceCopy.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>

                                {!this.state.insuranceCopy.pdf ?
                                    <FastImage
                                        source={{
                                            uri: `${this.state.insuranceCopy.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                insuranceCopy: {
                                                    ...state.insuranceCopy,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.insuranceCopy.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.insuranceCopy.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "insuranceCopy",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.insuranceCopy.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        insuranceCopy: {
                                                            ...state.insuranceCopy,
                                                            filename: null,
                                                        },
                                                        insuranceCopyUpload: false
                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.insuranceCopy.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.insuranceCopy.filename}</Text>
                                </Text>
                                : null}

                        </View>
                    )}
                </View>
            )
        }
    }

    renderkliForm() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            mainSalaryView,
            salarySlipName,
            deleteImageStyle,
            deleteImageStyle1,
            imagePlaceHolderStyle1,
            textFileName
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.kliForm) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("kliForm", false);
                    }}>
                        <Text style={pddLabel}>{PRE_DISBURSAL_DOCUMENT_CONST.KLI_FORM}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{PRE_DISBURSAL_DOCUMENT_CONST.KLI_FORM}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("kliForm", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload KLI Form" />
                        {this.state.kliDataSave === false && (

                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        isDisabled={this.state.kliForm1.length == 10}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    // if (bytesToMegaBytes(image.size) > 5) {
                                                    ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                        .then((response) => {

                                                            this.setState((state, props) => ({
                                                                kliForm: {
                                                                    ...state.kliForm,
                                                                    disbursementType: this.state.disbursementType,
                                                                    docType: "kliForm",
                                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                                    filename: response.name,
                                                                    multiFileUpload: true,
                                                                },
                                                            }));
                                                            zipFileDisbursementTakePhoto2(response, this.state.kliForm, this.props.uploadDisbusementDOCUMENT, callback)

                                                        }).catch(err => {
                                                        });
                                                })
                                                const callback = (response) => {
                                                    this.componentDidMount()

                                                }

                                            }
                                        }}
                                    />
                                </View>
                                {

                                    <View style={{ flex: 1 }}>
                                        <Button
                                            isDisabled={this.state.kliForm1.length !== 0}
                                            title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                            onPress={async () => {
                                                if (!this.state.isViewOnly) {
                                                    let fileDetails = await selectFilePDF();
                                                    let payload =
                                                    {
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "kliForm",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    }

                                                    const callback = (response) => {
                                                        this.componentDidMount()
                                                    }
                                                    zipFileDisbursementUpload(fileDetails, payload, this.props.uploadDisbusementDOCUMENT, callback);
                                                }
                                            }}
                                        />
                                    </View>

                                }
                            </View>
                        )}
                    </View>
                    {this.state.kliUpload === true && (
                        <View style={{}}>
                            <FlatList
                                data={Object.keys(this.state.kliForm1)}
                                extraData={this.state}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: this.state.kliForm1[item].fileName.split('.').pop() == 'pdf' ? 'space-around' : 'center', alignItems: this.state.kliForm1[item].fileName.split('.').pop() == 'pdf' ? 'center' : 'flex-start', marginTop: 20 }}>

                                            {!(this.state.kliForm1[item].fileName.split('.').pop() == 'pdf') ?
                                                <Image
                                                    source={{
                                                        uri: `${this.state.kliForm1[item].filePath.replace('/var/www/html', uatURL.URL)}`,
                                                    }}
                                                    style={imagePlaceHolderStyle1}
                                                />
                                                :
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginRight: 40,
                                                    marginTop: 10
                                                }}>
                                                    <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                                    <TouchableOpacity onPress={() => {
                                                        Linking.openURL(this.state.kliForm1[item].filePath.replace('/var/www/html', uatURL.URL))
                                                    }
                                                    }>
                                                        <Text style={textFileName}>
                                                            {this.state.kliForm1[item].fileName}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (!this.state.isViewOnly) {

                                                        this.props.deleteDisbursementDOCUMENT({
                                                            data: {
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                docType: "kliForm",
                                                                disbursementType: this.state.disbursementType,
                                                                docName: this.state.kliForm1[item].fileName
                                                            },
                                                            callback: (response) => {
                                                                setTimeout(() => {
                                                                    this.componentDidMount()
                                                                }, 1000)
                                                            }
                                                        })
                                                    }
                                                }}>
                                                <Image source={DELETEBUTTON}
                                                    style={!(this.state.kliForm1[item].fileName.split('.').pop() == 'pdf') ? deleteImageStyle : deleteImageStyle1} />
                                            </TouchableOpacity>
                                        </View>
                                        {!(this.state.kliForm1[item].fileName.split('.').pop() == 'pdf') ?
                                            <Text style={{ marginTop: 8, alignSelf: 'center', marginRight: 30 }}>
                                                <Text style={textFileName}> {this.state.kliForm1[item].fileName}</Text>
                                            </Text> : null}
                                    </View>
                                )}
                            />
                        </View>
                    )}
                </View>
            )
        }
    }

    renderOtherDocument() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            mainSalaryView,
            salarySlipName,
            errorLabel,
            deleteImageStyle,
            deleteImageStyle1,
            imagePlaceHolderStyle1,
            textFileName,
            textInputStyle,
            inputStyle1,
            separatorStyle1,
            buttonSave
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.otherDocument) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("otherDocument", false);
                    }}>
                        <Text style={pddLabel}>{PRE_DISBURSAL_DOCUMENT_CONST.OTHER_DOCUMENT}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{PRE_DISBURSAL_DOCUMENT_CONST.OTHER_DOCUMENT}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("otherDocument", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>

                        <FloatingLabelInput
                            inputStyles={textInputStyle}
                            //!this.state.isViewOnly
                            editable={!this.state.isViewOnly ? true : false}
                            value={this.state.documentName.value || undefined}
                            maxLength={20}
                            onChangeText={(text) => {
                                this.setState(
                                    {
                                        otherName: text,
                                        documentName: {
                                            ...this.state.documentName,
                                            value: text,
                                        },
                                    },
                                    () => {
                                        this.isdocumentName(this.state.documentName.value);
                                    },
                                );
                            }}
                            label={PRE_DISBURSAL_DOCUMENT_CONST.PLACEHOLDER_NAME}
                            containerStyles={inputStyle1}
                            customLabelStyles={{
                                colorFocused: colors.COLOR_BLUE,
                                colorBlurred: colors.COLOR_LIGHT_GREY,
                                fontSizeFocused: 15,
                                fontSizeBlurred: 15,
                            }}
                        />
                        <View style={separatorStyle1} />
                        {!this.state.documentName.isValid && (
                            <Text style={errorLabel}>
                                {this.state.documentName.value === '' ||
                                    this.state.documentName.value === null
                                    ? PRE_DISBURSAL_DOCUMENT_CONST.MANDATORY_NAME
                                    : PRE_DISBURSAL_DOCUMENT_CONST.VALID_NAME}
                            </Text>
                        )}

                        <View style={{ marginTop: 20 }}>
                            <TextImage
                                label="Upload Document" />
                            {this.state.otherDataSave === false && (

                                <View style={buttonContainer}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        <Button
                                            title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                            isDisabled={this.state.otherDocument1.length == 10}
                                            onPress={async () => {
                                                if (!this.state.isViewOnly) {
                                                    if (this.state.documentName.value === "" || this.state.documentName.value === undefined) {
                                                        this.isdocumentName()
                                                    }
                                                    else if (this.state.documentName.isValid == false) {
                                                        this.isdocumentName()
                                                    }
                                                    else {

                                                        ImagePicker.openCamera({
                                                            cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                        }).then((image) => {
                                                            // if (bytesToMegaBytes(image.size) > 5) {
                                                            ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                                .then((response) => {
                                                                    total = (parseFloat(total) + parseFloat(response.size)).toFixed(2)

                                                                    this.setState((state, props) => ({
                                                                        otherDocument: {
                                                                            ...state.otherDocument,
                                                                            disbursementType: this.state.disbursementType,
                                                                            docType: "other",
                                                                            applicantUniqueId: this.state.applicantUniqueId,
                                                                            filename: response.name,
                                                                            multiFileUpload: true,
                                                                        },
                                                                    }));
                                                                    zipFileDisbursementTakePhoto2(response, this.state.otherDocument, this.props.uploadDisbusementDOCUMENT, callback)

                                                                }).catch(err => {
                                                                });
                                                        })
                                                        const callback = (response) => {
                                                            this.componentDidMount()

                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </View>
                                    {

                                        <View style={{ flex: 1 }}>
                                            <Button
                                                isDisabled={this.state.otherDocument1.length !== 0}
                                                title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                                onPress={async () => {
                                                    if (!this.state.isViewOnly) {
                                                        if (this.state.documentName.value == '') {
                                                            this.isdocumentName()
                                                        }
                                                        else if (this.state.documentName.isValid == false) {
                                                            this.isdocumentName()
                                                        }
                                                        else {
                                                            let fileDetails = await selectFilePDF();
                                                            let payload =
                                                            {
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "other",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: fileDetails?.name,
                                                                otherName: this.state.documentName.value,
                                                            }

                                                            const callback = (response) => {
                                                                this.componentDidMount()
                                                                // this.setState({
                                                                //     otherUpload: true,
                                                                //     otherDataSave: true,
                                                                //     otherDocument: response.other
                                                                // })
                                                            }
                                                            zipFileDisbursementUpload(fileDetails, payload, this.props.uploadDisbusementDOCUMENT, callback);
                                                        }
                                                    }
                                                }
                                                }
                                            />
                                        </View>

                                    }


                                </View>
                            )}

                        </View>
                    </View>
                    {this.state.otherUpload === true && (
                        <View style={{}}>
                            <FlatList
                                data={Object.keys(this.state.otherDocument1)}
                                extraData={this.state}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: this.state.otherDocument1[item].fileName.split('.').pop() == 'pdf' ? 'space-around' : 'center', alignItems: this.state.otherDocument1[item].fileName.split('.').pop() == 'pdf' ? 'center' : 'flex-start', marginTop: 20 }}>

                                            {!(this.state.otherDocument1[item].fileName.split('.').pop() == 'pdf') ?
                                                <Image
                                                    source={{
                                                        uri: `${this.state.otherDocument1[item].response == undefined ? this.state.otherDocument1[item].filePath.replace('/var/www/html', uatURL.URL) : this.state.otherDocument1[item].response.uri}`,
                                                        // priority: Image.priority.high
                                                    }}
                                                    style={imagePlaceHolderStyle1}

                                                />
                                                :
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginRight: 40,
                                                    marginTop: 10,

                                                }}>
                                                    <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                                    <TouchableOpacity onPress={() => {
                                                        Linking.openURL(this.state.otherDocument1[item].filePath.replace('/var/www/html', uatURL.URL))
                                                    }
                                                    }>
                                                        <Text style={[textFileName, { marginLeft: 10 }]}>
                                                            {this.state.otherDocument1[item].fileName}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (!this.state.isViewOnly) {

                                                        this.props.deleteDisbursementDOCUMENT({
                                                            data: {
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                docType: "other",
                                                                disbursementType: this.state.disbursementType,
                                                                docName: this.state.otherDocument1[item].fileName
                                                            },
                                                            callback: (response) => {
                                                                setTimeout(() => {
                                                                    this.componentDidMount()
                                                                }, 1000)
                                                            }
                                                        })
                                                    }
                                                }}>
                                                <Image source={DELETEBUTTON}
                                                    style={!(this.state.otherDocument1[item].fileName.split('.').pop() == 'pdf') ? deleteImageStyle : deleteImageStyle1} />
                                            </TouchableOpacity>
                                        </View>
                                        {!(this.state.otherDocument1[item].fileName.split('.').pop() == 'pdf') ?
                                            <Text style={[textFileName, { marginTop: 5, alignSelf: 'center', marginRight: 30, marginLeft: 10 }]}>
                                                <Text style={{ textFileName }}> {this.state.otherDocument1[item].fileName}</Text>
                                            </Text> : null}
                                    </View>
                                )}
                            />
                        </View>
                    )}
                </View >
            )
        }
    }

    insuranceUpload() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            imagePlaceHolderStyle,
            textFileName
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.insuranceUpload) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("insuranceUpload", false);
                    }}>
                        <Text style={pddLabel}>{"Insurance*"}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{"Insurance*"}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("insuranceUpload", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Insurance" />
                        {this.state.insuranceUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    insuranceDoc: {
                                                                        ...state.insuranceDoc,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "insuranceUpload",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.insuranceDoc, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            insuranceDoc: {
                                                                ...state.insuranceDoc,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "insuranceUpload",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.insuranceDoc, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        insuranceUpload: true,
                                                        insuranceDoc: {
                                                            filename: response.insuranceUpload.fileName,
                                                            filePath: response.insuranceUpload.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.insuranceUpload.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    insuranceDoc: {
                                                        ...state.insuranceDoc,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "insuranceUpload",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        insuranceUpload: true,
                                                        insuranceDoc: {
                                                            filename: response.insuranceUpload.fileName,
                                                            filePath: response.insuranceUpload.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.insuranceUpload.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.insuranceDoc, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.insuranceUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.insuranceDoc.pdf ? 'space-around' : 'center', alignItems: this.state.insuranceDoc.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>

                                {!this.state.insuranceDoc.pdf ?
                                    <FastImage
                                        source={{
                                            uri: `${this.state.insuranceDoc.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                insuranceDoc: {
                                                    ...state.insuranceDoc,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.insuranceDoc.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.insuranceDoc.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "insuranceUpload",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.insuranceDoc.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        insuranceDoc: {
                                                            ...state.insuranceDoc,
                                                            filename: null,
                                                        },
                                                        insuranceUpload: false
                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.insuranceDoc.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.insuranceDoc.filename}</Text>
                                </Text>
                                : null}

                        </View>
                    )}
                </View>
            )
        }
    }

    registrationDetails() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            imagePlaceHolderStyle,
            textFileName
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.registrationDetails) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("registrationDetails", false);
                    }}>
                        <Text style={pddLabel}>{"Registration Details"}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{"Registration Details"}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("registrationDetails", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Registration Details" />
                        {this.state.eSignUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    registrationDetails: {
                                                                        ...state.registrationDetails,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "registrationDetails",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.registrationDetails, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            registrationDetails: {
                                                                ...state.registrationDetails,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "registrationDetails",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.registrationDetails, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        eSignUpload: true,
                                                        registrationDetails: {
                                                            filename: response.registrationDetails.fileName,
                                                            filePath: response.registrationDetails.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.registrationDetails.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    registrationDetails: {
                                                        ...state.registrationDetails,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "registrationDetails",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        eSignUpload: true,
                                                        registrationDetails: {
                                                            filename: response.registrationDetails.fileName,
                                                            filePath: response.registrationDetails.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.registrationDetails.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.registrationDetails, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.eSignUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.registrationDetails.pdf ? 'space-around' : 'center', alignItems: this.state.registrationDetails.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>

                                {!this.state.registrationDetails.pdf ?
                                    <FastImage
                                        source={{
                                            uri: `${this.state.registrationDetails.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                registrationDetails: {
                                                    ...state.registrationDetails,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.registrationDetails.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.registrationDetails.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "registrationDetails",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.registrationDetails.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        registrationDetails: {
                                                            ...state.registrationDetails,
                                                            filename: null,
                                                        },
                                                        eSignUpload: false
                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.registrationDetails.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.registrationDetails.filename}</Text>
                                </Text>
                                : null}

                        </View>
                    )}
                </View>
            )
        }
    }

    physicalRto() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            imagePlaceHolderStyle,
            textFileName
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.physicalRto) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("physicalRto", false);
                    }}>
                        <Text style={pddLabel}>{"Physical RTO*"}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{"Physical RTO*"}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("physicalRto", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Physical RTO" />
                        {this.state.nachUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    physicalRto: {
                                                                        ...state.physicalRto,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "physicalRto",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.physicalRto, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            physicalRto: {
                                                                ...state.physicalRto,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "physicalRto",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.physicalRto, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        nachUpload: true,
                                                        physicalRto: {
                                                            filename: response.physicalRto.fileName,
                                                            filePath: response.physicalRto.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.physicalRto.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    physicalRto: {
                                                        ...state.physicalRto,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "physicalRto",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        nachUpload: true,
                                                        physicalRto: {
                                                            filename: response.physicalRto.fileName,
                                                            filePath: response.physicalRto.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.physicalRto.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.physicalRto, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.nachUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.physicalRto.pdf ? 'space-around' : 'center', alignItems: this.state.registrationDetails.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>

                                {!this.state.physicalRto.pdf ?
                                    <FastImage
                                        source={{
                                            uri: `${this.state.physicalRto.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                physicalRto: {
                                                    ...state.physicalRto,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.physicalRto.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.physicalRto.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "physicalRto",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.physicalRto.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        physicalRto: {
                                                            ...state.physicalRto,
                                                            filename: null,
                                                        },
                                                        nachUpload: false
                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.physicalRto.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.physicalRto.filename}</Text>
                                </Text>
                                : null}

                        </View>
                    )}
                </View>
            )
        }
    }

    eAgreement() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            imagePlaceHolderStyle,
            textFileName
        } = PreDisbursalDocumentStyles;

        if (this.state.preDisbursalDocument.eAgreement) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("eAgreement", false);
                    }}>
                        <Text style={pddLabel}>{"eAgreement*"}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{"eAgreement*"}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("eAgreement", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload eAgreement" />
                        {this.state.eAgreementUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                ImagePicker.openCamera({
                                                    cropping: true,
                                                    freeStyleCropEnabled: true,
                                                    hideBottomControls: true,
                                                }).then((image) => {
                                                    if (bytesToMegaBytes(image.size) > 5) {
                                                        ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
                                                            .then((response) => {
                                                                this.setState((state, props) => ({
                                                                    eAgreement: {
                                                                        ...state.eAgreement,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "eAgreement",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.eAgreement, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            eAgreement: {
                                                                ...state.eAgreement,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "eAgreement",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.eAgreement, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        eAgreementUpload: true,
                                                        eAgreement: {
                                                            filename: response.eAgreement.fileName,
                                                            filePath: response.eAgreement.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.eAgreement.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={PRE_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFilePDF();
                                                this.setState((state, props) => ({
                                                    eAgreement: {
                                                        ...state.eAgreement,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "eAgreement",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        eAgreementUpload: true,
                                                        eAgreement: {
                                                            filename: response.eAgreement.fileName,
                                                            filePath: response.eAgreement.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.eAgreement.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.eAgreement, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.eAgreementUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.eAgreement.pdf ? 'space-around' : 'center', alignItems: this.state.registrationDetails.pdf ? 'center' : 'flex-start', marginBottom: 10 }}>

                                {!this.state.eAgreement.pdf ?
                                    <FastImage
                                        source={{
                                            uri: `${this.state.eAgreement.filePath}`,
                                            // priority: Image.priority.high
                                        }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                eAgreement: {
                                                    ...state.eAgreement,
                                                    filePath: 'https://www.toddbershaddvm.com/wp-content/suploads/sites/257/2018/09/placeholder-img.jpg',
                                                }
                                            })
                                            )
                                        }
                                    />
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 40,
                                        marginTop: 10
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.eAgreement.filePath)
                                        }
                                        }>
                                            <Text style={[textFileName, { flex: 1 }]}>
                                                {this.state.eAgreement.filename}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteDisbursementDOCUMENT({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    docType: "eAgreement",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.eAgreement.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        eAgreement: {
                                                            ...state.eAgreement,
                                                            filename: null,
                                                        },
                                                        eAgreementUpload: false
                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON} style={plusImageStyle} />
                                </TouchableOpacity>
                            </View>
                            {!this.state.physicalRto.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={textFileName}> {this.state.eAgreement.filename}</Text>
                                </Text>
                                : null}

                        </View>
                    )}
                </View>
            )
        }
    }

    renderButton() {
        const {
            buttonNavigation,
        } = PreDisbursalDocumentStyles;
        return (
            <View style={buttonNavigation}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Button
                        title={PRE_DISBURSAL_DOCUMENT_CONST.BUTTON_TITLE_LOAN_SUMMARY}
                        onPress={() => {
                            this.props.navigation.navigate('LoanSummary', { applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant })
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title={PRE_DISBURSAL_DOCUMENT_CONST.BUTTON_TITLE_NEXT}

                        onPress={() => {
                            this.state.physicalRto.filename !== null && this.state.invoiceDocument.filename !== null  && this.state.eAgreement.filename !== null ?
                                this.props.navigation.navigate('RepaymentDetails', {
                                    applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant

                                })
                                :
                                handleError("Please Upload Mandatory Documents")
                        }}
                    />
                </View>
            </View>
        )
    }

    render() {
        const {
            mainContainer,
            separatorStyle1
        } = PreDisbursalDocumentStyles;
        return (
            <WaveBackground>
                <StatusBar
                    backgroundColor={colors.COLOR_WHITE}
                    barStyle={'dark-content'}
                    translucent={false}
                    hidden={false}
                />
                <Header showLeftIcon={false}
                    label={PRE_DISBURSAL_DOCUMENT_CONST.HEADER}
                    onPress={() => {
                    }
                    } />

                <ScrollView style={{ marginBottom: 20 }}>

                    <View style={mainContainer}>
                        {/* {this.references()} */}
                        {this.invoiceDoc()}
                        {/* {this.renderSecurityPDC()} */}
                        {this.insuranceUpload()}
                        {this.taxPaidToRto()}
                        {this.physicalRto()}
                        {this.registrationDetails()}
                        {/* {this.eAgreement()}
                        {this.ValuationReport ()} */}
                        {/* {this.renderInsuranceCopy()}
                        {this.renderkliForm()}
                        {this.renderOtherDocument()} */}

                        {/* <View style={[separatorStyle1, { height: 2, marginBottom: 30, marginTop: 20 }]} />
                        {this.renderButton()} */}

                    </View>
                </ScrollView>
            </WaveBackground>
        )
    }
}

export default compose(
    container,
    withProps(
        (qdeSuccessAPI) => qdeSuccessAPI,
        (submitToCredit) => submitToCredit,
    ),
)(PreDisbursalDocument);
