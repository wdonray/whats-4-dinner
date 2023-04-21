<script setup>
import { randomFoodIcon } from '../utils/foodIcons'
import { computed } from 'vue'
import useBreakpoint from '../use/useBreakpoint'

const { desktop } = useBreakpoint()

const props = defineProps({
  title: { type: String, required: true },
  alwaysShowTitle: { type: Boolean, default: false }
})

defineEmits(['submit'])

const displayTitle = computed(() => {
  if (props.alwaysShowTitle) return true
  return desktop.value
})

const foodIcon = computed(() => randomFoodIcon())
</script>

<template>
  <div class="page-header-container">
    <div style="display: flex; align-items: center; gap: var(--space-md)">
      <i
        v-if="!$slots.action"
        style="color: var(--color-primary); font-size: 2rem"
        class="fa-solid"
        :class="foodIcon"
      ></i>
      <slot v-else name="action" />
      <h1 style="margin: 0" v-if="displayTitle && !$slots.action">{{ title }}</h1>
    </div>
    <slot name="search" />
  </div>
  <hr />
</template>

<style scoped>
.page-header-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: center;
  justify-content: space-between;
  position: sticky;
}

@media (max-width: 768px) {
  .page-header-container {
    grid-template-columns: 0.2fr 1fr;
    gap: var(--space-md);
  }
}
</style>
