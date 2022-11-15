const initialState = {
  isVisible: false,
  showLoader: false,
  dialogData: {},
};

export const hocReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return {
        ...state,
        showLoader: true,
      };
    case 'HIDE_LOADER':
      return {
        ...state,
        showLoader: false,
      };
    default:
      return state;
  }
};
