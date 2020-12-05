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
      if (!this.$route.name) return false;

      return (
        this.$route.name !== 'index' &&
        this.$route.name !== 'register' &&
        this.$route.name !== 'login' &&
        !this.$route.name.includes('password') &&
        !this.$route.name.includes('contract')
      );
    },
  },
};
</script>

<style>
.swal2-title {
  font-size: 1.5rem;
}

.btn-primary,
.bg-primary {
  background-color: #e26511 !important;
  border-color: #e26511 !important;
}

.bg-secondary,
.btn-secondary {
  background-color: #00162a !important;
  border-color: #00162a !important;
}

.vSelect .vs__selected {
  margin: 0;
}

.vSelect .vs__search::placeholder,
.vSelect .vs__dropdown-toggle,
.vSelect .vs__dropdown-menu {
  background: #ffffff;
  border: none;
  box-shadow: 0 2px 9px 0 rgba(169, 184, 200, 0.2);
  text-transform: lowercase;
  /* font-variant: small-caps; */
  text-transform: capitalize;
  font-family: inherit;
  width: 100%;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background: #fff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px;
}
.vSelect .vs__dropdown-menu {
  list-style: none;
  padding-top: 5px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
}

.vSelect .vs__dropdown-menu li:hover {
  cursor: pointer;
}

.vSelect .vs__actions {
  display: block;
  padding: 0;
}

.vSelect .vs__clear {
  fill: #394066;
}

.vSelect .vs__open-indicator {
  display: none;
}

.mandate {
  background: transparent !important;
  border: none !important;
}
</style>
