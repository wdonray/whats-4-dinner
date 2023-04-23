<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'
import UnauthenticatedWrapper from '../components/UnauthenticatedWrapper.vue'

const email = ref('donrayxwilliams@gmail.com')
const password = ref('randompassword')
const showPassword = ref(false)
const router = useRouter()
const fetching = ref(false)

async function submit() {
  try {
    fetching.value = true
    const userCredential = await signInWithEmailAndPassword(getAuth(), email.value, password.value)

    if (userCredential) router.push('/')
  } finally {
    fetching.value = false
  }
}
</script>

<template>
  <UnauthenticatedWrapper>
    <form @submit.prevent="submit">
      <div class="form-group">
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Email address"
          :disabled="fetching"
          required
        />
      </div>
      <div class="form-group password">
        <a href="#" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</a>
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          id="password"
          placeholder="Password"
          :disabled="fetching"
          required
        />
      </div>
      <RouterLink class="forgot-password" to="/forgot-password">Forgot your password?</RouterLink>
      <Button type="submit" :loading="fetching" class="btn btn-primary">Log in</Button>
      <span class="footer-text">
        Don't have an account? <RouterLink to="/create-account">Sign up</RouterLink>
      </span>
    </form>
  </UnauthenticatedWrapper>
</template>

<style scoped>
.forgot-password {
  color: white;
  text-align: end;
  font-size: 13px;
}

@media (min-width: 768px) {
  .forgot-password {
    width: 450px;
    font-size: 20px;
    margin: auto;
    font-size: 1rem;
  }
}
</style>
