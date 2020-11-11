import Vue from 'vue';
import VueToastr from 'vue-toastr';

export default () => {
  if (process.client) {
    Vue.use(VueToastr, {
      defaultTimeout: 5000,
      defaultCloseOnHover: false,
    });
  }
};
