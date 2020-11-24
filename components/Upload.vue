<template>
  <div class="form-group" :style="{ textAlign: avatar ? 'center' : '' }">
    <!-- <h6>click to upload.</h6> -->
    <div class="uploaded-image" v-if="avatar">
      <img :src="avatar" />
    </div>

    <div class="file-upload-wrapper">
      <input
        type="file"
        required="required"
        @change="handleChange"
        :id="no ? 'upload' + no : 'input-file-now'"
        ref="file"
        class="file-upload"
        style="display: none"
      />

      <label
        :class="`btn btn-sm ${file ? 'btn-success' : 'btn-primary'}`"
        :for="no ? 'upload' + no : 'input-file-now'"
        >{{ file ? 'Change' : 'Upload' }}
        <div class="feather icon-upload-cloud"></div>
      </label>

      <span v-if="loader">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      avatar: '',
      loader: false,
    };
  },
  props: ['no'],
  methods: {
    async handleChange(event) {
      const file = event.target.files[0];

      const validType = this.beforeUpload(file);
      if (!validType) return;
      this.loader = true;

      getBase64(file, avatar => {
        this.$emit('uploaded', file);
        this.avatar = avatar;
        this.loader = false;
      });

      function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    },
    beforeUpload({ type, size }) {
      const isType =
        type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg';

      const imageSize = size / 1024 / 1000;
      if (!isType) {
        Toast.fire({
          icon: 'warning',
          title: 'You can only upload JPG, JPEG or PNG files!',
        });

        return false;
      }

      if (imageSize > 2) {
        this.$toast.fire({
          icon: 'warning',
          title: 'You can only upload images with maximum size of 2MB!',
        });
        return false;
      }

      return true;
    },
  },
};
</script>

<style>
.img-loading {
  height: 20px;
  margin-top: 1%;
  margin-left: 2%;
}

.uploaded-image {
  margin-bottom: 5px;
}

.uploaded-image img {
  border: 1px solid #0356ad;
  padding: 5px;
  border-radius: 10px;
  height: 115px;
}

.uploaded-image img:hover {
  transform: scale(1.8);
}

.change {
  /* position: absolute;
  right: 20px;
  top: 10px; */
  z-index: 99;
  display: unset !important;
  position: relative;
  top: 8.2rem;
}
</style>
