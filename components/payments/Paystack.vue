<template>
  <vue-paystack
    :amount="amount"
    :email="email"
    :paystackkey="paystackkey"
    :currency="'NGN'"
    :reference="reference"
    :callback="callback"
    :close="close"
    :channels="['card']"
    :embed="false"
    class="btn btn-primary btn-lg pull-right"
    >Add New Card
  </vue-paystack>
</template>

<script>
export default {
  data: () => ({
    paystackkey: 'pk_test_43d036ce68bf0a187b513a60ffe6fa3bcf7bf57e',
    // sk_test_8ba8fec94ba70719ad7552d9d0f1249d025008ae
  }),
  props: ['email', 'showRes', 'self', 'amount'],
  computed: {
    reference() {
      let text = '';
      let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
  },
  methods: {
    callback(response) {
      this.self.saveReference(response.reference);
    },
    close: function () {
      this.self.$toastr.i('', 'Card Transaction Cancelled!');
    },
  },
};
</script>

<style></style>
