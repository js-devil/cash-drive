<template>
  <div class="main-wrapper">
    <div
      class="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
      style="background: url(/img/bg/auth.jpg) no-repeat center center"
    >
      <div class="auth-box row">
        <div class="col-lg-3 col-md-3" />
        <div class="col-lg-6 col-md-6 bg-white">
          <div class="p-3">
            <div class="text-center">
              <img src="/img/logo.png" alt="wrapkit" height="50" />
            </div>
            <h2 class="mt-3 text-center">Sign In</h2>
            <b-alert
              variant="danger"
              dismissible
              fade
              :show="error"
              @dismissed="error = false"
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
                <div class="col-lg-12 text-left mt-5">
                  Don't have an account?
                  <n-link to="/register" class="text-danger"> Sign Up </n-link>
                </div>
                <div class="col-lg-12 text-left my-3">
                  Forgot Password?
                  <n-link to="/password/forgot" class="text-danger">
                    Reset
                  </n-link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-3 col-md-3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    auth: {},
    errorMessage: '',
    loading: false,
    error: false,
    loan_offer: {},
  }),
  methods: {
    validateSubmit() {
      const { email, password } = this.auth;

      if (!email || !this.validateEmail(email)) {
        this.errorMessage = 'Enter a valid email address';
        return (this.error = true);
      }

      if (!password || password.length < 8) {
        this.errorMessage =
          'Password should have at least eight (8) characters';
        return (this.error = true);
      }

      this.errorMessage = '';
      this.error = false;

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
            loading: true,
          });

          if (this.$route.query.token) {
            const active_loan = await this.getActiveLoan(token);

            if (active_loan) {
              this.showError(
                'Forbidden!',
                `You already have an active loan, you can't apply for a new loan at the moment!`,
              );

              this.$router.push('/dashboard');
              return;
            } else return this.continueLoan(this.loan_offer);
          }

          this.$router.push('/dashboard');
        }
      } catch (err) {
        this.loading = false;
        this.catchErrors(err);
      }
    },
  },
  created() {
    const { token } = this.$route.query;
    if (token) {
      const data = JSON.parse(atob(token));
      this.loan_offer = data.data;
      this.$store.commit('set', { loading: false });
    }
  },
};
</script>

<style></style>
