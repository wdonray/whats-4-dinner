<script setup>
import { ref, toRaw, computed } from 'vue'
import useDb from '../use/useDb'
import PageHeader from '../components/PageHeader.vue'
import Button from '../components/Button.vue'
import EmptyContent from '../components/EmptyContent.vue'
import { formatbase4ToImage, formatDate } from '../utils/format'
import { sortByDate, sortByNumber, sortByString } from '../utils/sort'
import Recipe from '../components/Recipe.vue'
import { createAndDownloadPdf } from '../utils/pdf'

// Add delete button

const sort = ref('')
const search = ref('')
const ascendingSort = ref(true)
const selectedRecipe = ref(null)

const { items, list, fetching } = useDb('cookbook')

const itemsLength = computed(() => toRaw(items.value).length)

const sortOptions = computed(() => [
  { value: 'cookTime', label: 'Cook Time' },
  { value: 'prepTime', label: 'Prep Time' },
  { value: 'nutritionCalories', label: 'Calories' },
  { value: 'nutritionFat', label: 'Fat' },
  { value: 'nutritionCarbs', label: 'Carbs' },
  { value: 'nutritionProtein', label: 'Protein' },
  { value: 'recipeName', label: 'Recipe Name' },
  { value: 'createdAt', label: 'Created At' }
])

const filteredItems = computed(() => {
  const recipes = toRaw(items.value).map((item) => Object.values(item)[0])

  if (search.value.trim() !== '') {
    return recipes.filter((item) => item.recipeName.includes(search.value))
  }

  return recipes.sort(sortMethods.value[sort.value])
})

const sortMethods = computed(() => ({
  cookTime: (a, b) =>
    sortByNumber(parseTime(a[sort.value]), parseTime(b[sort.value]), ascendingSort.value),
  prepTime: (a, b) =>
    sortByNumber(parseTime(a[sort.value]), parseTime(b[sort.value]), ascendingSort.value),
  nutritionCalories: (a, b) =>
    sortByNumber(a.nutritionCalories, b.nutritionCalories, ascendingSort.value),
  nutritionFat: (a, b) => sortByNumber(a.nutritionFat, b.nutritionFat, ascendingSort.value),
  nutritionCarbs: (a, b) => sortByNumber(a.nutritionCarbs, b.nutritionCarbs, ascendingSort.value),
  nutritionProtein: (a, b) =>
    sortByNumber(a.nutritionProtein, b.nutritionProtein, ascendingSort.value),
  recipeName: (a, b) => sortByString(a.recipeName, b.recipeName, ascendingSort.value),
  createdAt: (a, b) => sortByDate(a.createdAt, b.createdAt, ascendingSort.value)
}))

const sortDirectionIcon = computed(() =>
  ascendingSort.value ? 'fa-circle-arrow-up' : 'fa-circle-arrow-down'
)

function parseTime(timeStr) {
  const regex = /(\d+)\s*(hour|minute)s?/
  const match = timeStr.match(regex)

  if (!match) {
    throw new Error(
      'Invalid time string format. Accepted formats: "1 hour", "10 minutes", "5 minute", "2 hours"'
    )
  }

  const [_, timeValue, timeUnit] = match

  return timeUnit === 'hour' ? parseInt(timeValue) * 60 : parseInt(timeValue)
}

list()
</script>

<template>
  <PageHeader title="My Cookbook" :fetching="fetching">
    <template #action v-if="selectedRecipe != null">
      <Button link @click="selectedRecipe = null">
        <span style="font-size: 1rem"><i class="fa-solid fa-hand-point-left"></i> Go Back</span>
      </Button>
    </template>
    <template #search v-if="selectedRecipe == null">
      <div style="position: relative">
        <input
          placeholder="Search my cookbook..."
          type="text"
          id="message"
          v-model="search"
          autocomplete="off"
          :disabled="fetching"
        />
        <i class="post fa-solid fa-magnifying-glass"></i>
      </div>
    </template>
  </PageHeader>
  <Transition name="slide-in-right" mode="out-in">
    <div v-if="filteredItems.length && !fetching && selectedRecipe == null">
      <div class="filter-section">
        <h4>{{ itemsLength }} total recipes</h4>
        <div class="filter">
          <label for="sort">Sort by</label>
          <select id="sort" v-model="sort">
            <option></option>
            <option
              v-for="option in sortOptions"
              :key="option.value"
              :value="option.value"
              :selected="option.value === sort"
            >
              {{ option.label }}
            </option>
          </select>
          <i
            @click="ascendingSort = !ascendingSort"
            class="fa-solid asc-sort"
            :class="sortDirectionIcon"
          ></i>
        </div>
      </div>
      <div class="cookbook">
        <div
          class="recipe"
          v-for="item in filteredItems"
          :key="item.id"
          @click="selectedRecipe = item"
        >
          <img :src="formatbase4ToImage(item.base64Image)" :alt="item.recipeName" />
          <div class="content">
            <h2 style="margin-top: 0">{{ item.recipeName }}</h2>
            <div class="inner-content">
              <div>
                <b>Prep Time</b>
                <span>{{ item.prepTime }}</span>
              </div>
              <div>
                <b>Cook Time</b>
                <span>{{ item.cookTime }}</span>
              </div>
              <div>
                <b>Serving Size</b>
                <span>{{ item.servingSize }}</span>
              </div>
              <div>
                <b>Save Date</b>
                <span>{{ formatDate(item.createdAt.toDate()) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EmptyContent v-else-if="!filteredItems.length" :fetching="fetching">
      <h1 class="underblock" style="margin: 0">Cookbook empty</h1>
      <div class="navigate">
        <i class="fa-solid fa-arrow-right"></i>
        <Button link to="/recipes"><h3>starting saving some here</h3></Button>
        <i class="fa-solid fa-arrow-left"></i>
      </div>
    </EmptyContent>
    <div v-else-if="selectedRecipe != null">
      <Recipe :recipe="selectedRecipe">
        <template #actions>
          <div class="actions">
            <Button @click="createAndDownloadPdf(selectedRecipe, selectedRecipe.recipeName)" link>
              <span> <i class="fa-solid fa-download"></i> <b>Download</b></span>
            </Button>
          </div>
        </template>
      </Recipe>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.navigate {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-md);
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .filter {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 0.2fr;

    label {
      text-align: right;
      font-weight: bold;
      margin-right: var(--space-sm);
    }

    .asc-sort {
      cursor: pointer;
      font-size: 1.5rem;
      color: var(--color-accent);
    }
  }
}

.cookbook {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .recipe {
    display: grid;
    grid-template-columns: 1fr;
    background-color: var(--color-nav-default);
    border: 3px solid white;
    border-radius: var(--border-radius);

    &:hover {
      cursor: pointer;
      border: 3px solid var(--color-accent);
      transform: scale(1.01);
      transition: transform 0.2s ease-in-out;
    }

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;

      border-bottom: 3px solid white;
    }

    .content {
      padding: var(--space-md);
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-sm);

      h2 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      span,
      b {
        font-size: small;
      }

      .inner-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-sm);

        div {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-sm);

          &:nth-child(2n) {
            text-align: end;
          }
        }
      }
    }
  }
}
</style>
