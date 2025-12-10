<script setup lang="ts">
import { type Content, isFilled } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.SectionSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="section"
  >
    <h2 v-if="isFilled.keyText(slice.primary.title)" class="section__title">
      {{ slice.primary.title }}
    </h2>

    <PrismicRichText
      v-if="isFilled.richText(slice.primary.copy)"
      :field="slice.primary.copy"
      class="section__copy"
    />

    <template v-if="slice.primary.link && slice.primary.link.length">
      <PrismicLink
        v-for="(linkItem, index) in slice.primary.link"
        :key="index"
        :field="linkItem"
        class="section__link"
      >
        {{ linkItem.text || 'Learn More' }}
      </PrismicLink>
    </template>
  </section>
</template>

<style>
.section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-2xl) 0;
  border-bottom: 1px solid var(--color-border);
}

.section:first-of-type {
  padding-top: 0;
}

.section:last-of-type {
  border-bottom: none;
}

.section__title {
  font-size: 2rem;
  font-weight: var(--font-weight-semibold);
  margin: 0;
  padding: 0;
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

@media (min-width: 1024px) {
  .section__title {
    font-size: 2.5rem;
  }
}

.section__copy {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  font-family: var(--font-sans);
}

.section__copy > * {
  margin: 0 0 var(--spacing-sm) 0;
}

.section__copy > *:last-child {
  margin-bottom: 0;
}

.section__copy strong {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.section__copy a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: opacity var(--transition-base);
}

.section__copy a:hover {
  opacity: 0.7;
}

.section__link {
  display: inline-block;
  padding: 0.625rem 1.25rem;
  background-color: var(--color-accent);
  color: var(--color-white);
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
  font-size: 0.9375rem;
  transition: opacity var(--transition-base);
  align-self: flex-start;
  font-family: var(--font-sans);
  border: 1px solid var(--color-accent);
}

.section__link:hover {
  opacity: 0.85;
}
</style>
