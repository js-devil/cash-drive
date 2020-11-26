<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="container-fluid">
        <div class="row" v-if="!editProfile">
          <!-- account start -->
          <div class="col-12">
            <div class="card">
              <div
                class="card-header bg-transparent d-flex justify-content-between"
              >
                <div class="card-title">Profile</div>
                <button
                  class="btn btn-sm btn-secondary"
                  @click="editProfile = true"
                >
                  <i class="feather icon-edit-1"></i> Edit
                </button>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12 col-sm-9 col-md-3 col-lg-3">
                    <img
                      height="100"
                      src="~/assets/img/user.svg"
                      class="users-avatar-shadow w-100 rounded mb-2 pr-2 ml-1"
                      alt="avatar"
                    />
                  </div>
                  <div class="col-12 col-sm-9 col-md-9">
                    <table>
                      <tr class="mb-3">
                        <td class="font-weight-bold">Full Name</td>
                        <td>{{ userNames }}</td>
                      </tr>
                      <tr class="mb-3">
                        <td class="font-weight-bold">Email Address</td>
                        <td>{{ user.email }}</td>
                      </tr>
                      <tr class="mb-3">
                        <td class="font-weight-bold">Phone Number</td>
                        <td>{{ user.phone }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form v-else class="mt-5 mx-auto w-50" @submit.prevent="validateSubmit">
          <i
            class="feather icon-arrow-left go-back"
            @click="editProfile = false"
          ></i>
          <h4 class="mt-3 text-center">Profile</h4>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="error"
            @dismissed="error = false"
          >
            {{ errorMessage }}
          </b-alert>

          <div class="row">
            <div class="col-lg-12">
              <div class="form-group customize-input">
                <label class="text-dark">First Name</label>
                <input
                  class="form-control bg-white custom-radius custom-shadow border-0"
                  v-model.trim="auth.first_name"
                  :disabled="loading"
                  autocomplete="off"
                  placeholder="Enter your first name "
                />
                <span class="text-danger"
                  >Ensure your name matches the name registered on your
                  BVN</span
                >
              </div>
            </div>

            <div class="col-lg-12 mt-3">
              <div class="form-group customize-input">
                <label class="text-dark">Last Name</label>
                <input
                  class="form-control bg-white custom-radius custom-shadow border-0"
                  v-model.trim="auth.last_name"
                  :disabled="loading"
                  autocomplete="off"
                  placeholder="Enter your last name "
                />
                <span class="text-danger"
                  >Ensure your name matches the name registered on your
                  BVN</span
                >
              </div>
            </div>

            <div class="col-lg-12 mt-3">
              <div class="form-group customize-input">
                <label class="text-dark">Your Phone Number</label>
                <input
                  class="form-control bg-white custom-radius custom-shadow border-0"
                  v-model="auth.phone"
                  :disabled="loading"
                  autocomplete="off"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div class="col-lg-12 text-center">
              <button type="submit" class="btn btn-block btn-dark">
                Submit
              </button>
            </div>
          </div>
        </form>
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
    editProfile: true,
  }),
  mounted() {
    const { first_name, last_name, phone } = this.user;
    this.auth = { first_name, last_name, phone };
  },
  methods: {
    validateSubmit() {
      const { first_name, last_name, phone } = this.auth;

      if (!first_name || !last_name) {
        this.errorMessage = 'Please enter your first and last names';
        return (this.error = true);
      }

      if (!phone || !this.validatePhone(phone)) {
        this.errorMessage = 'Enter a valid phone number';
        return (this.error = true);
      }

      this.updateProfile({ first_name, last_name, phone });
    },
    async updateProfile(data) {
      this.$store.commit('set', { loading: true });
      try {
        const res = await this.$axios({
          method: 'POST',
          url: `/users/update`,
          data,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        const user = { ...this.user, ...res.data.data };
        localStorage.setItem(
          'user',
          JSON.stringify({ ...user, loggedIn: true }),
        );

        this.$store.commit('set', { loading: false, user });
        this.editProfile = false;
        this.$toastr.s('Your profile has been updated!', 'Success');
      } catch (err) {
        this.catchErrors(err);
      }
    },
  },
};
</script>

<style scoped>
.go-back {
  position: absolute;
  font-size: 18px;
  cursor: pointer;
}
</style>
