<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { getAuth, signOut } from '@firebase/auth'

defineProps({ currentUser: { type: Object, required: true } })

const authedMenuItems = computed(() => [
  { label: 'Recipes', link: '/recipes' },
  { label: 'My Cookbook', link: '/cookbook' },
  { label: 'About • Contact', link: '/about' },
  { label: 'Account', link: '/account' }
])

const unAuthedMenuItems = computed(() => [
  { label: 'Login', link: '/login' },
  { label: 'Create Account', link: '/create-account' },
  { label: 'About Us', link: '/about' },
  { label: 'Contact', link: '/contact' }
])

async function handleLogout() {
  await signOut(getAuth())
}
</script>

<template>
  <nav class="site-nav">
    <div class="logo">
      <RouterLink :to="!currentUser ? '/login' : '/'"> Logo Here </RouterLink>
    </div>
    <div class="main-nav">
      <RouterLink
        v-for="(item, index) in currentUser ? authedMenuItems : unAuthedMenuItems"
        class="menu-item"
        :to="item.link"
        :key="index"
      >
        {{ item.label }}
      </RouterLink>

      <a v-if="currentUser" class="menu-item" href="#" @click="handleLogout">Logout</a>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.site-nav {
  grid-area: main-nav;
  background-color: var(--color-nav-default);
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.logo {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background: rgb(25 31 44 / 60%);
  backdrop-filter: blur(8px);
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.main-nav {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  padding-top: 200px;
  padding-bottom: 200px;

  display: flex;

  flex-direction: column;
}

.menu-item {
  padding: var(--space-lg) var(--space-3xl);

  &:hover {
    background-color: #2d374e;
    cursor: pointer;
  }
}
</style>
