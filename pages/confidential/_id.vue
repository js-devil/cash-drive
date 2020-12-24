<template>
  <div class="container">
    <div class="row">
      <div
        v-if="!error"
        class="contract-page col-lg-8 offset-lg-2 col-sm-6 offset-sm-3 col-12"
      >
        <header class="bg-primary text-center">
          <h3 class="text-white font-weight-bolder pt-5">Loan Agreement</h3>
        </header>
        
        <main class="bg-white px-3 py-2 text-center" v-if="loggedIn">
          <p>
            THIS LOAN AGREEMENT dated this
            <span class="underline">{{ thisDay }}</span>
            day of <span class="underline">{{ thisMonth }}</span
            >,
            <span class="underline">{{ thisYear }}</span>
          </p>

          <h6>BETWEEN</h6>

          <div class="w-50 mt-4 mx-auto">
            <h5 class="mb-0 underline px-3" style="font-size: 24px">
              CashDrive LTD
            </h5>
            <span class="font-weight-bolder">(The "Lender")</span>
          </div>

          <div class="w-50 my-3 mx-auto">
            <h4>AND</h4>
          </div>

          <div class="w-50 mx-auto">
            <h5
              class="mb-0 text-capitalize underline px-3"
              style="font-size: 24px"
            >
              {{ userNames }}
            </h5>
            <span class="font-weight-bolder">(The "Borrower")</span>
          </div>

          <div class="mt-4 mx-auto">
            <!-- <p>
              <span class="font-weight-bold">IN CONSIDERATION OF</span> the
              Lender loaning certain monies (the "Loan) to the Borrower, and the
              Borrower repaying the Loan to the Lender, both parties agree to
              keep, perform and fulfill the promises and conditions set out in
              this Agreement:
            </p> -->

            <p>
              The Lender promises to loan
              <span class="underline font-weight-bolder">{{
                formatAmount(auth.offer_amount)
              }}</span>
              to the Borrower and the Borrower promises to repay this principal
              amount to the Lender, without interest payable on the unpaid
              principal, beginning on
              <span class="font-weight-bold">
                {{ formatDate(auth.repayment_date) }}</span
              >.
            </p>

            <div class="d-flex justify-content-center">
              <button
                class="btn-sm btn-primary mr-3 border-0 py-2"
                style="width: 100px"
                @click="showSignModal = true"
              >
                Sign
              </button>
              <!-- <button
                class="btn-sm btn-danger border-0 py-2"
                style="width: 100px"
              >
                Reject
              </button> -->
            </div>
          </div>
        </main>
        
        <main v-else class="bg-white">

          <div class="mx-5 bg-white">
            <div class="p-3">
              <h4 class="my-3 text-center">Sign in to view this contract</h4>
              <b-alert
                variant="danger"
                dismissible
                fade
                :show="!!errorMessage"
                @dismissed="errorMessage = ''"
              >
                {{ errorMessage }}
              </b-alert>

              <form class="mt-4" @submit.prevent="validateSubmit">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="email">Email</label>
                      <input
                        id="email"
                        class="form-control bg-white custom-radius custom-shadow border-0"
                        v-model="auth.email"
                        type="email"
                        :disabled="loading"
                        placeholder="enter your email address"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="pwd">Password</label>
                      <input
                        id="pwd"
                        class="form-control bg-white custom-radius custom-shadow border-0"
                        type="password"
                        :disabled="loading"
                        v-model="auth.password"
                        placeholder="enter your password"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 text-center">
                    <button type="submit" class="btn btn-block btn-dark">
                      {{ loading ? 'Signing in...' : 'Sign In' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
        
        <footer class="bg-secondary px-3 d-flex justify-content-between">
          <img src="/img/logo.png" alt="homepage" height="60" class="mt-4" />

          <p class="text-white mt-1">
            <i class="feather icon-mail" aria-hidden="true"></i>
            info@cashdrive.com<br />
            <i
              class="feather icon-phone"
              style="transform: scaleX(-1)"
              aria-hidden="true"
            ></i>
            +234 802 857 2566<br />
            <i
              class="feather icon-phone"
              style="transform: scaleX(-1)"
              aria-hidden="true"
            ></i>
            +234 817 555 6789<br />
            <i
              class="feather icon-phone"
              style="transform: scaleX(-1)"
              aria-hidden="true"
            ></i>
            +234 703 491 2176
          </p>
        </footer>

        <b-modal
          centered
          ref="otpModal"
          hide-header
          hide-footer
          no-close-on-esc
          no-close-on-backdrop
          content-class="mandate"
        >
          <OTP @close="showSignModal = false" />
        </b-modal>
      </div>

      <div
        v-else
        class="col-lg-8 offset-lg-2 col-sm-6 offset-sm-3 col-12 p-3 error-main"
      >
        <img
          src="https://cashdrive.co/_elements/home/logo.png"
          class="img-fluid mt-3"
          style="width: 150px; height: 40px"
        />
        <h4 class="mt-4">This token is invalid or has expired!</h4>
        <p>Login to your account to resend the mail</p>

        <n-link to="/login" class="btn btn-primary mt-3"
          >Let's get you back</n-link
        >
        <p class="mt-4">CashDrive © 2020</p>
      </div>
    </div>
  </div>
</template>

<script>
import OTP from '~/components/OTP.vue';
export default {
  components: { OTP },
  data() {
    return {
      auth: {
        offer_amount: 10000,
        repayment_date: new Date(),
      },
      errorMessage: '',
      loading: false,
      loggedIn: false,
      error: false,
      showSignModal: false,
    };
  },
  methods: {
    async getUserDetails(token) {
      try {
        const res = await this.$axios({
          url: `/contracts/verify/${token}`,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.auth = res.data.data;
        this.$store.commit('set', { loading: false });
      } catch (e) {
        this.error = true;
        if (!e.response) return this.catchErrors(e);

        this.$store.commit('set', { loading: false });
      }
    },
    
    validateSubmit() {
      const { email, password } = this.auth;

      if (!email || !this.validateEmail(email)) {
        this.errorMessage = 'Enter a valid email address';
        return;
      }

      if (!password || password.length < 8) {
        this.errorMessage =
          'Password should have at least eight (8) characters';
        return;
      }

      this.errorMessage = '';

      this.login({ email, password });
    },
    async login(data) {
      this.loading = true;

      try {
        const res = await this.$axios({
          method: 'POST',
          url: '/signin',
          data,
        });

        this.loading = false;
        const { data: user, token, status } = res.data;
        if (status) {
          this.$toastr.s('', 'Welcome');

          localStorage.setItem(
            'user',
            JSON.stringify({ ...user, token, loggedIn: true }),
          );

          this.$store.commit('set', {
            user: {
              ...user,
              token,
              loggedIn: true,
            },
          });

          this.loggedIn = true;
        }
      } catch (err) {
        this.loading = false;
        this.catchErrors(err);
      }
    },
  },
  created() {
    this.$store.commit('set', { loading: true });
    const { id } = this.$route.params;
    if (id) return this.getUserDetails(id);
    this.$store.commit('set', { loading: false });
    this.$router.push('/login');
  },
  watch: {
    showSignModal() {
      if (this.showSignModal) return this.$refs.otpModal.show();
      this.$refs.otpModal.hide();
    },
  },
  computed: {
    thisDay() {
      const date = new Date().getDate();
      const split = String(date).split('');
      const lastNo = split[split.length - 1];
      const title =
        lastNo == 1 ? 'st' : lastNo == 2 ? 'nd' : lastNo == 3 ? 'rd' : 'th';

      return date + title;
    },
    thisMonth() {
      return this.months[new Date().getMonth()];
    },
    thisYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style>
body {
  background-color: #f0f5f9;
}

.contract-page {
  /* box-shadow: 0px 10px 10px -10px #5d6572; */
}
.contract-page header {
  height: 15vh;
  background: url('https://www.cashdrive.co/frontend/assets/img/footer-img.png')
    no-repeat;
  border-bottom: 5px solid #00162a;
  background-size: 100% 100%;
}

.contract-page footer {
  height: 15vh;
}

.contract-page main {
  height: 70vh;
}

.contract-page main .underline {
  border-bottom: 2px solid;
  padding: 0 25px;
}

.error-main {
  margin-top: 150px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 10px 10px -10px #5d6572;
}
</style>
