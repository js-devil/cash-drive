<template>
  <div class="card">
    <div class="card-content">
      <initiate
        :banks="banks"
        @close="$emit('close')"
        :loan="loan"
        v-if="step == 1"
        @next="step = 2"
      ></initiate>

      <mandate-otp
        :loan="loan"
        v-else-if="step == 2"
        @next="step = 3"
      ></mandate-otp>
    </div>
  </div>
</template>

<script>
import Initiate from './Initiate.vue';
import MandateOTP from './MandateOTP.vue';
export default {
  components: { Initiate, MandateOTP },
  props: {
    banks: Array,
    loan: Object,
  },
  data: () => ({ step: 1 }),
};
</script>

<style></style>
