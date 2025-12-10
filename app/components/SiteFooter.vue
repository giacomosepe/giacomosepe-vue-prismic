<script setup lang="ts">
const prismic = usePrismic()

// Fetch the home page to get the site title/name
const { data: page } = await useAsyncData('home', () =>
  prismic.client.getSingle('home')
)

const siteName = page.value?.data?.meta_title || 'Giacomo Sepe'
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__container">
      <p class="site-footer__name">{{ siteName }}</p>
    </div>
  </footer>
</template>

<style>
.site-footer {
  background-color: var(--color-background);
  margin-top: var(--spacing-2xl);
}

.site-footer__container {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);
  text-align: center;
}

.site-footer__name {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: var(--font-weight-medium);
}
</style>
