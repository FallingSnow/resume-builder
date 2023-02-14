<script lang="ts">
	import EditableLine from './EditableLine.svelte';
</script>

<div>
	<EditableLine key={$$props.key} {...$$restProps} />
	<slot />
</div>

<style lang="less">
	div {
		background-color: var(--grey);
		padding: 0.6rem 1rem;
		font-weight: bold;
		font-size: 0.8rem;
		display: inline-block;
	}
</style>
