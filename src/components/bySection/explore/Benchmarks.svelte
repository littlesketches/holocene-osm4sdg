<!-- DATA BENCHMARKING COMPONENT -->
<script>
    import * as d3              from 'd3'
    import { slide }            from 'svelte/transition';
    import { data}              from "../../../data/stores/data.js"; 
    import { ui }               from "../../../data/stores/ui.js"; 
    import { schema }           from "../../../data/stores/schema.js"; 
    import DownArrow            from '../../shared/DownArrow.svelte'
    import { changeSubsection } from '../../../lib/utils/nav.js';


    ////// COLLAPSIBLE PANES AND UI ////
	const paneVisbility= {
        whyBenchmark:             false,
        whyDefaults:             false,
    }
    function togglePane(){
        Object.keys(paneVisbility).map( key => {
            if(this.id !== key){ paneVisbility[key] = false }
        })
        paneVisbility[this.id] = ! paneVisbility[this.id]
    };

</script>

<!-- HTML COMPONENT MARKUP -->
<section id ="benchmark" class = "subsection">
    <div class = "subsection-content-wrapper">
        <h1>Facet benchmarking</h1>
        <p>This table compares Facet scores for {#if $data.osm.selected.areaName} {$data.osm.selected.areaName} {:else} a selected city {/if} against a handful of other cities. Here, Facet scores (i.e. counts of OSM objects) are <i>normalised</i> by dividing the raw score by the estimated physical area of each city. 
        </p>

        <div id = "whyBenchmark" class="collapse__header" type="button" 
            class:selected="{paneVisbility.whyBenchmark}" on:click={togglePane}  on:keydown={togglePane}>
            <div class='toggle-label'>Learn more about Facet benchmarking</div>
            <div class="toggle-icon down">&#8595;</div>
        </div>
        {#if paneVisbility.whyBenchmark}
        <div class = "collapse__body"  transition:slide>    
            <p>Facets do provide tangible quantitative measures, however data without context is pretty meaningless. Tracking Facets over time is useful for understanding progress in a location. But can also be interesting to compare Facets across different cities. This is where benchmark cities come in.
            </p>
            <p>These benchmarking cities have been (semi) randomly chosen to demonstrate how this feature works in <i>Holocen</i>. In the future you'll be able to search for and choose your own benchmark cities, and potentially choose different denominator for normalisation (e.g. population, where it exists in OSM or elsewhere). 
            </p>
            <p>Benchmark facet scores are shown with a background circle that represents the relative difference between {#if $data.osm.selected.areaName} {$data.osm.selected.areaName} {:else} a selected city {/if} and the score for the benchmark. These circles are colour coded to let you know where a benchmark score is above (green) or below (red) the relative score {#if $data.osm.selected.areaName} in {$data.osm.selected.areaName} {:else} in the selected city {/if}.
            </p>
        </div>
        {/if}


    </div>

    <div class= "benchmark-table-container">
        {#if $data.osm.selected.areaName}
            {#if  $data.osm.response.benchmarks && $data.osm.response.byFacet}
            <table>
                <!-- TABLE HEADER SECTION -->
                <thead>
                    <tr class ="target-header-row targets">
                        <th class="facet-header-container" rowspan="2">
                            <div class ="facet-header">Facet</div>
                        </th>
                        <th class = "benchmark-heading" colspan={1 + $schema.data.osm.benchmarks.length }>
                            Facet score per km<sup style="font-size:50%">2</sup> of city area
                        </th>
                    </tr>
                    <tr>
                        <th class = 'benchmark-header-container selected-city'>
                            <div class = 'bm-name '>
                                {#if $data.osm.selected.areaName}{$data.osm.selected.areaName}{:else}-{/if}
                            </div>
                            <div class = 'bm-country'>
                                {#if $data.osm.selected.areaName}{$data.osm.selected.location.data.country}{:else}-{/if}
                            </div>
                        </th>
                        {#each $schema.data.osm.benchmarks as d }
                        <th class = 'benchmark-header-container benchmark'>
                            <div class = 'bm-name'>{@html d.areaName}</div>
                            <div class = 'bm-country'>{@html d.country}</div>
                        </th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each $schema.data.osm.facets as facetObj, i}
                    {@const cityScore = +$data.osm.response.byFacet[i].today.tags.total / ($data.osm.selected.location.data.area / 1000000)}
                    {@const baseRadius = 25}
                    {@const viewBox = `0 0 ${baseRadius * 6} ${baseRadius * 6}`}
                    <tr class ="facet-row" >
                        <td class = "facet-label-container" facetIndex = {i}>
                            <div> {@html facetObj.name}</div>
                        </td>
                        <td class = 'data selected-city'>
                            <div class = "facet-value-container">
                                <svg viewBox = {viewBox} class = 'facet-circle'>
                                    <circle class = "city-circle" cx = {baseRadius * 3} cy = {baseRadius * 3} r = {baseRadius}/>
                                    <text class = "facet-value" x = {baseRadius * 3} y = {baseRadius * 3 + 10} >
                                        {#if $data.osm.response.byFacet}
                                        {@html d3.format(',.1f')(cityScore)}{:else}-{/if}
                                    </text>
                                </svg>
                            </div>                                
                        </td>
                        {#if $data.osm.response.benchmarks}
                        {#each $data.osm.response.benchmarks as d }
                            {@const facetCount = +d.facetData[i].today.tags.total}
                            {@const area = +d.calculatedArea/1000000}
                            {@const bmScore = facetCount / area}
                            {@const minScore = cityScore === 0 ? 0.01 : cityScore}
                            {@const bmRadius = Math.sqrt(bmScore / cityScore) * baseRadius}
                            {@const comparison =  bmScore === cityScore ? 'same' : bmScore > cityScore ? 'above' : 'below' }
                            <td class = 'data benchmark'>
                                <div class = "facet-value-container">
                                    <svg viewBox = {viewBox}  class = "facet-circle benchmark {comparison}">
                                        <circle class = "facet-circle benchmark {comparison}" cx = {baseRadius * 3} cy = {baseRadius * 3} r = {bmRadius}/>
                                        <text class = "facet-value" x = {baseRadius * 3} y = {baseRadius * 3 + 10} >
                                             {@html d3.format(',.1f')(bmScore)}  
                                        </text>
                                    </svg>
                                </div>
       
                            </td>
                        {/each}
                        {/if}
                    </tr>
                    {/each}
                </tbody>
            </table>
            {:else}
            <div class = 'note'>Please note that benchmark data needs to be generated for the current Facets in the <i>Compose</i> section before benchmarks can be generated</div>
            {/if}
        {:else}
        <div class = 'note'>Please note that a city needs to be located in the <i>Compose</i> section before the Facet benchmarks can be generated</div>
        {/if}
    </div>


    <div class = "down-button-container">
        <DownArrow handler={changeSubsection} target="beyond" section="explore"/>
    </div> 


</section>


<!-- STYLES -->
<style>
    .note{
        font-weight:            600;
        width:                  50vw;
        text-align:             center;
        color:                  var(--primary02);
        line-height:            1.25;
        font-size:              70%;
    }
    .benchmark-table-container{
        overflow:               scroll;
        padding-bottom:         5vh;
        max-width:              70vw
    }
    table{
        width:                  100%;
        border-collapse:        collapse;
        margin-top:             10vh;
        font-size:              70%;
        line-height:            1.25;
    }
    table,
    thead{
        border-bottom:          2px  solid;
    }
    th{
        line-height:            1.25;
    }
    .facet-header{
        font-size:              150%;
    }

    .benchmark-heading{
        padding-bottom:          0.5rem;
        border-bottom:              solid 1px var(--primary03);
    }
    .benchmark-header-container{
        padding:                0.5rem 0;
    }
    td{
        border-bottom:          0.5px  solid lightgray;       
    }
    .data{ 
        text-align:             center;
    }
    .selected-city{
        color:                  var(--primary01);
    }
    .facet-header-container{
        width:                  30%;
        text-align:             left;
    }
    .facet-label-container{
        font-size:              80%;
        font-weight:            600;
    }
    .bm-country{
        font-size:              80%;
    }
    .facet-value-container{
        display:                flex;
        justify-content:         center;
        align-content:          center;
    }
    .facet-circle{
        height:                 3rem;
    }
    svg{
        overflow: visible;
    }
        circle{
            fill:               none;
            mix-blend-mode:     hard-light;
        }
        circle.city-circle,
        circle.same{
            fill:               var(--primary01);
            fill-opacity:       0.1;
        }
        circle.above{
            fill:               var(--secondary02);
            fill-opacity:       0.5;
        }
        circle.below{
            fill:             var(--primary02);
            fill-opacity:       0.5;
        }
        .facet-value {
            fill:           var(--primary01);
            font-size:              30px;
            text-anchor:            middle;
            font-weight:            600;
            text-shadow:            0.5px 0.5px  1px #fff, 
                                    1.5px 1.5px  2px #fff, 
                                    -0.5px -0.5px 1px #fff,
                                    -1.5px -1.5px 2px #fff ;
        }

</style>
