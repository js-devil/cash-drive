<template>
  <form class="mt-4 mx-auto w-50 text-center" @submit.prevent="validateSubmit">
    <h4 class="text-center">Select any of the two for payment</h4>
    <b-row>
      <b-col class="payment-type">
        <b-card
          @click="payment_type = 'paystack'"
          title="Pay with Card"
          img-src="~/assets/img/card.svg"
          img-alt="card"
          img-height="205px"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
        </b-card>
        <i
          class="feather icon-check-circle"
          v-if="payment_type === 'paystack'"
        ></i>
      </b-col>

      <b-col class="payment-type">
        <b-card
          @click="payment_type = 'remita'"
          title="Pay with Mandate"
          img-src="~/assets/img/mandate.svg"
          img-alt="mandate"
          img-height="205px"
          style="max-width: 25rem"
          class="mb-2"
        >
        </b-card>
        <i
          class="feather icon-check-circle"
          v-if="payment_type === 'remita'"
        ></i>
      </b-col>

      <div class="col-lg-12 mt-3 text-center">
        <button @click.prevent="validateSubmit" class="btn btn-block btn-dark">
          Next
        </button>
      </div>
    </b-row>
  </form>
</template>

<script>
export default {
  data() {
    return {
      payment_type: '',
    };
  },
  methods: {
    validateSubmit() {
      const { payment_type } = this;
      if (!this.payment_type)
        return this.$toastr.e(
          'Choose between Paystack and Remita for payment',
          'Select a payment type!',
        );

      this.selectPaymentType({ payment_type });
    },
    async selectPaymentType(data) {
      this.$store.commit('set', { loading: true });
      const { id } = this.$store.state.loan_offer;
      try {
        const res = await this.$axios({
          method: 'POST',
          url: `/loans/${id}/payment-type/select`,
          data,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.$store.commit('set', {
          loan_offer: res.data.data,
        });

        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
    },
  },
};
</script>

<style>
.payment-type .card:hover {
  cursor: pointer;
  border: 1px solid #e26511;
}

.payment-type .icon-check-circle {
  position: absolute;
  font-size: 20px;
  right: 20px;
  top: 10px;
  color: #e26511;
}
</style>
