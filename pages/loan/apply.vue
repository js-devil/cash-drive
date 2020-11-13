<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="container-fluid">
        <div class="stepwizard col-md-offset-3" v-if="step !== 3">
          <div class="stepwizard-row setup-panel">
            <div class="stepwizard-step">
              <a
                href="#step1"
                type="button"
                @click="step = 1"
                :class="`${btnClass} ${step === 1 && 'active'}`"
              >
                <i class="feather icon-target"></i>
              </a>
              <p>Loan Details</p>
            </div>
            <div class="stepwizard-step">
              <a
                href="#step2"
                type="button"
                @click="
                  if (step > 2) {
                    step = 2;
                  }
                "
                :class="`${btnClass} ${step === 2 && 'active'}`"
              >
                <i class="feather icon-aperture"></i>
              </a>
              <p>Car Details</p>
            </div>
            <div class="stepwizard-step">
              <a
                href="#"
                type="button"
                :class="`${btnClass} ${step === 3 && 'active'}`"
              >
                <i class="feather icon-navigation"></i>
              </a>
              <p>Done</p>
            </div>
          </div>
        </div>

        <LoanDetails id="step1" v-if="step === 1" @next="step = 2" />
        <CarDetails id="step2" v-else-if="step === 2" @next="applyForLoan" />
        <Done v-else />
      </div>
    </div>
  </div>
</template>

<script>
import LoanDetails from '~/components/loans/LoanDetails.vue';
import CarDetails from '../../components/loans/CarDetails.vue';

export default {
  middleware: 'authenticated',
  components: {
    LoanDetails,
    CarDetails,
  },
  data() {
    return {
      step: 2,
      btnClass: 'btn btn-circle',
    };
  },
  methods: {
    async applyForLoan() {
      this.$store.commit('set', { loading: true });

      const data = this.$store.state.loan_application;
      console.log(data);
      // return;

      try {
        const res = await this.$axios({
          method: 'POST',
          url: '/estimate',
          data,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.$store.commit('set', { loading: false });
        if (res.data.status) {
          this.step = 3;
        }
        console.log(res.data);
      } catch (err) {
        this.catchErrors(err);
      }
    },
  },
};
</script>

<style scoped>
.stepwizard-step p {
  margin-top: 10px;
}
.stepwizard-row {
  display: table-row;
}
.stepwizard {
  display: table;
  width: 100%;
  position: relative;
}
.stepwizard-step button[disabled] {
  opacity: 1 !important;
  filter: alpha(opacity=100) !important;
}
.stepwizard-row:before {
  top: 15px;
  bottom: 0;
  position: absolute;
  content: ' ';
  width: 100%;
  height: 2px;
  background-color: #ccc;
}
.stepwizard-step {
  display: table-cell;
  text-align: center;
  position: relative;
}
.stepwizard-step .btn {
  border: 2px solid #e26511;
  background-color: #f9fbfd;
  color: #00162a;
  outline: none !important;
}

.stepwizard-step .btn.active {
  background-color: #e26511;
  color: #fff;
}

.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
</style>
