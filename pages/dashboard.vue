<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-7 align-self-center">
          <h4
            class="page-title text-truncate text-dark font-weight-medium mb-1"
          >
            Hello, <span class="text-capitalize">{{ user.first_name }}</span>
          </h4>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <!-- *************************************************************** -->
      <!-- Start First Cards -->
      <!-- *************************************************************** -->
      <div class="card-group">
        <div class="card border-right">
          <div class="card-body">
            <div class="d-flex d-lg-flex d-md-block align-items-center">
              <div>
                <div class="d-inline-flex align-items-center">
                  <h2 class="text-dark mb-1 font-weight-medium">
                    {{ loans.length }}
                  </h2>
                </div>
                <h6
                  class="text-muted font-weight-normal mb-0 w-100 text-truncate"
                >
                  Total Loans
                </h6>
              </div>
              <div class="ml-auto mt-md-3 mt-lg-0">
                <span class="opacity-7 text-muted"
                  ><i data-feather="user-plus"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="card border-right">
          <div class="card-body">
            <div class="d-flex d-lg-flex d-md-block align-items-center">
              <div>
                <h2
                  class="text-dark mb-1 w-100 text-truncate font-weight-medium"
                >
                  {{ activeLoans.length }}
                </h2>
                <h6
                  class="text-muted font-weight-normal mb-0 w-100 text-truncate"
                >
                  Active Loan
                </h6>
              </div>
              <div class="ml-auto mt-md-3 mt-lg-0">
                <span class="opacity-7 text-muted"
                  ><i data-feather="dollar-sign"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="card border-right">
          <div class="card-body">
            <div class="d-flex d-lg-flex d-md-block align-items-center">
              <div>
                <div class="d-inline-flex align-items-center">
                  <h2 class="text-dark mb-1 font-weight-medium">
                    {{ loans.length - activeLoans.length }}
                  </h2>
                </div>
                <h6
                  class="text-muted font-weight-normal mb-0 w-100 text-truncate"
                >
                  Closed Loans
                </h6>
              </div>
              <div class="ml-auto mt-md-3 mt-lg-0">
                <span class="opacity-7 text-muted"
                  ><i data-feather="file-plus"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="d-flex d-lg-flex d-md-block align-items-center">
              <div>
                <h2 class="text-dark mb-1 font-weight-medium">864</h2>
                <h6
                  class="text-muted font-weight-normal mb-0 w-100 text-truncate"
                ></h6>
              </div>
              <div class="ml-auto mt-md-3 mt-lg-0">
                <span class="opacity-7 text-muted"
                  ><i data-feather="globe"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- *************************************************************** -->
      <!-- End First Cards -->
      <!-- *************************************************************** -->
      <!-- *************************************************************** -->
      <!-- Start Sales Charts Section -->
      <!-- *************************************************************** -->
      <div class="row">
        <div class="col-lg-4 col-md-12">
          <div class="card bg-gradient-warning">
            <div class="card-body" v-if="activeLoans.length">
              <h4 class="card-title text-white">Active Loan</h4>
              <hr class="border-white" />
              <ul class="list-style-none mb-0 text-white">
                <li>
                  <span class="text-white">Amount</span>
                  <span class="text-white float-right font-weight-medium">{{
                    formatAmount(activeLoans[0].offer_amount)
                  }}</span>
                </li>
                <li class="mt-3">
                  <span class="text-white">Duration</span>
                  <span class="text-white float-right font-weight-medium"
                    >{{ activeLoans[0].offer_tenor }} months</span
                  >
                </li>
                <li class="mt-3">
                  <span class="text-white">Repayment Plan</span>
                  <span
                    class="text-white float-right font-weight-medium text-capitalize"
                    >{{
                      repaymentPlan(activeLoans[0].offer_repayment_plan)
                    }}</span
                  >
                </li>
                <li class="mt-3">
                  <span class="text-white">Next Payment Date</span>
                  <span
                    class="text-white float-right font-weight-medium text-capitalize"
                    >{{
                      formatDate(activeLoans[0].next_payment_due_date)
                    }}</span
                  >
                </li>
                <li class="mt-3">
                  <span class="text-white">Amount Paid</span>
                  <span
                    class="text-white float-right font-weight-medium text-capitalize"
                    >{{ formatAmount(activeLoans[0].amount_paid) }}</span
                  >
                </li>
                <li class="mt-3" v-if="recentLoans.length === 3">
                  <span class="text-white">Payment Method</span>
                  <span
                    class="text-white float-right font-weight-medium text-capitalize"
                    >{{
                      activeLoans[0].payment_type == 'paystack'
                        ? 'Card Payment'
                        : activeLoans[0].payment_type == 'remita'
                        ? 'Mandate'
                        : '-'
                    }}</span
                  >
                </li>
                <li class="mt-3 text-center">
                  <button
                    class="btn btn-sm btn-secondary"
                    @click="$router.push('/loan/active')"
                  >
                    View
                  </button>
                </li>
              </ul>
            </div>
            <div class="card-body text-center" v-else>
              <img src="~/assets/img/no_loans.svg" class="my-3" height="180" />
              <p class="mt-2">There is no active loan at this time</p>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center mb-4">
                <h4 class="card-title">Recent Loans</h4>
              </div>
              <div class="table-responsive">
                <table class="table no-wrap v-middle mb-0">
                  <thead>
                    <tr class="border-0">
                      <th
                        class="border-0 font-14 font-weight-medium text-muted"
                      >
                        Offer Amount
                      </th>
                      <th
                        class="border-0 font-14 font-weight-medium text-muted px-2"
                      >
                        Duration
                      </th>
                      <th
                        class="border-0 font-14 font-weight-medium text-muted"
                      >
                        Repayment Plan
                      </th>
                      <th
                        class="border-0 font-14 font-weight-medium text-muted"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody v-if="loans.length">
                    <tr v-for="loan in recentLoans" :key="loan.id">
                      <td class="border-top-0 px-4 py-4">
                        {{ formatAmount(loan.offer_amount) }}
                      </td>
                      <td class="border-top-0 text-muted px-2 py-4 font-14">
                        {{ loan.offer_tenor + ' months' }}
                      </td>
                      <td
                        class="border-top-0 text-muted px-2 py-4 font-14 text-capitalize"
                      >
                        {{ repaymentPlan(loan.offer_repayment_plan) }}
                      </td>
                      <td
                        class="border-top-0 px-2 py-3"
                        v-html="status(loan.status)"
                      ></td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="4" class="text-center">
                        There are no recent loans at this moment
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({ loans: [], search: '' }),
  mounted() {
    this.getAllLoans();
  },
  computed: {
    activeLoans() {
      return this.loans.filter(key => this.checkLoanIsActive(key));
    },
    recentLoans() {
      return this.loans
        .filter(key => !this.checkLoanIsActive(key))
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        )
        .slice(0, 3);
    },
  },
};
</script>

<style></style>
