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
    class="button"
    :class="{ loading: loading, link: link }"
    :disabled="loading"
  >
    <span :class="{ hidden: loading }"><slot>Submit</slot> </span>
    <span class="spinner"><Spinner v-if="loading" /></span>
  </button>
</template>

<style scoped lang="scss">
.button {
  position: relative;
  text-align: center;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  font-weight: 700;
  padding: var(--space-sm);
  border-radius: 3px;
  background-color: #1a98ff;
  color: white;
  border: 0;
  text-decoration: none;
  line-height: 1;
  transition: background-color 0.5s;

  &:hover {
    cursor: pointer;
    background-color: #0071d0;
  }

  &:disabled {
    &:hover {
      text-decoration: none;
      pointer-events: none;
    }
  }

  &:disabled:not(.loading):not(.link) {
    background-color: var(--color-line);
    color: #5d85c5;
  }

  &:disabled.link:not(.loading) {
    color: var(--color-disabled);

    &:hover {
      text-decoration: none;
      pointer-events: none;
    }
  }

  &.loading {
    pointer-events: none;
  }

  &.link {
    background-color: transparent;
    border: transparent;
    color: var(--color-text);
    text-decoration: none;

    &:hover {
      text-decoration: underline var(--color-accent) solid 2px;
      text-underline-offset: 3px;
      background-color: transparent;
    }
  }
}

button .hidden {
  visibility: hidden;
}

.spinner {
  position: absolute;
  inset-inline: 0;
}
</style>
