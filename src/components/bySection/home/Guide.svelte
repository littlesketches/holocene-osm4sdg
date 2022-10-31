<!--  HOLOCENE DATA SUBSECTION COMPONENT-->
<script>
    import { ui }               from "../../../data/stores/ui.js";
    import RightArrow           from '../../shared/RightArrow.svelte'
    import { changeSubsection } from '../../../lib/utils/nav.js';
    import SdgDivider           from '../../shared/SdgDivider.svelte';
    export let updateSectionUI

    const handleUpdateSection = () => $ui.view.section ='compose'

</script>


<!-- HTML COMPONENT MARKUP -->
<section id ="guide" class = "subsection">
    <div class = "subsection-content-wrapper">
        <h1>Guidance</h1>
        <SdgDivider/>
        <p><i>Holocene</i> is an interactive tool that is designed to be as user friendly as possible. But it's also an early prototype! Some stuff might not work properly - particularly when we dealing with such a massive and sometimes inconsistent dataset, and a somewhat brittle webAPI. As such, this the user interface and experience will evolve as we find better data, better ways to access that data, and better ways to meaningfully represent that data.
        </p>
        <p>There is currently no comprehensive 'user manual' or documentation for Holocene however guidance is provided throughout the application. So with that in mind, let's start using <i>Holocene</i>!</p>
        <div class = "right-button-container" on:click={handleUpdateSection} on:keydown={handleUpdateSection}>
            <RightArrow section={'home'}/>
        </div>
    </div>

</section>


<!-- STYLES -->
<style>
    h1{
        text-align:             center;
        text-transform:         lowercase;
    }
    .right-button-container{
        margin-top:             5vh;
        display:                flex;
        justify-content:        center;
    }
</style>