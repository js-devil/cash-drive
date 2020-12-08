<template>
  <div class="card">
    <div class="card-content">
      <initiate
        :banks="banks"
        @close="$emit('close')"
        :loan="loan"
        v-if="step == 1"
      ></initiate>
    </div>
  </div>
</template>

<script>
import Initiate from './Initiate.vue';
export default {
  components: { Initiate },
  props: {
    banks: Array,
    loan: Object,
  },
  data: () => ({ step: 1 }),
};
</script>

<style></style>
