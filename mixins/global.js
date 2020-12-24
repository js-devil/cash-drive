import mixins, { months } from './mixins';
const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/0/03/Forbidden_Symbol_Transparent.svg';
import Swal from 'sweetalert2';

import { mapState, mapGetters } from 'vuex';

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

      if (message.includes('The hash value of the parameters do not match')) {
        Swal.fire({
          imageUrl,
          imageAlt: 'forbidden',
          imageHeight: 125,
          title: 'Oops!',
          text: 'Request not successful',
          // showConfirmButton: false,
        });
      }
      if (response.status === 401)
        if (
          message.toLowerCase().includes('expired') &&
          message.toLowerCase().includes('token')
        )
          return this.sessionExpired();

      Swal.fire({
        imageUrl,
        imageAlt: 'forbidden',
        imageHeight: 125,
        title: 'Oops!',
        text: message || 'An error occured!',
        // showConfirmButton: false,
      });
    },

    sessionExpired() {
      const user = { user: {}, loggedIn: false };
      localStorage.setItem('user', JSON.stringify(user));
      this.$store.commit('set', user);
      
      localStorage.setItem('isRegistered', true);
      this.$router.push('/login');

      Swal.fire(
        'This session has expired',
        'Log in to continue using Cashdrive',
        'success',
      );
    },

    logout() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to log off!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E26511',
        cancelButtonColor: '#00162A',
        confirmButtonText: 'Yes',
      }).then(result => {
        if (result.value) {
          const user = { user: {}, loggedIn: false };
          localStorage.setItem('user', JSON.stringify(user));
          this.$store.commit('set', user);
          
          localStorage.setItem('isRegistered', true);
          this.$router.push('/login');

          Swal.fire('Logged Out!', 'See you next time', 'success');
        }
      });
    },

    status: status =>
      status == 1
        ? '<span class="badge badge-primary">Accepted</span>'
        : status == 2
        ? '<span class="badge badge-warning">Declined</span>'
        : status == 3
        ? '<span class="badge badge-success">Approved</span>'
        : status == 4
        ? '<span class="badge badge-info">Signed Contract</span>'
        : status == 5
        ? '<span class="badge badge-dark">Defaulted</span>'
        : status == 6
        ? '<span class="badge badge-danger">Rejected</span>'
        : '<span class="badge badge-secondary">Neutral</span>',

    repaymentPlan: plan =>
      !plan
        ? '-'
        : plan == 1
        ? 'every month'
        : plan == 2
        ? 'every two months'
        : 'quarterly',

    checkLoanIsActive: ({ status }) =>
      status == 1 || status == 3 || status == 4 || status == 5,
    async getAllLoans() {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: '/users/loans',
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.loans = res.data.data;
        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
    },
    async getBanks() {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: '/banks',
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.banks = res.data.data;
        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
    },
    continueLoan(loan) {
      this.$store.commit('set', {
        loan_application: loan,
      });
      this.$router.push('/loan/apply?status=0');
    },
    stopWebCam() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(mediaStream => {
          const stream = mediaStream;
          if(stream) stream.getTracks().forEach(track => track.stop());
        });
    },
  },
  data: () => ({
    months,
  }),
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    ...mapState(['user']),
    userNames() {
      return `${this.user.first_name} ${this.user.last_name}`.toLowerCase();
    },
  },
};
