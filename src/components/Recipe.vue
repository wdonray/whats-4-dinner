<template>
  <div class="content">
    <div class="image-container">
      <Transition name="fade" mode="out-in">
        <div v-if="fetchingBookmarkStatus" class="fetching">
          <Spinner size="1.5rem" />
        </div>
      </Transition>

      <img :src="formatbase4ToImage(imageData?.data[0].b64_json || recipe.base64Image)" />

      <i
        @click="!fetchingBookmarkStatus ? $emit('bookmark', recipe) : null"
        class="fa-bookmark"
        :class="{
          'fa-solid': bookmarked,
          'fa-regular': !bookmarked,
          'disabled-icon': fetchingBookmarkStatus
        }"
      ></i>
    </div>
    <div>
      <h2>{{ recipe.recipeName }}</h2>
      <div class="info">
        <div>
          <h4 style="margin-bottom: var(--space-md)">Prep Time:</h4>
          <span>{{ recipe.prepTime }}</span>
        </div>
        <div>
          <h4 style="margin-bottom: var(--space-md)">Cook Time:</h4>
          {{ recipe.cookTime }}
        </div>
        <div>
          <h4 style="margin-bottom: var(--space-md)">Total Time:</h4>
          {{ parseInt(recipe.cookTime) + parseInt(recipe.prepTime) }} minutes
        </div>
      </div>
      <div class="info" style="margin-top: var(--space-md)">
        <div>
          <h4>Servings:</h4>
          {{ recipe.servingSize }}
        </div>
        <div>
          <h4>Calories:</h4>
          <span>{{ recipe.nutritionCalories }}</span>
        </div>
        <div>
          <h4>Fat:</h4>
          <span>{{ recipe.nutritionFat }}</span>
        </div>
        <div>
          <h4>Protein:</h4>
          <span>{{ recipe.nutritionProtein }}</span>
        </div>
        <div>
          <h4>Carbs:</h4>
          <span>{{ recipe.nutritionCarbs }}</span>
        </div>
      </div>
      <slot name="actions" />
    </div>
    <div>
      <h4>Instructions</h4>
      <hr />
      <ol>
        <li v-for="step in recipe?.recipeInstructions" :key="step">{{ step }}</li>
      </ol>
    </div>
    <div>
      <h4>Ingredients</h4>
      <hr />
      <ul>
        <li v-for="ingredient in recipe?.ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { formatbase4ToImage } from '../utils/format'
import Spinner from './Spinner.vue'

defineProps({
  recipe: { type: Object, required: true },
  imageData: { type: [Object, null], default: null },
  bookmarked: { type: Boolean, default: false },
  fetchingBookmarkStatus: { type: Boolean, required: true }
})
</script>

<style scoped>
.content {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: var(--space-2xl);
  row-gap: var(--space-lg);
  margin-top: var(--space-lg);
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
}

.content .image-container {
  width: 400px;
  height: 400px;
  border-radius: var(--border-radius);
  position: relative;
}

@media (max-width: 768px) {
  .content .image-container {
    margin: 0 auto;
  }
}

.content .image-container .fetching {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  background-color: var(--color-disabled);
  opacity: 0.4;
  z-index: 2;
}

.content .image-container .fa-bookmark {
  position: absolute;
  font-size: 35px;
  color: var(--color-primary);
  cursor: pointer;
  left: 90%;
  bottom: 88%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.content .image-container .fa-bookmark.disabled-icon {
  color: var(--color-disabled);
  cursor: not-allowed;
}

.content .image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius);
  border: 4px solid var(--color-secondary);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content ul {
  padding: var(--space-md);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.content ul li {
  margin-left: var(--space-sm);
}

.content ol {
  padding: var(--space-md);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.content .info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-sm);
  border: 3px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--space-md);
  background-color: var(--color-secondary);
  align-items: center;
}

.content .info div h4 {
  margin: 0;
}

.content .info h4 {
  margin-top: 0;
  margin-bottom: var(--space-md);
}
</style>
