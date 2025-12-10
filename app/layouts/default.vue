<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="layout">
    <SiteHeader :key="route.path" />

    <main class="layout__content">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<style>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__content {
  flex: 1;
}
</style>
