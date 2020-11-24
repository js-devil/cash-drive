<template>
  <form class="mt-4 mx-auto w-50 text-center" @submit.prevent="validateSubmit">
    <h4 class="text-center">Select any of the two for payment</h4>
    <b-row>
      <b-col class="payment-type">
        <b-img
          @click="payment_type = 'paystack'"
          thumbnail
          fluid
          style="height: 165px"
          src="~/assets/img/paystack.png"
          alt="Image 1"
        ></b-img>
        <i
          class="feather icon-check-circle"
          v-if="payment_type === 'paystack'"
        ></i>
      </b-col>

      <b-col class="payment-type">
        <b-img
          @click="payment_type = 'remita'"
          thumbnail
          style="height: 165px"
          fluid
          src="~/assets/img/remita.jpg"
          alt="Image 2"
        ></b-img>
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
      try {
        const res = await this.$axios({
          method: 'POST',
          url: `/loans/${id}/payment-type/select"`,
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
        this.$emit('next');
      } catch (err) {
        console.log(err);
        this.catchErrors(err);
      }
    },
  },
};
</script>

<style>
.payment-type .img-thumbnail:hover {
  cursor: pointer;
  border: 1px solid #e26511;
}

.payment-type .icon-check-circle {
  position: absolute;
  font-size: 20px;
  right: 30px;
  top: 15px;
  color: #e26511;
}
</style>
