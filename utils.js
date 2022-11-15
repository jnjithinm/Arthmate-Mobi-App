import { showMessage } from 'react-native-flash-message';
export function genericFetch(response) {
  // console.log("genricjjrrrrjj", JSON.stringify(response, null, 4));
  let apiResponse = response;
  // console.log("apiResponse",apiResponse);
  if (
    response &&
    response.status &&
    response.status == 200 &&
    response.data &&
    response.data.error === false
  ) {
    return apiResponse;
  } 
  else if(response?.data?.type == "bureau" ){
    return apiResponse;
  }
  else {
    const error = response.data.message
      // ||
      // 'Something went wrong!';
    throw error;
  }
}

export function handleError(error) {
  var errorMessage = ''
  // let errorMessage = error.message === undefined ? 'Something went wrong!'  : error.message === 'unexpected end of stream' ? error.message  : error.message === "Network Error" ? error.message :  (error !== '') || (error !== undefined) ? error : 'Something went wrong!';
  /*  if (error.message === undefined) {
     errorMessage = 'Something went wrong!'
   } */
  if (error.message) {
    errorMessage = error.message
  }
  else if (error.message === 'Co-applicant age should be between 22 to 60') {
    errorMessage = 'Something went wrong!'
  }
  else if (error.message === 'unexpected end of stream') {
    errorMessage = 'Something went wrong!'
  }
  else if (error.message === "Network Error") {
    errorMessage = error.message
  }
  else if (error.message === 'Request failed with status code 500') {
    errorMessage = error.message
  }
  else {
    errorMessage = error
  }
  showMessage({
    message: errorMessage,
    type: 'danger',
  });
}

export function handleSuccess(message) {
  showMessage({
    message: message,
    type: 'success',
  });
}

export function handleWarning(message) {
  showMessage({
    message: message,
    type: 'warning',
  });
}

export function bytesToMegaBytes(bytesData) {
  const sizeInMB = (bytesData / (1024 * 1024)).toFixed(2);
  return sizeInMB;
}
