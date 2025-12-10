<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const route = useRoute()
const { locale } = useI18n()

// Map i18n locale codes to Prismic locale codes
const prismicLocale = computed(() => {
  const localeMap: Record<string, string> = {
    'en': 'en-us',
    'it': 'it-it'
  }
  return localeMap[locale.value] || 'en-us'
})

const { data: page, error } = await useAsyncData(`${route.params.uid}-${locale.value}`, () =>
  prismic.client.getByUID('page', route.params.uid as string, { lang: prismicLocale.value })
)

// Log any errors for debugging
if (error.value) {
  console.error('Error fetching page:', error.value)
}

// Set page title
const pageTitle = page.value?.data?.title?.[0]?.text || 'Page'
useHead({ title: pageTitle })

// Form state
const formData = ref({
  name: '',
  email: '',
  story: ''
})

const formStatus = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const formMessage = ref('')

const handleSubmit = async () => {
  formStatus.value = 'submitting'

  try {
    const response = await fetch('https://formspree.io/f/mjkbbonz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })

    if (response.ok) {
      formStatus.value = 'success'
      formMessage.value = 'Thank you! Your message has been sent successfully.'
      // Reset form
      formData.value = { name: '', email: '', story: '' }
    } else {
      formStatus.value = 'error'
      formMessage.value = 'Something went wrong. Please try again.'
    }
  } catch (err) {
    formStatus.value = 'error'
    formMessage.value = 'Failed to send message. Please try again.'
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div v-if="error" class="error-message">
      <p>Error loading page: {{ error }}</p>
    </div>

    <div v-else-if="page" class="page-container">
      <div class="page-content">
        <!-- Page Title -->
        <PrismicRichText
          v-if="page.data.title"
          :field="page.data.title"
          class="page-title"
        />
         <!-- Rich Text Content from Slices -->
        <SliceZone
          :slices="page.data.slices ?? []"
          :components="components"
          class="page-slices"
        />
      

        <!-- Contact Form Section -->
        <section class="form-section">
          <h2 class="form-section__title">Get in Touch</h2>

          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="form-input"
                placeholder="your@email.com"
              />
            </div>

            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="form-input"
                placeholder="Your name"
              />
            </div>

            <div class="form-group">
              <label for="story" class="form-label">Your Story</label>
              <textarea
                id="story"
                v-model="formData.story"
                required
                rows="6"
                class="form-textarea"
                placeholder="Tell us about your company..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="formStatus === 'submitting'"
              class="form-submit"
            >
              {{ formStatus === 'submitting' ? 'Sending...' : 'Send Message' }}
            </button>

            <div v-if="formStatus === 'success'" class="form-message form-message--success">
              {{ formMessage }}
            </div>

            <div v-if="formStatus === 'error'" class="form-message form-message--error">
              {{ formMessage }}
            </div>
          </form>
        </section>
    </div>
</div>
    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<style>
.page-wrapper {
  min-height: 100vh;
}

.page-container {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: flex-start;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}

.page-title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.page-title h1 {
  margin: 0;
}

@media (min-width: 1024px) {
  .page-title {
    font-size: 3rem;
  }
}

.page-slices {
  display: flex;
  flex-direction: column;
  gap: 0;
  
}

/* Form Styles */
.form-section {
  padding: 0;
  margin-top: 0;
  width: 100%;
}

.form-section__title {
  font-size: 1.75rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 auto var(--spacing-xl) auto;
  line-height: 1.3;
  max-width: 640px;
  display: none;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-label {
  font-size: 0.9375rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: var(--font-sans);
  color: var(--color-accent);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-submit {
  align-self: flex-start;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  font-family: var(--font-sans);
  color: var(--color-white);
  background-color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.form-submit:hover:not(:disabled) {
  opacity: 0.85;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-message {
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  font-family: var(--font-sans);
}

.form-message--success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-message--error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.error-message {
  padding: var(--spacing-md);
  color: var(--color-accent);
}

.loading {
  padding: var(--spacing-md);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
