<script lang="ts">
	import EditableLine from './EditableLine.svelte';
	import Icon from './Icon.svelte';
	import github from '$assets/github-mark.svg?raw';
</script>

<section>
	<ul>
		<li>
			<Icon>email</Icon>
			<EditableLine key="Email" />
		</li>
		<li>
			<Icon>phone</Icon>
			<EditableLine key="Phone" />
		</li>
		<li>
			<Icon>near_me</Icon>
			<EditableLine key="CityState" placeholder="City, State" /> (UTC <EditableLine
				key="Timezone"
				placeholder="+00:00"
			/>)
		</li>
		<li>
			<!-- <img src={github} alt="Github logo" /> -->
			<span style="position: relative; bottom: -0.2rem;">{@html github}</span>
			<EditableLine key="Github" placeholder="Github" />
		</li>
	</ul>
</section>

<style lang="less">
	section {
		background-color: var(--grey);
		color: var(--darkgrey);
		fill: var(--darkgrey);
	}
	ul {
		list-style-type: none;
		padding: 0 0.8rem;
	}
	li {
		display: inline-block;
		padding: 0.8rem 0.2rem;
	}
</style>
