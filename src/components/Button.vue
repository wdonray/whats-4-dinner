<script setup>
import Spinner from './Spinner.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  loading: { type: Boolean },
  to: { type: String },
  link: { type: Boolean }
})

function handleRouteChange() {
  if (!props.to) return
  router.push(props.to)
}
</script>

<template>
  <button
    @click="handleRouteChange"
    class="btn"
    :class="{ loading: loading, link: link }"
    :disabled="loading"
  >
    <span :class="{ hidden: loading }"><slot>Submit</slot> </span>
    <span class="spinner"><Spinner v-if="loading" /></span>
  </button>
</template>

<style scoped>
.btn .hidden {
  visibility: hidden;
}

.spinner {
  position: absolute;
  inset-inline: 0;
}
</style>
