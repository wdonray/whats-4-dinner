<script setup>
import Button from '../components/Button.vue'
</script>

<template>
  <div class="home">
    <section class="hero">
      <div>
        <span class="header">
          <h1>Welcome to</h1>
          <h1 class="underblock">What's 4 Dinner!</h1>
        </span>
        <hr />
        <h3>Discover delicious recipes for every occasion</h3>
        <Button to="/recipes"> Get cooking</Button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

h1 {
  margin-bottom: var(--space-lg);
  font-size: 33px;
  font-weight: 900;
}

.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}
</style>
