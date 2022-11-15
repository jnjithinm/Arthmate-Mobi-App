import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {  ScrollView, StatusBar, Text, View, TouchableOpacity, Image, TextInput, Linking } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { compose, withProps } from 'recompose';
import { Button } from '../../components/Button/Button';
import {
    BLUE_PLUS_ICON,
    MINUS_ICON,
    PLACEHOLDER_IMAGE,
    UPLOADIMAGEPDF,
    DELETEBUTTON
} from '../../constants/imgConsts';
import FastImage from 'react-native-fast-image'
import { Header } from '../../components/Header/Header';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { selectFileImagePdf, zipFileDisbursementTakePhoto, zipFileDisbursementUpload, zipFileDisbursementTakePhoto2 } from '../../../uploadImageUtils';
import { POST_DISBURSAL_DOCUMENT_CONST } from '../../constants/screenConst';
import container from '../../container/PreDisbursementDocument/index';
import container1 from '../../container/RepaymentDetails/index';
import { PostDisbursalDocumentStyles } from './PostDisbursalDocumentStyles';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import { TextImage } from '../../components/TextImage/TextImage';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { baseURL, uatURL } from '../../../baseURL';
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';
import { bytesToMegaBytes, handleError, handleWarning } from '../../../utils';

const validation = /^[a-zA-Z0-9/]+$/i;

class PostDisbursalDocument extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postDisbursalDocument: {
                securityPDC: true,
                downPaymentReceipt: true,
                proFormaInvoice: true,
                insuranceCopy: true,
                kliForm: true,
                otherDocument: true,
                vehicleDetails: true,
            },

            uploadRCBook: {
                docName: null,
            },
            rtoTaxReciept: {
                docName: null
            },

            name: this.props.navigation.state.params.leadName || "",
            documentName: {
                value: "",
                isValid: true,
            },
            downPaymentReceipt: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            downPaymentUpload: false,
            performaInvoice: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            performaInvoiceUpload: false,
            insuranceCopy: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            insuranceCopyUpload: false,
            rcBook: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            rcBookUpload: false,
            rtoTaxReceipt: {
                filename: null,
                idToEdit: null,
                filePath: "",
                pdf: false
            },
            rtoTaxReceiptUpload: false,
            vehicleRegistrationNumber: {
                value: '',
                isValid: true,
            },
            vehicleChassisNumber: {
                value: '',
                isValid: true,
            },
            vehicleEngineNumber: {
                value: '',
                isValid: true,
            },
            vehicleDataSave: false,
            comment: {
                value: '',
                isValid: true,
            },
            applicantUniqueId: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.applicantUniqueId) || "",
            disbursementType: "post",
            leadCode: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.leadCode) || "",
            ismainapplicant: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.ismainapplicant) || "",
            employeeId: (this.props.userDataSelector?.userData?.data?.employeeId) || "",
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
                    response.mainapplicant.postSalesFreeze ? true : response?.modelAccess[0]?.read ? true : 
                    false
                })
            }
        })
    }

    componentDidMount() {
        this.loanSummary();
        this.props.getDisbursementRepaymentDETAILS({
            data: {
                applicantUniqueId: this.state.applicantUniqueId,
                type: this.state.disbursementType

            },
            callback: (response) => {
                this.setState({
                    comment: {
                        value: response.data.disbursementComments || "",
                        isValid: true
                    }
                })
            }
        })
        this.props.getDisbursementDOCUMENT({
            data: {
                applicantUniqueId: this.state.applicantUniqueId
            },
            callback: (response) => {

                if (response && response.data && response.data.downPayment && response.data.downPayment.filePath) {
                    this.setState({
                        downPaymentUpload: true,
                        downPaymentReceipt: {
                            filename: response.data.downPayment.fileName || "",
                            idToEdit: response.data.downPayment.id || "",
                            filePath: response.data.downPayment.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.downPayment.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        postDisbursalDocument: {
                            downPaymentReceipt: false,
                        }
                    })
                }

                if (response && response.data && response.data.performaInvoice && response.data.performaInvoice.filePath) {
                    this.setState({
                        performaInvoiceUpload: true,
                        performaInvoice: {
                            filename: response.data.performaInvoice.fileName || "",
                            idToEdit: response.data.performaInvoice.id || "",
                            filePath: response.data.performaInvoice.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.performaInvoice.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        postDisbursalDocument: {
                            proFormaInvoice: false,
                        }
                    })
                }
                if (response && response.data && response.data.insuranceCopy && response.data.insuranceCopy.filePath) {
                    this.setState({
                        insuranceCopyUpload: true,
                        insuranceCopy: {
                            filename: response.data.insuranceCopy.fileName || "",
                            idToEdit: response.data.insuranceCopy.id || "",
                            filePath: response.data.insuranceCopy.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.insuranceCopy.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        postDisbursalDocument: {
                            insuranceCopy: false,
                        }
                    })
                }
                if (response && response.data && response.data.rcBook && response.data.rcBook.filePath) {
                    this.setState({
                        rcBookUpload: true,
                        rcBook: {
                            filename: response.data.rcBook.fileName || "",
                            idToEdit: response.data.rcBook.id || "",
                            filePath: response.data.rcBook.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.rcBook.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        postDisbursalDocument: {
                            vehicleDetails: false,
                        }
                    })
                }
                if (response && response.data && response.data.rtoTaxReceipt && response.data.rtoTaxReceipt.filePath) {
                    this.setState({
                        rtoTaxReceiptUpload: true,
                        rtoTaxReceipt: {
                            filename: response.data.rtoTaxReceipt.fileName || "",
                            idToEdit: response.data.rtoTaxReceipt.id || "",
                            filePath: response.data.rtoTaxReceipt.filePath.replace('/var/www/html', uatURL.URL) || "",
                            pdf: response.data.rtoTaxReceipt.fileName.split('.').pop() == "pdf" ? true : false
                        },
                        postDisbursalDocument: {
                            vehicleDetails: false,
                        }
                    })
                }
                if (response && response.data && response.data.vehicleRegistrationNumber !== undefined) {
                    var data = response.data
                    this.setState({
                        vehicleRegistrationNumber: {
                            value: data?.vehicleRegistrationNumber,
                            isValid: validation.test(data?.vehicleRegistrationNumber),
                        }
                    })
                }
                if (response && response.data && response.data.vehicleChassisNumber !== undefined) {
                    var data = response.data
                    this.setState({
                        vehicleChassisNumber: {
                            value: data?.vehicleChassisNumber,
                            isValid: validation.test(data?.vehicleChassisNumber),
                        }
                    })
                }
                if (response && response.data && response.data.vehicleEngineNumber !== undefined) {
                    var data = response.data
                    this.setState({
                        vehicleEngineNumber: {
                            value: data?.vehicleEngineNumber,
                            isValid: validation.test(data?.vehicleEngineNumber),
                        },
                    })
                }
                if (!this.state.vehicleChassisNumber.value == '' &&
                    !this.state.vehicleEngineNumber.value == '' &&
                    !this.state.vehicleRegistrationNumber.value == '' &&
                    this.state.vehicleRegistrationNumber.isValid &&
                    this.state.vehicleChassisNumber.isValid &&
                    this.state.vehicleEngineNumber.isValid) {

                    this.setState({
                        vehicleDataSave: true

                    })
                }
            }
        })
    }

    isdocumentName(text) {
        let valid = false;
        const documentName1 = /^[a-zA-Z]*$/;
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

    isVehicleRegisterationNumber(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z0-9 /]+$/i;
        if (text != '' && text != null && customerRegex.test(text) && text.length > 9) {
            valid = true;
        }
        this.setState({
            vehicleRegistrationNumber: {
                ...this.state.vehicleRegistrationNumber,
                isValid: valid,
            },
        });
    }

    isVehicleChassisNumber(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z0-9 /]+$/i;
        if (text != '' && text != null && customerRegex.test(text)) {
            valid = true;
        }
        this.setState({
            vehicleChassisNumber: {
                ...this.state.vehicleChassisNumber,
                isValid: valid,
            },
        });
    }

    isVehicleEngineNumber(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z0-9 /]+$/i;
        if (text != '' && text != null && customerRegex.test(text)) {
            valid = true;
        }

        this.setState({
            vehicleEngineNumber: {
                ...this.state.vehicleEngineNumber,
                isValid: valid,
            },
        });
    }

    iscomment(text) {
        let valid = false;
        const commentRegex = /.*/;
        if (text != "" && text != null && commentRegex.test(text)) {
            valid = true;
        }
        this.setState({
            comment: {
                ...this.state.comment,
                isValid: valid,
            }
        });
    }

    handleCollapseExpand(key, valueToSet) {
        const keyToObj = this.state.postDisbursalDocument;
        keyToObj[key] = valueToSet;

        this.setState({
            postDisbursalDocument: keyToObj
        })
    }




    renderDownPaymentReceipt() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            deleteImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            plusImageStyle1,
            deleteImageStyle1,
            mainSalaryView,
            textFileName,
            imagePlaceHolderStyle
        } = PostDisbursalDocumentStyles;

        if (this.state.postDisbursalDocument.downPaymentReceipt) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("downPaymentReceipt", false);
                    }}>
                        <Text style={pddLabel}>{POST_DISBURSAL_DOCUMENT_CONST.DOWN_PAYMENT}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{POST_DISBURSAL_DOCUMENT_CONST.DOWN_PAYMENT}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("downPaymentReceipt", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Down Payment Receipt" />
                        {this.state.downPaymentUpload === false && (
                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={POST_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
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
                                                                    downPaymentReceipt: {
                                                                        ...state.downPaymentReceipt,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "downPayment",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.downPaymentReceipt, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            downPaymentReceipt: {
                                                                ...state.downPaymentReceipt,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "downPayment",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.downPaymentReceipt, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        downPaymentUpload: true,
                                                        downPaymentReceipt: {
                                                            filename: response.downPayment.fileName,
                                                            filePath: response.downPayment.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.downPayment.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={POST_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFileImagePdf();
                                                this.setState((state, props) => ({
                                                    downPaymentReceipt: {
                                                        ...state.downPaymentReceipt,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "downPayment",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        downPaymentUpload: true,
                                                        downPaymentReceipt: {
                                                            filename: response.downPayment.fileName,
                                                            filePath: response.downPayment.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.downPayment.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.downPaymentReceipt, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>)}
                    </View>
                    {this.state.downPaymentUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.downPaymentReceipt.pdf ? 'space-around' : 'center', alignItems: this.state.downPaymentReceipt.pdf ? 'center' : 'flex-start', marginBottom: 20 }}>
                                {!this.state.downPaymentReceipt.pdf ?
                                    <Image
                                        source={{ uri: `${this.state.downPaymentReceipt.filePath}` }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                downPaymentReceipt: {
                                                    ...state.downPaymentReceipt,
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
                                        marginTop: 10,
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.downPaymentReceipt.filePath)
                                        }
                                        }>
                                            <Text style={textFileName}>
                                                {this.state.downPaymentReceipt.filename}
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
                                                    docType: "downPayment",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.downPaymentReceipt.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        downPaymentReceipt: {
                                                            ...state.downPaymentReceipt,
                                                            filename: null,
                                                        },
                                                        downPaymentUpload: false

                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON}
                                        style={!this.state.downPaymentReceipt.pdf ? deleteImageStyle : deleteImageStyle1}

                                    />
                                </TouchableOpacity>
                            </View>
                            {!this.state.downPaymentReceipt.pdf ?
                                <Text style={[textFileName, { marginLeft: 10, marginBottom: 10, alignSelf: 'center', marginRight: 10 }]}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={[textFileName, { marginLeft: 10 }]}> {this.state.downPaymentReceipt.filename}</Text>
                                </Text> : null}
                        </View>
                    )}
                </View>
            )
        }
    }

    renderProFormaInvoice() {
        const {
            collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle,
            expandedViewStyle,
            pddLabel,
            buttonContainer,
            deleteImageStyle,
            deleteImageStyle1,
            mainSalaryView,
            salarySlipName,
            plusImageStyle1,
            imagePlaceHolderStyle,
            textFileName,
        } = PostDisbursalDocumentStyles;

        if (this.state.postDisbursalDocument.proFormaInvoice) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("proFormaInvoice", false);
                    }}>
                        <Text style={pddLabel}>{POST_DISBURSAL_DOCUMENT_CONST.PROFORMA_INVOICE}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{POST_DISBURSAL_DOCUMENT_CONST.PROFORMA_INVOICE}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("proFormaInvoice", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload Proforma Invoice" />

                        {this.state.performaInvoiceUpload === false && (

                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={POST_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
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
                                                                    performaInvoice: {
                                                                        ...state.performaInvoice,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "performaInvoice",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.performaInvoice, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            performaInvoice: {
                                                                ...state.performaInvoice,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "performaInvoice",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.performaInvoice, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        performaInvoiceUpload: true,
                                                        performaInvoice: {
                                                            filename: response.performaInvoice.fileName,
                                                            filePath: response.performaInvoice.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.performaInvoice.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={POST_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFileImagePdf();
                                                this.setState((state, props) => ({
                                                    performaInvoice: {
                                                        ...state.performaInvoice,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "performaInvoice",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        performaInvoiceUpload: true,
                                                        performaInvoice: {
                                                            filename: response.performaInvoice.fileName,
                                                            filePath: response.performaInvoice.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.performaInvoice.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.performaInvoice, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        )}

                    </View>
                    {this.state.performaInvoiceUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.performaInvoice.pdf ? 'space-around' : 'center', alignItems: this.state.performaInvoice.pdf ? 'center' : 'flex-start', marginBottom: 20 }}>
                                {!this.state.performaInvoice.pdf ?
                                    <Image
                                        source={{ uri: `${this.state.performaInvoice.filePath}` }}
                                        style={imagePlaceHolderStyle}
                                        onError={() =>
                                            this.setState((state, props) => ({
                                                performaInvoice: {
                                                    ...state.performaInvoice,
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
                                        marginTop: 10,
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.performaInvoice.filePath)
                                        }
                                        }>
                                            <Text style={textFileName}>
                                                {this.state.performaInvoice.filename}
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
                                                    docType: "performaInvoice",
                                                    disbursementType: this.state.disbursementType,
                                                    docName: this.state.performaInvoice.filename
                                                },
                                                callback: (response) => {
                                                    this.setState((state, props) => ({
                                                        performaInvoice: {
                                                            ...state.performaInvoice,
                                                            filename: null,
                                                        },
                                                        performaInvoiceUpload: false

                                                    }))
                                                }
                                            })
                                        }
                                    }}>
                                    <Image source={DELETEBUTTON}
                                        style={!this.state.performaInvoice.pdf ? deleteImageStyle : deleteImageStyle1}

                                    />
                                </TouchableOpacity>
                            </View>
                            {!this.state.performaInvoice.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', marginRight: 10 }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={[textFileName, { marginLeft: 10 }]} > {this.state.performaInvoice.filename}</Text>
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
            deleteImageStyle,
            mainSalaryView,
            salarySlipName,
            plusImageStyle1,
            deleteImageStyle1,
            imagePlaceHolderStyle,
            textFileName
        } = PostDisbursalDocumentStyles;

        if (this.state.postDisbursalDocument.insuranceCopy) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("insuranceCopy", false);
                    }}>
                        <Text style={pddLabel}>{POST_DISBURSAL_DOCUMENT_CONST.INSURANCE_COPY}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{POST_DISBURSAL_DOCUMENT_CONST.INSURANCE_COPY}</Text>
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
                                        title={POST_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
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
                                        title={POST_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFileImagePdf();
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

                                                    }, () => {
                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.insuranceCopy, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                    {this.state.insuranceCopyUpload === true && (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: this.state.insuranceCopy.pdf ? 'space-around' : 'center', alignItems: this.state.insuranceCopy.pdf ? 'center' : 'flex-start', marginBottom: 20 }}>
                                {!this.state.insuranceCopy.pdf ?
                                    <Image
                                        source={{ uri: `${this.state.insuranceCopy.filePath}` }}
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
                                        marginTop: 10,
                                    }}>
                                        <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(this.state.insuranceCopy.filePath)
                                        }
                                        }>
                                            <Text style={textFileName}>{this.state.insuranceCopy.filename}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                {/* </View> */}
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
                                    <Image source={DELETEBUTTON}
                                        style={!this.state.insuranceCopy.pdf ? deleteImageStyle : deleteImageStyle1}

                                    />
                                </TouchableOpacity>
                            </View>
                            {!this.state.insuranceCopy.pdf ?
                                <Text style={{ marginBottom: 10, alignSelf: 'center', marginRight: 10 }}>
                                    {/* <Text style={[textFileName, { color: colors.COLOR_BLACK, fontFamily: APP_FONTS.NunitoExtraBold }]}>File Name:</Text> */}
                                    <Text style={[textFileName, { marginLeft: 10 }]}> {this.state.insuranceCopy.filename}</Text>
                                </Text> : null}
                        </View>
                    )}
                </View>
            )
        }
    }


    renderVehicleDetails() {
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
            inputStyle1,
            textInputStyle1,
            separatorStyle1,
            imagePlaceHolderStyle,
            deleteImageStyle,
            deleteImageStyle1,
            textFileName
        } = PostDisbursalDocumentStyles;

        if (this.state.postDisbursalDocument.vehicleDetails) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("vehicleDetails", false);
                    }}>
                        <Text style={pddLabel}>{POST_DISBURSAL_DOCUMENT_CONST.VEHICLE_DETAILS}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={pddLabel}>{POST_DISBURSAL_DOCUMENT_CONST.VEHICLE_DETAILS}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("vehicleDetails", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ marginBottom: 20 }}>
                        <TextImage
                            label="Upload RC Book" />
                        {this.state.rcBookUpload === false && (

                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={POST_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
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
                                                                    rcBook: {
                                                                        ...state.rcBook,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "rcBook",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.rcBook, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            rcBook: {
                                                                ...state.rcBook,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "rcBook",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.rcBook, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }

                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        rcBookUpload: true,
                                                        rcBook: {
                                                            filename: response.rcBook.fileName,
                                                            filePath: response.rcBook.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.rcBook.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={POST_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFileImagePdf();
                                                this.setState((state, props) => ({
                                                    rcBook: {
                                                        ...state.rcBook,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "rcBook",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        rcBookUpload: true,
                                                        rcBook: {
                                                            filename: response.rcBook.fileName,
                                                            filePath: response.rcBook.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.rcBook.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.rcBook, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }
                                        }
                                    />
                                </View>
                            </View>
                        )}

                        {this.state.rcBookUpload === true && (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: this.state.rcBook.pdf ? 'space-around' : 'center', alignItems: this.state.rcBook.pdf ? 'center' : 'flex-start', marginVertical: 20 }}>
                                    {!this.state.rcBook.pdf ?
                                        <FastImage
                                            source={{
                                                uri: `${this.state.rcBook.filePath}`,
                                                priority: FastImage.priority.high
                                            }}
                                            style={imagePlaceHolderStyle}
                                            onError={() =>
                                                this.setState((state, props) => ({
                                                    rcBook: {
                                                        ...state.rcBook,
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
                                            marginTop: 10,
                                        }}>
                                            <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                            <TouchableOpacity onPress={() => {
                                                Linking.openURL(this.state.rcBook.filePath)
                                            }
                                            }>
                                                <Text style={textFileName}>
                                                    {this.state.rcBook.filename}
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
                                                        docType: "rcBook",
                                                        disbursementType: this.state.disbursementType,
                                                        docName: this.state.rcBook.filename
                                                    },
                                                    callback: (response) => {
                                                        this.setState((state, props) => ({
                                                            rcBook: {
                                                                ...state.rcBook,
                                                                filename: null,
                                                            },
                                                            rcBookUpload: false

                                                        }))
                                                    }
                                                })
                                            }
                                        }}>
                                        <Image source={DELETEBUTTON}
                                            style={!this.state.rcBook.pdf ? deleteImageStyle : deleteImageStyle1}

                                        />
                                    </TouchableOpacity>
                                </View>
                                {!this.state.rcBook.pdf ?
                                    <Text style={{ marginBottom: 10, alignSelf: 'center', marginRight: 10 }}>
                                        <Text style={[textFileName, { marginLeft: 10 }]}> {this.state.rcBook.filename}</Text>
                                    </Text> : null}
                            </View>
                        )}
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <TextImage
                            label="Upload RTO Tax Receipt" />
                        {this.state.rtoTaxReceiptUpload === false && (

                            <View style={buttonContainer}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Button
                                        title={POST_DISBURSAL_DOCUMENT_CONST.TAKE_PHOTO}
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
                                                                    rtoTaxReceipt: {
                                                                        ...state.rtoTaxReceipt,
                                                                        disbursementType: this.state.disbursementType,
                                                                        docType: "rtoTaxReceipt",
                                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                                        filename: response.name,
                                                                        otherName: "",
                                                                    },
                                                                }));
                                                                zipFileDisbursementTakePhoto2(response, this.state.rtoTaxReceipt, this.props.uploadDisbusementDOCUMENT, callback)
                                                            }).catch(err => {
                                                            });
                                                    } else {
                                                        this.setState((state, props) => ({
                                                            rtoTaxReceipt: {
                                                                ...state.rtoTaxReceipt,
                                                                disbursementType: this.state.disbursementType,
                                                                docType: "rtoTaxReceipt",
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                filename: image.path.substring(image.path.lastIndexOf('/') + 1,),
                                                                otherName: "",
                                                            },
                                                        }));
                                                        zipFileDisbursementTakePhoto(image, this.state.rtoTaxReceipt, this.props.uploadDisbusementDOCUMENT, callback)
                                                    }
                                                })
                                                const callback = (response) => {
                                                    this.setState({
                                                        rtoTaxReceiptUpload: true,
                                                        rtoTaxReceipt: {
                                                            filename: response.rtoTaxReceipt.fileName,
                                                            filePath: response.rtoTaxReceipt.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.rtoTaxReceipt.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        title={POST_DISBURSAL_DOCUMENT_CONST.UPLOAD_PHOTO}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                let fileDetails = await selectFileImagePdf();
                                                this.setState((state, props) => ({
                                                    rtoTaxReceipt: {
                                                        ...state.rtoTaxReceipt,
                                                        disbursementType: this.state.disbursementType,
                                                        docType: "rtoTaxReceipt",
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        filename: fileDetails?.name,
                                                        otherName: ""
                                                    },
                                                }));
                                                const callback = (response) => {
                                                    this.setState({
                                                        rtoTaxReceiptUpload: true,
                                                        rtoTaxReceipt: {
                                                            filename: response.rtoTaxReceipt.fileName,
                                                            filePath: response.rtoTaxReceipt.filePath.replace('/var/www/html', uatURL.URL),
                                                            pdf: response.rtoTaxReceipt.fileName.split('.').pop() == 'pdf' ? true : false
                                                        }

                                                    })
                                                }
                                                zipFileDisbursementUpload(fileDetails, this.state.rtoTaxReceipt, this.props.uploadDisbusementDOCUMENT, callback);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        )}

                        {this.state.rtoTaxReceiptUpload === true && (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: this.state.rtoTaxReceipt.pdf ? 'space-around' : 'center', alignItems: this.state.rtoTaxReceipt.pdf ? 'center' : 'flex-start', marginVertical: 20 }}>
                                    {!this.state.rtoTaxReceipt.pdf ?
                                        <Image
                                            source={{ uri: `${this.state.rtoTaxReceipt.filePath}` }}
                                            style={imagePlaceHolderStyle}
                                            onError={() =>
                                                this.setState((state, props) => ({
                                                    rtoTaxReceipt: {
                                                        ...state.rtoTaxReceipt,
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
                                            marginTop: 10,
                                        }}>
                                            <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                                            <TouchableOpacity onPress={() => {
                                                Linking.openURL(this.state.rtoTaxReceipt.filePath)
                                            }
                                            }>
                                                <Text style={textFileName}>
                                                    {this.state.rtoTaxReceipt.filename}
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
                                                        docType: "rtoTaxReceipt",
                                                        disbursementType: this.state.disbursementType,
                                                        docName: this.state.rtoTaxReceipt.filename
                                                    },
                                                    callback: (response) => {
                                                        this.setState((state, props) => ({
                                                            insuranceCopy: {
                                                                ...state.rtoTaxReceipt,
                                                                filename: null,
                                                            },
                                                            rtoTaxReceiptUpload: false

                                                        }))
                                                    }
                                                })
                                            }
                                        }}>
                                        <Image source={DELETEBUTTON}
                                            style={!this.state.rtoTaxReceipt.pdf ? deleteImageStyle : deleteImageStyle1}

                                        />
                                    </TouchableOpacity>
                                </View>
                                {!this.state.rtoTaxReceipt.pdf ?
                                    <Text style={{ marginBottom: 10, alignSelf: 'center', marginRight: 10 }}>
                                        <Text style={[textFileName, { marginLeft: 10 }]}> {this.state.rtoTaxReceipt.filename}</Text>
                                    </Text> : null}
                            </View>
                        )}
                    </View> */}
                    <FloatingLabelInput
                        label={POST_DISBURSAL_DOCUMENT_CONST.REGISTRATIONNUMBER}
                        value={this.state.vehicleRegistrationNumber.value || undefined}
                        containerStyles={inputStyle1}
                        editable={!this.state.isViewOnly}
                        onChangeText={(text) => {
                            this.setState(
                                {
                                    vehicleRegistrationNumber: {
                                        ...this.state.vehicleRegistrationNumber,
                                        value: text,
                                    },
                                    vehicleDataSave: false
                                },
                                () => {
                                    this.isVehicleRegisterationNumber(this.state.vehicleRegistrationNumber.value);
                                },
                            );
                        }}
                        inputStyles={textInputStyle1}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                    />
                    <View style={separatorStyle1} />
                    {!this.state.vehicleRegistrationNumber.isValid && (
                        <Text style={errorLabel}>
                            {this.state.vehicleRegistrationNumber.value === '' ||
                                this.state.vehicleRegistrationNumber.value === undefined
                                ? POST_DISBURSAL_DOCUMENT_CONST.MANDATORY_REGISTRAION
                                : POST_DISBURSAL_DOCUMENT_CONST.VALID_REGISTRATION}
                        </Text>
                    )}
                    <FloatingLabelInput
                        label={POST_DISBURSAL_DOCUMENT_CONST.VEHICLECHASSIS}
                        value={this.state.vehicleChassisNumber.value || undefined}
                        maxLength={17}
                        editable={!this.state.isViewOnly}
                        containerStyles={inputStyle1}
                        onChangeText={(text) => {
                            this.setState(
                                {
                                    vehicleChassisNumber: {
                                        ...this.state.vehicleChassisNumber,
                                        value: text,

                                    },
                                    vehicleDataSave: false

                                },
                                () => {
                                    this.isVehicleChassisNumber(this.state.vehicleChassisNumber.value);
                                },
                            );
                        }}
                        inputStyles={textInputStyle1}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                    />
                    <View style={separatorStyle1} />
                    {!this.state.vehicleChassisNumber.isValid && (
                        <Text style={errorLabel}>
                            {this.state.vehicleChassisNumber.value === '' ||
                                this.state.vehicleChassisNumber.value === undefined
                                ? POST_DISBURSAL_DOCUMENT_CONST.MANDATORY_CHASSIS
                                : POST_DISBURSAL_DOCUMENT_CONST.VALID_CHASSIS}
                        </Text>
                    )}

                    <FloatingLabelInput
                        label={POST_DISBURSAL_DOCUMENT_CONST.VEHICLEENGINE}
                        value={this.state.vehicleEngineNumber.value || undefined}
                        maxLength={10}
                        editable={!this.state.isViewOnly}
                        containerStyles={inputStyle1}
                        onChangeText={(text) => {
                            this.setState(
                                {
                                    vehicleEngineNumber: {
                                        ...this.state.vehicleEngineNumber,
                                        value: text,
                                    },
                                    vehicleDataSave: false

                                },
                                () => {
                                    this.isVehicleEngineNumber(this.state.vehicleEngineNumber.value);
                                },
                            );
                        }}
                        inputStyles={textInputStyle1}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                    />
                    <View style={separatorStyle1} />
                    {!this.state.vehicleEngineNumber.isValid && (
                        <Text style={errorLabel}>
                            {this.state.vehicleEngineNumber.value === '' ||
                                this.state.vehicleEngineNumber.value === undefined
                                ? POST_DISBURSAL_DOCUMENT_CONST.MANDATORY_ENGINE
                                : POST_DISBURSAL_DOCUMENT_CONST.VALID_ENGINE}
                        </Text>
                    )}
                    <View style={{ width: '45%', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                        <Button
                            title={POST_DISBURSAL_DOCUMENT_CONST.BUTTON_TITLE_SAVE}
                            onPress={() => {
                                if (!this.state.isViewOnly) {
                                    this.isVehicleRegisterationNumber(this.state.vehicleRegistrationNumber.value)
                                    this.isVehicleChassisNumber(this.state.vehicleChassisNumber.value);
                                    this.isVehicleEngineNumber(this.state.vehicleEngineNumber.value);
                                    if (this.state.vehicleRegistrationNumber.isValid &&
                                        this.state.vehicleRegistrationNumber.value !== '' &&
                                        this.state.vehicleChassisNumber.isValid &&
                                        this.state.vehicleChassisNumber.value !== '' &&
                                        this.state.vehicleEngineNumber.isValid &&
                                        this.state.vehicleEngineNumber.value !== ''
                                    ) {
                                        this.props.uploadDisbusementDOCUMENT({
                                            data: {
                                                applicantUniqueId: this.state.applicantUniqueId,
                                                disbursementType: this.state.disbursementType,
                                                vehicleRegistrationNumber: this.state.vehicleRegistrationNumber.value,
                                                vehicleChassisNumber: this.state.vehicleChassisNumber.value,
                                                vehicleEngineNumber: this.state.vehicleEngineNumber.value,
                                                vehicleDetails: true
                                            },
                                            callback: (response) => {
                                                this.setState({ vehicleDataSave: true })
                                                // this.componentDidMount()
                                            }
                                        })
                                    }
                                } else {
                                    handleWarning("User access denied")
                                }
                            }}
                        />
                    </View>

                </View>
            )
        }
    }

    renderButton() {
        const {
            buttonNavigation,
        } = PostDisbursalDocumentStyles;
        return (
            <View style={buttonNavigation}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Button
                        title={POST_DISBURSAL_DOCUMENT_CONST.BUTTON_TITLE_LOAN_SUMMARY}
                        onPress={() => {
                            this.props.navigation.navigate("LoanSummary", {
                                applicantUniqueId: this.state.applicantUniqueId,
                                leadCode: this.state.leadCodeFromProps,
                                ismainapplicant: this.state.ismainapplicant,
                            })
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title={POST_DISBURSAL_DOCUMENT_CONST.BUTTON_TITLE_SAVE}
                        onPress={() => {

                            this.isVehicleRegisterationNumber(this.state.vehicleRegistrationNumber.value)
                            this.isVehicleChassisNumber(this.state.vehicleChassisNumber.value);
                            this.isVehicleEngineNumber(this.state.vehicleEngineNumber.value);

                            if (this.state.vehicleRegistrationNumber.isValid &&
                                this.state.vehicleRegistrationNumber.value !== '' &&
                                this.state.vehicleChassisNumber.isValid &&
                                this.state.vehicleChassisNumber.value !== '' &&
                                this.state.vehicleEngineNumber.isValid &&
                                this.state.vehicleEngineNumber.value !== ''
                            ) {
                                this.props.uploadDisbusementDOCUMENT({
                                    data: {
                                        applicantUniqueId: this.state.applicantUniqueId,
                                        disbursementType: this.state.disbursementType,
                                        vehicleRegistrationNumber: this.state.vehicleRegistrationNumber.value,
                                        vehicleChassisNumber: this.state.vehicleChassisNumber.value,
                                        vehicleEngineNumber: this.state.vehicleEngineNumber.value,
                                        vehicleDetails: true
                                    },
                                    callback: (response) => {
                                    }
                                })
                            }
                        }}
                    />
                </View>
            </View>

        )
    }

    renderSubmitToDisbursement() {
        const {
            buttonSave,
            pddLabel,
            textInputStyle,
            errorLabel,
            buttonNavigation,
        } = PostDisbursalDocumentStyles;
        return (
            <View>
                <Text style={[pddLabel, { marginTop: 20 }]}>{POST_DISBURSAL_DOCUMENT_CONST.SUBMITTODISBURSEMENT}</Text>
                <TextInput
                    editable={!this.state.isViewOnly}
                    style={textInputStyle}
                    value={this.state.comment.value}
                    multiline={true}
                    maxLength={255}
                    onChangeText={(text) => {
                        this.setState({
                            comment: {
                                ...this.state.comment,
                                value: text,
                            }
                        }, () => {
                            this.iscomment(this.state.comment.value)
                        });
                    }}
                    placeholder={POST_DISBURSAL_DOCUMENT_CONST.COMMENT}
                />
                {!this.state.comment.isValid && <Text style={errorLabel}>Comment is mandatory.</Text>}

                <View style={buttonNavigation}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button
                            title={POST_DISBURSAL_DOCUMENT_CONST.BUTTON_TITLE_LOAN_SUMMARY}
                            onPress={() => {
                                this.props.navigation.navigate("LoanSummary", {
                                    applicantUniqueId: this.state.applicantUniqueId,
                                    leadCode: this.state.leadCodeFromProps,
                                    ismainapplicant: this.state.ismainapplicant,
                                })
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title={POST_DISBURSAL_DOCUMENT_CONST.BUTTON_TITLE_SUBMIT}
                            onPress={() => {
                                if (!this.state.isViewOnly) {
                                    if (this.state.comment.value == '') {
                                        this.iscomment(this.state.comment.value);
                                    }
                                    else if (this.state.downPaymentReceipt.filePath == '' ||
                                        this.state.performaInvoice.filePath == '' ||
                                        this.state.insuranceCopy.filePath == ''
                                    ) {
                                        handleWarning('Please upload required documents')
                                    }
                                    else if (this.state.vehicleChassisNumber.value == '' ||
                                        this.state.vehicleEngineNumber.value == '' ||
                                        this.state.vehicleRegistrationNumber.value == '' ||
                                        !this.state.vehicleRegistrationNumber.isValid ||
                                        !this.state.vehicleChassisNumber.isValid ||
                                        !this.state.vehicleEngineNumber.isValid) {
                                        this.isVehicleRegisterationNumber(this.state.vehicleRegistrationNumber.value)
                                        this.isVehicleChassisNumber(this.state.vehicleChassisNumber.value);
                                        this.isVehicleEngineNumber(this.state.vehicleEngineNumber.value);

                                        // handleWarning('Please enter vehicle details')

                                    }
                                    else if (this.state.vehicleDataSave == false) {
                                        handleWarning('Please save vehicle details')
                                    }
                                    else {
                                        this.props.saveDisbursementRepaymentDETAILS({
                                            data: {
                                                comments: this.state.comment.value,
                                                applicantUniqueId: this.state.applicantUniqueId,
                                                employeeId: this.state.employeeId,
                                                type: this.state.disbursementType
                                            },
                                            callback: (response) => {
                                                this.loanSummary()
                                            }
                                        })
                                    }
                                } else {
                                    handleWarning("User access denied")
                                }
                            }}
                        />
                    </View>
                </View>

            </View>
        )
    }

    render() {
        const {
            mainContainer,
            mainLabel,
        } = PostDisbursalDocumentStyles;
        return (

            <WaveBackground>
                <StatusBar
                    backgroundColor={colors.COLOR_WHITE}
                    barStyle={'dark-content'}
                    translucent={false}
                    hidden={false}
                />
                <Header
                    label={POST_DISBURSAL_DOCUMENT_CONST.HEADER}
                    showLeftIcon={false}
                    onPress={() => {
                    }}
                />

                <ScrollView showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20 }}>
                    <View style={mainContainer}>
                        {this.renderDownPaymentReceipt()}
                        {this.renderProFormaInvoice()}
                        {this.renderInsuranceCopy()}
                        {this.renderVehicleDetails()}
                        {/* {this.renderButton()} */}
                        {this.renderSubmitToDisbursement()}
                    </View>
                </ScrollView>

            </WaveBackground>
        )
    }
}

export default compose(
    container, container1,
    withProps(
        (qdeSuccessAPI) => qdeSuccessAPI,
        (submitToCredit) => submitToCredit,
    ),
)(PostDisbursalDocument);
