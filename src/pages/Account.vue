<template>
  <Notification :message="notification" />
  <PageHeader title="Account" />
  <Transition name="slide-in-right" mode="out-in">
    <form @submit.prevent="submit" class="account" v-if="currentUser">
      <div class="grid-stack">
        <div class="grid-row">
          <h4>Display name</h4>
          <input v-model="displayName" />
        </div>
      </div>
      <div class="grid-stack">
        <div class="grid-row">
          <h4 v-if="emailVerified || sentVerificationEmail">{{ verificationEmailText }}</h4>
          <a v-else href="#" @click="sendVerificationEmail">
            <h4>{{ verificationEmailText }}</h4>
          </a>
          <div class="row">
            <i v-if="emailVerified" style="color: green" class="fa-solid fa-circle-check"></i>
            <i v-else style="color: red" class="fa-solid fa-circle-xmark"></i>
            <span style="font-size: small">Verification Status</span>
          </div>
        </div>
        <div class="grid-row">
          <h4>Email</h4>
          <input v-model="email" />
        </div>
      </div>
      <div class="grid-stack">
        <div class="grid-row">
          <h4>Password</h4>
          <div class="stack">
            <a href="#" @click="showPassword = !showPassword">{{
              showPassword ? 'Hide' : 'Show'
            }}</a>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter Password"
            />
          </div>
        </div>
        <div class="grid-row">
          <h4>Confirm password</h4>
          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            id="confirm-password"
            placeholder="Confirm password"
          />
        </div>
      </div>
      <div class="row footer" style="justify-content: end">
        <Button link type="button" @click="reset" :loading="fetching">Reset</Button>
        <Button type="submit" :loading="fetching">Save</Button>
      </div>
    </form>

    <EmptyContent v-else-if="!currentUser" :fetching="!currentUser">
      <h1 class="underblock">Discover a New Recipe</h1>
    </EmptyContent>
  </Transition>
</template>

<script setup>
import {
  getAuth,
  updatePassword,
  sendEmailVerification,
  updateEmail,
  updateProfile
} from '@firebase/auth'
import { computed, ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import Button from '../components/Button.vue'
import EmptyContent from '../components/EmptyContent.vue'
import Notification from '../components/Notification.vue'

const { currentUser } = getAuth()
const email = ref(currentUser?.email)
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const sentVerificationEmail = ref(false)
const fetching = ref(false)
const notification = ref('')
const displayName = ref(currentUser?.displayName)

const emailVerified = computed(() => currentUser?.emailVerified)
const verificationEmailText = computed(() => {
  if (sentVerificationEmail.value) return 'Verification email sent'
  if (emailVerified.value) return 'Email verified'
  return 'Send verification email'
})

async function sendVerificationEmail() {
  fetching.value = true
  sentVerificationEmail.value = true
  await sendEmailVerification(currentUser)
  notification.value = 'Email sent!'

  setTimeout(() => {
    notification.value = ''
  }, 3000)

  fetching.value = false
}

async function submit() {
  if (password.value !== confirmPassword.value) {
    throw new Error('Passwords do not match')
  }

  fetching.value = true

  if (password.value && confirmPassword.value) await updatePassword(currentUser, password.value)
  if (email.value !== currentUser?.email) await updateEmail(currentUser, email.value)
  if (displayName.value !== currentUser?.displayName)
    await updateProfile(currentUser, { displayName: displayName.value })

  notification.value = 'Account updated!'

  setTimeout(() => {
    notification.value = ''
  }, 3000)

  fetching.value = false
}

function reset() {
  password.value = ''
  confirmPassword.value = ''
  email.value = currentUser?.email
}
</script>

<style lang="scss" scoped>
.account {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3xl);

  .grid-stack {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-xl);

    &:not(:last-child) {
      margin-bottom: var(--space-xl);
    }
  }

  .grid-row {
    display: grid;
    grid-template-columns: 0.5fr 1fr auto;
    align-items: center;

    h4 {
      margin: 0;
    }
  }

  .footer {
    background-color: var(--color-nav-default);
    padding: 1rem 2rem;
    button {
      padding: 0.5rem 2rem;
    }
  }
}
</style>
