<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from '@firebase/auth'
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'
import UnauthenticatedWrapper from '../components/UnauthenticatedWrapper.vue'

const email = ref('donrayxwilliams@gmail.com')
const password = ref('randompassword')
const confirmPassword = ref('randompassword')
const showPassword = ref(false)
const router = useRouter()
const fetching = ref(false)

async function submit() {
  try {
    fetching.value = true

    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
    }

    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email.value,
      password.value
    )

    await sendEmailVerification(userCredential.user)

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
      <div class="form-group">
        <input
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          id="confirm-password"
          placeholder="Confirm password"
          :disabled="fetching"
          required
        />
      </div>
      <Button type="submit" :loading="fetching" class="btn btn-primary">Sign up</Button>
      <span class="footer-text">
        Already have an account? <RouterLink to="/login">Log in</RouterLink>
      </span>
    </form>
  </UnauthenticatedWrapper>
</template>
