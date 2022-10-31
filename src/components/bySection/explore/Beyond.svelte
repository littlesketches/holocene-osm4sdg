<!-- BEYOND DATA / THREEJS SCENE COMPONENT -->
<script>
    import CityScape            from '../../vis/CityScape.svelte'
    import DownArrow            from '../../shared/DownArrow.svelte'
    import SdgDivider           from '../../shared/SdgDivider.svelte';
    import { ui }               from '../../../data/stores/ui.js'
    import { data }             from '../../../data/stores/data.js'
    import { changeSubsection }  from '../../../lib/utils/nav.js';
    import { slide }        from 'svelte/transition';
    ////// COLLAPSIBLE PANES AND UI ////
	const paneVisbility= {
        oss4sdg:                false,
        openAccessible:                false,
        experience:                false,
    }
    function togglePane(){
        Object.keys(paneVisbility).map( key => {
            if(this.id !== key){ paneVisbility[key] = false }
        })
        paneVisbility[this.id] = ! paneVisbility[this.id]
    };

</script>


<!-- HTML COMPONENT MARKUP -->
<section id ="beyond" class = "subsection">
    <div class = "subsection-content-wrapper">
        <h1>Beyond Holocene</h1>
        <SdgDivider/>
        <p>This prototype of <i>Holocene</i> was conceived and hacked together in couple of weeks during October of 2022. On the surface it might seem a bit bare bones but there is a purposeful design rationale and (hopeful) short term development roadmap for it. So it has been programmed with some care and thought!
        Here are a few thoughts about <i>Holocene</i>, with a  little glimpse into the future at the end...    
        </p>

        <div id = "oss4sdg" class="collapse__header" type="button" 
            class:selected="{paneVisbility.oss4sdg}" on:click={togglePane}  on:keydown={togglePane}>
            <div class='toggle-label'>OSS4SDG Sustainable Smart Cities Challenge</div>
            <div class="toggle-icon down">&#8595;</div>
        </div>
        {#if paneVisbility.oss4sdg}
        <div class = "collapse__body"  transition:slide>   
            <h3>OSS4SDG Sustainable Smart Cities Challenge</h3> 
            <p>Yes, this was put together for <a target ="_blank" href="https://ideas.unite.un.org/sdg11/Page/Overview">this challenge</a>, and more specifically for the challenge to <a target="_blank" href="https://ideas.unite.un.org/sdg11/Page/Challenge1">Develop a City's SDG scoring graph</a>. In most aspects, <i>Holocene</i> stays close to this brief however a handful of 'not in scope' parts were included, the obvious being that <i>Holocene</i> includes all SDGs and not just SDG#11. Another (undocumented) feature is that <i>Holocene</i> can be easily reconfigured to work at an even more human 'neighbourhood' scale, but we'll stick with the more formal boundaries of cities (and communities) for now. 
            </p>
            <p>Ensuring that <i>Holocene</i> treats each SDG equally and includes them all from the beginning was conscious design decision to reflect the interconnectedness of the SDGs and to show the potential for both: using OSM data more widely and in less obvious spheres; and for potentially integrating other datasets into <i>Holocene</i>.
            </p>
            <p>We should also acknowledge that <i>Holocene</i> takes on a challenge that is on the surface, not <i>that</i> complicated; or at least, doesn't require particularly intensive computational power. That's not to say this is not a complex challenge - particularly in trying to get <i>Holocene</i> to work for any place in the world(!), but a core design direction for <i>Holocene</i> is that is should do what it does, as well as possible. And it should be as flexible as possible, so that it might be useful to as many people as possible. 
            </p>
        </div>
        {/if}

        <div id = "openAccessible" class="collapse__header" type="button" 
            class:selected="{paneVisbility.openAccessible}" on:click={togglePane}  on:keydown={togglePane}>
            <div class='toggle-label'>Open, accessible and extensible</div>
            <div class="toggle-icon down">&#8595;</div>
        </div>
        {#if paneVisbility.openAccessible}
        <div class = "collapse__body"  transition:slide>    
            <h3>Open, accessible and extensible software</h3> 
            <p> <i>Holocene</i> is open source and anyone is welcome to fork and build on it. It is also at is heart -  a simple web application that (currently) operates on the client side (i.e. in a web browser). So it's not that complicated and it only relies on a few OSM APIs to run (even though they are a bit brittle!) 
            </p>
            <p>This technology choice was another conscious design decision to ensure <i>Holocene</i> was more than a  concept and could be as easily shared as possible, as a fully working prototype. In this vein, attention has been to the mundane software development tasks like making a decent, responsive user interface and including as much guidance as possible for users.
            </p>
            <p>Alongside usability, considerable effort (within the short timeframe!) has been made to explore the OSM dataset and Overpass QL, and to design the concept of Facets in a flexible way that could be developed into more sophisticated, and more useful measures. This is not well documented in the application guidance - which focus on what is available now - however we see great potential in developing the Facet Composer further and for allowing more complex facets to be composed (e.g. as ratios and indices).</p>
        </div>
        {/if}


        <div id = "beyondMaps" class="collapse__header" type="button" 
            class:selected="{paneVisbility.experience}" on:click={togglePane}  on:keydown={togglePane}>
            <div class='toggle-label'>So where's the map?</div>
            <div class="toggle-icon down">&#8595;</div>
        </div>
        {#if paneVisbility.beyondMaps}
        <div class = "collapse__body"  transition:slide>    
            <h3>So where's the map?</h3> 
            <p>As alluded to above, the challenge of developing a visual scoring display is not <i>overly</i> difficult, particularly when you have access to the <i>right</i> data (which is a complicated challenge!). Similarly, placing geolocated data on a map is not not overly difficult, paricularly with existing tools, including those already in the OSM ecosystem. To be honest we really didn't wan't to build another cartographic visualisation...but we could add one. 
            </p>
            <p>What we really wanted to explore with <i>Holocene</i> was the potential to not only use OSM data to create meaningful measures (i.e.Facet Composer); but to invent new ways for users to play with and manipulate data to develop fresh insights into SDG-related problems. This brings us to last, speculative part of <i>Holocene</i>that we've childishly codenamed...the <i><em>Holodeck</em></i>.
            </p>
        </div>
        {/if}

        <div class = "down-button-container">
            <DownArrow handler={changeSubsection} section="explore" target="holodeck"/>
        </div>

    </div>
</section>



<!-- STYLES -->
<style>
    section{
        display:            grid;
        grid-template-rows: repeat(3, 1fr);
        width:              100%;
        color:              var(--primary03);
        padding-bottom:      15vh;
    }

    h1, h3{
        margin-block-end:   0;
    }
    .bg-container{
        grid-area:          1 / 1 / 4/ 2;     
        display:            grid;   
        align-items:        center;
        justify-items:      center;
        width:              100%;
        z-index:            -10;
    }
    .subsection-content-wrapper{
        /* pointer-events:     none;; */
    }
    .down-button-container{
        margin-top:         5vh;
    }

</style>
