export const state = () => ({
  user: {
    loggedIn: false,
  },
  loan_application: {},
  loading: false,
  loan_offer: {},
});

export const mutations = {
  set(state, data) {
    for (let key of Object.keys(data)) state[key] = data[key];
  },
  updateLoanApp(state, data) {
    state.loan_application = { ...state.loan_application, ...data };
  },
};
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  showLoader: state => state.loading,
};
