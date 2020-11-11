export const state = () => ({
  user: {
    loggedIn: false,
  },
  loan_application: {},
  loading: false,
});

export const mutations = {
  set(state, data) {
    for (let key of Object.keys(data)) state[key] = data[key];
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
