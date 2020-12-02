<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="container-fluid">
        <div class="row" v-if="active_loan">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <h4 class="card-title mb-0">Checklist</h4>
                  <p class="card-text"></p>
                </div>
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item"
                    v-for="(value, key, i) in levels"
                    :key="i"
                  >
                    <span class="text-capitalize" v-if="!key.includes('bvn')">
                      {{ formatLevel(key) }}
                    </span>
                    <span class="text-uppercase" v-else>
                      {{ formatLevel(key) }}
                    </span>
                    <span
                      :class="`badge badge-pill ${
                        value ? 'bg-success' : 'bg-danger'
                      } float-right rounded-circle py-2 px-2`"
                    >
                      <i class="feather icon-check text-white" v-if="value"></i>
                      <i class="feather icon-x text-white" v-else></i>
                    </span>
                  </li>
                </ul>
                <div class="card-body text-center">
                  <button
                    v-if="totalSteps < 4"
                    @click="$router.push('/loan/information')"
                    class="btn btn-primary btn-darken-3 waves-effect waves-light"
                  >
                    Continue
                  </button>
                  <div v-else-if="totalSteps < 5 && active_loan.status == 4">
                    <button
                      v-if="!active_loan.card_setup"
                      @click="openPaystack"
                      class="btn btn-danger btn-darken-3 waves-effect waves-light"
                    >
                      Setup Card
                    </button>
                    <!-- totalSteps < 6 && active_loan.payment_type !== 'paystack' -->

                    <button
                      v-if="!active_loan.mandate_setup"
                      @click="showModal"
                      class="btn btn-info btn-darken-3 waves-effect waves-light"
                    >
                      Setup Direct Debit
                    </button>
                  </div>

                  <button
                    v-else
                    @click="proceed"
                    class="btn btn-primary btn-darken-3 waves-effect waves-light"
                  >
                    Continue
                  </button>

                  <button
                    @click="showModal"
                    class="btn btn-info btn-darken-3 waves-effect waves-light"
                  >
                    Setup Direct Debit
                  </button>

                  <b-modal
                    centered
                    ref="mandate"
                    hide-header
                    hide-footer
                    content-class="mandate"
                    @click:outside="$emit('close')"
                  >
                    <mandate :banks="banks" @close="hideModal"></mandate>
                  </b-modal>

                  <form @submit.prevent="">
                    <paystack
                      id="paystack-btn"
                      :self="self"
                      :email="user.email"
                      style="margin-bottom: 2rem; display: none"
                      :key="componentKey"
                      v-if="paystack"
                      :amount="50 * 100"
                    ></paystack>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-8 col-md-6 col-sm-12">
            <div class="card text-white bg-gradient-danger text-center">
              <div class="card-content d-flex">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12 my-3">
                      <div class="card-title text-white">
                        Loan Status:
                        <span v-html="status(active_loan.status)"></span>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <a
                            class="element-box el-tablo centered trend-in-corner smaller"
                          >
                            <div class="label">Loan Amount</div>
                            <div class="value">
                              {{ formatAmount(active_loan.offer_amount) }}
                            </div>
                          </a>
                        </div>
                        <div class="col-sm-6">
                          <a
                            class="element-box el-tablo centered trend-in-corner smaller"
                          >
                            <div class="label">Loan Duration</div>
                            <div class="value">
                              {{ active_loan.offer_tenor || 0 }} month(s)
                            </div>
                          </a>
                        </div>

                        <div class="col-sm-6">
                          <a
                            class="element-box el-tablo centered trend-in-corner smaller"
                          >
                            <div class="label">Monthly Repayment</div>
                            <div class="value">
                              {{ formatAmount(active_loan.monthly_repayment) }}
                            </div>
                          </a>
                        </div>
                        <div class="col-sm-6">
                          <a
                            class="element-box el-tablo centered trend-in-corner smaller"
                            v-if="active_loan.next_payment_due_date"
                          >
                            <div class="label">Next Payment Date</div>
                            <div class="value">
                              {{
                                formatDate(active_loan.next_payment_due_date)
                              }}
                            </div>
                          </a>
                          <a
                            class="element-box el-tablo centered trend-in-corner smaller"
                            v-else
                          >
                            <div class="label">Date of Loan Application</div>
                            <div class="value">
                              {{ formatDate(active_loan.created_at) }}
                            </div>
                          </a>
                        </div>

                        <div class="col-sm-6">
                          <a
                            class="element-box el-tablo centered trend-in-corner smaller"
                          >
                            <div class="label">Total Amount Paid</div>
                            <div class="value">
                              {{ formatAmount(active_loan.amount_paid) }}
                            </div>
                          </a>
                        </div>
                        <div class="col-sm-6">
                          <a
                            class="element-box el-tablo centered trend-in-corner smaller"
                          >
                            <div class="label">Repayment Plan</div>
                            <div class="value text-capitalize">
                              {{
                                repaymentPlan(active_loan.offer_repayment_plan)
                              }}
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 text-center" v-else>
          <img src="~/assets/img/info-img.png" height="200" />
          <p>You have no active loan at this time</p>

          <button
            @click="showModal"
            class="btn btn-info btn-darken-3 waves-effect waves-light"
          >
            Setup Direct Debit
          </button>

          <b-modal
            centered
            ref="mandate"
            hide-header
            hide-footer
            content-class="mandate"
            @click:outside="$emit('close')"
          >
            <mandate :banks="banks" @close="hideModal"></mandate>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Paystack from '~/components/payments/Paystack.vue';
import Mandate from '~/components/payments/Mandate.vue';

export default {
  components: { Paystack, Mandate },
  middleware: 'authenticated',
  data() {
    return {
      active_loan: null,
      banks: [],
      self: this,
      componentKey: 88,
      paystack: false,
    };
  },
  methods: {
    async getActiveLoan() {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: '/users/loans/active',
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.active_loan = res.data.data;

        this.$store.commit('set', {
          loan_offer: res.data.data,
        });

        await this.getBanks();
      } catch (err) {
        this.catchErrors(err);
      }
    },
    async saveReference(reference) {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: `/loans/${this.active_loan.id}/card/payment/verify`,
          method: 'put',
          data: { reference },
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.active_loan = res.data.data;

        this.$store.commit('set', {
          loan_offer: res.data.data,
        });

        this.$toastr.s('', 'Your payment was successful');
        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
    },
    formatLevel: level => level.replace(/passed/g, '').replace(/_/g, ' '),
    openPaystack() {
      this.paystack = true;
      Swal.fire({
        title: 'Bank Charge!',
        text: `A fee of ${this.formatAmount(
          50,
        )} will be debited from your card`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I agree',
      }).then(result => {
        this.componentKey += 1;
        if (result.value) {
          document.querySelector('#paystack-btn.btn-primary').click();
        } else {
        }
      });
    },
    showModal() {
      this.$refs.mandate.show();
      console.log(this.$refs);
    },
    hideModal() {
      this.$refs.mandate.hide();
    },
    proceed() {
      Swal.fire({
        icon: 'info',
        html: `
          <p style="margin-bottom: 5px">Check your mail to see the contract for this loan</p>
          <p style="margin-bottom: 5px">Sign it and come back here to continue</p>
        `,
      });
    },
  },
  computed: {
    levels() {
      let levels = {};
      if (!this.active_loan) return {};
      for (let i in this.active_loan.level)
        if (i.includes('passed'))
          levels = { ...levels, [i]: this.active_loan.level[i] };
      return levels;
    },
    totalSteps() {
      return Object.values(this.levels).reduce((a, b) => a + b, 0);
    },
  },
  mounted() {
    this.getActiveLoan();
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
  font-size: 1.6rem;
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
