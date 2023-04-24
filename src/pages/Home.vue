<script setup>
import Button from '../components/Button.vue'
import QuickSearchSection from '../components/QuickSearchSection.vue'

const quickSearchSections = ['Popular ingredients', 'Top meals', 'Cuisine']
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
        <div class="btn-actions">
          <Button class="btn-primary" to="/create-recipe">Generate recipes</Button>
          <Button class="btn-secondary" to="/cookbook">My cookbook</Button>
          <Button class="btn-secondary" to="/about">About us</Button>
        </div>
        <div class="quick-search">
          <QuickSearchSection
            v-for="header in quickSearchSections"
            :header="header"
            :key="header"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.btn-actions {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
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

.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
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
</style>
