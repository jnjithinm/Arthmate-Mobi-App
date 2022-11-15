
const showLoader = (actions) => {
    return { type: 'SHOW_LOADER', actions: actions }
}

const hideLoader = (actions) => {
    return { type: 'HIDE_LOADER', actions: actions }
}

export {
    showLoader,
    hideLoader,
};
