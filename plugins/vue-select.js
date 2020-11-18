import Vue from 'vue';
import vSelect from 'vue-select';

export default () => {
  if (process.browser) {
    Vue.component('v-select', vSelect);
  }
};
