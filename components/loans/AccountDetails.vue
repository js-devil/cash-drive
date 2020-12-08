<template>
  <form class="mt-4 mx-auto w-50" @submit.prevent="validateSubmit">
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group">
          <label class="text-dark">Bank</label>
          <v-select
            :options="banks.map(key => key.name)"
            class="vSelect bankSelect"
            :disabled="loading"
            id="bank"
            v-model="account.name"
            :searchable="true"
          >
          </v-select>
        </div>
      </div>

      <!-- <div class="col-lg-12">
        <div class="form-group customize-input">
          <label class="text-dark">Account Name</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0"
            v-model="account.holder_name"
            autocomplete="off"
            placeholder="Account Name must be the same name registered on BVN"
          />
        </div>
      </div> -->

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
    banks: [],
  }),
  mounted() {
    this.account.holder_name = this.userNames
    this.getBanks();
  },
  methods: {
    validateSubmit() {
      const { type, bvn, number, name, holder_name } = this.turnToLower(
        this.account,
      );

      if (!name)
        return this.$toastr.e('Please select the bank your account belongs to');

      const { code } = this.banks.find(key => key.name.toLowerCase() === name);

      if (!holder_name)
        return this.$toastr.e('Please enter the name of your account');

      if (!this.validatePhone(number + '1'))
        return this.$toastr.e(
          'Please enter a valid account number',
          'Invalid Account Number',
        );

      if (!type) return this.$toastr.e('Please select the account type');

      if (!this.validatePhone(bvn))
        return this.$toastr.e(
          'Please enter the correct BVN issued to you from your bank',
          'Invalid BVN',
        );

      this.verifyAccount({
        type,
        holder_name,
        bvn,
        name,
        number,
        code,
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
