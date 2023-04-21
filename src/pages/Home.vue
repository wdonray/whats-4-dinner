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
        <div class="btn-actions">
          <Button class="btn-primary" to="/create-recipe"> Get cooking</Button>
          <Button class="btn-secondary" to="/cookbook"> Cookbook</Button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.btn-actions {
  display: flex;
  gap: var(--space-md);
}
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

@media (max-width: 768px) {
  .header {
    align-items: start;
    flex-direction: column;
    gap: 0;
  }

  h1 {
    margin: 0;
  }
}

.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}
</style>
