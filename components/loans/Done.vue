<template>
  <div class="row mx-auto w-75 done">
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
              <h4 class="mb-2 text-white">Congratulations</h4>
              <p>
                Your loan application is being reviewed for approval. It might
                take a while
                <br />
                Thank you for working with us
              </p>

              <button
                class="btn btn-secondary"
                @click="$router.push('/loan/active')"
              >
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
export default {
  mounted() {
    this.stopWebCam();
  },
};
</script>

<style>
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
