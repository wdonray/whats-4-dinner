<template>
  <Transition name="slide-down">
    <div v-if="props.message" class="notification" :class="type">
      <div class="message">{{ props.message }}</div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'notice' },
  message: { type: String, required: true }
})
</script>

<style scoped>
.message {
  font-weight: 600;
}

.notification {
  width: 300px;
  padding: var(--space-md);
  position: fixed;
  display: flex;
  gap: var(--space-lg);
  justify-content: space-between;
  align-items: flex-start;
  z-index: 10;
  right: var(--space-md);
  top: var(--space-md);
  border-radius: var(--border-radius);
  color: white;
}

.close {
  cursor: pointer;
}

.notice {
  background-color: var(--color-primary);
}

.success {
  background-color: green;
}

.warning {
  background-color: yellow;
}

.error {
  background-color: #df5a31;
}
</style>
