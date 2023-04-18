<template>
  <form @submit.prevent="submit">
    <div class="inner-container">
      <h1>Create Account</h1>
      <hr />
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <div class="row">
          <label for="password">Password</label>
          <a href="#" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</a>
        </div>

        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          id="password"
          placeholder="Enter Password"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          id="confirm-password"
          placeholder="Confirm Password"
          required
        />
      </div>
      <Button type="submit" :loading="fetching" class="btn btn-primary">Submit</Button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'

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

    if (userCredential) router.push('/')
  } finally {
    fetching.value = false
  }
}
</script>

<style lang="scss" scoped>
form {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--space-md);

  .inner-container {
    padding: var(--space-md) var(--space-3xl);
  }

  .form-group {
    max-width: 400px;
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
