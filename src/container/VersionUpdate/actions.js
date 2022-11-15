const saveOrUpdateAndroidVersion = (actions) => {
    return { type: 'UPDATE_ANDROID_VERSION', actions: actions };
};

const getAndroidVersion = (actions) => {
    return { type: 'GET_ANDROID_VERSION', actions: actions };
};



export {
    saveOrUpdateAndroidVersion,
    getAndroidVersion,
};