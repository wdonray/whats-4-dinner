<script setup>
import Button from '../components/Button.vue'
import useApiFetch from '../use/useApiFetch'
import { computed, ref } from 'vue'
import Notification from '../components/Notification.vue'
import { createAndDownloadPdf } from '../utils/pdf'
import useDb from '../use/useDb'
import PageHeader from '../components/PageHeader.vue'
import EmptyContent from '../components/EmptyContent.vue'
import Recipe from '../components/Recipe.vue'

const search = ref('')
const notification = ref('')
const fetching = ref(false)
const notificationType = ref('success')
const bookmarked = ref(false)

const { data: recipeData, post: sendMessage } = useApiFetch('chat/completions')
const { data: imageData, post: generateImage } = useApiFetch('images/generations')

const { bookmarkRecipe, fetching: dbRefreshing } = useDb('cookbook')

const recipe = computed(() =>
  recipeData.value?.choices?.length
    ? { ...JSON.parse(recipeData.value?.choices[0].message.content), id: recipeData.value.id }
    : null
)

const renderRecipe = computed(() => !fetching.value && recipe.value && imageData.value)

async function submit() {
  fetching.value = true
  try {
    await sendMessage({
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: `I want to cook ${search.value}, the JSON should contain an recipeName, nutritionCalories, nutritionFat, nutritionCarbs, nutritionProtein, prepTime, cookTime, servingSize, ingredients and recipeInstructions. recipeInstructions and ingredients should be an array of strings.`
        }
      ]
    })

    await generateImage({
      prompt: `Real food image of ${search.value}`,
      n: 1,
      size: '256x256',
      response_format: 'b64_json'
    })

    notification.value = 'Recipe created!'
    notificationType.value = 'success'
  } finally {
    setTimeout(() => {
      notification.value = ''
    }, 3000)

    fetching.value = false
  }
}

async function bookmark() {
  try {
    const dbData = {
      ...recipe.value,
      createdAt: new Date(),
      base64Image: imageData.value.data[0].b64_json
    }

    bookmarked.value = await bookmarkRecipe(dbData, recipeBookmarkedCallback)
  } finally {
    setTimeout(() => {
      notification.value = ''
    }, 3000)
  }
}

function recipeBookmarkedCallback(state) {
  notification.value = state ? 'Recipe bookmarked!' : 'Recipe removed from bookmarks!'
}
</script>

<template>
  <Notification :message="notification" :type="notificationType" />
  <div class="recipe-container">
    <PageHeader title="Recipes">
      <template #search>
        <form @submit.prevent="submit">
          <div style="position: relative">
            <input
              placeholder="Search for a recipe..."
              type="text"
              id="message"
              v-model="search"
              autocomplete="off"
              :disabled="fetching"
            />
            <i class="post fa-solid fa-magnifying-glass"></i>
          </div>
        </form>
      </template>
    </PageHeader>
    <Transition name="slide-in-right" mode="out-in">
      <EmptyContent v-if="!renderRecipe" :fetching="fetching">
        <h1 class="underblock">Discover a New Recipe</h1>
      </EmptyContent>
      <Recipe
        v-else-if="renderRecipe"
        :image-data="imageData"
        :recipe="recipe"
        :bookmarked="bookmarked"
        @bookmark="bookmark"
        :fetching-bookmark-status="dbRefreshing"
      >
        <template #actions>
          <div class="actions">
            <Button @click="submit" link>
              <span><i class="fa-solid fa-arrows-rotate"></i> <b>Try again</b></span>
            </Button>
            <Button @click="createAndDownloadPdf(recipe, recipe.recipeName)" link>
              <span> <i class="fa-solid fa-download"></i> <b>Download</b></span>
            </Button>
          </div>
        </template>
      </Recipe>
    </Transition>
  </div>
</template>

<style scoped>
.recipe-container {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
