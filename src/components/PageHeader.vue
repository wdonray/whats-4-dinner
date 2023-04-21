<script setup>
import { randomFoodIcon } from '../utils/foodIcons'
import { computed } from 'vue'

defineProps({
  title: { type: String, required: true }
})

defineEmits(['submit'])

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
      <h1 style="margin: 0" v-if="!$slots.action">{{ title }}</h1>
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
</style>
