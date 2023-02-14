<script lang="ts">
	import { createBrowserStore, freePtr } from '$lib/storage';
	import Break from '$components/Break.svelte';
	import Button from '$components/Button.svelte';
	import Experience from './Experience.svelte';
	import Icon from '$components/Icon.svelte';
	import EditableLine from '$components/EditableLine.svelte';
	import { throttle } from '$lib/utils';
	import type { Writable } from 'svelte/store';

	type Pointer = number;

	let workExperiencePointers = createBrowserStore<Pointer[]>('workExperiencePtr', []);
	let educationPointers = createBrowserStore<Pointer[]>('educationPtr', []);
	let projectPointers = createBrowserStore<Pointer[]>('projectPtr', []);

	function deletePtr(store: Writable<Pointer[]>, ptr: Pointer) {
		store.update((store) => {
			let idx = store.indexOf(ptr);
			if (idx === -1) return store;
			store.splice(idx, 1);
			return store;
		});
		freePtr(ptr.toString());
	}

	function dragStart(e: DragEvent, ptr: Pointer) {
		if (e.target && e.dataTransfer) {
			e.dataTransfer.setData('ptr', ptr.toString());
			e.dataTransfer.dropEffect = 'move';
			const parent = (e.target as Element).parentNode?.parentNode;
			if (parent) e.dataTransfer.setDragImage(parent as Element, 0, 0);
		}
		// console.debug(e);
	}

	function drop(e: DragEvent, store: Writable<Pointer[]>, target: Pointer) {
		if (!e.dataTransfer) return;
		const src = parseInt(e.dataTransfer.getData('ptr'));
		if (src === target) return;
		store.update((store) => {
			const srcPos = store.indexOf(src);
			const targetPos = store.indexOf(target);
			if (srcPos === -1 || targetPos === -1) return store;
			store.splice(srcPos, 1, target);
			store.splice(targetPos, 1, src);
			return store;
		});
	}
</script>

<section style="break-before: page;">
	<h3>Background</h3>

	<!-- Work Experience -->
	<Break><Icon>description</Icon> Work Experience</Break>
	{#each $workExperiencePointers as ptr (ptr)}
		<Experience
			prefix={ptr.toString()}
			onDelete={() => deletePtr(workExperiencePointers, ptr)}
			on:dragstart={(e) => dragStart(e, ptr)}
			on:dragenter={(e) => e.preventDefault()}
			on:drop={(e) => drop(e, workExperiencePointers, ptr)}
		>
			<svelte:fragment slot="title">
				<EditableLine key={`${ptr}-Position`} placeholder="Position" /> at <EditableLine
					key={`${ptr}-Company`}
					placeholder="Company"
				/>
			</svelte:fragment>
			<svelte:fragment slot="date">
				<EditableLine key={`${ptr}-WorkStartDate`} placeholder="Start" /> - <EditableLine
					key={`${ptr}-WorkEndDate`}
					placeholder="End"
				/>
			</svelte:fragment>
			<svelte:fragment slot="location">
				<EditableLine key={`${ptr}-WorkLocation`} placeholder="Location" />
			</svelte:fragment>
		</Experience>
	{/each}
	<Button on:click={() => ($workExperiencePointers = [...$workExperiencePointers, Date.now()])}
		>Add Work Experience</Button
	>

	<!-- Education -->
	<Break><Icon>book</Icon> Education</Break>
	{#each $educationPointers as ptr (ptr)}
		<Experience
			prefix={ptr.toString()}
			onDelete={() => deletePtr(educationPointers, ptr)}
			on:dragstart={(e) => dragStart(e, ptr)}
			on:dragenter={(e) => e.preventDefault()}
			on:drop={(e) => drop(e, educationPointers, ptr)}
		>
			<svelte:fragment slot="title">
				<EditableLine key={`${ptr}-Degree`} placeholder="Degree" />
			</svelte:fragment>
			<svelte:fragment slot="date">
				<EditableLine key={`${ptr}-Date`} placeholder="Date" />
			</svelte:fragment>
			<svelte:fragment slot="location">
				<EditableLine key={`${ptr}-Location`} placeholder="Location" />
			</svelte:fragment>
		</Experience>
	{/each}
	<Button on:click={() => ($educationPointers = [...$educationPointers, Date.now()])}
		>Add Education</Button
	>

	<!-- Projects -->
	<Break><Icon>auto_awesome</Icon> Projects</Break>
	{#each $projectPointers as ptr (ptr)}
		<Experience
			prefix={ptr.toString()}
			onDelete={() => deletePtr(projectPointers, ptr)}
			on:dragstart={(e) => dragStart(e, ptr)}
			on:dragenter={(e) => e.preventDefault()}
			on:drop={(e) => drop(e, projectPointers, ptr)}
		>
			<svelte:fragment slot="title">
				<EditableLine key={`${ptr}-Project`} placeholder="Project" />
			</svelte:fragment>
			<svelte:fragment slot="date">
				<EditableLine key={`${ptr}-Date`} placeholder="Date" />
			</svelte:fragment>
			<svelte:fragment slot="location">
				<EditableLine key={`${ptr}-Location`} placeholder="Location" />
			</svelte:fragment>
		</Experience>
	{/each}
	<Button on:click={() => ($projectPointers = [...$projectPointers, Date.now()])}
		>Add Project</Button
	>
</section>

<style lang="less">
	:global(.active) {
		background-color: red !important;
	}
	// .title {
	// 	display: flex;
	// 	justify-content: space-between;
	// }
	// input {
	//     display: none;
	// }
</style>
