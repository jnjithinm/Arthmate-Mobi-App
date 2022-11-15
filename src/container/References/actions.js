const saveUpdateFamilyREFERENCE = (actions) => {
    return { type: "SAVE_UPDATE_FAMILY_REFERENCE", actions: actions };
}
const saveUpdateNonFamilyREFERENCE = (actions) => {
    return { type: "SAVE_UPDATE_NON_FAMILY_REFERENCE", actions: actions };
}
export {
    saveUpdateFamilyREFERENCE,
    saveUpdateNonFamilyREFERENCE
}