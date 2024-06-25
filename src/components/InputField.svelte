<script lang="ts">
	import { cn } from '$lib/cn';

	export let label: string;
	export let name: string;
	export let error: string | null = null;
	export let value: string | number | null = null;
	export let onBlur: (event: FocusEvent) => void;
	export let onInput: (event: Event) => void;
	export let icon: string | null = null;

	let ref: HTMLInputElement | null = null;
</script>

<label class="block">
	<div class="mb-2 flex items-center justify-between gap-4">
		{label}
		{#if error}<span class="text-error text-sm">{error}</span>{/if}
	</div>
	<div class="relative">
		<input
			type="number"
			{name}
			class={cn(
				'bg-neutral-100 text-right text-lg rounded-xs min-h-12 min-w-1 w-full text-neutral-900 placeholder:text-neutral-500 px-4 ring-2 ring-transparent transition-all outline-none hocus:ring-cyan',
				{
					'ring-error hocus:ring-error': error
				}
			)}
			placeholder="0"
			on:blur={onBlur}
			bind:value
			bind:this={ref}
			on:input={onInput}
			on:focus={() => ref?.select()}
		/>
		{#if icon}
			<img
				class="absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none"
				src={icon}
				alt=""
				aria-hidden="true"
			/>
		{/if}
	</div>
</label>
