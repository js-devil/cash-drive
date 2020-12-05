<template>
   <div class="card-body">
        <div class="coupons text-center">
          <div class="coupons-title">
            <p>Select Bank Account to use for this transaction</p>

            <span
              class="badge badge-pill bg-danger close-modal rounded-circle py-1 px-1"
            >
              <i @click="$emit('close')" class="feather icon-x text-white"></i>
            </span>
          </div>
        </div>

        <div class="form-group">
          <label class="text-dark">Bank</label>
          <v-select
            :options="banks.map(key => key.name)"
            class="vSelect bankSelect"
            :disabled="loading"
            id="bank"
            v-model="bank"
            :searchable="true"
          >
          </v-select>
        </div>

        <div class="form-group">
          <label class="text-dark">Account</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-none"
            v-model="selectedAccount"
            @change="getAccount($event.target.value)"
          >
            <option
              class="text-capitalize"
              v-for="account in user.banks"
              :key="account.number"
              :value="account.number"
            >
              {{ account.number }}
            </option>
            <option>Other</option>
          </select>
        </div>

        <div class="row" v-if="selectedAccount === 'Other'">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="form-group">
              <label class="text-dark">Account Name</label>
              <input
                class="form-control bg-white custom-radius custom-shadow border-none"
                v-model="account.payer_name"
                :disabled="loading"
                id="plate_number"
                autocomplete="off"
                placeholder="Enter Account Name"
              />
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="form-group">
              <label class="text-dark">Account Number</label>
              <input
                class="form-control bg-white custom-radius custom-shadow border-none"
                v-model="account.payer_account"
                :disabled="loading"
                id="plate_number"
                autocomplete="off"
                placeholder="Enter Account Number"
              />
            </div>
          </div>
        </div>

        <hr />
        <div class="price-details">
          <p>Account Details</p>
        </div>
        <div class="detail">
          <div class="detail-title">Account Name</div>
          <div class="detail-amt text-uppercase">{{ account.payer_name }}</div>
        </div>
        <div class="detail">
          <div class="detail-title">Account Number</div>
          <div class="detail-amt discount-amt">{{ account.payer_account }}</div>
        </div>
        <div class="detail">
          <div class="detail-title">Email Address</div>
          <div class="detail-amt">{{ account.payer_email }}</div>
        </div>
        <div class="detail">
          <div class="detail-title">Phone Number</div>
          <div class="detail-amt emi-details">{{ account.payer_phone }}</div>
        </div>
        <hr />
        <div
          @click.prevent="validateSubmit"
          class="btn btn-primary btn-block place-order waves-effect waves-light"
        >
          Submit
        </div>
      </div>
</template>

<script>
export default {
  props: {
    banks: Array,
    loan: Object,
  },
  data() {
    return {
      bank: '',
      selectedAccount: '',
      account: {},
      loading: false,
    };
  },
  methods: {
    getAccount(value) {
      let defaultAccount = {
        payer_name: '',
        payer_account: '',
        payer_email: this.user.email,
        payer_phone: this.user.phone,
      };

      if (value !== 'Other') {
        const account = this.user.banks.find(key => key.number === value);
        if (!account) this.account = {};

        const { name: payer_name, number: payer_account } = account;

        this.account = {
          ...defaultAccount,
          payer_name,
          payer_account,
        };
      } else this.account = defaultAccount;
    },
    validateSubmit() {
      const { payer_name, payer_account, payer_email, payer_phone } = this.account;
      if(!this.bank) return this.$toastr.e('Please select the bank for this transaction')
      if(!payer_name) return this.$toastr.e('Please enter the name of the account for this transacton!')
      if(!payer_account || !this.validatePhone(payer_account+'1')) return this.$toastr.e('Account Number must be 10 numbers', '')

      const payer_bank_code = this.banks.find(key => key.name === this.bank).code

      console.log({
        payer_name, payer_account, payer_email, payer_phone,
        payer_bank_code
      })
    },
    async initiateMandate(data) {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: `/loans/${this.loan.id}/direct-debit/initiate`,
          method: 'post',
          data,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.banks = res.data.data;
        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
    }
  },
};
</script>

<style>
.options-title {
  color: #b8c2cc;
}

.coupons {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.coupons .coupons-title {
  font-weight: 600;
}

.coupons .coupons-title p {
  margin-bottom: 0.5rem;
}

.coupons .close-modal {
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 18px;
  top: 16px;
}
.coupons .apply-coupon p {
  margin-bottom: 0.5rem;
}

.price-details {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.detail {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.detail .detail-title {
  color: #b8c2cc;
}
.detail .detail-title.detail-total {
  color: #626262;
  font-weight: 600;
}
.detail .detail-amt.discount-amt {
  color: #28c76f;
}
.detail .detail-amt.emi-details {
  color: #7367f0;
  cursor: pointer;
}
.detail .detail-amt.total-amt {
  font-weight: 600;
}

.bankSelect .vs__clear {
  border: none;
  background: transparent;
  position: absolute;
  right: 45px;
  margin-top: -28px;
}

.bankSelect input.vs__search {
  border: none;
}
</style>
