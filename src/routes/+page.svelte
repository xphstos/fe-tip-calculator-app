<script lang="ts">
	import '../app.css';
	import Calculator from '../components/Calculator.svelte';
	import Logo from '../components/Logo.svelte';
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
	<title>Frontend Mentor | Tip calculator app</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="grid min-h-dvh md:place-items-center md:py-12 px-4">
	<div class="grid w-full place-items-start">
		<Logo className="text-neutral-700 my-12 justify-self-center" />
		<Calculator className="md:rounded-xl place-self-end md:place-self-auto" />
	</div>
</main>
