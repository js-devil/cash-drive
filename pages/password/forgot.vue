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
            <h2 class="mt-3 text-center">Forgot Password</h2>
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
                      v-model="user.email"
                      type="email"
                      :disabled="loading"
                      placeholder="enter your email address"
                    />
                  </div>
                </div>
                <div class="col-lg-12 text-center">
                  <button type="submit" class="btn btn-block btn-dark">
                    {{ loading ? 'Submitting...' : 'Submit' }}
                  </button>
                </div>

                <div class="col-lg-12 text-left mt-5">
                  Do you remember it now?
                  <n-link to="/" class="text-danger"> Login </n-link>
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
    user: {},
    errorMessage: '',
    loading: false,
    error: false,
  }),
  methods: {
    validateSubmit() {
      const { email } = this.user;

      if (!email || !this.validateEmail(email)) {
        this.errorMessage = 'Enter a valid email address';
        return (this.error = true);
      }

      this.errorMessage = '';
      this.error = false;

      this.getResetLink(email);
    },
    async getResetLink(email) {
      this.loading = true;

      try {
        const res = await this.$axios({
          method: 'GET',
          url: `/resend-email-verification/${email}`,
        });

        this.loading = false;
        const { status } = res.data;
        if (status) {
          this.$toastr.s(
            'A password reset link has been sent to your email address. Click it to reset your password',
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
