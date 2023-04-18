<script setup>
import Button from '../components/Button.vue'
import useApiFetch from '../use/useApiFetch'
import { computed, ref } from 'vue'
import Notification from '../components/Notification.vue'
import { jsPDF } from 'jspdf'
import { formatRecipeName } from '../utils/format'
import useDb from '../use/useDb'
import PageHeader from '../components/PageHeader.vue'
import { formatbase4ToImage } from '../utils/format'
import EmptyContent from '../components/EmptyContent.vue'

const notification = ref('')
const fetching = ref(false)
const notificationType = ref('success')
const recipeSaved = ref(false)

const { data: recipeData, post: sendMessage } = useApiFetch('chat/completions')
const { data: imageData, post: generateImage } = useApiFetch('images/generations')

const { save } = useDb('cookbook')

const recipe = computed(() =>
  recipeData.value?.choices?.length
    ? { ...JSON.parse(recipeData.value?.choices[0].message.content), id: recipeData.value.id }
    : null
)

const renderRecipe = computed(() => !fetching.value && recipe.value && imageData.value)

async function submit(search) {
  fetching.value = true
  try {
    await sendMessage({
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: `I want to cook ${search}, the JSON should contain an recipeName, nutritionCalories, nutritionFat, nutritionCarbs, nutritionProtein, prepTime, cookTime, servingSize, ingredients and recipeInstructions. recipeInstructions and ingredients should be an array of strings.`
        }
      ]
    })

    await generateImage({
      prompt: `Real food image of ${search}`,
      n: 1,
      size: '256x256',
      response_format: 'b64_json'
    })

    notification.value = 'Recipe created!'
    notificationType.value = 'success'
    recipeSaved.value = false
  } finally {
    setTimeout(() => {
      notification.value = ''
    }, 3000)

    fetching.value = false
  }
}

function download() {
  const doc = new jsPDF()

  const recipeMap = new Map(Object.entries(recipe.value))

  let index = 0
  const lineSpacing = 8
  const maxTextWidth = 180

  for (const [key, value] of recipeMap) {
    let textLines = []
    const formattedKey = formatRecipeName(key)

    if (Array.isArray(value)) {
      textLines.push(`${formattedKey}:`)
      value.forEach((item) => textLines.push(`- ${item}`))
    } else {
      textLines = doc.splitTextToSize(`${formattedKey}: ${value}`, maxTextWidth)
    }

    const textOffset = 10 + index * lineSpacing

    doc.setFontSize(10)
    doc.text(textLines, 10, textOffset)
    index += textLines.length
  }

  doc.save(`${recipe.value.recipeName}.pdf`)
}

async function bookmark() {
  try {
    await save({
      ...recipe.value,
      createdAt: new Date(),
      base64Image: imageData.value.data[0].b64_json
    })
    recipeSaved.value = true
    notification.value = 'Recipe bookmarked!'
    notificationType.value = 'success'
  } finally {
    setTimeout(() => {
      notification.value = ''
    }, 3000)
  }
}
</script>

<template>
  <Notification :message="notification" :type="notificationType" />
  <div class="recipe-container">
    <PageHeader title="Recipes" :fetching="fetching" @submit="submit" />
    <hr />
    <Transition name="slide-in-right" mode="out-in">
      <EmptyContent v-if="!renderRecipe" :fetching="fetching">
        <h1 class="underblock">Discover a New Recipe</h1>
      </EmptyContent>
      <div class="content" v-else-if="renderRecipe">
        <div class="image-container">
          <img :src="formatbase4ToImage(imageData.data[0].b64_json)" />
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
          <div class="actions">
            <Button :disabled="recipeSaved" @click="bookmark" link>
              <span>
                <i
                  :class="{
                    disabled: recipeSaved,
                    'fa-bookmark': !recipeSaved,
                    'fa-circle-check': recipeSaved
                  }"
                  class="fa-solid"
                ></i>
                <b>{{ recipeSaved ? 'Saved' : 'Bookmark' }}</b>
              </span>
            </Button>
            <Button @click="submit" link>
              <span><i class="fa-solid fa-arrows-rotate"></i> <b>Try again</b></span>
            </Button>
            <Button @click="download" link>
              <span> <i class="fa-solid fa-download"></i> <b>Download</b></span>
            </Button>
          </div>
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
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@mixin listLayout {
  padding: var(--space-md);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.recipe-container {
  display: grid;
  grid-template-columns: 1fr;

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-2xl);

    .button span {
      position: relative;
      .disabled {
        color: var(--color-disabled);
      }

      i {
        color: var(--color-accent);
        position: absolute;
        bottom: 120%;
        left: 50%;
        transform: translate(-50%);
      }

      b {
        margin-top: var(--space-sm);
      }
    }
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: var(--space-2xl);
    row-gap: var(--space-lg);
    margin-top: var(--space-lg);

    .image-container {
      width: 400px;
      height: 400px;
      object-fit: cover;
      border: 3px solid var(--color-border);
      border-radius: var(--border-radius);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    ul {
      @include listLayout;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      li {
        margin-left: var(--space-sm);
      }
    }

    ol {
      @include listLayout;
    }

    .info {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--space-sm);
      border: 3px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: var(--space-md);
      background-color: var(--color-nav-default);
      align-items: center;

      div h4 {
        margin: 0;
      }

      h4 {
        margin-top: 0;
        margin-bottom: var(--space-md);
      }
    }
  }

  a {
    cursor: pointer;
  }
}
</style>
