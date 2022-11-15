const saveSCHEME = (actions) => {
    return { type: "SAVE_SCHEME", actions: actions };
}
const createUpdateCUSTOMER = (actions) => {
    return { type: "CREATE_UPDATE_CUSTOMER", actions: actions };
}
export {
    saveSCHEME,
    createUpdateCUSTOMER
}