<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router'
import Footer from './components/Footer.vue'
import SideBar from './components/SideBar.vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import Notification from './components/Notification.vue'
import useGlobalError from '@/use/useGlobalError.js'
import { ref } from 'vue'
import Spinner from './components/Spinner.vue'

const { errorMessage } = useGlobalError()
const { path } = useRoute()
const router = useRouter()
const currentUser = ref(null)
const loading = ref(true)

onAuthStateChanged(getAuth(), (user) => {
  currentUser.value = user
  if (!user && path !== '/login') {
    router.push('/login')
  } else {
    router.push('/')
  }
  loading.value = false
})
</script>

<template>
  <Transition name="fade" mode="in-out">
    <div v-if="loading" class="loading">
      <Spinner />
    </div>
  </Transition>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="in-out">
      <div v-if="!loading" class="grid-container">
        <SideBar :current-user="currentUser" />
        <main class="main">
          <component :is="Component" />
        </main>
        <Footer />
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

.main {
  background-color: var(--background-color);
  grid-area: main;
  min-height: 100vh;
  max-width: 100vw;
  padding: 3rem;
}
</style>
