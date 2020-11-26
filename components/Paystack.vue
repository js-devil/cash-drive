<template>
    <paystack
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
        >Add New Card</paystack
    >
</template>

<script>
import paystack from 'vue-paystack';

export default {
  data: () => ({
    paystackkey: 'pk_live_bb2a3031e6893b1bf3ce4f1b880e5c0fc5e3230d',
  }),
  props: ['email', 'showRes', 'self', 'amount'],
  components: { paystack },
  computed: {
    reference() {
      let text = '';
      let possible =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 10; i++)
        text += possible.charAt(
          Math.floor(Math.random() * possible.length)
        );

      return text;
    },
  },
  methods: {
    callback(response) {
      this.self.addCard(response.reference);
    },
    close: function() {
      Toast.fire({ icon: 'info', title: 'Card Transaction Cancelled!' });
    },
  },
};
</script>

<style></style>
