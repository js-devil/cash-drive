<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h4 class="card-title">My Loans</h4>
                  <label
                    ><input
                      type="search"
                      class="form-control bg-white custom-radius custom-shadow border-0"
                      placeholder="Search..."
                      v-model="search"
                  /></label>
                </div>

                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th class="text-center">#</th>
                        <th>Offer Amount</th>
                        <th>Duration</th>
                        <th>Repayment Plan</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody v-if="filteredLoans.length">
                      <tr v-for="(loan, i) in filteredLoans" :key="loan.id">
                        <td class="text-center">{{ i + 1 }}.</td>
                        <td>{{ formatAmount(loan.offer_amount) }}</td>
                        <td>{{ loan.offer_tenor + ' months' }}</td>
                        <td class="text-capitalize">
                          {{ repaymentPlan(loan.offer_repayment_plan) }}
                        </td>
                        <td v-html="status(loan.status)"></td>
                        <td>
                          <b-btn
                            size="sm"
                            @click="viewLoan(loan)"
                            v-if="checkLoanIsActive(loan)"
                            >View</b-btn
                          >

                          <b-btn
                            v-else-if="!activeLoan"
                            size="sm"
                            @click="reapply(loan)"
                            >Re-apply</b-btn
                          >

                          <b-btn
                            v-else-if="loan.status == 0"
                            size="sm"
                            @click="continueLoan(loan)"
                            >Continue</b-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6" class="text-center">
                          {{
                            !loans.length
                              ? `You have not applied for any loans so far`
                              : `No match was found for the loan you are looking for`
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          v-if="!activeLoan"
          @click="$router.push('/loan/apply')"
          class="btn btn-sm btn-primary floating"
        >
          <i class="feather icon-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({ loans: [], search: '' }),
  methods: {
    async viewLoan(loan) {
      // if (loan.status == 4) return this.$router.push('/loan/active');

      const {
        passed_bvn,
        passed_document_upload,
        passed_picture_upload,
        passed_set_inspection_date,
      } = loan.level;

      if (
        !passed_bvn ||
        !passed_document_upload ||
        !passed_picture_upload ||
        !passed_set_inspection_date
      ) {
        this.$store.commit('set', {
          loan_offer: loan,
        });
        return this.$router.push('/loan/information');
      }

      this.$router.push('/loan/active');
    },
    continueLoan(loan) {
      this.$store.commit('set', {
        loan_application: loan,
      });
      this.$router.push('/loan/apply?status=0');
    },
    reapply(loan) {
      const { desired_amount, desired_tenor, desired_repayment_plan } = loan;

      this.$store.commit('set', {
        loan_application: {
          desired_amount,
          desired_tenor,
          desired_repayment_plan,
        },
      });
      this.$router.push('/loan/apply');
    },
  },
  computed: {
    filteredLoans() {
      const search = this.search.toLowerCase();
      return this.loans.filter(
        key =>
          this.repaymentPlan(key.offer_repayment_plan).includes(search) ||
          key.offer_tenor + ' months'.includes(search),
      );
    },
    activeLoan() {
      return Boolean(this.loans.filter(key => this.checkLoanIsActive(key)));
    },
  },
  mounted() {
    this.getAllLoans();
  },
};
</script>

<style>
.floating {
  position: fixed;
  bottom: 30px;
  right: 20px;
  padding: 15px;
  border-radius: 50%;
}

.floating i {
  font-size: 24px;
}
</style>
