<script setup>
import { computed, ref } from 'vue'
import Button from '../components/Button.vue'
import {
  mostSearchedFoodIngredients,
  mostSearchedMeals,
  mostSearchedCuisines
} from '../utils/quickSearch'

const props = defineProps({ header: String, required: true })

const showingMore = ref(false)

const quickSearchMap = new Map([
  ['Popular ingredients', mostSearchedFoodIngredients],
  ['Top meals', mostSearchedMeals],
  ['Cuisine', mostSearchedCuisines]
])

const queryButtons = computed(() => quickSearchMap.get(props.header))
const shortenedQueryButtons = computed(() => queryButtons.value.slice(0, 10))
const remainingQueryButtons = computed(() => queryButtons.value.slice(10))
</script>

<template>
  <div class="quick-search-item">
    <div class="header">
      <h3>{{ header }}</h3>
      <Button @click="showingMore = !showingMore" link class="btn-outline btn-small">
        {{ showingMore ? 'Less -' : 'More +' }}
      </Button>
    </div>
    <div>
      <Button
        class="btn-outline btn-small"
        v-for="query in shortenedQueryButtons"
        :key="query"
        :to="`/create-recipe?search=${query}`"
      >
        {{ query }}
      </Button>
      <Transition name="slide-in-right" mode="in-out">
        <div v-if="showingMore">
          <Button
            class="btn-outline btn-small"
            v-for="query in remainingQueryButtons"
            :key="query"
            :to="`/create-recipe?search=${query}`"
          >
            {{ query }}
          </Button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.quick-search-item .header {
  display: flex;
  align-items: baseline;
  margin-bottom: var(--space-md);
}

.quick-search-item .header h3 {
  margin-bottom: 0;
}

.quick-search-item .header .btn {
  padding-bottom: 0;
}

.quick-search-item div {
  width: 85%;
  padding-right: var(--space-3xl);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

@media (max-width: 768px) {
  .quick-search-item div {
    width: 100%;
  }
}
</style>
