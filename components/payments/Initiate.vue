<template>
  <div class="card-body">
    <div class="coupons text-center">
      <div class="coupons-title">
        <p>Account Details for this transaction</p>

        <span
          class="badge badge-pill bg-danger close-modal rounded-circle py-1 px-1"
        >
          <i @click="$emit('close')" class="feather icon-x text-white"></i>
        </span>
      </div>
    </div>

    <hr />
    <div class="detail">
      <div class="detail-title">Bank</div>
      <div class="detail-amt text-uppercase">{{ bank }}</div>
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
      @click.prevent="initiateMandate"
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
  mounted() {
    this.getAccount();
  },
  methods: {
    getAccount() {
      const account = this.user.banks.find(key => Boolean(key.status) === true);
      if (!account) this.account = {};

      const {
        holder_name: payer_name,
        name,
        number: payer_account,
        code: payer_bank_code,
      } = account;
      this.bank = name;

      this.account = {
        payer_email: this.user.email,
        payer_phone: this.user.phone,
        payer_bank_code,
        payer_name,
        payer_account,
      };
    },
    async initiateMandate() {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: `/loans/${this.loan.id}/direct-debit/initiate`,
          method: 'post',
          data: {},
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        console.log(res.data);
        this.$emit('next');
        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
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
