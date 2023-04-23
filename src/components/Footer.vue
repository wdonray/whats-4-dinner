<script setup>
import { computed } from 'vue'
import useBreakpoint from '../use/useBreakpoint'

const props = defineProps({ currentUser: { type: [Object, null], required: true } })

const { tablet } = useBreakpoint()

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    class="footer"
    :style="{ 'z-index': props.currentUser ? '0' : '5', 'padding-bottom': !props.currentUser && 0 }"
  >
    <div class="legal" :style="{ color: props.currentUser ? 'black' : 'white' }">
      <p>&copy; {{ currentYear }} What's 4 Dinner?</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  grid-area: footer;
  padding: var(--space-md) var(--space-3xl);
}

@media (max-width: 768px) {
  .footer {
    padding: var(--space-sm) var(--space-md);
    padding-bottom: calc(var(--main-nav-height) + env(safe-area-inset-bottom) + var(--space-md));
  }
}

.legal {
  font-size: 12px;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .legal {
    text-align: center;
  }
}
</style>
