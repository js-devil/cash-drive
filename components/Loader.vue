<template>
    <div class='loading-fullscreen'>
      <div class='loading'>
        <div class='_box'>
          <div class='indicator'>
            <div class='spinner-border' role='status'>
              <span class='sr-only'>Loading...</span>
            </div>
          </div>
          <div class='text'>Just a moment...</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading-fullscreen {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  backdrop-filter: blur(3px);
  top: 0;
}

.loading {
  position: relative;
  width: 100%;
  height: 100%;
}

.loading ._box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 5px;
}

.loading .text {
  font-size: 1.3rem;
  /* opacity: 0.5; */
  text-align: center;
  font-weight: 700;
  color: #e26511;
}

.spinner-border {
  color: #e26511;
  width: 3rem;
  height: 3rem;
}

.loading small {
  font-size: 0.9rem;
  opacity: 0.6;
  margin-top: 10px;
  text-align: center;
}

@keyframes left-right {
  from {
    transform: translateX(-10px);
  }
  to {
    transform: translateX(10px);
  }
}

@media only screen and (min-width: 767px) {
  .loading ._box {
    padding: 20px 5px;
  }
}
</style>
