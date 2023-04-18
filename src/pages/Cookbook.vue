<script setup>
import { ref, toRaw, watch } from 'vue'
import useDb from '../use/useDb'
import PageHeader from '../components/PageHeader.vue'
import Button from '../components/Button.vue'
import EmptyContent from '../components/EmptyContent.vue'
import { formatbase4ToImage, formatDate } from '../utils/format'

const filteredItems = ref([])
const { items, list, fetching } = useDb('cookbook')

function submit(search) {
  filteredItems.value = filteredItems.filter((item) => item.recipeName.includes(search))
}

watch(
  items,
  () => {
    filteredItems.value = toRaw(items.value).map((item) => Object.values(item)[0])
  },
  { immediate: true }
)

list()
</script>

<template>
  <PageHeader title="My Cookbook" :fetching="fetching" @submit="submit" />
  <hr />
  <Transition name="slide-in-right" mode="out-in">
    <div v-if="filteredItems.length && !fetching" class="cookbook">
      <div class="recipe" v-for="item in filteredItems" :key="item.id">
        <img :src="formatbase4ToImage(item.base64Image)" :alt="item.recipeName" />
        <div class="content">
          <h2 style="margin: 0">{{ item.recipeName }}</h2>
          <span>Cook Time: {{ item.cookTime }}</span>
          <span>Serving Size: {{ item.servingSize }}</span>
          <span>Save Date: {{ formatDate(item.createdAt.toDate()) }}</span>
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
  </Transition>
</template>

<style lang="scss" scoped>
.navigate {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-md);
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

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

      span {
        font-size: small;
      }
    }
  }
}
</style>
