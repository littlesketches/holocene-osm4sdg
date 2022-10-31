<!-- COMPONENT FOR "FIND"" PAGE LAYOUT -->
<script>
    import Title                from '../bySection/explore/Title.svelte'
    import Facets               from '../bySection/explore/Facets.svelte'
    import Benchmarks           from '../bySection/explore/Benchmarks.svelte'
    import Beyond               from '../bySection/explore/Beyond.svelte'
    import Holodeck             from '../bySection/explore/Holodeck.svelte'
    import { ui }               from "../../data/stores/ui.js";
    import { data }             from "../../data/stores/data.js";
    import { changeSubsection } from '../../lib//utils/nav.js';
    import { inView }           from '../../lib//utils/inView.js';
    import { fade, fly }        from 'svelte/transition';

    export let updateSectionUI

    $: showSubMenu = false
</script>

<!-- HTML COMPONENT MARKUP-->
<section id="explore-section" class = "app-section"  class:open="{$ui.view.section ==='explore' }">
    <!-- NAVIGATION STRIP: Rotated section navigation pane-->
    <div class = "nav-container" section = "explore"
        on:click={updateSectionUI} on:keypress={updateSectionUI}>
        <div class = "rotation-wrapper">
            Explore
        </div>
    </div>

    <!-- SUBMENU OPTIONS: Rotated subsection navigation -->
    {#if showSubMenu}
    <div class ="submenu-container" transition:fade>
        <div class = "rotation-wrapper">
            <div class = 'submenu-item'  on:click={changeSubsection} on:keypress={changeSubsection} target ="discover">Speculate</div>
            <div class = 'submenu-item'  on:click={changeSubsection} on:keypress={changeSubsection} target ="beyond">Beyond</div>
            <div class = 'submenu-item'  on:click={changeSubsection} on:keypress={changeSubsection} target ="benchmark">Benchmarks</div>
            <div class = 'submenu-item'  on:click={changeSubsection} on:keypress={changeSubsection} target ="facets">Facets</div>
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
        <Facets/>
        <Benchmarks/>
        <Beyond/>
        <Holodeck/>
    </div>
</section>


<!-- STYLES -->
<style>
    /* Palette and UI*/
    section{
        color:                  var(--primary03);
        background-color:       var(--primary03-light);
        margin-left:            95vw;
        z-index:                2;
    }
    section.open{
        margin-left:            10vw;
    }
    .nav-container{
        background-color:        var(--primary03);
        color:                  #fff;
    }
    .nav-container:hover{
        background-color:        var(--primary03);
    }


</style>