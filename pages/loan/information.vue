<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb" v-if="step">
      <div class="container-fluid">
        <div class="stepwizard col-md-offset-3" v-if="step < 6">
          <div class="stepwizard-row setup-panel">
            <div class="stepwizard-step">
              <a
                href="javascript:void(0)"
                type="button"
                :class="`${btnClass} ${step === 1 && 'active'}`"
              >
                <i class="feather icon-target"></i>
              </a>
              <p>Account Details</p>
            </div>
            <div class="stepwizard-step">
              <a
                href="javascript:void(0)"
                type="button"
                :class="`${btnClass} ${step === 2 && 'active'}`"
              >
                <i class="feather icon-file-text"></i>
              </a>
              <p>Vehicle Documents</p>
            </div>
            <div class="stepwizard-step">
              <a
                href="javascript:void(0)"
                type="button"
                :class="`${btnClass} ${step === 3 && 'active'}`"
              >
                <i class="feather icon-calendar"></i>
              </a>
              <p>Set Inspection Date</p>
            </div>

            <div class="stepwizard-step">
              <a
                href="javascript:void(0)"
                type="button"
                :class="`${btnClass} ${step === 4 && 'active'}`"
              >
                <i class="feather icon-navigation"></i>
              </a>
              <p>Select Payment Type</p>
            </div>

            <div class="stepwizard-step">
              <a
                href="javascript:void(0)"
                type="button"
                :class="`${btnClass} ${step === 5 && 'active'}`"
              >
                <i class="feather icon-camera"></i>
              </a>
              <p>Take Selfie</p>
            </div>
          </div>
        </div>

        <AccountDetails id="step1" v-if="step === 1" />
        <Documents id="step1" v-else-if="step === 2" />
        <inspection-date id="step3" v-else-if="step === 3"></inspection-date>
        <payment-types v-else-if="step === 4"></payment-types>
        <take-selfie v-else-if="step === 5"></take-selfie>
        <Done v-else />
      </div>
    </div>
  </div>
</template>

<script>
import LoanDetails from '~/components/loans/LoanDetails.vue';
import AccountDetails from '~/components/loans/AccountDetails.vue';
import Documents from '~/components/loans/Documents.vue';
import InspectionDate from '~/components/loans/InspectionDate.vue';
import PaymentTypes from '~/components/loans/PaymentTypes.vue';
import Done from '~/components/loans/Done.vue';

export default {
  middleware: 'authenticated',
  components: {
    AccountDetails,
    Documents,
    InspectionDate,
    PaymentTypes,
    Done,
  },
  data() {
    return {
      btnClass: 'btn btn-circle',
    };
  },
  created() {
    if (!this.$store.state.loan_offer.level) this.$router.push('/loans');
  },
  computed: {
    step() {
      if (!this.$store.state.loan_offer.level) return 0;

      const {
        passed_bvn,
        passed_document_upload,
        passed_payment_setup,
        passed_picture_upload,
        passed_repayment_setup,
        passed_set_inspection_date,
      } = this.$store.state.loan_offer.level;

      return (
        passed_bvn +
        passed_document_upload +
        passed_payment_setup +
        passed_picture_upload +
        passed_repayment_setup +
        passed_set_inspection_date +
        1
      );
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
