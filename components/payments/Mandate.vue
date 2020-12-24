<template>
  <div class="card">
    <div class="card-content">
      <initiate
        :banks="banks"
        @close="$emit('close')"
        :loan="loan"
        @next="$emit('done')"
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
};
</script>

<style></style>
