<script setup>
import { randomFoodIcon } from '../utils/foodIcons'
import { computed, ref } from 'vue'
import Button from '../components/Button.vue'

defineProps({
  title: { type: String, required: true },
  fetching: { type: Boolean, required: true }
})

defineEmits(['submit'])

const search = ref('')

const foodIcon = computed(() => randomFoodIcon())
</script>

<template>
  <div class="page-header-container">
    <div style="display: flex; align-items: center; gap: var(--space-md)">
      <i style="color: rgb(66, 196, 141); font-size: 2rem" class="fa-solid" :class="foodIcon"></i>
      <h1 style="margin: 0">{{ title }}</h1>
    </div>
    <form @submit.prevent="$emit('submit', search)">
      <div style="position: relative">
        <input
          :placeholder="`Search ${title.toLocaleLowerCase()}...`"
          type="text"
          id="message"
          v-model="search"
          autocomplete="off"
          :disabled="fetching"
        />
        <i class="post fa-solid fa-magnifying-glass"></i>
      </div>
      <Button type="submit" :loading="fetching">Search</Button>
    </form>
  </div>
</template>
