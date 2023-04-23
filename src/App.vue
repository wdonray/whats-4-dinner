<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router'
import Footer from './components/Footer.vue'
import SideBar from './components/SideBar.vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import Notification from './components/Notification.vue'
import useGlobalError from '@/use/useGlobalError.js'
import { ref, watch } from 'vue'
import Spinner from './components/Spinner.vue'

const { errorMessage } = useGlobalError()
const { path } = useRoute()
const { push, currentRoute } = useRouter()
const currentUser = ref(null)
const loading = ref(true)
const isUnathenticatedRoute = ref(false)

onAuthStateChanged(getAuth(), (user) => {
  loading.value = true
  currentUser.value = user
  if (!user && path !== '/login') {
    push('/login')
  } else {
    push('/')
  }
  loading.value = false
})

watch(
  currentRoute,
  () => {
    const unauthenticatedRoutes = ['/login', '/create-account', '/forgot-password']
    isUnathenticatedRoute.value = unauthenticatedRoutes.some(
      (route) => route == currentRoute.value.path
    )
  },
  { immediate: true }
)
</script>

<template>
  <Transition name="fade" mode="in-out">
    <div v-if="loading" class="loading">
      <Spinner />
    </div>
  </Transition>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="in-out">
      <div
        v-if="!loading"
        :class="{
          'grid-container': !isUnathenticatedRoute,
          'unauthenticated-container': isUnathenticatedRoute,
          'background-image': isUnathenticatedRoute
        }"
      >
        <SideBar :current-user="currentUser" v-if="currentUser" />
        <main
          :class="{ 'unathenticatad-main': isUnathenticatedRoute, main: !isUnathenticatedRoute }"
        >
          <component :is="Component" />
        </main>
        <Footer :current-user="currentUser" />
      </div>
    </Transition>
  </RouterView>
  <Notification :message="errorMessage" type="error" />
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.background-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(33, 33, 33, 0) 7%, rgba(33, 33, 33, 0.22) 40%);
  height: 20%;
  pointer-events: none;
}

.background-image {
  position: relative;
  background-image: url('/login-food.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.background-image::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(33, 33, 33, 0) 7%, #212121 46.47%);
  height: 50%;
}

.unauthenticated-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'main'
    'footer';
  min-height: 100vh;
}

.grid-container {
  display: grid;
  background-color: var(--background-color);
  height: 100%;
  grid-template-rows: 1fr 4.5rem;
  grid-template-columns: 256px minmax(512px, 1024px);
  grid-template-areas:
    'main-nav main .'
    'main-nav footer .';
}

.main,
.unathenticatad-main {
  grid-area: main;
  min-height: 100vh;
  max-width: 100vw;
  padding: var(--space-3xl);
}

@media (max-width: 768px) {
  .grid-container,
  .unauthenticated-container {
    display: grid;
    grid-template-areas:
      'main'
      'footer'
      'main-nav';
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    min-height: 100vh;
  }

  .main {
    padding: var(--space-md);
    padding-bottom: calc(var(--main-nav-height) + env(safe-area-inset-bottom));
  }

  .unathenticatad-main {
    padding: var(--space-md);
    padding-bottom: 0;
    min-height: 300px;
  }
}
</style>
