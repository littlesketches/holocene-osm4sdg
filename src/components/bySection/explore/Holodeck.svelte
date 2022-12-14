<!-- BEYOND DATA / THREEJS SCENE COMPONENT -->
<script>
    import CityScape            from '../../vis/CityScape.svelte'
    import SdgDivider            from '../../shared/SdgDivider.svelte'
    import UpArrow              from '../../shared/UpArrow.svelte'
    import ArrowLeft            from "svelte-material-icons/ArrowLeft.svelte";
    import ArrowRight           from "svelte-material-icons/ArrowRight.svelte";
    import { ui }               from '../../../data/stores/ui.js'
    import { data }             from '../../../data/stores/data.js'
    import { changeSubsection }  from '../../../lib/utils/nav.js';
    import { slide }            from 'svelte/transition';

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

    let currentEffect = 0

    const effects = {
        0: function(){ // Noe
                window.experience.postProcessing.effects.filmPass.enabled = false
                window.experience.postProcessing.effects.unrealBloomPass.enabled = false
        },
        1: function(){  // Blooom
                window.experience.postProcessing.effects.unrealBloomPass.enabled = true
                window.experience.postProcessing.effects.sobelPass.enabled = false
        },       
        2: function(){ // Sobel
                window.experience.postProcessing.effects.unrealBloomPass.enabled = false
                window.experience.postProcessing.effects.sobelPass.enabled = true
                window.experience.postProcessing.effects.halftonePass.enabled = false
        },            
        3: function(){ // RGB Halfrot
                window.experience.postProcessing.effects.sobelPass.enabled = false
                window.experience.postProcessing.effects.halftonePass.enabled = true
                window.experience.postProcessing.effects.filmPass.enabled = false
        },     
        4: function(){ // Filmpass
                window.experience.postProcessing.effects.halftonePass.enabled = false
                window.experience.postProcessing.effects.filmPass.enabled = true
        }                  
    }

    function handleEffectChange(){
        if(this.getAttribute('dir') === 'next' ){
            currentEffect = (currentEffect+1) % (Object.keys(effects).length)
        } else {
            currentEffect = currentEffect > 0 ? currentEffect -1 :  Object.keys(effects).length -1
        }
        effects[currentEffect]()
    };
</script>


<!-- HTML COMPONENT MARKUP -->
<section id ="holodeck" class = "subsection">
    <div class = "subsection-content-wrapper">
        <h1>The Holodeck</h1>
        <SdgDivider/>
        <p>The <i><em>Holodeck</em></i> uses OSM data to construct a potentially explorable and interactive 3D version of {#if $data.osm.selected.areaName} {$data.osm.selected.areaName}{:else} a city{/if}, right inside your browser! Now there is the brilliant <a href="https://osmbuildings.org/" target="_blank">OSM Buildings project</a> that does something similar, however we believe that by having a fully customisable miniature world unlocks enormous potential for more creative, more powerful and more engaging data visualisations and representations. You can think of our <i>Holodeck</i> much like its namesake &mdash; as <em>a platform for imagination and storytelling</em>. And we think imagination and storytelling are sorely needed for humanity to achieve the Sustainable Development Goals.</p>

        <div id = "oss4sdg" class="collapse__header" type="button" 
            class:selected="{paneVisbility.oss4sdg}" on:click={togglePane}  on:keydown={togglePane}>
            <div class='toggle-label'>Operating manual for the Holodeck</div>
            <div class="toggle-icon down">&#8595;</div>
        </div>
        {#if paneVisbility.oss4sdg}
        <div class = "collapse__body"  transition:slide>   
            <h3>Operating manual the Holodeck</h3> 
            <p>There isn't much to this visualation right now. However this is built in WebGL with the phenomenal <a href="https://threejs.org/">ThreeJS</a> and has <i>orbit controls</i> added. This means you can navigate around the scene with your mouse or touchscreen. Orbit controls can be quite tricky if you've never used 3D software, but you can click and drag to 'spin' the world (horizontally or vertically) around an focal point, use the mouse scroll wheel (or pinch on touchscreens) to zoom into that focal point, and right click and drag (or two finger drag on touchscreen) to move that focal point. It does take a little getting used but hopefully you can get a glimpse in to how powerful it is to 'move around' the space and see the city from different perspectives.
            </p>
            <p>We hope to add more data visualisation elements (including Facets) soon. But for now - given this data has OSM building tags - buildings are colour coded by their 'type' value (using colours from the SDG palette!). Oh and we've added a few post-processing effects, mainly for fun, but to also spark your imagination about others ways to represent real world data.
            </p>
        </div>
        {/if}
    </div>
    {#if !$ui.state.vis.cityScape.render}
     <div class = 'note'>To build the Holodeck you will need to click on "Get geometry data" in the <i>Compose</i> section!</div> 
    {/if}
</section>

<section id ="holodeck-model" class = "subsection">
    {#if $ui.state.vis.cityScape.render}
    <div class = "holodeck-controls-container">
        <div class="up-arrow-container"><UpArrow handler={changeSubsection} section="explore" target="holodeck"/>
        </div>

        <div class = "holodeck-header">
            <div class = 'holo-button' dir="prev" on:click={handleEffectChange} on:keydown={handleEffectChange}> <ArrowLeft/></div>
             <div class = 'holo-header'>holocene</div>
            <div class = 'holo-button' dir="next" on:click={handleEffectChange} on:keydown={handleEffectChange}> <ArrowRight/></div>
        </div>
    </div>
    <div class = "canvas-container">
        {#if $ui.data.responseState.buildings}        
        <CityScape/>
        {/if}
    </div>
    {/if}
</section>

<!-- STYLES -->
<style>
    section{
        display:            grid;
        width:              100%;
        color:              var(--primary03);
        min-height:         100vh;
        padding-bottom:      0;
    }
    h1, h3{
        margin-block-end:   0;
    }

    #holodeck-model{
        grid-template-columns:  1fr;
        grid-template-rows:     1fr 5fr;
    }
    .canvas-container{
        grid-area:              1 / 1 / 3 / 2;
        z-index:                5  ;
    }
    .holodeck-controls-container{
        margin-top:             2.5vh;
        grid-area:              1 / 1 / 2 / 2;
        z-index:                10   ;
        display:                grid;
        grid-template-columns:  1fr 1fr 1fr;
        grid-template-rows:     auto;
        width:                  100%;
        align-items:            start  ;

    }
    .holo-header{
        pointer-events:         none;
    }
    .holo-button{
        cursor:                 pointer;
        transition:             all 200ms;
    }
    .holo-button:hover{
        transform:              scale(1.2);
    }

    .up-arrow-container,
    .holodeck-header{
        grid-area:              1 / 2 / 2 / 3;
        display:                flex;
        align-content:          start;
        justify-content:        center;
        align-items:            center;
    }
    .holodeck-header{
        /* pointer-events:         none; */
        margin-block-start:     10vh;
        margin-block-end:       0;
        align-content:          end;
        font-size:              300%;
        letter-spacing:         0.25vw;
    }

    .note{
        font-weight:            600;
        width:                  50%;
        text-align:             center;
        color:                  var(--primary02);
        line-height:            1.25;
        font-size:              70%;
    }
</style>
