<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h4 class="card-title">My Cards</h4>
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
                        <th>Amount</th>
                        <th>Card Number</th>
                        <th>Bank</th>
                        <th class="text-center">Expiry Date</th>
                        <th class="text-center">Card Type</th>
                      </tr>
                    </thead>
                    <tbody v-if="filteredCards.length">
                      <tr v-for="(card, i) in filteredCards" :key="card.id">
                        <td class="text-center">{{ i + 1 }}.</td>
                        <td>{{ formatAmount(card.amount) }}</td>
                        <td>**********{{ card.last4 }}</td>
                        <td class="text-capitalize">
                          {{ card.bank.toLowerCase() }}
                        </td>
                        <td class="text-center">
                          {{ `${card.exp_month}/${card.exp_year}` }}
                        </td>
                        <td class="text-center">
                          <img
                            height="30"
                            :class="card.card_type"
                            :src="getCardTypeImg(card.card_type)"
                          />
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6" class="text-center">
                          {{
                            !cards.length
                              ? 'You have not added any cards yet'
                              : `No match was found for the card you are looking
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
    cards: [],
    search: '',
  }),
  methods: {
    async getUserCards() {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: '/users/cards',
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        // this.cards = res.data.data;
        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
    },
    getCardTypeImg: type =>
      type.includes('visa')
        ? require(`~/assets/img/cards/visa.png`)
        : type.includes('master')
        ? require(`~/assets/img/cards/mastercard.png`)
        : require(`~/assets/img/cards/verve.png`),
  },
  computed: {
    filteredCards() {
      const search = this.search.toLowerCase();
      return this.cards.filter(
        key =>
          key.last4.includes(search) ||
          key.bank.toLowerCase().includes(search) ||
          key.card_type.toLowerCase().includes(search),
      );
    },
  },
  mounted() {
    this.getUserCards();
  },
};
</script>

<style scoped>
.visa {
  width: 90px;
}
</style>
