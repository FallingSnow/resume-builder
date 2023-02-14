<script>
	import Background from './index/Background.svelte';
	import Introduction from './index/Introduction.svelte';
	import TechnicalExperience from './index/TechnicalExperience.svelte';
</script>

<svelte:head>
	<title>Resume Builder</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="intro">
	<p>To export your resume as a PDF</p>
	<ol>
		<li>print this page (<kbd>ctrl + p</kbd>)</li>
		<li>select print/save to pdf/file</li>
		<li>select Print Background Colors and Print Background Images in your print options</li>
		<li>disable header and footer in your print options</li>
	</ol>
</section>

<section>
	<Introduction />
	<TechnicalExperience />
	<Background />
</section>

<style>
	@media print {
		.intro {
			display: none;
		}
	}
</style>
