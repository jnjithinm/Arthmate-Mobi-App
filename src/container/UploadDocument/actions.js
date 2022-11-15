const uploadPANWrapperAPI = (actions) => {
    return { type: 'UPLOAD_PAN_API', actions: actions };
};

const savePANData = (actions) => {
    return { type: 'SAVE_PAN_DATA', actions: actions }
}

export {
    uploadPANWrapperAPI,
    savePANData,
};
