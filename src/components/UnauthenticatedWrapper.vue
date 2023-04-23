<template>
  <div class="wrapper">
    <div class="logo">
      <h1>what's 4 dinner</h1>
    </div>
    <div class="inner-container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.inner-container :deep(form) {
  position: relative;
}

.inner-container :deep(form) {
  color: white;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

.inner-container :deep(form) .form-group.password {
  position: relative;
  margin-bottom: 0;
}

.inner-container :deep(form) .form-group {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.inner-container :deep(form) .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.inner-container :deep(form) .footer-text {
  text-align: center;
  font-size: 14px;
}

.inner-container :deep(form) .footer-text a {
  color: var(--color-primary);
  font-weight: bold;
}

:deep(.btn span) {
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
}

.inner-container :deep(form) .form-group.password a {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  color: var(--color-primary);
}

.logo {
  text-align: center;
  z-index: 4;
}

.logo h1 {
  font-style: italic;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

@media (min-width: 768px) {
  .wrapper {
    justify-content: start;
    gap: var(--space-2xl);
  }

  .logo h1 {
    font-size: 4rem;
  }

  .inner-container :deep(form .form-group) {
    width: 450px;
    margin: auto;
  }

  .inner-container :deep(form .form-group input) {
    font-size: 1.5rem;
  }

  .inner-container :deep(form .form-group.password a) {
    font-size: 1rem;
  }

  .inner-container :deep(form) .footer-text {
    font-size: 1.2rem;
  }

  :deep(.btn) {
    width: 450px;
    margin: auto;
  }
}
</style>
