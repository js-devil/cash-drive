<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h4 class="card-title">Bank Accounts</h4>
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
                        <th>Account Name</th>
                        <th class="text-center">Account Type</th>
                        <th class="text-center">Account Number</th>
                      </tr>
                    </thead>
                    <tbody v-if="filteredAccounts.length">
                      <tr
                        v-for="(account, i) in filteredAccounts"
                        :key="account.id"
                      >
                        <td class="text-center">{{ i + 1 }}.</td>
                        <td class="text-capitalize">
                          {{ account.name.toLowerCase() }}
                        </td>
                        <td class="text-capitalize text-center">
                          {{ account.type }}
                        </td>
                        <td class="text-center">
                          {{ account.number }}
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6" class="text-center">
                          {{
                            !user.banks.length
                              ? 'You have not added any bank accounts yet'
                              : `No match was found for the bank account you are looking
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
  data: () => ({
    search: '',
  }),
  computed: {
    filteredAccounts() {
      const search = this.search.toLowerCase();
      return this.user.banks.filter(
        key =>
          key.number.includes(search) ||
          key.name.toLowerCase().includes(search) ||
          key.type.toLowerCase().includes(search),
      );
    },
  },
};
</script>

<style scoped>
.visa {
  width: 90px;
}
</style>
