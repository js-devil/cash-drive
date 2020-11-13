import mixins from './mixins';
const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/0/03/Forbidden_Symbol_Transparent.svg';
import Swal from 'sweetalert2';

import { mapState } from 'vuex';

export default {
  methods: {
    ...mixins,
    catchErrors({ response }) {
      this.$store.commit('set', { loading: false });

      if (!response)
        return this.$toastr.w(
          'Please check your internet connection and try again',
          'Network Error!',
        );

      const { message } = response.data;

      if (message.toLowerCase().includes('token is invalid')) {
        return;
      }

      Swal.fire({
        imageUrl,
        imageAlt: 'forbidden',
        imageHeight: 200,
        title: 'Oops!',
        text: message || 'An error occured!',
        // showConfirmButton: false,
      });
    },
  },
  data: () => ({}),
  computed: {
    ...mapState(['user']),
    userNames() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
  },
};
