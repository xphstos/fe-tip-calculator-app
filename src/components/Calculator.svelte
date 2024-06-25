<script lang="ts">
	import { z } from 'zod';
	import { cn } from '$lib/cn';
	import Dollar from '../assets/icon-dollar.svg';
	import Person from '../assets/icon-person.svg';
	import Output from './Output.svelte';
	import InputField from './InputField.svelte';

	export let className: string | null = '';

	const schema = z.object({
		bill: z.number().min(1, "Can't be zero"),
		customTip: z.number().nullish(),
		tip: z.number().nullish(),
		people: z.number().min(1, "Can't be zero")
	});

	type FormData = z.infer<typeof schema>;
	type FormSchemaKeys = keyof FormData;

	let state: {
		bill: number;
		tip: number;
		customTip: number | undefined;
		people: number;
	} = {
		bill: 0,
		tip: 0,
		customTip: undefined,
		people: 0
	};
	let errors: Partial<Record<FormSchemaKeys, string[]>> = {};

	$: tipPercentage = state.tip ? state.tip / 100 : 0;
	$: customTipPercentage = state.customTip ? state.customTip / 100 : 0;
	$: tipAmount =
		tipPercentage || customTipPercentage ? (tipPercentage + customTipPercentage) * state.bill : 0;
	$: tipAmountPerPerson = tipAmount / (state.people ? state.people : 1);
	$: totalAmount = tipAmount + state.bill;
	$: totalAmountPerPerson = totalAmount / (state.people ? state.people : 1);

	const handleBlur = () => {
		const result = schema.safeParse({
			bill: state.bill ?? 0,
			tip: state.tip ?? 0,
			customTip: state.customTip ?? 0,
			people: state.people ?? 0
		});

		if (!result.success) {
			errors = result.error.flatten().fieldErrors;
			return;
		}

		errors = {};
	};

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;

		if (target.name) {
			state[target.name as keyof typeof state] = target.valueAsNumber;
		}
	};

	const reset = () => {
		errors = {};
		state = {
			bill: 0,
			tip: 0,
			customTip: 0,
			people: 0
		};
	};
</script>

<article
	class={cn(
		'container bg-white rounded-t-xl p-6 md:p-8 shadow-reverse md:shadow grid md:grid-cols-2 gap-8 md:place-content-center',
		className
	)}
>
	<form class="p-4 space-y-8 md:space-y-10" id="tip-calculator">
		<InputField
			label="Bill"
			onBlur={handleBlur}
			onInput={handleInput}
			name="bill"
			value={state.bill}
			error={errors.bill?.[0]}
			icon={Dollar}
		/>
		<div class="block">
			<div class="mb-2">Select tip %</div>
			<div class="flex gap-3 flex-wrap">
				{#each [5, 10, 15, 25, 50] as tip}
					<label
						class={cn(
							'flex-auto basis-1/3 md:basis-1/4 cursor-pointer bg-cyan-700 rounded-xs text-white transition-all hocus:bg-cyan-300 ring-2 ring-transparent focus-within:ring-cyan-500 ring-offset-2  hocus:text-cyan-700 min-h-12 flex focus-within:bg-cyan-300 focus-within:text-cyan-700',
							{
								'bg-cyan-500': state.tip === tip
							}
						)}
					>
						<input
							type="radio"
							class="sr-only"
							name="tip"
							value={tip}
							bind:group={state.tip}
							on:focus={() => (state.customTip = 0)}
						/>
						<span class="m-auto text-xl">{tip}%</span>
					</label>
				{/each}
				<input
					type="number"
					name="customTip"
					class="flex-auto basis-1/3 md:basis-1/4 bg-neutral-100 text-right text-lg rounded-xs min-h-12 min-w-1 w-full text-neutral-900 placeholder:text-neutral-500 px-4 ring-2 ring-transparent transition-all outline-none hocus:ring-cyan"
					placeholder="Custom"
					on:blur={handleBlur}
					on:focus={() => (state.tip = 0)}
					bind:value={state.customTip}
				/>
			</div>
		</div>
		<InputField
			label="Number of people"
			name="people"
			onBlur={handleBlur}
			onInput={handleInput}
			value={state.people}
			error={errors.people?.[0]}
			icon={Person}
		/>
	</form>
	<section
		class="p-10 bg-neutral-900 text-neutral-100 rounded-lg flex flex-col gap-8"
		title="Tip outcome"
	>
		<Output label="Tip Amount" value={tipAmountPerPerson.toFixed(2)} />
		<Output label="Total" value={totalAmountPerPerson.toFixed(2)} />
		<button
			type="button"
			on:click={reset}
			disabled={totalAmount === 0 || tipAmount === 0 ? true : false}
			class={cn(
				'block text-center w-full text-neutral-900 min-h-12 rounded-xs outline-offset-4 outline-cyan-300 bg-cyan px-6 transition-all hocus:bg-cyan-300 mt-auto',
				'disabled:pointer-events-none disabled:bg-cyan-700'
			)}>RESET</button
		>
	</section>
</article>
