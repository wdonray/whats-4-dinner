<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { getAuth, signOut } from '@firebase/auth'

defineProps({ currentUser: { type: Object, required: true } })

const authedMenuItems = computed(() => [
  { label: 'Create recipe', link: '/create-recipe', icon: 'fa-solid fa-square-plus' },
  { label: 'My cookbook', link: '/cookbook', icon: 'fa-solid fa-book-bookmark' },
  { label: 'About', link: '/about', icon: 'fa-solid fa-circle-info' },
  { label: 'Profile', link: '/account', icon: 'fa-solid fa-user' }
])

const unAuthedMenuItems = computed(() => [
  { label: 'Login', link: '/login', icon: 'fa-solid fa-right-to-bracket' },
  { label: 'Create account', link: '/create-account', icon: 'fa-solid fa-user-plus' },
  { label: 'About', link: '/about', icon: 'fa-solid fa-circle-info' }
])

async function handleLogout() {
  await signOut(getAuth())
}
</script>

<template>
  <nav class="site-nav">
    <div class="logo">
      <RouterLink :to="!currentUser ? '/login' : '/'"> what's 4 dinner</RouterLink>
    </div>
    <div class="main-nav">
      <RouterLink
        v-for="(item, index) in currentUser ? authedMenuItems : unAuthedMenuItems"
        class="menu-item"
        :class="{ active: $route.path === item.link }"
        :to="item.link"
        :key="index"
      >
        <i
          v-if="item.icon"
          :class="item.icon"
          style="margin-right: var(--space-md); font-size: 1rem"
        ></i
        >{{ item.label }}
      </RouterLink>
      <a v-if="currentUser" class="menu-item" href="#" @click="handleLogout">Logout</a>
    </div>
  </nav>
</template>

<style scoped>
.site-nav {
  grid-area: main-nav;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.logo {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  backdrop-filter: blur(8px);
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.logo a {
  font-style: italic;
  font-size: 1.5rem;
  font-weight: bold;
}

.main-nav {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  padding-top: 150px;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  font-weight: 700;
  padding: var(--space-lg) var(--space-3xl);
  color: var(--color-primary);
  font-size: 16px;
}

.menu-item:hover {
  cursor: pointer;
}

.active {
  background-color: var(--color-secondary);
  border-radius: 0.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
