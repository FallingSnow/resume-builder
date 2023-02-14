<script>
	import Icon from "./Icon.svelte";

</script>
<span><slot/></span>
<hr/>

<style>
    span {
        color: var(--blue);
    }
    hr {
        border: 0;
        border-bottom: 1px solid var(--lightblue);
    }
    span {
        font-size: 0.9rem;
    }
</style>