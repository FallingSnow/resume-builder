<script lang="ts">
	import Icon from './Icon.svelte';

	export let onDelete: MouseEventHandler<void> | undefined = undefined;
	let dropping = false;

	const onDragOver = (e: DragEvent) => {
		e.preventDefault();
		dropping = true;
	};
	const onDragLeave = (e: DragEvent) => {
		dropping = false;
	};
	const onDragEnd = (e: DragEvent) => {
		dropping = false;
	};
	const onDragDrop = (e: DragEvent) => {
		dropping = false;
	};
</script>

<div class:wrapper={true} class:dropping on:dragover={onDragOver} on:dragleave={onDragLeave} on:drop={onDragDrop} on:dragover on:dragleave on:drop on:dragenter>
	<div class:handle={true} on:dragend={onDragEnd} on:dragend on:dragstart>
		<div class:move={true} draggable="true"><Icon>menu</Icon></div>
		{#if onDelete}
			<button class="delete" on:click={onDelete}><Icon>delete</Icon></button>
		{/if}
	</div>
	<div style="flex: 1">
		<slot />
	</div>
</div>

<style lang="less">
	@media print {
		.handle {
			display: none !important;
		}
	}
	:global(.show-editable) {
		.handle {
			display: flex;
		}
	}
	.move {
		cursor: move;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.dropping {
		background-color: fade(#3a99fa, 20%);
	}
	.handle {
		justify-content: center;
		align-items: center;
		flex-direction: column;
		display: none;
		background-color: rgb(245, 245, 245);
		> * {
			flex: 1;
			border: none;
		}
	}
	.delete {
		background-color: var(--red);
		color: white;
		cursor: pointer;
		&:hover {
			background-color: var(--darkred);
		}
	}
	.wrapper {
		display: flex;
		align-items: stretch;
	}
</style>
