<template>
  <form class="mt-4 mx-auto w-50 text-center" @submit.prevent="validateSubmit">
    <b-row>
      <b-col md="auto">
        <b-calendar
          :min="minDate"
          v-model="inspection.date"
          locale="en-US"
        ></b-calendar>
      </b-col>

      <b-col>
        <b-time v-model="inspection.time" locale="en"></b-time>
      </b-col>
    </b-row>
    <!-- {{ inspection }} -->
    <div class="col-lg-12 mt-3 text-center">
      <button @click.prevent="validateSubmit" class="btn btn-block btn-dark">
        Next
      </button>
    </div>
  </form>
</template>

<script>
import Upload from '../Upload.vue';

export default {
  components: {
    Upload,
  },
  data() {
    return {
      inspection: {},
      minDate: new Date().toISOString(),
      errorMessage: '',
      loading: false,
      error: false,
    };
  },
  mounted() {
    this.document = {
      ...this.document,
    };
  },
  methods: {
    validateSubmit() {
      const { date, time } = this.inspection;

      if (!date)
        return this.$toastr.e('Please select a date for inspection', 'Oops!');
      if (!time)
        return this.$toastr.e('Please select the time for inspection', 'Oops!');

      this.setInspectionDate({ date, time });
    },
    async setInspectionDate(data) {
      this.$store.commit('set', { loading: true });
      const { id } = this.$store.state.loan_offer;
      try {
        const res = await this.$axios({
          method: 'PUT',
          url: `/loans/${id}/vehicles/inspection`,
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

<style scoped>
span.text-danger {
  position: relative;
  top: -15px;
  font-size: 14px;
}
</style>
