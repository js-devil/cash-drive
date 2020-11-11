<template>
  <form class="mt-4 mx-auto w-50" @submit.prevent="validateSubmit">
    {{ car }}
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group">
          <label class="text-dark">Make</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-0"
            :disabled="loading"
            id="make"
            v-model="car.make"
          >
            <option v-for="brand in brands" :key="brand">{{ brand }}</option>
          </select>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="form-group">
          <label class="text-dark">Model</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0"
            v-model="car.model"
            id="model"
            :disabled="loading"
            autocomplete="off"
            placeholder="Enter Vehicle Model"
          />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="form-group customize-input">
          <label class="text-dark" for="pwd">Year</label>
          <select
            class="custom-select form-control bg-white custom-radius custom-shadow border-0"
            :disabled="loading"
            v-model="car.year"
            id="year"
          >
            <option>{{ thisYear }}</option>
            <option v-for="n in 20" :key="n + 'c'">{{ thisYear - n }}</option>
          </select>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="form-group">
          <label class="text-dark">Trim</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0"
            v-model="car.trim"
            :disabled="loading"
            autocomplete="off"
            id="trim"
            placeholder="Enter Trim of Vehicle"
          />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="form-group">
          <label class="text-dark">Plate Number</label>
          <input
            class="form-control bg-white custom-radius custom-shadow border-0"
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
            class="custom-select form-control bg-white custom-radius custom-shadow border-0"
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
            class="custom-select form-control bg-white custom-radius custom-shadow border-0"
            :disabled="loading"
            v-model="car.state"
            id="state"
          >
            <option v-for="state in states" :key="state">{{ state }}</option>
          </select>
        </div>
      </div>

      <div class="col-lg-6">
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
        <button type="submit" class="btn btn-block btn-dark">Next</button>
      </div>
    </div>
  </form>
</template>

<script>
import states from '~/assets/states.json';

const brands = [
  'Honda',
  'GMC',
  'Chrysler',
  'Chevrolet',
  'Kia',
  'Toyota',
  'Ram',
  'Dodge',
  'Ford',
  'Volkswagen',
  'Innoson',
  'Nissan',
  'Jeep',
  'Mercedes Benz',
  'Tesla',
  'Others',
];

const types = [
  'SUV',
  'Truck',
  'Sedan',
  'Van',
  'Coupe',
  'Wagon',
  'Convertible',
  'Sports Car',
  'Diesel Crossover',
  'Luxury Car',
  'hybrid/Electric',
];
export default {
  data: () => ({
    car: {},
    errorMessage: '',
    loading: false,
    error: false,
    amount: '',
    brands,
    types,
    states,
  }),
  computed: {
    thisYear() {
      return Number(new Date().getFullYear());
    },
  },
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
      this.car.mileage = Number(this.amount);
      this.amount = this.numberWithCommas(this.amount);
      if (this.amount == '0') this.amount = '';
    },
    validateSubmit() {
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
        trim,
        insurance,
        registered_owner,
        state,
        plate_number,
      });

      if (this.error) return;
      console.log(this.error, {
        year,
        make,
        model,
        trim,
        insurance,
        registered_owner,
        state,
        plate_number,
      });
      // this.$store.commit('set', {
      //   loan_application: {
      //     year,
      //     make,
      //     model,
      //     trim,
      //     insurance,
      //     registered_owner,
      //     state,
      //     plate_number,
      //   },
      // });

      // this.$emit('next');
    },
    checkEmptyProperties(obj) {
      let count = 0;
      for (let i in obj) {
        let elem = document.querySelector(`#${i}`);
        if (elem) elem.style.border = '';
        console.log(obj[i]);
        if (!obj[i]) {
          console.log(elem, i);
          count++;
          if (elem) elem.style.border = '1px dashed red !important';
        }
      }
      return count ? false : true;
    },
  },
  watch: {
    amount: 'getAmount',
  },
};
</script>
