import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from '@firebase/auth'

const routeAuthMap = {
  home: true,
  about: false,
  'create-recipe': true,
  login: false,
  'create-account': false,
  contact: false,
  cookbook: true,
  account: true,
  'forgot-password': false
}

function createRoute(route) {
  const page = route
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
    .replace(/^[a-z]/, (match) => match.toUpperCase())

  return {
    path: route == 'home' ? '/' : `/${route}`,
    name: route,
    component: () => import(`../pages/${page}.vue`)
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: Object.keys(routeAuthMap).map(createRoute)
})

router.beforeEach((to, from, next) => {
  const requiresAuth = routeAuthMap[to.name]

  if (!requiresAuth || !from.name) {
    next()
    return
  }

  const { currentUser } = getAuth()

  if (currentUser) {
    next()
  } else {
    next({ path: '/login', query: { redirect: to.fullPath } })
  }
})

export default router
