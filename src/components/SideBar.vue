<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { getAuth, signOut } from '@firebase/auth'
import useBreakpoint from '../use/useBreakpoint'

const { mobile, tablet } = useBreakpoint()

defineProps({ currentUser: { type: Object, required: true } })

const authedMenuItems = computed(() => [
  {
    label: 'Home',
    link: '/',
    icon: 'fa-solid fa-home'
  },
  {
    label: mobile ? 'Create' : 'Create recipe',
    link: '/create-recipe',
    icon: 'fa-solid fa-square-plus'
  },
  {
    label: mobile ? 'Cookbook' : 'My cookbook',
    link: '/cookbook',
    icon: 'fa-solid fa-book-bookmark'
  },
  { label: 'Profile', link: '/account', icon: 'fa-solid fa-user' }
])

const unAuthedMenuItems = computed(() => [
  { label: 'Login', link: '/login', icon: 'fa-solid fa-right-to-bracket' },
  { label: 'Create account', link: '/create-account', icon: 'fa-solid fa-user-plus' },
  { label: 'About', link: '/about', icon: 'fa-solid fa-circle-info' }
])

const navClass = computed(() => {
  return tablet.value ? 'site-nav' : 'mobile-site-nav'
})

const mainNavClass = computed(() => {
  return tablet.value ? 'main-nav' : 'mobile-main-nav'
})

const menuItemClass = computed(() => {
  return tablet.value ? 'menu-item' : 'mobile-menu-item'
})

const iconStyle = computed(() => {
  return mobile.value
    ? 'margin-right: var(--space-xs); font-size: 1rem'
    : 'margin-right: var(--space-md); font-size: 1rem'
})

async function handleLogout() {
  await signOut(getAuth())
}
</script>

<template>
  <nav :class="navClass">
    <div class="logo" v-if="tablet">
      <RouterLink :to="!currentUser ? '/login' : '/'"> what's 4 dinner</RouterLink>
    </div>
    <div :class="mainNavClass">
      <RouterLink
        v-for="(item, index) in currentUser ? authedMenuItems : unAuthedMenuItems"
        :class="{
          active: $route.path === item.link && tablet,
          'mobile-active': $route.path === item.link && !tablet,
          'menu-item': tablet,
          'mobile-menu-item': !tablet
        }"
        :to="item.link"
        :key="index"
      >
        <i v-if="item.icon" :class="item.icon" :style="iconStyle"></i>
        <span v-if="$route.path === item.link || !mobile">{{ item.label }}</span>
      </RouterLink>
      <a v-if="currentUser" :class="menuItemClass" href="#" @click="handleLogout">
        <i class="fa-solid fa-right-from-bracket" :style="iconStyle"></i>
        <span v-if="!mobile">Logout</span>
      </a>
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

.mobile-site-nav {
  background-color: white;
  width: 100%;
  grid-area: main-nav;
  position: fixed;
  z-index: 2;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 0.75rem;
  padding-inline: 0;
  padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom));
  transform: translateY(0);
  transition-property: background-color, transform;
  border-top: 1px solid var(--color-line);
  box-shadow: 0 -1px 8px rgb(0 0 0 / 8%);
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

.mobile-main-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.menu-item {
  display: flex;
  align-items: center;
  font-weight: 700;
  padding: var(--space-lg) var(--space-3xl);
  color: var(--color-primary);
  font-size: 16px;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  font-weight: 700;
  padding: var(--space-md);
  color: var(--color-primary);
  font-size: 16px;
  user-select: none;
}

.mobile-menu-item:focus {
  outline: none;
}

.menu-item:hover {
  cursor: pointer;
  background-color: var(--color-secondary);
  opacity: 0.4;
  filter: brightness(95%);
  border-radius: 0.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.active {
  background-color: var(--color-secondary);
  border-radius: 0.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.mobile-active {
  background-color: var(--color-secondary);
  border-radius: 23px;
}
</style>
