<template>
  <div class="row mx-auto w-75">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="card text-white">
        <div class="card-content">
          <div class="card-body text-center bg-primary">
            <img
              src="/img/elements/decore-left.png"
              class="img-left"
              alt="card-img-left"
            />
            <img
              src="/img/elements/decore-right.png"
              class="img-right"
              alt="card-img-right"
            />
            <div class="avatar avatar-xl bg-secondary shadow mt-0">
              <div class="avatar-content">
                <i class="feather icon-award white font-large-1"></i>
              </div>
            </div>
            <div class="text-center my-3">
              <h4 class="mb-2 text-white">
                Congratulations {{ user.first_name }}
              </h4>
              <p>
                You have successfully applied for a loan.
                <br />
                You will be contacted shortly
              </p>

              <button class="btn btn-secondary" @click="proceed">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  props: {
    offerDetails: Object,
  },
  methods: {
    proceed() {
      Swal.fire({
        title: 'Do you accept this offer',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        // backdrop: false,
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        confirmButtonText: 'Accept',
        cancelButtonText: 'Decline',
      }).then(result => {
        if (result.isConfirmed) return this.acceptOffer();
        this.declineOffer();
      });
    },
    async acceptOffer() {
      const { token, id } = this.offerDetails;

      try {
        const res = await this.$axios({
          url: `/loans/${id}/accept`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.$store.commit('set', { loading: false });
        if (res.data.status) {
          this.$emit('decline');
        }
        console.log(res.data);
      } catch (err) {
        this.catchErrors(err);
      }
    },
    async declineOffer() {
      const { token, id } = this.offerDetails;

      try {
        const res = await this.$axios({
          url: `/loans/${id}/decline`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.$store.commit('set', { loading: false });
        if (res.data.status) {
          this.$emit('decline');
        }
        console.log(res.data);
      } catch (err) {
        this.catchErrors(err);
      }
    },
  },
};
</script>

<style scoped>
.img-left {
  width: 200px;
  position: absolute;
  top: 0;
  left: 0;
}

.img-right {
  width: 175px;
  position: absolute;
  top: 0;
  right: 0;
}

.avatar {
  margin-bottom: 2rem;
}
.avatar.avatar-xl {
  font-size: 1.5rem;
}

.avatar {
  white-space: nowrap;
  background-color: #c3c3c3;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  color: #ffffff;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-size: 0.75rem;
  text-align: center;
  vertical-align: middle;
  margin: 5px;
}

.bg-primary {
  background-color: #e26511 !important;
}

.bg-secondary {
  background-color: #00162a !important;
}

.avatar.avatar-xl .avatar-content {
  height: 70px;
  width: 70px;
}
.avatar .avatar-content {
  width: 32px;
  height: 32px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>
