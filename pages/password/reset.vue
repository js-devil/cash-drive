<template>
  <div class="main-wrapper">
    <div
      class="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
      style="background: url(/img/bg/auth.jpg) no-repeat center center"
    >
      <div class="auth-box row">
        <div class="col-lg-2 col-md-2" />
        <div class="col-lg-8 col-md-8 bg-white">
          <div class="p-3">
            <div class="text-center">
              <img src="/img/logo.png" alt="wrapkit" height="50" />
            </div>
            <h2 class="mt-3 text-center">Reset Password</h2>
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
                    <label class="text-dark" for="pwd">New Password</label>
                    <input
                      id="pwd"
                      class="form-control bg-white custom-radius custom-shadow border-0"
                      type="password"
                      :disabled="loading"
                      v-model="auth.password"
                      placeholder="enter your new password"
                    />
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="form-group">
                    <label class="text-dark" for="cpwd">Confirm Password</label>
                    <input
                      id="cpwd"
                      class="form-control bg-white custom-radius custom-shadow border-0"
                      type="password"
                      :disabled="loading"
                      v-model="auth.password_confirmation"
                      placeholder="confirm your new password"
                    />
                  </div>
                </div>
                <div class="col-lg-12 text-center">
                  <button type="submit" class="btn btn-block btn-dark">
                    {{ loading ? 'Resetting...' : 'Reset' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-2 col-md-2" />
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
  }),
  methods: {
    validateSubmit() {
      const { email, password, password_confirmation } = this.auth;

      if (!email || !this.validateEmail(email)) {
        this.errorMessage = 'Enter a valid email address';
        return (this.error = true);
      }

      if (!password || password.length !== 8) {
        this.errorMessage = 'Password should have eight (8) characters';
        return (this.error = true);
      }

      if (!password_confirmation || password !== password_confirmation) {
        this.errorMessage =
          'Please confirm your password as both passwords do not match';
        return (this.error = true);
      }

      this.errorMessage = '';
      this.error = false;

      this.resetPassword({ email, password, password_confirmation });
    },
    async resetPassword(data) {
      this.loading = true;

      try {
        const res = await this.$axios({
          method: 'POST',
          url: '/reset-password',
          data,
        });

        this.loading = false;
        const { status } = res.data;
        if (status) {
          this.$toastr.s(
            'The password to your account has been reset successfully',
            'Successful!',
          );

          this.$router.push('/');
        }
      } catch (err) {
        this.loading = false;
        this.catchErrors(err);
      }
    },
  },
};
</script>

<style></style>
