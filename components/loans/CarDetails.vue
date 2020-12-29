<template>
  <form class="mt-4 mx-auto w-50" @submit.prevent="validateSubmit">
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group customize-input">
          <label class="text-dark" for="pwd">Year</label>
          <v-select
            :options="years"
            class="vSelect"
            @input="car.make = car.model = car.trim = ''"
            v-model="car.year"
            id="year"
            :searchable="true"
          ></v-select>
        </div>
      </div>

      <div class="col-lg-6" v-if="car.year">
        <div class="form-group">
          <label class="text-dark">Make</label>
          <v-select
            :options="mapNames(makes)"
            class="vSelect"
            @input="car.model = car.trim = ''"
            id="make"
            :disabled="loading"
            v-model="car.make"
            :searchable="true"
          >
          </v-select>
        </div>
      </div>

      <div class="col-lg-6" v-if="car.make">
        <div class="form-group">
          <label class="text-dark">Model</label>
          <v-select
            :options="mapNames(models)"
            @input="car.trim = ''"
            class="vSelect"
            :disabled="loading"
            id="model"
            v-model="car.model"
            :searchable="true"
          >
          </v-select>
        </div>
      </div>

      <div class="col-lg-6" v-if="car.model && trims.length">
        <div class="form-group">
          <label class="text-dark">Body Style</label>
          <v-select
            :options="mapNames(trims)"
            class="vSelect"
            :disabled="loading"
            id="trim"
            v-model="car.trim"
            :searchable="true"
          >
          </v-select>
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
          <v-select
            :options="states"
            class="vSelect"
            :disabled="loading"
            id="state"
            v-model="car.state"
            :searchable="true"
          >
          </v-select>
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
const years = vehicleDetails?.map(key => key.id).filter(key => key >= 1990);

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
    mapNames: arr => arr.map(key => key.name),
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
      // const start = value.slice(0, 3);
      // const end = value.slice(-2);

      // const mid = value.slice(3, 6);

      // return /^\d+$/.test(mid) && /^[a-z]+$/i.test(start + end);
      return true
    },
  },
  created() {
    const {
      year,
      make,
      model,
      trim,
      insurance,
      registered_owner,
      state,
      plate_number,
    } = this.$store.state.loan_application;

    this.car = {
      year,
      make,
      model,
      trim,
      insurance,
      registered_owner,
      state,
      plate_number,
    };
  },
};
</script>

<style>
@import 'vue-select/dist/vue-select.css';

.border-none {
  border: none;
}
</style>
