<script setup>
import { ref, computed, Transition, watch } from 'vue'
import Spinner from './Spinner.vue'

const props = defineProps({
  items: { type: Array, required: true },
  fetching: { type: Boolean, required: true }
})

const imageLoading = ref(false)
const currentIndex = ref(0)
const currentItem = computed(() => props.items && props.items[currentIndex.value])

function prevItem() {
  currentIndex.value = currentIndex.value === 0 ? props.items.length - 1 : currentIndex.value - 1
}

function nextItem() {
  currentIndex.value = currentIndex.value === props.items.length - 1 ? 0 : currentIndex.value + 1
}

function handleImageError() {
  nextItem()
}

watch(currentItem, () => (imageLoading.value = true))
</script>

<template>
  <div class="carousel">
    <span class="icon-container">
      <i v-if="!fetching" @click="prevItem" class="fa-solid fa-caret-left"></i>
    </span>
    <div v-if="fetching" style="height: 500px">
      <Spinner class="loader" />
    </div>

    <div v-else class="carousel-item">
      <div class="image-container">
        <Transition name="fade" mode="out-in">
          <img
            :key="currentItem"
            @load="imageLoading = false"
            @error="handleImageError"
            :src="currentItem.url"
            :alt="currentItem.title"
          />
        </Transition>
        <div class="cover" />
      </div>
      <Transition name="fade" mode="out-in">
        <Spinner v-if="imageLoading" :key="currentItem" style="text-align: center" class="loader" />
      </Transition>
    </div>
    <span class="icon-container">
      <i v-if="!fetching" @click="nextItem" class="fa-solid fa-caret-right"></i>
    </span>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.carousel .icon-container {
  font-size: 50px;
  cursor: pointer;
  color: var(--color-text);
}

.carousel .icon-container:first-child {
  transform: translate(50%);
}

.carousel .icon-container:last-child {
  transform: translate(-50%);
}

.carousel .loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.carousel-item {
  width: 800px;
  height: auto;
}

.carousel-item b {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.carousel-item .image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  border: 3px solid var(--color-border);
  border-radius: 2px;
}

.carousel-item .image-container img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-item .image-container .cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  opacity: 0.3;
  width: 100%;
  height: 100%;
}
</style>
