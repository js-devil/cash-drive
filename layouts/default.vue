<template>
  <div>
    <Navbar v-if="isDashboard" />
    <Sidebar v-if="isDashboard" />
    <Nuxt />
    <Loader v-if="showLoader" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
import Loader from '~/components/Loader.vue';

import global from '../mixins/global';
import Navbar from '../components/navigation/Navbar.vue';
import Sidebar from '../components/navigation/Sidebar.vue';

Vue.mixin(global);

export default {
  components: {
    Loader,
    Navbar,
    Sidebar,
  },
  computed: {
    ...mapGetters(['showLoader']),
    isDashboard() {
      return (
        this.$route.name !== 'index' &&
        this.$route.name !== 'register' &&
        this.$route.name !== 'login'
      );
    },
  },
};
</script>
