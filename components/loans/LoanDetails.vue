<template>
  <form class="mt-4 mx-auto w-50" @submit.prevent="validateSubmit">
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group">
          <label class="text-dark">How much do you want to loan? </label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0"
            v-model="amount"
            :disabled="loading"
            autocomplete="off"
            placeholder="Enter amount"
          />
        </div>
      </div>

      <div class="col-lg-12">
        <div class="form-group customize-input">
          <label class="text-dark" for="pwd">For how long?</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-0"
            :disabled="loading"
            v-model="loan.desired_tenor"
          >
            <option v-for="n in 12" :key="n" :value="n">
              {{ n }} <span>{{ n > 1 ? 'months' : 'month' }}</span>
            </option>
          </select>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="form-group customize-input">
          <label class="text-dark" for="pwd">Select a repayment plan</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-0"
            :disabled="loading"
            v-model="loan.desired_repayment_plan"
          >
            <option value="1">Monthly</option>
            <option value="2">Bi Monthly</option>
            <option value="3">Quarterly</option>
          </select>
        </div>
      </div>

      <div class="col-lg-12 my-3">
        <div class="row">
          <div class="col-sm-6">
            <a class="element-box el-tablo centered trend-in-corner smaller">
              <div class="label">Loan Amount</div>
              <div class="value">{{ formatAmount(loan.desired_amount) }}</div>
            </a>
          </div>
          <div class="col-sm-6">
            <a class="element-box el-tablo centered trend-in-corner smaller">
              <div class="label">Loan Duration</div>
              <div class="value">{{ loan.desired_tenor || 0 }} month(s)</div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-12 text-center">
        <button type="submit" class="btn btn-block btn-dark">Next</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    loan: {},
    errorMessage: '',
    loading: false,
    error: false,
    amount: '',
  }),
  methods: {
    getAmount() {
      this.amount = this.amount
        ? String(Number(this.removeCommas(this.amount)))
        : 0;
      if (
        !this.validateNumbers(this.amount) ||
        Number(this.amount) > 1000000000
      ) {
        this.amount = this.amount.slice(0, -1);
      }
      this.loan.desired_amount = Number(this.amount);
      this.amount = this.numberWithCommas(this.amount);
      if (this.amount == '0') this.amount = '';
    },
    validateSubmit() {
      const {
        desired_amount,
        desired_tenor,
        desired_repayment_plan,
      } = this.loan;

      if (!desired_amount)
        return this.$toastr.e(
          'Please enter the amount you want to loan',
          'Oops!',
        );

      if (desired_amount < 1e3 || desired_amount > 5e6)
        return this.$toastr.e(
          `The maximum you can loan is ${this.formatAmount(
            5e6,
          )} and the minimum you can loan is ${this.formatAmount(1e3)}`,
          'Oops!',
        );

      if (!desired_tenor)
        return this.$toastr.e(
          'Please select the duration of the loan you want to take',
          'Oops!',
        );

      if (!desired_repayment_plan)
        return this.$toastr.e(
          'Please select the repayment plan of the loan you want to take',
          'Oops!',
        );

      this.$store.commit('set', {
        loan_application: {
          desired_amount,
          desired_tenor,
          desired_repayment_plan,
        },
      });

      this.$emit('next');
    },
  },
  mounted() {
    const {
      desired_amount,
      desired_tenor,
      desired_repayment_plan,
    } = this.$store.state.loan_application;
    this.amount = String(desired_amount || '');

    this.loan = {
      desired_amount: desired_amount || 0,
      desired_tenor,
      desired_repayment_plan,
    };
  },
  watch: {
    amount: 'getAmount',
  },
};
</script>

<style scoped>
.el-tablo.centered {
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
}
.el-tablo.trend-in-corner {
  position: relative;
}
a.el-tablo {
  text-decoration: none;
  display: block;
  color: #3e4b5b;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.el-tablo {
  display: block;
}
.element-box {
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
}

a.el-tablo:hover {
  -webkit-transform: translateY(-5px) scale(1.02);
  transform: translateY(-5px) scale(1.02);
  -webkit-box-shadow: 0px 5px 12px rgba(126, 142, 177, 0.2);
  box-shadow: 0px 5px 12px rgba(126, 142, 177, 0.2);
}

a.el-tablo:hover .label {
  -webkit-transform: translateY(-2px);
  transform: translateY(-2px);
}
a.el-tablo:hover .label {
  color: #00162a;
  font-size: 14px;
}
.el-tablo.smaller .label {
  font-size: 0.63rem;
  letter-spacing: 2px;
}
a.el-tablo .label {
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.el-tablo .label {
  display: block;
  font-size: 0.63rem;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  letter-spacing: 1px;
}

a.el-tablo:hover.centered .value {
  -webkit-transform: scale(1.1) translateY(-3px);
  transform: scale(1.1) translateY(-3px);
}
a.el-tablo:hover .value {
  -webkit-transform: translateY(-3px);
  transform: translateY(-3px);
  color: #e26511;
}
.el-tablo.smaller .value {
  font-size: 1.71rem;
}
a.el-tablo .value {
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}

.el-tablo .value {
  font-size: 2.43rem;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1.2;
  display: inline-block;
  vertical-align: middle;
}

.element-box {
  border-radius: 6px;
  background-color: #fff;
  -webkit-box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
  box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
  -webkit-animation-name: fadeUp;
  animation-name: fadeUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

@-webkit-keyframes fadeUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(30px);
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(30px);
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}
</style>
