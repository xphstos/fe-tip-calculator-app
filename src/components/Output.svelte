<script lang="ts">
	export let label;
	export let value;
</script>

<div class="flex items-center justify-between gap-4">
	<div class="flex flex-col">
		<span>{label}</span>
		<span class="[letter-spacing:-0.05em] text-neutral-700 text-sm">/ person</span>
	</div>
	<output class="text-2xl text-cyan">
		${value}
	</output>
</div>
