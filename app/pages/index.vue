<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { locale } = useI18n();

// Map i18n locale codes to Prismic locale codes
const prismicLocale = computed(() => {
	const localeMap: Record<string, string> = {
		en: "en-us",
		it: "it-it",
	};
	return localeMap[locale.value] || "en-us";
});

const { data: page, error } = await useAsyncData(
	`home-page-${locale.value}`,
	() => prismic.client.getSingle("home", { lang: prismicLocale.value })
);

// Log any errors for debugging
if (error.value) {
	console.error("Error fetching home page:", error.value);
}

// Set page title
const pageTitle = page.value?.data?.meta_title || "Giacomo Sepe";
useHead({
	title: pageTitle,
	meta: [
		{
			name: "description",
			content:
				page.value?.data?.meta_description ||
				"Operations and product innovation",
		},
		// Open Graph
		{
			property: "og:title",
			content: page.value?.data?.meta_title || "Giacomo Sepe",
		},
		{
			property: "og:description",
			content:
				page.value?.data?.meta_description ||
				"Operations and product innovation",
		},
		{
			property: "og:image",
			content: page.value?.data?.meta_image?.url || "",
		},
		{
			property: "og:url",
			content: "https://giacomosepe.com",
		},
		{
			property: "og:type",
			content: "website",
		},
		// Twitter
		{
			name: "twitter:card",
			content: "summary_large_image",
		},
		{
			name: "twitter:title",
			content: page.value?.data?.meta_title || "Giacomo Sepe",
		},
		{
			name: "twitter:description",
			content:
				page.value?.data?.meta_description ||
				"Operations and product innovation",
		},
		{
			name: "twitter:image",
			content: page.value?.data?.meta_image?.url || "",
		},
	],
	link: [
		{
			rel: "canonical",
			href:
				locale.value === "it"
					? "https://giacomosepe.com/it"
					: "https://giacomosepe.com",
		},
	],
});
usePersonSchema({
	name: "Giacomo Sepe",
	jobTitle:
		page.value?.data?.sidebar_title || "Operations and Product Innovation",
	url:
		locale.value === "it"
			? "https://giacomosepe.com/it"
			: "https://giacomosepe.com",
	description: page.value?.data?.meta_description,
	image: page.value?.data.sidebar_image?.url,
	sameAs: ["https://www.linkedin.com/in/giacomosepe/"],
});
</script>

<template>
	<div class="page-wrapper">
		<div v-if="error" class="error-message">
			<p>Error loading page: {{ error }}</p>
		</div>

		<div v-else-if="page" class="page-layout">
			<aside class="page-layout__left">
				<!-- Sidebar Image -->
				<PrismicImage
					v-if="page.data.sidebar_image?.url"
					:field="page.data.sidebar_image"
					class="left-image"
				/>

				<!-- Sidebar Title -->
				<h3 v-if="page.data.sidebar_title" class="sidebar-title">
					{{ page.data.sidebar_title }}
				</h3>

				<!-- Sidebar Content -->
				<PrismicRichText
					v-if="page.data.sidebar_content"
					:field="page.data.sidebar_content"
					class="sidebar-content"
				/>

				<!-- Section slice content in left column -->
				<template
					v-for="(slice, index) in page.data.slices"
					:key="slice.id || index"
				>
					<div
						v-if="slice.slice_type === 'section'"
						class="left-section-content"
					>
						<!-- Image -->
						<PrismicImage
							v-if="slice.primary.image?.url"
							:field="slice.primary.image"
							class="left-image"
						/>

						<!-- Title -->
						<h2 v-if="slice.primary.title" class="left-section-title">
							{{ slice.primary.title }}
						</h2>

						<!-- Copy -->
						<PrismicRichText
							v-if="slice.primary.copy"
							:field="slice.primary.copy"
							class="left-section-copy"
						/>

						<!-- Links -->
						<template v-if="slice.primary.link && slice.primary.link.length">
							<div class="left-section-links">
								<PrismicLink
									v-for="(linkItem, linkIndex) in slice.primary.link"
									:key="linkIndex"
									:field="linkItem"
									class="left-section-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									<!-- twitter Icon - Brand Blue #0A66C2 -->
									<svg
										v-if="linkItem.variant === 'twitter'"
										class="link-icon twitter-icon"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="#0A66C2"
									>
										<path
											d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
										/>
									</svg>

									<!-- Website Icon - Keep current color -->
									<svg
										v-else-if="linkItem.variant === 'Website'"
										class="link-icon website-icon"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<circle cx="12" cy="12" r="10" />
										<line x1="2" y1="12" x2="22" y2="12" />
										<path
											d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
										/>
									</svg>

									<!-- AngelList Icon - Brand Black #000000 -->
									<svg
										v-else-if="linkItem.variant === 'AngelList'"
										class="link-icon angellist-icon"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="#000000"
									>
										<path
											d="M16.465 9.954c.735-2.11 1.464-4.224 2.175-6.344.205-.621.378-1.25.511-1.89C19.316.99 18.69.053 18 0c-.703 0-1.313.928-1.48 1.716-.335 1.56-.71 3.113-1.096 4.665-.194.776-.386 1.553-.574 2.331-.09.382-.178.764-.27 1.146h-.002L11.75 0h-.5v10.83c0 2.5-.97 4.01-3.57 4.01-2.28 0-4.16-1.78-4.16-4.01V0h-.52v10.83c0 2.5-.97 4.01-3.57 4.01-.6 0-1.17-.12-1.67-.34C-.83 14.11-.26 15.48 0 16.5c1.31 5.01 5.91 7.5 10.5 7.5 4.6 0 9.19-2.49 10.5-7.5.26-1.02.83-2.39-.33-2.82-.5-.22-1.07-.34-1.67-.34-2.6 0-3.57-1.51-3.57-4.01V9.954h1.035z"
										/>
									</svg>

									<!-- Show text for Primary variant or if no icon variant -->
									<span v-else>{{ linkItem.text || "Learn More" }}</span>
								</PrismicLink>
							</div>
						</template>
					</div>
				</template>
			</aside>

			<main class="page-layout__right">
				<!-- Right column content (2fr) - Only non-section slices -->
				<SliceZone
					:slices="
						(page.data.slices ?? []).filter(
							(slice) => slice.slice_type !== 'section'
						)
					"
					:components="components"
				/>
			</main>
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

.page-layout {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: var(--spacing-2xl);
	max-width: var(--max-width-content);
	margin: 0 auto;
	padding: var(--spacing-2xl) var(--spacing-md);
	align-items: start;
}

/* Mobile: stack vertically */
@media (max-width: 768px) {
	.page-layout {
		grid-template-columns: 1fr;
		gap: var(--spacing-lg);
	}
}

.page-layout__left {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-2xl);
	align-self: start;
	position: sticky;
	top: var(--spacing-2xl);
}

.page-layout__right {
	display: flex;
	flex-direction: column;
	gap: 0;
	align-self: start;
}

.left-image-block {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
}

.left-image {
	width: 100%;
	max-width: 240px;
	height: auto;
	border-radius: 100%;
	object-fit: cover;
	border: 1px solid var(--color-border);
	aspect-ratio: 1 / 1;
}

.sidebar-title {
	font-size: 1.5rem;
	font-weight: var(--font-weight-semibold);
	color: var(--color-text-primary);
	margin: 0;
	line-height: 1.3;
}

.sidebar-content {
	font-size: 0.9375rem;
	line-height: 1.6;
	color: var(--color-text-secondary);
}

.sidebar-content > * {
	margin: 0 0 var(--spacing-sm) 0;
}

.sidebar-content > *:last-child {
	margin-bottom: 0;
}

.sidebar-content a {
	color: var(--color-accent);
	text-decoration: underline;
	text-underline-offset: 2px;
	transition: opacity var(--transition-base);
}

.sidebar-content a:hover {
	opacity: 0.7;
}

.left-image-caption {
	font-size: 0.875rem;
	color: var(--color-text-muted);
	margin: 0;
	line-height: 1.5;
	font-family: var(--font-sans);
}

.left-section-content {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
}

.left-section-title {
	font-size: 1.5rem;
	font-weight: var(--font-weight-semibold);
	color: var(--color-text-primary);
	margin: 0;
	line-height: 1.3;
}

.left-section-copy {
	font-size: 0.9375rem;
	line-height: 1.6;
	color: var(--color-text-secondary);
}

.left-section-copy > * {
	margin: 0 0 var(--spacing-sm) 0;
}

.left-section-copy > *:last-child {
	margin-bottom: 0;
}

.left-section-copy a {
	color: var(--color-accent);
	text-decoration: underline;
	text-underline-offset: 2px;
	transition: opacity var(--transition-base);
}

.left-section-copy a:hover {
	opacity: 0.7;
}

.left-section-links {
	display: flex;
	flex-direction: row;
	gap: var(--spacing-sm);
	align-items: center;
}

.left-section-link {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--color-text-primary);
	text-decoration: none;
	transition: opacity var(--transition-base);
	font-family: var(--font-sans);
}

.left-section-link:hover {
	opacity: 0.6;
}

.link-icon {
	flex-shrink: 0;
	display: block;
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
