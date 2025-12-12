// app/composables/useStructuredData.ts
export const usePersonSchema = (person: {
	name: string;
	jobTitle?: string;
	url: string;
	description?: string;
	image?: string;
	sameAs?: string[];
}) => {
	useHead({
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Person",
					...person,
				}),
			},
		],
	});
};
