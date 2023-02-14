<script lang="ts">
	import { createBrowserStore } from "$lib/storage";
	import ContactBar from "../../components/ContactBar.svelte";
	import EditableLine from "../../components/EditableLine.svelte";

	let workExperiencePointers = createBrowserStore<number[]>('workExperiencePtr', []);
    let firstWorkPtr = $workExperiencePointers[0];
</script>

<section>
    <h1><EditableLine key="Name" placeholder="Name"/></h1>
    <h5 class="position"><EditableLine key={`${firstWorkPtr}-Company`} placeholder="Company"/> - <EditableLine key={`${firstWorkPtr}-Position`} placeholder="Position"/></h5>
    <ContactBar />
    <section>
        <div class="columns">
            <div>
                <h5>Engineering Experience</h5>
                <span><EditableLine key="EngineeringExperience" placeholder="0"/> years</span>
            </div>
    
            <div>
                <h5>Remote Experience</h5>
                <span><EditableLine key="RemoteExperience" placeholder="0"/> years</span>
            </div>
        </div>
    </section>
</section>

<style lang="less">
    .columns {
        display: flex;
        > div {
            flex: 1;
        }
        span {
            margin-left: 2rem;
        }
    }
    .position {
        margin-top: 0.4rem;
        color: grey;
        font-weight: lighter;
        text-transform: uppercase;
    }
    h3 {
        color: var(--darkgrey)
    }
</style>