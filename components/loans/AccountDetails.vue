<template>
  <form class="mt-4 mx-auto w-50" @submit.prevent="validateSubmit">
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group customize-input">
          <label class="text-dark">Account Name</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0 text-capitalize"
            :value="userNames"
            disabled
            autocomplete="off"
            placeholder="Account Number must have 10 digits"
          />
        </div>
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
      const { type, bvn, number } = this.turnToLower(this.account);

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
        name: this.userNames,
        number,
      });
    },
    async verifyAccount(data) {
      this.$store.commit('set', { loading: true });

      const { id } = this.$store.state.loan_offer;
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

        this.$store.commit('set', {
          loan_offer: res.data.data,
        });
      } catch (err) {
        this.catchErrors(err);
      }
    },
  },
};
</script>
