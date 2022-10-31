<!-- TITLE PAGE FOR THE EXPLORE SECTION-->
<script>
    import DownArrow            from '../../shared/DownArrow.svelte'
    import Region               from '../../vis/Region.svelte';
    import { changeSubsection } from '../../../lib/utils/nav.js'
    import { ui }               from '../../../data/stores/ui.js'
    import { data }             from '../../../data/stores/data.js'
</script>


<!-- HTML COMPONENT MARKUP-->
<section id ="explore-title" class = "subsection">    
    <div class = "bg-container">
        {#if $ui.state.bySection.compose.mapRendered}
        <Region/>
        {/if}
    </div>
    <div class = "title-container">
        <h1>See facets of {#if $data.osm.selected.areaName} {$data.osm.selected.areaName} {:else} the city {/if}</h1>
        <p>Use this section to <em>understand</em> the connections between Facets and SDGs, and to <em>benchmark</em> this data.
        </p>
    </div>
    <div class = "down-button-container">
        <DownArrow handler={changeSubsection} target="facets" section="explore"/>
    </div>
</section>


<!-- STYLES-->
<style>
    h1{
        font-size:          8vw;
        line-height:        1.1;
        text-shadow:        
            1px 1px 1px #fff,
            2px 2px 2px #fff,
            5px 5px 5px #fff,
           -1px -1px 1px #fff,
           -2px -2px 2px #fff,
           -5px -5px 5px #fff;
    }
    p{
        font-size:          125%;
        line-height:        1.5;
    }
    section{
        display:            grid;
        width:              100%;
        color:              var(--primary03);
    }
    .bg-container{
        grid-area:          1 / 1 / 4/ 2;     
        display:            grid;   
        align-items:        center;
        justify-items:      center;
        width:              100%;
        z-index:            -4
    }
    .title-container{
        grid-area:          2 / 1 / 3/ 2;  
        margin:             0% 25%;
        color:              var(--primary03);
    }
    .down-button-container{
        margin-bottom:          5vh;
    }
    @media (max-width: 1024px){
        .title-container{
            margin:             0% 15%;

        }
    }
</style>