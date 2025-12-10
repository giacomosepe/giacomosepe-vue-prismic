<script setup lang="ts">
const prismic = usePrismic()
const { locale, locales } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// Map i18n locale codes to Prismic locale codes
const prismicLocale = computed(() => {
  const localeMap: Record<string, string> = {
    'en': 'en-us',
    'it': 'it-it'
  }
  return localeMap[locale.value] || 'en-us'
})

// Fetch the home page to get the site title
const { data: page } = await useAsyncData(`home-header-${locale.value}`, () =>
  prismic.client.getSingle('home', { lang: prismicLocale.value })
)

const siteTitle = page.value?.data?.meta_title || 'Giacomo Sepe'

// Use refs for reactive state
const currentPath = ref(route.path)
const isItalian = ref(route.path.startsWith('/it'))
const switchLocaleLink = ref('')

// Function to update switch locale link
const updateSwitchLink = () => {
  currentPath.value = route.path
  isItalian.value = route.path.startsWith('/it')

  if (isItalian.value) {
    // Switch to English: remove /it prefix
    const pathWithoutIt = route.path.replace(/^\/it/, '')
    switchLocaleLink.value = pathWithoutIt || '/'
  } else {
    // Switch to Italian: add /it prefix
    switchLocaleLink.value = route.path === '/' ? '/it' : `/it${route.path}`
  }
}

// Initialize on mount
onMounted(() => {
  updateSwitchLink()
})

// Watch for route changes
watch(() => route.path, () => {
  updateSwitchLink()
}, { immediate: true })
</script>

<template>
  <header class="site-header">
    <div class="site-header__container">
      <div class="site-header__left">
        <NuxtLink :to="isItalian ? '/it' : '/'" class="site-header__title">
          {{ siteTitle }}
        </NuxtLink>
      </div>

      <nav class="site-header__right">
        <NuxtLink
          :to="isItalian ? '/it/present-your-company' : '/present-your-company'"
          class="site-header__nav-link"
        >
          {{ isItalian ? 'Presenta la tua azienda' : 'Present your company' }}
        </NuxtLink>

        <!-- Language Switcher -->
        <NuxtLink
          :key="route.path"
          :to="switchLocaleLink"
          class="language-switcher__link"
        >
          {{ isItalian ? 'EN' : 'IT' }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style>
.site-header {
  background-color: var(--color-background);
  position: sticky;
  top: 0;
  z-index: 100;
}

.site-header__container {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-header__left {
  flex: 1;
}

.site-header__title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color var(--transition-base);
}

.site-header__title:hover {
  color: var(--color-accent);
}

.site-header__right {
  display: flex;
  gap: var(--spacing-md);
}

.site-header__nav-link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-base);
  font-size: 0.9375rem;
}

.site-header__nav-link:hover {
  color: var(--color-accent);
}

.language-switcher__link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  font-size: 0.9375rem;
  transition: color var(--transition-base);
}

.language-switcher__link:hover {
  color: var(--color-accent);
}
</style>
