<script setup>
import { formatbase4ToImage, formatDate } from '../utils/format'

defineProps({
  recipe: { type: Object, required: true }
})
</script>

<template>
  <div class="recipe" @click="$emit('select', recipe)">
    <img :src="formatbase4ToImage(recipe.base64Image)" :alt="recipe.recipeName" />
    <div class="content">
      <h2 style="margin-top: 0">{{ recipe.recipeName }}</h2>
      <div class="inner-content">
        <div>
          <b>Prep Time</b>
          <span>{{ recipe.prepTime }}</span>
        </div>
        <div>
          <b>Cook Time</b>
          <span>{{ recipe.cookTime }}</span>
        </div>
        <div>
          <b>Serving Size</b>
          <span>{{ recipe.servingSize }}</span>
        </div>
        <div>
          <b>Save Date</b>
          <span>{{ formatDate(recipe.createdAt.toDate()) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe {
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--color-secondary);
  border: 3px solid var(--color-secondary);
  border-radius: var(--border-radius);
}

.recipe:hover {
  cursor: pointer;
  border: 3px solid var(--color-primary);
  transform: scale(1.01);
  transition: transform 0.2s ease-in-out;
}

.recipe img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.recipe .content {
  padding: var(--space-md);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.recipe .content h2 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 600;
}

.recipe .content span,
.recipe .content b {
  font-size: small;
}

.recipe .content .inner-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
}

.recipe .content .inner-content div {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.recipe .content .inner-content div:nth-child(2n) {
  text-align: end;
}
</style>
