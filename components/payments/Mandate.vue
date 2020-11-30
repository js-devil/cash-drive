<template>
  <div class="card">
    <div class="card-content">
      <div class="card-body">
        <div class="coupons">
          <div class="coupons-title">
            <p>Select Bank Account to use for this transaction</p>
          </div>
        </div>

        <div class="form-group">
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-none"
            v-model="bank"
          >
            <option
              class="text-capitalize"
              v-for="bank in user.banks"
              :key="bank.number"
              :value="bank.number"
            >
              {{ bank.number }}
            </option>
          </select>
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
          class="btn btn-primary btn-block place-order waves-effect waves-light"
        >
          Submit
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bank: {},
    };
  },
  computed: {
    account() {
      const bank = this.user.banks.find(key => key.number === this.bank);
      if (!bank) return {};

      const { name: payer_name, number: payer_account } = bank;

      return {
        payer_name,
        payer_account,
        payer_email: this.user.email,
        payer_phone: this.user.phone,
      };
    },
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
.coupons .apply-coupon {
  color: #7367f0;
  font-weight: 500;
  cursor: pointer;
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
