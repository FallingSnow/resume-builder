<script lang="ts">
	import { createBrowserStore } from '$lib/storage';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Label from '$components/Label.svelte';
	import { languageList, roleList, technologyList } from '$lib/data';
	import Dragable from '$components/Dragable.svelte';

	let numRoleAdvanced = createBrowserStore('numRoleAdvanced', 0);
	let numRoleIntermediate = createBrowserStore('numRoleIntermediate', 0);
	let numRoleBasic = createBrowserStore('numRoleBasic', 0);

	let numTechAdvanced = createBrowserStore('numTechAdvanced', 0);
	let numTechIntermediate = createBrowserStore('numTechIntermediate', 0);
	let numTechBasic = createBrowserStore('numTechBasic', 0);

	let hideExperience = false;
	let hideExperienceLevel = false;
</script>

<section>
	<h3 style="margin-top: 3rem;">Technical Experience</h3>
	<section class:hide-experience={hideExperience} class:hide-experience-level={hideExperienceLevel}>
		<section class="unless-edit-hide options">
			<h5>Options</h5>
			<label>
				<input type="checkbox" on:change={(e) => (hideExperience = e.currentTarget.checked)} />
				Hide years of experience
			</label>
			<label>
				<input type="checkbox" on:change={(e) => (hideExperienceLevel = e.currentTarget.checked)} />
				Hide experience level
			</label>
		</section>
		<div class="row">
			<h4>Experience by Role</h4>
			<h4>Experience by Technology</h4>
		</div>
		<div class="row">
			<div>
				<header class="experience-level">
					<Icon>star</Icon>
					<div>
						<h5>Advanced<br /><small class="years-experience">2+ years professionally</small></h5>
					</div>
				</header>
				<div class="mozaic">
					{#each Array($numRoleAdvanced) as _, index (index)}
						<Dragable on:dragstart on:dragend on:dragover on:drop on:dragenter>
							<Label key={`roleAdvanced[${index}]`} placeholder="Role" hints={[...roleList]} />
						</Dragable>
					{/each}
					<Button on:click={() => ($numRoleAdvanced += 1)} style="width: auto" />
				</div>
			</div>
			<div>
				<header class="experience-level">
					<Icon>star</Icon>
					<div>
						<h5>Advanced<br /><small class="years-experience">2+ years professionally</small></h5>
					</div>
				</header>
				<div class="mozaic">
					{#each Array($numTechAdvanced) as _, index (index)}
						<Label
							key={`techAdvanced[${index}]`}
							placeholder="Technology"
							hints={[...languageList, ...technologyList]}
						/>
					{/each}
					<Button on:click={() => ($numTechAdvanced += 1)} style="width: auto" />
				</div>
			</div>
		</div>
		<div class="row">
			<div>
				<header class="experience-level">
					<Icon class="rotate-90">double_arrow</Icon>
					<div>
						<h5>
							Intermediate<br /><small class="years-experience">&lt; 2 years professionally</small>
						</h5>
					</div>
				</header>
				<div class="mozaic">
					{#each Array($numRoleIntermediate) as _, index (index)}
						<Label key={`roleIntermediate[${index}]`} placeholder="Role" hints={[...roleList]} />
					{/each}
					<Button on:click={() => ($numRoleIntermediate += 1)} style="width: auto" />
				</div>
			</div>
			<div>
				<header class="experience-level">
					<Icon class="rotate-90">double_arrow</Icon>
					<div>
						<h5>
							Intermediate<br /><small class="years-experience">&lt; 2 years professionally</small>
						</h5>
					</div>
				</header>
				<div class="mozaic">
					{#each Array($numTechIntermediate) as _, index (index)}
						<Label
							key={`techIntermediate[${index}]`}
							placeholder="Technology"
							hints={[...languageList, ...technologyList]}
						/>
					{/each}
					<Button on:click={() => ($numTechIntermediate += 1)} style="width: auto" />
				</div>
			</div>
		</div>
		<div class="row">
			<div>
				<header class="experience-level">
					<Icon class="rotate-90">chevron_right</Icon>
					<div>
						<h5>
							Basic<br /><small class="years-experience">Internships / personal projects</small>
						</h5>
					</div>
				</header>
				<div class="mozaic">
					{#each Array($numRoleBasic) as _, index (index)}
						<Label key={`roleBasic[${index}]`} placeholder="Role" hints={[...roleList]} />
					{/each}
					<Button on:click={() => ($numRoleBasic += 1)} style="width: auto" />
				</div>
			</div>
			<div>
				<header class="experience-level">
					<Icon class="rotate-90">chevron_right</Icon>
					<div>
						<h5>
							Basic<br /><small class="years-experience">Internships / personal projects</small>
						</h5>
					</div>
				</header>
				<div class="mozaic">
					{#each Array($numTechBasic) as _, index (index)}
						<Label
							key={`techBasic[${index}]`}
							placeholder="Technology"
							hints={[...languageList, ...technologyList]}
						/>
					{/each}
					<Button on:click={() => ($numTechBasic += 1)} style="width: auto" />
				</div>
			</div>
		</div>
	</section>
</section>

<style lang="less">
	section.hide-experience .years-experience {
		display: none;
	}
	section.hide-experience-level .experience-level {
		display: none;
	}
	.options label {
		display: block;
	}
	.row {
		display: grid;
		grid-template-areas: 'a a';
		grid-auto-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1.2rem;
	}
	section.hide-experience-level .row {
		margin-bottom: 0;
	}
	.mozaic {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		color: var(--blue);
		small {
			font-weight: normal;
		}
	}
	small {
		color: grey;
	}
</style>
