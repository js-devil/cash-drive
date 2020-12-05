<template>
  <div class="container">
    <div class="row">
      <div
        class="contract-page col-lg-8 offset-lg-2 col-sm-6 offset-sm-3 col-12"
      >
        <header class="bg-primary text-center">
          <h3 class="text-white font-weight-bolder pt-5">Loan Agreement</h3>
        </header>
        <main class="bg-white px-3 py-3 text-center">
          <p>
            THIS LOAN AGREEMENT dated this
            <span class="underline">{{ thisDay }}</span>
            day of <span class="underline">{{ thisMonth }}</span
            >,
            <span class="underline">{{ thisYear }}</span>
          </p>

          <h6>BETWEEN</h6>

          <div class="w-50 mt-5 mx-auto">
            <h5 class="mb-0 underline px-3" style="font-size: 24px">
              CashDrive LTD
            </h5>
            <span class="font-weight-bolder">(The "Lender")</span>
          </div>

          <div class="w-50 my-4 mx-auto">
            <h4>AND</h4>
          </div>

          <div class="w-50 mx-auto">
            <h5 class="mb-0 underline px-3" style="font-size: 24px">
              {{ user.name }}
            </h5>
            <span class="font-weight-bolder">(The "Borrower")</span>
          </div>

          <div class="mt-4 mx-auto">
            <!-- <p>
              <span class="font-weight-bold">IN CONSIDERATION OF</span> the
              Lender loaning certain monies (the "Loan) to the Borrower, and the
              Borrower repaying the Loan to the Lender, both parties agree to
              keep, perform and fulfill the promises and conditions set out in
              this Agreement:
            </p> -->

            <p>
              The Lender promises to loan
              <span class="underline font-weight-bolder">{{
                formatAmount(10000)
              }}</span>
              to the Borrower and the Borrower promises to repay this principal
              amount to the Lender, without interest payable on the unpaid
              principal, beginning on
              <span class="font-weight-bold">
                {{ formatDate(user.repayment_date) }}</span
              >.
            </p>

            <div class="d-flex justify-content-center">
              <button
                class="btn-sm btn-primary mr-3 border-0 py-2"
                style="width: 100px"
              >
                Sign
              </button>
              <button
                class="btn-sm btn-danger border-0 py-2"
                style="width: 100px"
              >
                Reject
              </button>
            </div>
          </div>
        </main>
        <footer class="bg-secondary px-3 d-flex justify-content-between">
          <img src="/img/logo.png" alt="homepage" height="60" class="mt-4" />

          <p class="text-white mt-1">
            <i class="feather icon-mail" aria-hidden="true"></i>
            info@cashdrive.com<br />
            <i
              class="feather icon-phone"
              style="transform: scaleX(-1)"
              aria-hidden="true"
            ></i>
            +234 802 857 2566<br />
            <i
              class="feather icon-phone"
              style="transform: scaleX(-1)"
              aria-hidden="true"
            ></i>
            +234 817 555 6789<br />
            <i
              class="feather icon-phone"
              style="transform: scaleX(-1)"
              aria-hidden="true"
            ></i>
            +234 703 491 2176
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'Oluwaseyi Joshua',
        repayment_date: new Date(),
      },
    };
  },
  computed: {
    thisDay() {
      const date = new Date().getDate();
      const split = String(date).split('');
      const lastNo = split[split.length - 1];
      const title =
        lastNo == 1 ? 'st' : lastNo == 2 ? 'nd' : lastNo == 3 ? 'rd' : 'th';

      return date + title;
    },
    thisMonth() {
      return this.months[new Date().getMonth()];
    },
    thisYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style>
body {
  background-color: #f0f5f9;
}

.contract-page {
  /* box-shadow: 0px 10px 10px -10px #5d6572; */
}
.contract-page header {
  height: 15vh;
  background: url('https://www.cashdrive.co/frontend/assets/img/footer-img.png')
    no-repeat;
  border-bottom: 5px solid #00162a;
  background-size: 100% 100%;
}

.contract-page footer {
  height: 15vh;
}

.contract-page main {
  height: 70vh;
}

.contract-page main .underline {
  border-bottom: 2px solid;
  padding: 0 25px;
}
</style>
