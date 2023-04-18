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
        <Spinner />
      </div>
      <div v-else class="content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.empty-content {
  background-color: var(--color-nav-default);
  border-radius: var(--border-radius);
  height: 500px;

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
