<script>
	import Icon from './Icon.svelte';
</script>

<button on:click {...$$props}><Icon>add</Icon> <slot /></button>

<style>
	@media print {
		button {
			display: none !important;
		}
	}
	:global(.show-editable) button {
		display: initial;
	}
	button {
		--color1: #fff;
		--color2: #7abcff1c;
		background-color: var(--lightblue);
		cursor: pointer;
		border: 1px solid #d5eaff;
		border-radius: 2px;
		padding: 0.3rem 0.6rem;
		width: 100%;
		color: #4b93dd;
		background-color: #ffffff;
		background: repeating-linear-gradient(
			-45deg,
			var(--color2),
			var(--color2) 2px,
			var(--color1) 2px,
			var(--color1) 4px
		);
		display: none;
	}
	button[data-active] {
		background-color: var(--lightblue);
	}
</style>
