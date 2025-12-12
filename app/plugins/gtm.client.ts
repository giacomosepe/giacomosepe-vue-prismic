interface GTMDataLayer {
	event?: string;
	[key: string]: unknown;
}

declare global {
	interface Window {
		dataLayer: GTMDataLayer[];
	}
}

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();
	const gtmId = config.public.gtmId;

	if (!gtmId || gtmId === "") {
		console.warn("Gtm ID not found");
		return;
	}

	window.dataLayer = window.dataLayer || [];
	const script = document.createElement("script");

	script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}')`;

	const noscript = document.createElement("noscript");
	noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id='${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
});
