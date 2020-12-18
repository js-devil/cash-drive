<template>
  <div class="main-wrapper">
    <div
      class="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
      style="background: url(/img/bg/auth.jpg) no-repeat center center"
    >
      <div class="auth-box row">
        <div class="col-lg-12 col-md-12 bg-white">
          <div class="p-3">
            <div class="text-center">
              <img src="/img/logo.png" alt="wrapkit" height="50" />
            </div>
            <h2 class="mt-3 text-center">Sign Up</h2>
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
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="text-dark" for="fname">First Name</label>
                    <input
                      id="fname"
                      class="form-control"
                      v-model="auth.first_name"
                      type="text"
                      :disabled="loading"
                      placeholder="enter your first name"
                    />
                    <span class="text-danger"
                      >Ensure your name matches the name registered on your
                      BVN</span
                    >
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="text-dark" for="lname">Last Name</label>
                    <input
                      id="lname"
                      class="form-control"
                      v-model="auth.last_name"
                      type="text"
                      :disabled="loading"
                      placeholder="enter your last name"
                    />
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="text-dark" for="email">Email Address</label>
                    <input
                      id="email"
                      class="form-control"
                      v-model="auth.email"
                      type="email"
                      :disabled="loading"
                      placeholder="enter your email address"
                    />
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="text-dark" for="tel">Phone Number</label>
                    <input
                      id="tel"
                      class="form-control"
                      v-model="auth.phone"
                      type="tel"
                      :disabled="loading"
                      placeholder="enter your phone number"
                    />
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="text-dark" for="pwd">Password</label>
                    <input
                      id="pwd"
                      class="form-control"
                      :type="showPass ? 'text' : 'password'"
                      :disabled="loading"
                      v-model="auth.password"
                      placeholder="enter your password"
                    />
                    <span class="show-pass" @click="showPass = !showPass">
                      <i class="feather icon-eye" v-if="!showPass"></i>
                      <i class="feather icon-eye-off" v-else></i>
                    </span>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="text-dark" for="cpwd">Password</label>
                    <input
                      id="cpwd"
                      class="form-control"
                      type="password"
                      :disabled="loading"
                      v-model="auth.confirm_password"
                      placeholder="confirm your password"
                    />
                  </div>
                </div>

                <div class="col-lg-12 text-center">
                  <button type="submit" class="btn btn-block btn-dark">
                    {{ loading ? 'Registering...' : 'Sign Up' }}
                  </button>
                </div>
                <div
                  class="col-lg-12 text-center mt-5"
                  v-if="auth.ref_code === null"
                >
                  Have an account?
                  <n-link to="/login" class="text-danger"> Sign In </n-link>
                </div>
              </div>
            </form>
          </div>
        </div>
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
    showPass: false,
    loan_offer: {},
  }),
  methods: {
    validateSubmit() {
      const {
        email,
        password,
        first_name,
        last_name,
        phone,
        ref_code,
        confirm_password,
      } = this.auth;

      if (!first_name || !last_name) {
        this.errorMessage = 'Please enter your first and last names';
        return (this.error = true);
      }

      if (!email || !this.validateEmail(email)) {
        this.errorMessage = 'Enter a valid email address';
        return (this.error = true);
      }

      if (!phone || !this.validatePhone(phone)) {
        this.errorMessage = 'Enter a valid phone number';
        return (this.error = true);
      }

      if (!password || password.length !== 8) {
        this.errorMessage = 'Password should have eight (8) characters';
        return (this.error = true);
      }

      if (confirm_password !== password) {
        this.errorMessage = 'Please confirm your password correctly';
        return (this.error = true);
      }

      this.errorMessage = '';
      this.error = false;

      this.register({
        email,
        password,
        first_name,
        last_name,
        phone,
        password_confirmation: password,
        ref_code: ref_code || '',
      });
    },
    async register(data) {
      this.loading = true;

      try {
        const res = await this.$axios({
          method: 'POST',
          url: '/signup',
          data,
        });

        this.loading = false;
        const { data: user, token, status } = res.data;
        if (status) {
          this.$toastr.s(
            'Your account has been created successfully. Now start applying',
            'Welcome to Cashdrive!',
          );

          localStorage.setItem(
            'user',
            JSON.stringify({ ...user, token, loggedIn: true }),
          );

          localStorage.setItem('new_user', false);

          this.$store.commit('set', {
            user: {
              ...user,
              token,
              loggedIn: true,
            },
            loading: true,
          });

          if (data.ref_code) return this.continueLoan(this.loan_offer);

          this.$router.push('/dashboard');
        }
      } catch (err) {
        this.loading = false;
        this.catchErrors(err);
      }
    },
  },
  created() {
    this.$store.commit('set', { loading: true });
    const { token } = this.$route.query;
    if (token) {
      const data = JSON.parse(atob(token));
      const user = JSON.parse(localStorage.getItem('user'));
      const isRegistered = localStorage.getItem('isRegistered');
      this.auth.ref_code = data.token;
      this.loan_offer = data.data;

      if (user && user.loggedIn) return this.continueLoan(this.loan_offer);
      else if (isRegistered) return this.$router.push(`/login?token=${token}`);
    }
    this.$store.commit('set', { loading: false });
  },
};
</script>

<style>
.show-pass {
  position: absolute;
  cursor: pointer;
  top: 40px;
  right: 25px;
}

span.text-danger {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 14px;
}
</style>
