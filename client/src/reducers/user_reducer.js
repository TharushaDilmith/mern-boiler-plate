export default (state = {}, action) => {
  switch (action.type) {
    // case "SET_CURRENT_USER":
    //   return {
    //     ...state,
    //     isAuthenticated: !isEmpty(action.payload),
    //     user: action.payload,
    //   };
    default:
      return state;
  }
};
