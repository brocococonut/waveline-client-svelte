import App from './App.svelte';

globalThis.wave = {
	baseImage: '/images/placeholder.png'
}

const app = new App({
	target: document.body
});

export default app;