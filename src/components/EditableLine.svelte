<script lang="ts">
	import Fuse from 'fuse.js';
	import { createBrowserStore } from '../lib/storage';

	export let key: string;
	export let placeholder: any = undefined;
	export let hints: string[] = [];
	const store = createBrowserStore(key, placeholder ?? key);
	const searchController = new Fuse(hints, {});
	let suggestions: string[] = [];
	let showDropdown = false;
	let activeSuggestionIdx = -1;

	store.subscribe((val) => {
		if (!hints.length) return;
		if (val === '') return (suggestions = hints);
		suggestions = searchController.search(val).map((s) => s.item);
	});

	const mousedown = (suggestion: string) => {
		$store = suggestion;
		showDropdown = false;
		activeSuggestionIdx = -1;
	};

	const keyPress = (e: any) => {
		if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Enter') return;
		e.preventDefault();
		if (e.key === 'ArrowUp') {
			activeSuggestionIdx = Math.max(activeSuggestionIdx - 1, 0);
		} else if (e.key === 'ArrowDown') {
			activeSuggestionIdx = Math.min(suggestions.length - 1, activeSuggestionIdx + 1);
		} else if (e.key === 'Enter') {
			mousedown(suggestions[activeSuggestionIdx]);
		}
	};
</script>

<div class="wrapper">
	<div
		contenteditable
		bind:innerHTML={$store}
		on:input={() => {}}
		on:focus={() => (showDropdown = true)}
		on:blur={() => (showDropdown = false)}
		on:keydown={(e) => (hints.length ? keyPress(e) : undefined)}
		{...$$props}
	/>
	{#if showDropdown && suggestions.length}
		<ul>
			{#each suggestions as suggestion, index}
				<li
					class={activeSuggestionIdx === index ? 'active' : ''}
					on:mousedown={() => mousedown(suggestion)}
				>
					{suggestion}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="less">
	@media print {
		div {
			outline: none !important;
		}
	}
	.wrapper {
		border: none;
		background: none;
		font-size: inherit;
		font-family: inherit;
		display: inline-block;
		height: 1em;
		width: auto;
		min-width: 1ch;
		position: relative;
	}
	:global(.show-editable) .wrapper > div {
		outline: 1px dashed grey;
	}
	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 1;
		border: 1px solid lightgrey;
	}
	li {
		padding: 0.3rem 0.5rem;
		background-color: white;
		cursor: pointer;
		&:hover,
		&.active {
			background-color: aliceblue;
		}
	}
</style>
