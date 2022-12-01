<!-- OSM DATA SUMMARY SECTION  -->
<script>
    import FacetMap     from '../../vis/FacetMap.svelte' 
    import { schema }   from "../../../data/stores/schema.js"; 
    import { ui }       from "../../../data/stores/ui.js"; 
    import { data }     from "../../../data/stores/data.js"; 
    import { slide }    from 'svelte/transition';

    // Variables to write commentary
    const yearsAgo = $schema.time.historicalYearsAgo ? $schema.time.historicalYearsAgo[$schema.time.historicalYearsAgo.length -1] : null,
        yearsAgoLabel = yearsAgo === 1 ? '1 year' : `${yearsAgo} years`

    ////// COLLAPSIBLE PANES AND UI ////
	const paneVisbility= {
        howToRead:             false,
    }

    function togglePane(){
        Object.keys(paneVisbility).map( key => {
            if(this.id !== key){ paneVisbility[key] = false }
        })
        paneVisbility[this.id] = ! paneVisbility[this.id]
    };


</script>

<!-- HTML COMPONENT MAKRUP -->
<section id ="facets" class = "subsection">

    <div class = "subsection-content-wrapper">
        <h1>SDG Facet map</h1>
        {#if $schema.data.osm.facets.length === 0} 
        <p>WHen Facets are set up, this interactive visualisation will show an overview of the volumes and trends for modelled Facets.
        </p>
        <p class = "note">Please note that Facet data visualisation components require a location to be selected and for data be retrieved from the <i>Compose</i> section. Retrieved data will be shown.</p>

        {:else}
        <p>This interactive visualisation is designed to provide an overview of the volumes and trends for {#if $schema.data.osm.facets.length > 1} all {$schema.data.osm.facets.length} configured Facets {:else} the one configured data facet{/if}, together with the connections between Facets and each SDG, target and indicator. 
        </p>    
        {/if}
        <div id = "howToRead" class="collapse__header" type="button" 
            class:selected="{paneVisbility.howToRead}" on:click={togglePane}  on:keydown={togglePane}>
            <div class='toggle-label'>How to read this visualisation</div>
            <div class="toggle-icon down">&#8595;</div>
        </div>
        {#if paneVisbility.howToRead}
        <div class = "collapse__body"  transition:slide>    
            <p>This graphic is designed for larger screens - there's a quite a bit going on! Each Facet is presented  on the left as a 'pill' that shows summary graphs for: the count of how many objects (by types of <a class = 'link node' href='https://wiki.openstreetmap.org/wiki/Node'>nodes</a>, <a class = 'link way' href="https://wiki.openstreetmap.org/wiki/Way">ways</a> and <a class = 'link relation' href="https://wiki.openstreetmap.org/wiki/Relation">relations</a>) are currently in OSM {#if $data.osm.selected.areaName} in {$data.osm.selected.areaName}{:else}{#if yearsAgoLabel}; and  a trendline over the past {yearsAgoLabel}.{:else}.{/if}
            {/if}
            <p>More details and data about a Facet can be viewed by tapping on it. 
            </p>
            <p>Connections between each Facet and their mapped SDG indicators and targets are shown as links of smaller and larger widths, which indicate the strength of impact. The direction or polarity of impact are denoted by link colour: green (positive) means that a higher Facet score should help towards achieving SDGs, while red (negative) links mean the opposite.
            </p> 
            <p>Only one SDG is shown at a time, however you can navigate through all of the SDGs to see how these Facets are connected to all areas of sustainable development.
            </p>
        </div>
        {/if}
    </div>

    <!-- FACETxSDG VISUALISATION COMPONENT-->
    {#if $ui.state.vis.facetSDGVis.dataState === 'noData'}
    <FacetMap dataState={'noData'}/>
    {:else if $ui.state.vis.facetSDGVis.dataState === 'currentData'}
    <FacetMap dataState={'currentData'}/>
    {:else if $ui.state.vis.facetSDGVis.dataState === 'allData'}
    <FacetMap dataState={'allData'}/>
    {/if}

</section>



<!-- STYLES -->
<style>
    h1, h2{
        text-align:         center;
    }
    .link.node{
        color:          var(--primary02);
    }
    .link.way{
        color:          var(--secondary01);
    }
    .link.relation{
        color:          var(--secondary02   );
    }
    .note{
        font-weight:            600;
        /* width:                  80%; */
        text-align:             center;
        color:                  var(--primary02);
        font-size:              70%;
        line-height:            1.25;
    }
</style>
