<script lang="ts">
	import { createBrowserStore, freePtr } from '$lib/storage';
	import Button from '$components/Button.svelte';
	import EditableLine from '$components/EditableLine.svelte';
	import Dragable from '$components/Dragable.svelte';
	import Bubble from '$components/Bubble.svelte';
	import Icon from '$components/Icon.svelte';

	export let prefix: string = '';
	export let onDelete: Function;

	let descriptionPointers = createBrowserStore<number[]>(`${prefix}-descriptionPtrs`, []);

	function deletePtr(store: number[], ptr: number): number[] {
		let idx = store.indexOf(ptr);
		if (idx === -1) return store;
		store.splice(idx, 1);
		freePtr(ptr.toString());
		return store;
	}
</script>

<Dragable {onDelete} on:dragstart on:dragend on:dragover on:drop on:dragenter {...$$restProps}>
	<section>
		<div class="title">
			<h4>
				<slot name="title" />
			</h4>
			<h4>
				<small>
					<slot name="date" />
				</small>
			</h4>
		</div>
		{#if $$slots.location}
			<small class="location">
				<slot name="location">
					<EditableLine key="${prefix}-Location" placeholder="Location" />
				</slot>
			</small>
		{/if}
		<ul>
			{#each $descriptionPointers as ptr (ptr)}
				<li style="position: relative;">
					<EditableLine key={`${ptr}-Description`} placeholder="Description" />
					<Bubble
						on:click={() => ($descriptionPointers = deletePtr($descriptionPointers, ptr))}
						style="position: absolute; top: -10px; right: -10px;"><Icon>close</Icon></Bubble
					>
				</li>
			{/each}
			<Button on:click={() => ($descriptionPointers = [...$descriptionPointers, Date.now()])}
				>Add Description</Button
			>
		</ul>
	</section>
</Dragable>

<style lang="less">
	.title {
		display: flex;
		justify-content: space-between;
	}
	.location {
		text-transform: uppercase;
		color: #a6a6a6;
	}
	h4 {
		margin-bottom: 0.7rem;
	}
	ul {
		list-style-type: none;
		padding-left: 1.2rem;
	}
	li {
		position: relative;
		margin-bottom: 1rem;
		&::before {
			--size: 5px;
			content: '';
			display: inline-block;
			position: absolute;
			left: -1rem;
			width: var(--size);
			height: var(--size);
			background-color: var(--blue);
			border-radius: 100%;
			top: 1ch;
			transform: translateY(-50%);
		}
	}
	// input {
	//     display: none;
	// }
</style>
