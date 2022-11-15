import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import { zip } from 'react-native-zip-archive';
import ImageResizer from 'react-native-image-resizer';
import { bytesToMegaBytes, handleError } from './utils';

export const zipFile = (
  res,
  uploadPANWrapperAPI,
  dataToAPI,
  callback,
  flow = '',
) => {
  // if (dataToAPI.panInfo) {
  const parsedData = JSON.parse(dataToAPI.panInfo);
  if (
    parsedData &&
    parsedData.docType &&
    parsedData.docType === 'form60' &&
    flow !== 'fromCamera'
  ) {
    const name = `${new Date().getTime()}.zip`;
    const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
    const sourcePath = res.path;
    zip(sourcePath, targetPath)
      .then((path) => {
        const imageData = {
          path,
          res,
          name,
          dataToAPI,
        };
        uploadPANWrapperAPI({
          imageData,
          callback: (panInfoData) => {
            callback(panInfoData);
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  else {
    const filePath = flow == 'fromCamera' ? res.path : res.path;
    const name = `${new Date().getTime()}.zip`;
    const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;

    const sourcePath = filePath;

    zip(sourcePath, targetPath)
      .then((path) => {
        const imageData = {
          path,
          res,
          name,
          dataToAPI
        }
        uploadPANWrapperAPI({
          imageData,
          callback: (panInfoData) => {
            callback(panInfoData);
          }
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export const selectFile = (uploadPANWrapperAPI, dataToAPI, callback) => {
  ImagePicker.openPicker({
    mediaType: 'image',
    cropping: true,
  }).then((image) => {
    if (bytesToMegaBytes(image.size) > 4) {
      handleError('File size should be maximum 4 MB.');
    } else {
      zipFile(image, uploadPANWrapperAPI, dataToAPI, callback);
    }
  });
};

export const selectPDF1 = async (
  uploadPANWrapperAPI,
  dataToAPI,
  callback,
  flow,
  whichUtility,
  selectedDocType
) => {
  try {

    // const results = selectedDocType == 'other' ?
    //   await DocumentPicker.pick({
    //     copyTo: 'documentDirectory',
    //     type: [
    //       DocumentPicker.types.pdf, DocumentPicker.types.images],
    //   })
    //   :
    //   await DocumentPicker.pick({
    //     copyTo: 'documentDirectory',
    //     type: [DocumentPicker.types.images],
    //   })

    const results = await ImagePicker.openPicker({
      mediaType: "photo",
    })
    ImagePicker.openCropper({
      path: results.path,
      freeStyleCropEnabled: true,
      hideBottomControls: true,
      cropping: true,
      // freeStyleCropEnabled: true,
    })
      .then(image => {

        if (bytesToMegaBytes(image.size) > 4) {
          handleError('File size should be maximum 4 MB.');
        } else {
          if (flow === 'onlypickimage') {
            callback(image, whichUtility);
          } else {
            zipFile(image, uploadPANWrapperAPI, dataToAPI, callback);
          }
        }

      });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // this.closeModal();
    } else {
      throw err;
    }
  }
};

export const selectPDF = async (
  uploadPANWrapperAPI,
  dataToAPI,
  callback,
  errorcallback,
  flow,
  whichUtility,
) => {

  try {
    // const results = await DocumentPicker.pick({
    //   copyTo: 'documentDirectory',
    //   type: [
    //     // DocumentPicker.types.pdf, 
    //     DocumentPicker.types.images],
    // });
    const results = await ImagePicker.openPicker({
      mediaType: "photo",
    })


    ImagePicker.openCropper({
      path: results.path,
      freeStyleCropEnabled: true,
      hideBottomControls: true,
     
      cropping: true,
      // freeStyleCropEnabled: true,
    })
      .then(image => {

        if (bytesToMegaBytes(image.size) > 4) {
          handleError('File size should be maximum 4 MB.');
        } else {

          if (flow === 'onlypickimage') {
            callback(image, whichUtility);
            errorcallback(image)
          } else {
            zipFile(image, uploadPANWrapperAPI, dataToAPI, callback);
            errorcallback(image)
          }
        }
      })
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // this.closeModal();
    } else {
      throw err;
    }
  }
};

export const selectPDF11 = async (
  uploadPANWrapperAPI,
  dataToAPI,
  callback,
  flow,
  whichUtility,
) => {

  try {
    const results = await DocumentPicker.pick({
      copyTo: 'documentDirectory',
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    });

    if (bytesToMegaBytes(results.size) > 4) {
      handleError('File size should be maximum 4 MB.');
    } else {

      if (flow === 'onlypickimage') {
        callback(results, whichUtility);
      } else {
        zipFile(results, uploadPANWrapperAPI, dataToAPI, callback);
      }
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // this.closeModal();
    } else {
      throw err;
    }
  }
};

export const selectCamera = (uploadPANWrapperAPI, dataToAPI, callback, errorcallback) => {
  ImagePicker.openCamera({
    cropping: true,
    freeStyleCropEnabled: true,
    hideBottomControls: true,
  }).then((image) => {

    if (bytesToMegaBytes(image.size) > 4) {
      ImageResizer.createResizedImage(image.path, 800, 800, 'JPEG', 100, 0)
        .then((response) => {
          zipFile(response, uploadPANWrapperAPI, dataToAPI, callback, 'fromCamera');
        }).catch(err => {
        });
    } else {
      zipFile(image, uploadPANWrapperAPI, dataToAPI, callback, 'fromCamera');
      errorcallback(image)
    }
  });
};

export const selectCamera1 = (uploadPANWrapperAPI, dataToAPI, callback) => {
  ImagePicker.openCamera({
    cropping: true,
    freeStyleCropEnabled: true,
    hideBottomControls: true,
  }).then((image) => {
    if (bytesToMegaBytes(image.size) > 4) {
      ImageResizer.createResizedImage(image.path, 1200, 1200, 'JPEG', 100, 0)
        .then((response) => {
          zipFile1(response, uploadPANWrapperAPI, dataToAPI, callback, 'fromCamera');
        }).catch(err => {
        });
    } else {
      zipFile1(image, uploadPANWrapperAPI, dataToAPI, callback, 'fromCamera');
    }
  });
};

export const zipFile1 = (
  res,
  uploadSelfie,
  dataToAPI,
  callback,
) => {

  const filePath = res.path;
  const name = `${new Date().getTime()}.zip`;
  const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
  const sourcePath = filePath;

  zip(sourcePath, targetPath)
    .then((path) => {
      const imageData = {
        path,
        res,
        name,
        dataToAPI,
      }
      uploadSelfie({
        imageData,
        callback: (response) => {
          callback(response);
        },
      });
    })
    .catch((error) => {
      console.error(error);
    });
};


export const zipSalaryFiles = (
  firstMonthFile = null,
  firstMonthURI = null,
  secondMonthFile = null,
  secondMonthURI = null,
  thirdMonthFile = null,
  thirdMonthURI = null,
  saveSalarySlipApi,
  callback,
) => {

  const name = `${new Date().getTime()}.zip`;
  const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;

  const sourcePath = []; //[firstMonthURI.fileCopyUri, secondMonthURI.fileCopyUri, thirdMonthURI.fileCopyUri];
  const data = {};
  if (firstMonthURI && firstMonthURI.fileCopyUri) {
    sourcePath.push(firstMonthURI.fileCopyUri);
    data['thirdMonthFile'] = firstMonthFile;
  }
  if (secondMonthURI && secondMonthURI.fileCopyUri) {
    sourcePath.push(secondMonthURI.fileCopyUri);
    data['secondMonthFile'] = secondMonthFile;
  }
  if (thirdMonthURI && thirdMonthURI.fileCopyUri) {
    sourcePath.push(thirdMonthURI.fileCopyUri);
    data['firstMonthFile'] = thirdMonthFile;
  }
  zip(sourcePath, targetPath)
    .then((path) => {
      saveSalarySlipApi({
        data: { ...data, zipFile: path },

        callback: (response) => {
          callback(response);
        },
      });
    })
    .catch((error) => {
    });
};

export const zipMultiFileDisbursementTakePhoto = (
  kliData,
  uploadDisbusementDOCUMENT,
  callback,
) => {

  const name = `${new Date().getTime()}.zip`;
  const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;

  const sourcePath = [];
  const data = {};
  Object.keys(kliData).map((item, index) => {
    sourcePath.push(kliData[item].response.path);
    data[`data${index}`] = kliData[item];
    data['multiFileUpload'] = true
  })
  zip(sourcePath, targetPath)
    .then((path) => {
      uploadDisbusementDOCUMENT({
        data: { ...data, zipFile: path },

        callback: (response) => {

          callback(response);
        },
      });
    })
    .catch((error) => {
    });
};


export const selectFilePDF = async () => {
  try {
    const res = await DocumentPicker.pick({
      copyTo: 'documentDirectory',
      type: [DocumentPicker.types.pdf],
    });
    if (bytesToMegaBytes(res.size) > 4) {
      handleError('File size should be maximum 4 MB.');
    } else {
      return res;
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
};

export const uploadDocument = async (value) => {
  try {
    // const res = await DocumentPicker.pick({
    //   copyTo: 'documentDirectory',
    //   type: [value ? DocumentPicker.types.pdf : DocumentPicker.types.images],
    // });

    const res = await ImagePicker.openPicker({
      mediaType: "photo",
    })

    try {
      const result = await ImagePicker.openCropper({
        path: res.path,
        freeStyleCropEnabled: true,
        hideBottomControls: true,
        cropping: true,
      })

      if (bytesToMegaBytes(result.size) > 4) {
        handleError('File size should be maximum 4 MB.');
      } else {
        return result;
      }
      // })
    }
    catch (e) {
      handleError(e)
    }
    ;


  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

export const uploadDocuments = async (value) => {
  try {
    const res = await DocumentPicker.pick({
      copyTo: 'documentDirectory',
      type: [value ? DocumentPicker.types.pdf : DocumentPicker.types.images],
    });
   
      if (bytesToMegaBytes(res.size) > 4) {
        handleError('File size should be maximum 4 MB.');
      } else {
        return res;
      }
      // })
    
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

export const selectFileImagePdf = async () => {
  try {
    const res = await DocumentPicker.pick({
      copyTo: 'documentDirectory',
      type: [DocumentPicker.types.pdf,],
    });
    if (bytesToMegaBytes(res.size) > 4) {
      handleError('File size should be maximum 4 MB.');
    } else {
      return res;
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
};

export const zipSalaryUpload = (
  uploadLoanURL,
  applicantUniqueId,
  uploadLoanAgreement,
  callback,
) => {
  const name = `${new Date().getTime()}.zip`;
  const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
  const sourcePath = [uploadLoanURL.fileCopyUri];

  zip(sourcePath, targetPath)
    .then((path) => {
      uploadLoanAgreement({
        data: {
          applicantUniqueId: applicantUniqueId,
          zipFile: path,
        },
        callback: (response) => {
          callback(response);
        },
      });
    })
    .catch((error) => {
    });
};

export const zipFileDisbursementTakePhoto = (
  response, object, uploadDisbusementDOCUMENT, callback
) => {
  const name = `${new Date().getTime()}.zip`;
  const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
  const sourcePath = response.path;

  zip(sourcePath, targetPath)
    .then((path) => {

      const data = {
        path,
        object,
        name,

      }
      uploadDisbusementDOCUMENT({
        data,
        callback: (response) => {
          callback(response);

        },
      })
    })
}

export const zipFileDisbursementTakePhoto2 = (
  response, object, uploadDisbusementDOCUMENT, callback
) => {
  const name = `${new Date().getTime()}.zip`;
  const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
  const sourcePath = response.uri;

  zip(sourcePath, targetPath)
    .then((path) => {

      const data = {
        path,
        object,
        name,

      }
      uploadDisbusementDOCUMENT({
        data,
        callback: (response) => {
          callback(response);

        },
      })
    })
}

export const zipFileUploadSelfie = (
  response, object, uploadSelfie, callback
) => {
  const name = `${new Date().getTime()}.zip`;
  const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
  const sourcePath = response.uri;

  zip(sourcePath, targetPath)
    .then((path) => {

      const data = {
        path,
        object,
        name,

      }
      uploadSelfie({
        data,
        callback: (response) => {
          callback(response);

        },
      })
    })
}

export const zipFileDisbursementUpload = (
  response, object, uploadCurrentDoc, callback
) => {
  const name = `${new Date().getTime()}.zip`;
  const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
  const sourcePath = [response.path || response.fileCopyUri];

  zip(sourcePath, targetPath)
    .then((path) => {

      const data = {
        path,
        object,
        name,

      }
      uploadCurrentDoc({
        data,
        callback: (response) => {
          callback(response);

        },
      })
    })
}
