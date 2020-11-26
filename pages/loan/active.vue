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
                        <th>#</th>
                        <th>Offer Amount</th>
                        <th>Duration</th>
                        <th>Repayment Plan</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody v-if="filteredLoans.length">
                      <tr v-for="(loan, i) in filteredLoans" :key="loan.id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ formatAmount(loan.offer_amount) }}</td>
                        <td>{{ loan.offer_tenor + ' months' }}</td>
                        <td class="text-capitalize">
                          {{ repaymentPlan(loan.offer_repayment_plan) }}
                        </td>
                        <td v-html="status(loan.status)"></td>
                        <td>
                          <b-btn size="sm">View</b-btn>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6" class="text-center">
                          {{
                            !loans.length
                              ? 'There are no active loans at this moment'
                              : `No match was found for the active loan you are looking
                          for`
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({ loans: [], search: '' }),
  methods: {
    async getAllLoans() {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: '/users/loans/active',
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.loans = res.data.data;
        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
    },
    status: status =>
      status == 1
        ? '<span class="badge badge-primary">Accepted</span>'
        : status == 2
        ? '<span class="badge badge-warning">Declined</span>'
        : status == 3
        ? '<span class="badge badge-success">Approved</span>'
        : status == 4
        ? '<span class="badge badge-info">Signed Contract</span>'
        : status == 5
        ? '<span class="badge badge-dark">Defaulted</span>'
        : status == 6
        ? '<span class="badge badge-danger">Rejected</span>'
        : '<span class="badge badge-secondary">Neutral</span>',
    repaymentPlan: plan =>
      plan == 1 ? 'every month' : plan == 2 ? 'every two months' : 'quarterly',
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
  },
  mounted() {
    this.getAllLoans();
  },
};
</script>

<style></style>
