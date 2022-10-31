<!-- COMPONENT FOR "HOME" PAGE LAYOUT -->
<script>
    import { ui }       from "../../data/stores/ui.js";
    import Title        from "../bySection/home/Title.svelte"
    import About        from "../bySection/home/About.svelte"
    import Data         from "../bySection/home/Data.svelte"
    import Guide        from "../bySection/home/Guide.svelte"
    import { changeSubsection } from '../../lib//utils/nav.js';
    import { inView }           from '../../lib//utils/inView.js';
    import { fade, fly }        from 'svelte/transition';

    // Section and subsection navigation
    export let updateSectionUI

    $: showSubMenu = false

</script>

<!-- HTML COMPONENT MARKUP-->
<svelte:window/>
<section id="home-section" class = "app-section">

    <!-- NAVIGATION STRIP: Rotated section navigation pane-->
    <div class = "nav-container"  section = "home"  on:click={updateSectionUI} on:keypress={updateSectionUI} >
        <div class = "rotation-wrapper">
            Home
        </div>
    </div>


    <!-- SUBMENU OPTIONS: Rotated subsection navigation -->
    {#if showSubMenu}
    <div class ="submenu-container" transition:fade>
        <div class = "rotation-wrapper">
            <div class = 'submenu-item' on:click={changeSubsection} on:keypress={changeSubsection} target ="guide">Guide</div>
            <div class = 'submenu-item' on:click={changeSubsection} on:keypress={changeSubsection} target ="data">Open data</div>
            <div class = 'submenu-item' on:click={changeSubsection} on:keypress={changeSubsection} target ="about">About</div>
        </div>
    </div>
    {/if}

    <!-- MAIN CONTENT PANE: Contains multiple subsections -->
    <div class = "content-container">
        <div use:inView
            on:enter={() => showSubMenu = false}
  	        on:exit={() => showSubMenu =true}>
            <Title/>
        </div>
        <About/>
        <Data/>
        <Guide {updateSectionUI}/>
    </div>
</section>


<!-- STYLES -->
<style>
    /* Palette */
    section{
        background-color:       var(--primary01-light);
        color:                  var(--primary01);
        z-index:                0;
    }
    .nav-container{
        background-color:        var(--primary01);
        color:                     #fff;
    }
    .nav-container:hover{
        background-color:       var(--primary01);
    }


</style>