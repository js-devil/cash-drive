export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  //   mode: 'spa',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Car Title Loans | Quick Loans For Car Owners | CashDrive',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: '/css/styles.css' },
      { rel: 'stylesheet', href: '/css/feather.css' },
    ],
  },
  loading: { color: '#e26511' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    {
      src: '~/plugins/toastr',
      mode: 'client',
    },
    {
      src: '~/plugins/auth',
      mode: 'client',
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],

  env: {
    // apiKey: process.env.API_KEY || 'ulmQjpnWb92Z9AvSsz3ow5GILpzFJ04xWyYhXNECrr8ACF3omGj7aQHq0wu65VDx',
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://52.177.172.188/api/v1',
    progress: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
