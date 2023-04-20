<template>
  <div>
    <span class="spinner bounce1"></span>
    <span class="spinner bounce2"></span>
    <span class="spinner"></span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: '0.5rem'
  }
})
</script>

<style scoped>
.spinner {
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  background-color: var(--color-primary);
  border-radius: 100%;
  display: inline-block;
  width: v-bind(size);
  height: v-bind(size);
  margin: 0 calc(v-bind('size') / 2);
}

.bounce1 {
  animation-delay: -0.32s;
}

.bounce2 {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
