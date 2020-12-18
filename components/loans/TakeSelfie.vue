<template>
  <div class="mt-4 mx-auto w-50 text-center">
    <h4 class="text-center">Take a photo of yourself</h4>
    <div class="camera" v-show="!photo">
      <video id="video">Video stream not available.</video>
    </div>

    <div class="output" v-show="photo">
      <img :src="photo" alt="your selfie" />
    </div>
    <div>
      <button class="btn btn-primary" @click.prevent="takePicture">
        Take {{ photo ? 'Another ' : '' }}Selfie
      </button>
      <button class="btn btn-danger" v-if="photo" @click.prevent="clearPhoto">
        Clear
      </button>
    </div>
    <canvas id="canvas" width="320" height="240"></canvas>

    <div class="mt-2">
      <button
        v-if="photo"
        style="width: 100%"
        class="btn btn-secondary mt-3"
        @click.prevent="validateSubmit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: '',
    };
  },
  mounted() {
    this.startup();
  },
  methods: {
    startup() {
      const video = document.getElementById('video');
      const vm = this;

      // access video stream from webcam
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        // on success, stream it in video tag
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          this.showError('Your camera won\'t start', 'This could be due to permissions, give access to the site to use your camera');
        });
    },
    clearPhoto() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      context.fillStyle = '#AAA';
      context.fillRect(0, 0, canvas.width, canvas.height);

      const data = canvas.toDataURL('image/png');
      this.photo = '';
    },
    takePicture() {
      const video = document.getElementById('video');
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      context.imageSmoothingEnabled = false;

      const { width, height } = canvas;

      if (width && height) {
        context.fillRect(0, 0, width, height);
        context.drawImage(video, 0, 0, width, height);

        const data = canvas.toDataURL('image/png');
        this.photo = data;
      } else {
        this.clearPhoto();
      }
    },
    dataURLtoFile(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], 'selfie.png', { type: mime });
    },
    async validateSubmit() {
      const { photo } = this;

      if (!photo)
        return this.$toastr.e(
          'Please take a clear picture of your face to get your loan approved!',
          'No Photo',
        );

      const selfie = await this.dataURLtoFile(photo);

      this.uploadSelfie({ selfie });
    },

    async uploadSelfie(data) {
      this.$store.commit('set', { loading: true });

      const { id } = this.$store.state.loan_offer;
      const formData = new FormData();
      for (let key of Object.keys(data))
        if (data[key]) formData.append(key, data[key]);

      try {
        const res = await this.$axios({
          method: 'POST',
          url: `/loans/${id}/selfie/upload`,
          data: formData,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.$store.commit('set', {
          loan_offer: res.data.data,
        });

        this.$store.commit('set', { loading: false });
      } catch (err) {
        this.catchErrors(err);
      }
    },
  },
};
</script>

<style>
.output img,
#canvas,
#video {
  padding: 10px;
  width: 320px;
  height: 240px;
}

#canvas {
  display: none;
}

.camera,
.output {
  width: 340px;
  display: inline-block;
}
</style>
