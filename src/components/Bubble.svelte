<script>
</script>

<div on:click {...$$restProps}><slot /></div>

<style lang="less">
	:global(.show-editable) {
		div {
			display: flex;
		}
	}
	@media print {
		div {
			display: none !important;
		}
	}
	div {
		background-color: var(--red);
		width: 1em;
		height: 1em;
		color: white;
		cursor: pointer;
		display: none;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		&:hover {
			background-color: var(--darkred);
		}
	}
</style>
