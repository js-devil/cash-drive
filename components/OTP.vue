<template>
  <div class="card">
    <div class="card-content">
      <div class="card-body">
        <div class="coupons text-center">
          <div class="coupons-title">
            <p>Enter the code sent to your mail</p>

            <span
              class="badge badge-pill bg-danger close-modal rounded-circle py-1 px-1"
            >
              <i @click="$emit('close')" class="feather icon-x text-white"></i>
            </span>
          </div>
          <hr />
        </div>

        <form @submit.prevent="" class="text-center">
          <img src="~/assets/img/sign.svg" class="my-3" height="150" />
        
          <div class="form-group">
            <input
              class="form-control bg-white custom-radius custom-shadow border-none"
              v-model="first_name"
              autocomplete="off"
              placeholder="First Name"
            />
          </div>
          
          <div class="form-group">
            <input
              class="form-control bg-white custom-radius custom-shadow border-none"
              v-model="last_name"
              autocomplete="off"
              placeholder="Last Name"
            />
          </div>

          <div class="form-group">
            <input
              class="form-control bg-white custom-radius custom-shadow border-none"
              v-model="otp"
              type="password"
              autocomplete="off"
              placeholder="Code must be a 4-digit number"
            />
          </div>
        </form>

        <hr />
        <div
          @click.prevent="validateSubmit"
          class="btn btn-primary btn-block place-order waves-effect waves-light"
        >
          Submit
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      otp: '',
      first_name: '',
      last_name: '',
    };
  },
  methods: {
    validateSubmit() {
      const { first_name, last_name, otp } = this;
      
      if (!otp || otp.length !== 4 || !this.validateNumbers(otp))
        return this.$toastr.e('Invalid Code');

      if(!first_name || !last_name) return this.$toastr.e('Please enter your first name and last name')

      const full_name = `${first_name} ${last_name}`.toLowerCase();
    
      this.signContract({ full_name, otp });
    },
    async signContract(data) {
      this.$store.commit('set', { loading: true });

      try {
        const res = await this.$axios({
          url: `/contracts/sign`,
          method: 'post',
          data,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });
        
        this.$store.commit('set', { loading: false });

        Swal.fire({
          icon: 'success',
          title: res.data.message,
          text: 'You will now be redirected to the active loan page',
          allowOutsideClick: false,
          allowEnterKey: false,
          allowEscapeKey: false,
        });

        setTimeout(() => {
          this.$router.push('/loan/active');
          this.$store.commit('set', { loading: true });
        }, 3000);
      } catch (e) {
        this.catchErrors(e);
      }
    },
  },
};
</script>

<style>
.options-title {
  color: #b8c2cc;
}

.coupons {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.coupons .coupons-title {
  font-weight: 600;
}

.coupons .coupons-title p {
  margin-bottom: 0.5rem;
}

.coupons .close-modal {
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 18px;
  top: 16px;
}
.coupons .apply-coupon p {
  margin-bottom: 0.5rem;
}

.price-details {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.detail {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.detail .detail-title {
  color: #b8c2cc;
}
.detail .detail-title.detail-total {
  color: #626262;
  font-weight: 600;
}
.detail .detail-amt.discount-amt {
  color: #28c76f;
}
.detail .detail-amt.emi-details {
  color: #7367f0;
  cursor: pointer;
}
.detail .detail-amt.total-amt {
  font-weight: 600;
}

.bankSelect .vs__clear {
  border: none;
  background: transparent;
  position: absolute;
  right: 45px;
  margin-top: -28px;
}

.bankSelect input.vs__search {
  border: none;
}
</style>
