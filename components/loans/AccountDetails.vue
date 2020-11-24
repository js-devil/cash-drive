<template>
  <form class="mt-4 mx-auto w-50" @submit.prevent="validateSubmit">
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group">
          <label class="text-dark">Account Name</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0"
            v-model="account.name"
            :disabled="loading"
            autocomplete="off"
            placeholder="Your Account Name"
          />
        </div>
        <span class="text-danger"
          >Ensure it matches the name registered on your BVN</span
        >
      </div>

      <div class="col-lg-12">
        <div class="form-group customize-input">
          <label class="text-dark">Account Number</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0"
            v-model.trim="account.number"
            :disabled="loading"
            autocomplete="off"
            placeholder="Account Number must have 10 digits"
          />
        </div>
      </div>

      <div class="col-lg-12">
        <div class="form-group customize-input">
          <label class="text-dark">Account Type</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-0"
            :disabled="loading"
            v-model="account.type"
          >
            <option>Savings</option>
            <option>Current</option>
            <option>Fixed Deposit</option>
          </select>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="form-group customize-input">
          <label class="text-dark">Your BVN</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0"
            v-model="account.bvn"
            :disabled="loading"
            autocomplete="off"
            placeholder="Bank Verification Number"
          />
        </div>
      </div>

      <div class="col-lg-12 text-center">
        <button type="submit" class="btn btn-block btn-dark">Next</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    account: {},
    errorMessage: '',
    loading: false,
    error: false,
  }),
  methods: {
    validateSubmit() {
      const { type, bvn, name, number } = this.account;

      if (!name)
        return this.$toastr.e(
          'Please enter the name of the account. Ensure it matches the name registered on your BVN',
          'Invalid Account Number',
        );

      if (!this.validatePhone(number + '1'))
        return this.$toastr.e(
          'Please enter a valid account number',
          'Invalid Account Number',
        );

      if (!this.validatePhone(bvn))
        return this.$toastr.e(
          'Please enter the correct BVN issued to you from your bank',
          'Invalid BVN',
        );

      this.$emit('next');
      this.verifyAccount({
        type,
        bvn,
        name,
        number,
      });
    },
    async verifyAccount(data) {
      this.$store.commit('set', { loading: true });

      const { id } = this.$store.state.loan_application;
      try {
        const res = await this.$axios({
          method: 'PUT',
          url: `/loans/${id}/banks/verify`,
          data,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.$store.commit('set', { loading: false });
        console.log(res.data);
        this.$store.commit('set', {
          loan_application: {
            account: data,
          },
        });
      } catch (err) {
        this.catchErrors(err);
      }
    },
  },
};
</script>

<style scoped>
span.text-danger {
  position: relative;
  top: -15px;
  font-size: 14px;
}
</style>
