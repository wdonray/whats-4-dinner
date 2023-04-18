<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <div class="legal">
      <p>&copy; {{ currentYear }} What's 4 Dinner?</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  grid-area: footer;
  padding: var(--space-md) var(--space-3xl);
}

.legal {
  font-size: small;
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: flex-start;
  gap: 2rem;
  color: #fff;
}
</style>
