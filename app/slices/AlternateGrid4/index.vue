<script setup lang="ts">
import { type Content, isFilled } from "@prismicio/client";

defineProps(
	getSliceComponentProps<Content.AlternateGrid4Slice>([
		"slice",
		"index",
		"slices",
		"context",
	])
);
</script>

<template>
	<section
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation"
		class="es-bounded es-alternate-grid"
	>
		<div
			:class="[
				'es-alternate-grid__content',
				isFilled.image(slice.primary.image)
					? 'es-alternate-grid__content--with-image'
					: '',
			]"
		>
			<PrismicImage
				v-if="isFilled.image(slice.primary.image)"
				:field="slice.primary.image"
				class="es-alternate-grid__image"
				:class="
					slice.variation === 'imageRight'
						? 'es-alternate-grid__image--right'
						: 'es-alternate-grid__image--left'
				"
			/>
			<div class="es-alternate-grid__primary-content">
				<div className="es-alternate-grid__primary-content__intro">
					<div
						v-if="isFilled.keyText(slice.primary.eyebrowHeadline)"
						class="es-alternate-grid__primary-content__intro__eyebrow"
					>
						{{ slice.primary.eyebrowHeadline }}
					</div>
					<PrismicRichText
						v-if="isFilled.richText(slice.primary.title)"
						:field="slice.primary.title"
						class="es-alternate-grid__primary-content__intro__headline"
						wrapper="div"
					/>
					<PrismicRichText
						v-if="isFilled.richText(slice.primary.description)"
						:field="slice.primary.description"
						class="es-alternate-grid__primary-content__intro__description"
						wrapper="div"
					/>
					<PrismicLink
						v-if="isFilled.link(slice.primary.buttonLink)"
						:field="slice.primary.buttonLink"
						class="es-alternate-grid__button"
					/>
				</div>
				<div
					v-if="slice.primary.items && slice.primary.items.length"
					class="es-alternate-grid__primary-content__items"
				>
					<div
						v-for="(item, i) in slice.primary.items"
						:key="i"
						class="es-alternate-grid__item"
					>
						<PrismicRichText
							v-if="isFilled.richText(item.title)"
							:field="item.title"
							class="es-alternate-grid__item__heading"
							wrapper="div"
						/>
						<PrismicRichText
							v-if="isFilled.richText(item.description)"
							:field="item.description"
							class="es-alternate-grid__item__description"
							wrapper="div"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style>
.es-bounded {
	margin: 0px;
	min-width: 0px;
	position: relative;
	padding: var(--spacing-2xl) 0;
	border-bottom: 1px solid var(--color-border);
}

.es-bounded:first-child {
	padding-top: 0;
}

.es-bounded:last-child {
	border-bottom: none;
}

.es-alternate-grid {
	font-family: var(--font-sans);
	background-color: var(--color-background);
	color: var(--color-text-primary);
}

.es-alternate-grid__content {
	display: grid;
	gap: 1.5rem;
	grid-auto-flow: dense;
	align-items: start;
	align-content: start;
}

@media (min-width: 640px) {
	.es-alternate-grid__content--with-image {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 1200px) {
	.es-alternate-grid__content--with-image {
		grid-template-columns: repeat(2, 1fr);
	}
}

.es-alternate-grid__image {
	width: auto;
	height: auto;
	max-width: 100%;
	align-self: start;
}

.es-alternate-grid__image--left {
	order: 1;
}

.es-alternate-grid__image--left + div {
	order: 2;
}

.es-alternate-grid__image--right {
	order: 2;
}

.es-alternate-grid__image--right + div {
	order: 1;
}

.es-alternate-grid__primary-content {
	display: grid;
	gap: 2rem;
	align-self: start;
}

.es-alternate-grid__primary-content__intro {
	display: grid;
	gap: 0.5rem;
}

.es-alternate-grid__primary-content__intro__eyebrow {
	color: var(--color-accent);
	font-size: 1.15rem;
	font-weight: 500;
	margin: 0;
	padding: 0;
}

.es-alternate-grid__primary-content__intro__headline {
	font-size: 1.25rem;
	font-weight: 700;
	margin-bottom: 1rem;
}

.es-alternate-grid__primary-content__intro__headline * {
	margin: 0;
}

.es-alternate-grid__primary-content__intro__description {
	font-size: 1rem;
	text-align: justify;
	line-height: 1.5;
}

.es-alternate-grid__primary-content__intro__description > p {
	margin: 0 0 1rem 0;
	text-align: justify;
}

.es-alternate-grid__primary-content__intro__description > p:last-child {
	margin-bottom: 0;
}

.es-alternate-grid__primary-content__items {
	display: grid;
	gap: 2rem;
}

@media (min-width: 640px) {
	.es-alternate-grid__primary-content__items {
		grid-template-columns: repeat(2, 1fr);
	}
}

.es-alternate-grid__item {
	display: grid;
	align-content: start;
}

.es-alternate-grid__item__heading {
	font-weight: 700;
	font-size: 1.17rem;
	margin-top: 0;
	margin-bottom: 0.5rem;
}

.es-alternate-grid__item__heading * {
	margin: 0;
}

.es-alternate-grid__item__description {
	font-size: 1rem;
}

.es-alternate-grid__item__description * {
	margin: 0;
}

.es-alternate-grid__button {
	display: inline-block;
	align-self: flex-start;
	margin-top: var(--spacing-md);
	margin-bottom: var(--spacing-lg);
	padding: 0.4rem 1.15rem;
	background-color: transparent;
	color: var(--color-text-primary);
	text-decoration: none;
	border-radius: var(--radius-lg);
	font-size: 1rem;
	transition: all var(--transition-base);
	font-family: var(--font-sans);
	border: 2px solid var(--color-border);
	width: fit-content;
}

.es-alternate-grid__button:hover {
	background-color: var(--color-accent);
	color: var(--color-white);
	border-color: var(--color-accent);
}
</style>
