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
      <b-btn type="primary" @click.prevent="takePicture"
        >Take {{ photo ? 'Another ' : '' }}Selfie</b-btn
      >
      <b-btn type="secondary" @click.prevent="clearPhoto">Clear</b-btn>
    </div>
    <canvas id="canvas" width="200" height="200"></canvas>
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
          console.log('An error occurred: ' + err);
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
  },
};
</script>

<style>
#video {
  padding: 10px;
  width: 320px;
  height: 240px;
}

#photo {
  border: 1px solid black;
}

#canvas {
  display: none;
}

.camera,
.output {
  width: 340px;
  display: inline-block;
}

.output img {
  padding: 10px;
  height: 240px;
  width: 320px;
}
</style>
