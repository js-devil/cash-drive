<template>
  <form class="mt-4 mx-auto w-50" @submit.prevent="validateSubmit">
    <div class="row">
      <div class="col-lg-6" v-if="car.year">
        <div class="form-group">
          <label class="text-dark">Make</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-none"
            :disabled="loading"
            id="make"
            v-model="car.make"
            @change="handleChange"
          >
            <option v-for="make in makes" :key="make.id">
              {{ make.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-lg-6" v-if="car.make">
        <div class="form-group">
          <label class="text-dark">Model</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-none"
            :disabled="loading"
            @change="handleChange"
            id="model"
            v-model="car.model"
          >
            <option v-for="model in models" :key="model.id">
              {{ model.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="form-group customize-input">
          <label class="text-dark" for="pwd">Year</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-none"
            :disabled="loading"
            id="year"
            v-model="car.year"
            @change="handleChange"
          >
            <!-- <option>{{ thisYear }}</option>
            <option v-for="n in 20" :key="n + 'c'">{{ thisYear - n }}</option> -->
            <option v-for="year in years" :key="year + 'c'">{{ year }}</option>
          </select>
        </div>
      </div>

      <div class="col-lg-6" v-if="car.model && trims.length">
        <div class="form-group">
          <label class="text-dark">Trim</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-none"
            :disabled="loading"
            id="trim"
            v-model="car.trim"
          >
            <option v-for="trim in trims" :key="trim.id">
              {{ trim.name }}
            </option>
          </select>
        </div>
      </div>

      <div :class="trims.length ? 'col-lg-12' : 'col-lg-6'">
        <div class="form-group">
          <label class="text-dark">Plate Number</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-none"
            v-model="car.plate_number"
            :disabled="loading"
            id="plate_number"
            autocomplete="off"
            placeholder="Enter plate number"
          />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="form-group customize-input">
          <label class="text-dark" for="insurance">Insurance Type</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-none"
            :disabled="loading"
            id="insurance"
            v-model="car.insurance"
          >
            <option class="text-capitalize">third party</option>
            <option class="text-capitalize">full</option>
            <option class="text-capitalize">none</option>
          </select>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="form-group">
          <label class="text-dark">State</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-none"
            :disabled="loading"
            v-model="car.state"
            id="state"
          >
            <option v-for="state in states" :key="state">{{ state }}</option>
          </select>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="form-group" id="registered_owner">
          <label class="text-dark">Are you a registered owner?</label>
          <div class="d-flex mt-2">
            <div class="custom-control custom-radio mr-3">
              <input
                type="radio"
                v-model="car.registered_owner"
                id="yes"
                name="owner"
                :value="1"
                class="custom-control-input"
                checked
              />
              <label class="custom-control-label" for="yes">Yes</label>
            </div>
            <div class="custom-control custom-radio">
              <input
                type="radio"
                v-model="car.registered_owner"
                name="owner"
                :value="2"
                id="no"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="no">No</label>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12 text-center">
        <button type="submit" class="btn btn-block btn-dark">
          {{ loading ? 'Submit...' : 'Submit' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import states from '~/assets/states.json';
import vehicles from '~/assets/vehicles.json';

const vehicleDetails = vehicles[0].selections.years;
const years = vehicleDetails.map(key => key.id) || [];

export default {
  data: () => ({
    car: {
      year: '',
      make: '',
      model: '',
      trim: '',
    },
    errorMessage: '',
    loading: false,
    error: false,
    amount: '',
    states,
    years,
  }),
  computed: {
    thisYear() {
      return Number(new Date().getFullYear());
    },
    makes() {
      return vehicleDetails.find(key => key.id === this.car.year)?.makes;
    },
    models() {
      return this.makes?.find(key => key.name === this.car.make)?.models;
    },
    trims() {
      const model = this.models?.find(key => key.name === this.car.model);
      if (!model) return [];
      return model.trims;
    },
  },
  methods: {
    handleChange({ target }) {
      // this.car[target.id] = target.value;
      if (target.id == 'make' || target.id == 'year' || target.id == 'model')
        this.car.trim = '';
      if (target.id == 'make' || target.id == 'year') this.car.model = '';
      if (target.id == 'year') this.car.make = '';
      console.log(this.car);
    },
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
      this.car.mileage = Number(this.amount);
      this.amount = this.numberWithCommas(this.amount);
      if (this.amount == '0') this.amount = '';
    },
    validateSubmit() {
      this.loading = true;
      const {
        year,
        make,
        model,
        trim,
        insurance,
        registered_owner,
        state,
        plate_number,
      } = this.car;

      this.error = this.checkEmptyProperties({
        year,
        make,
        model,
        insurance,
        trim: this.trims.length ? trim : '123456',
        registered_owner,
        state,
        plate_number,
      });

      if (this.error) return (this.loading = false);

      if (
        plate_number.length !== 8 ||
        !this.validatePlateNumber(plate_number)
      ) {
        this.loading = false;
        return this.$toastr.w(
          'Please enter a correct plate number',
          'Invalid Plate number',
        );
      }

      const payload = {
        year,
        make,
        model,
        trim,
        insurance,
        registered_owner,
        state,
        plate_number,
      };

      this.loading = false;
      this.$store.commit('updateLoanApp', payload);
      this.$emit('next');
    },
    checkEmptyProperties(obj) {
      let count = 0;
      for (let i in obj) {
        let elem = document.querySelector(`#${i}`);

        if (!obj[i]) {
          count++;
          if (elem) elem.style.border = '1px dashed red';
          else
            this.$toastr.e(
              `${i.replace(/_/g, ' ')} is required to complete this form`,
              'Empty field is detected!',
            );
        } else {
          if (elem) elem.style.border = '';
        }
      }
      return count ? true : false;
    },
    validatePlateNumber(value) {
      //   ;
      const start = value.slice(0, 3);
      const end = value.slice(-2);

      const mid = value.slice(3, 6);

      return /^\d+$/.test(mid) && /^[a-z]+$/i.test(start + end);
    },
  },
  watch: {
    amount: 'getAmount',
  },
};
</script>

<style>
.border-none {
  border: none;
}
</style>
