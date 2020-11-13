export const state = () => ({
  user: {
    loggedIn: false,
  },
  loan_application: {
    desired_amount: 9000,
    desired_tenor: 6,
    desired_repayment_plan: 1,
  },
  loading: false,
});

export const mutations = {
  set(state, data) {
    for (let key of Object.keys(data)) state[key] = data[key];
    console.log(state.loan_application);
  },
  updateLoanApp(state, data) {
    state.loan_application = { ...state.loan_application, ...data };
    console.log(state.loan_application);
  },
};

export const getters = {
  isAuthenticated(state) {
    return state.auth ? state.auth.loggedIn : false;
  },
  loggedInUser(state) {
    return state.auth ? state.auth.user : null;
  },
  showLoader: state => state.loading,
};
