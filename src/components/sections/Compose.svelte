<!-- COMPONENT FOR "IDENTIFY"" SECTION  -->
<script>
    import Title                from '../bySection/compose/Title.svelte'
    import Locate               from '../bySection/compose/Locate.svelte'
    import Curate               from '../bySection/compose/Curate.svelte'
    import Generate             from '../bySection/compose/Generate.svelte'
    import { ui }               from "../../data/stores/ui.js";
    import { changeSubsection }  from '../../lib/utils/nav.js'
    import { inView }           from '../../lib//utils/inView.js';
    import { fade, fly }        from 'svelte/transition';

    export let updateSectionUI

    $: showSubMenu = false

</script>

<!-- HTML COMPONENT MARKUP-->
<section id="compose-section" class = "app-section" class:open="{$ui.view.section==='compose'|| $ui.view.section==='explore' }">

    <!-- NAVIGATION STRIP: Rotated section navigation pane-->
    <div class = "nav-container" section = "compose" on:click={updateSectionUI} on:keypress={updateSectionUI} >
        <div class = "rotation-wrapper">
            Compose
        </div>
    </div>

    <!-- SUBMENU OPTIONS: Rotated subsection navigation -->
    {#if showSubMenu}
    <div class ="submenu-container" transition:fade>
        <div class = "rotation-wrapper">
            <div class = 'submenu-item' on:click={changeSubsection} on:keypress={changeSubsection} target = "generate">Generate</div>
            <div class = 'submenu-item' on:click={changeSubsection} on:keypress={changeSubsection} target = "curate">Curate</div>
            <div class = 'submenu-item' on:click={changeSubsection} on:keypress={changeSubsection} target = "locate">Locate</div>
        </div>
    </div>
    {/if}

    <!-- MAIN CONTENT PANE: Contains multiple subsections-->
    <div class = "content-container">
        <div use:inView
            on:enter={() => showSubMenu = false}
  	        on:exit={() => showSubMenu =true}>
            <Title/>
        </div>
        <Locate/>
        <Curate/>
        <Generate/>
    </div>
</section>


<!-- STYLES-->
<style>
    /* Palette and open/close layout */
    section{
        color:                  var(--primary02);
        background-color:       var(--primary02-light);
        margin-left:            90vw;
        z-index:                1;
    }
    section.open{
        margin-left:            5vw;
    }
    .nav-container{
        background-color:        var(--primary02);
        color:                  #fff;
    }
    .nav-container:hover{
        background-color:        var(--primary02);
    }
</style>