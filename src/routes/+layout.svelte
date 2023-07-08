<script>
	import Icon from '$components/Icon.svelte';
	import { exportBackup, importBackup } from '$lib/storage';
	import './styles.less';

	let showEditable = false;

</script>

<div class="app">
	<div class="control-bar">
		<button on:click={() => showEditable = !showEditable}><Icon>edit</Icon></button>
		<button on:click={() => exportBackup()}><Icon>download</Icon></button>
		<button on:click={() => importBackup()}><Icon>upload</Icon></button>
	</div>
	<main class={showEditable ? 'show-editable' : ''}>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.control-bar {
		position: fixed;
		top: 0;
		left: 0;
		background-color: white;
	}
	@media print {
		button {
			display: none;
		}
	}
</style>
