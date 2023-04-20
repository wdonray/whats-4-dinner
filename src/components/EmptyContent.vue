<script setup>
import Spinner from '../components/Spinner.vue'

defineProps({
  fetching: { type: Boolean, default: false }
})
</script>

<template>
  <div class="empty-content">
    <Transition name="fade" mode="out-in">
      <div v-if="fetching" class="content">
        <Spinner size="2rem" />
      </div>
      <div v-else class="content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.empty-content {
  background-color: var(--color-secondary);
  border-radius: var(--border-radius);
  height: 500px;
}
.empty-content .content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
