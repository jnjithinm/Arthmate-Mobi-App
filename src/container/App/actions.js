const saveUserData = (actions) => {
    return { type: 'SAVE_USER_DATA', actions: actions }
}

const clearUserData = (actions) => {
    return { type: 'CLEAR_ALL_DATA', actions: actions }
}

export {
    saveUserData,
    clearUserData,
};

