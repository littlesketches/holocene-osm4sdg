<script>
    import * as geolib          from 'geolib'
    import Loader               from "../../shared/Loader.svelte";
    import RightArrow           from '../../shared/RightArrow.svelte' 
    import SdgDivider           from '../../shared/SdgDivider.svelte';
    import CheckOutline         from "svelte-material-icons/CheckOutline.svelte";
    import { fixPathDirection } from "../../../lib/utils/helpers.js";
    import { ui }               from "../../../data/stores/ui.js";
    import { data }             from "../../../data/stores/data.js";
    import { schema }           from "../../../data/stores/schema.js";
    import { 
        queryOverpass,
        createQuery, 
        createBuildingsQuery,
        getOverpassBoundaryByNode
    }   from "../../../data/api/overpass.js"
    import { 
        facetModel, 
        facetModelCurrent, 
        facetModelHistorical,
        facetBoundaryTypeCheck,
    }  from "../../../data/model/osm/facetModel.js"

    // Navigation
    const handleUpdateSection = () => $ui.view.section ='explore'

    // Function to query Overpass for OSM data (for searched area)
    async function getOsmData(queryBody){
        console.log('>>> USER EXECUTED QUERY FOR OSM DATA...')
        const query = createQuery($data.osm.selected.areaName, $data.osm.selected.location.geom.overpassBounds , queryBody)
        const osmResults = await queryOverpass(query)
        console.log('Summary of Overpass/OSM query: ', { 
            area: $data.osm.selected.areaName,
            queryBody, 
            osmResults
        })
        return osmResults
    }; // end getOsmData()


    // Function to query Overpass for OSM Buildings data 
    async function getOsmBuildingsData(areaName = $data.osm.selected.areaName, bounds = $data.osm.selected.location.geom.overpassBounds){
        $ui.data.loadingState.buildings = true
        console.log(`>>> USER EXECUTED QUERY FOR OSM BUILDINGS DATA FOR ${areaName}`)
        if ( !areaName || !bounds ) return 

        // Create query and store results to data store
        let  query = createBuildingsQuery(areaName, bounds)      
        $data.osm.response.buildings   = await queryOverpass(query, 'data')

        // Check response for elements and if none, rerun query without the are (i.e. use bounding box as fallack)
        if($data.osm.response.buildings.elements.length === 0 ){
            console.log('...no data. Retrying without area namge bounds')
            $data.osm.selected.location.geom.useBoundary = true
            query = createBuildingsQuery(null, bounds)      
            $data.osm.response.buildings   = await queryOverpass(query, 'data')
        }

        console.log('~~~ Buildings data received and stored. Urban vis component loading')

        console.log('Summary of Overpass/OSM query: ', { 
            area: $data.osm.selected.areaName,
            query, 
            response: $data.osm.response.buildings 
        })

        $ui.data.loadingState.buildings = false     
        $ui.data.responseState.buildings = true     
        $ui.state.vis.cityScape.render = true     
    }; // end getOsmBuildingsData()


    // Function to get Facet data from OSM 
    async function getFacetData(){
        console.log('>>> USER EXECUTED QUERY FOR FACET MODEL DATA...')
        $ui.data.loadingState.facets = true

        $data.osm.response.byFacet = await facetModelCurrent(
            $schema.data.osm.facets, 
            $data.osm.selected.areaName, 
            $data.osm.selected.location.geom.overpassBounds, 
            $data.osm.selected.useAreaSearch
        )
        $ui.data.loadingState.facets = false
        $ui.data.responseState.facets = true
        $ui.state.vis.facetSDGVis.dataState = 'currentData' // Force a component reload

        console.log($data.osm.response)   
    }; // end getFacetsData()


    async function getFacetHistoricalData(){
        $ui.data.loadingState.facetHistory = true

        await facetModelHistorical(
            $data.osm.response.byFacet,
            $schema.data.osm.facets, 
            $data.osm.selected.areaName, 
            $data.osm.selected.location.geom.overpassBounds, 
            $schema.time.datesByYearAgo, 
        )
        $ui.data.loadingState.facetHistory = false
        $ui.data.responseState.facetHistory = true
        $ui.state.vis.facetSDGVis.dataState = 'allData' // Force a component reload
    }; // getFacetHistoricalData()


    async function getFacetBenchmarkData(){
        $ui.data.loadingState.benchmarks = true
        $data.osm.response.benchmarks = []
console.log($schema.data.osm.benchmarks)
        for( const obj of $schema.data.osm.benchmarks){
            console.log(`Getting facet data for ${obj.areaName}, nodeID of ${obj.node} `)

            const boundaryNode =  await getOverpassBoundaryByNode(obj.node)
console.log(boundaryNode)
            const osmPointsArray = boundaryNode.elements[0].members       
                        .filter(d => d.type === 'way' && d.role === 'outer')
                        .map(d => d.geometry.map(e => Object.values(e))),
                flattenedPointsArray = fixPathDirection(osmPointsArray).flat(),
                calculatedArea = geolib.getAreaOfPolygon(flattenedPointsArray),
                population = boundaryNode.elements[0].tags.population ? +boundaryNode.elements[0].tags.population : null,
                overpassBounds = [
                    boundaryNode.elements[0].bounds.minlat,       
                    boundaryNode.elements[0].bounds.minlon, 
                    boundaryNode.elements[0].bounds.maxlat, 
                    boundaryNode.elements[0].bounds.maxlon 
                ]

            const useAreaSearch = await facetBoundaryTypeCheck(obj.areaName, overpassBounds) 
            const facetData = await facetModelCurrent(
                    $schema.data.osm.facets, 
                    obj.areaName, 
                    overpassBounds, 
                    useAreaSearch
                )

            $data.osm.response.benchmarks.push({
                areaName:   obj.areaName,
                useAreaSearch,   calculatedArea, facetData
                // boundaryNode, // osmPointsArray, // flattenedPointsArray,
            })
        }
        $ui.data.loadingState.benchmarks = false
        $ui.data.responseState.benchmarks = true
        console.log({'Benchmark data': $data.osm.response.benchmarks})

        $data.osm.response.benchmarks = $data.osm.response.benchmarks
    }; // getFacetBenchmarkData()


    // Function reset the query options: assumes a query has failed and so just closes the loader status
    async function handleResetOptions(){
        $ui.data.loadingState.facets           = false,
        $ui.data.loadingState.facetHistory     = false,
        $ui.data.loadingState.benchmarks       = false,
        $ui.data.loadingState.buildings        = false
    }; // handleResetOptions

</script>



<!-- HTML COMPONENT MARKUP-->
<section id ="generate" class = "subsection">
    <div class = "bg-container">
        <!-- <Loader/>     -->
    </div>
    <div class = "subsection-content-wrapper">
        <h1>Generate data</h1>
        {#if !$data.osm.selected.areaNode}
        <p><i>Holocene</i> will query the <a target="_blank" href="https://wiki.openstreetmap.org/wiki/Overpass_API">Overpass API</a> to gather Facet data. However before this can happen, you'll need to select a city using the <i>Locate</i> section above. A preview of of the data query options is shown below. 
        </p>
        {:else}
        <p>We're now ready to grab some data for {$data.osm.selected.areaName}! <i>Holocene</i> retrieves OSM via the <a target="_blank" href="https://wiki.openstreetmap.org/wiki/Overpass_API">Overpass API</a>. This is a wonderful open source service but it can be quite fickle! <i>Holocene</i> does its best to queue as series of smaller requests (and not make too many at once), but this can still result in some errors on the API side; or sometimes it just responds much slower than other times. Hopefully this can be improved in the future. If it looks like a query is hanging <span class = "reset-queries" role="button" on:click={handleResetOptions} on:keydown={handleResetOptions}>click here to reset</span> the query options</p>
        {/if}

        <div class = 'query-option-container'> <!-- class:disabled={!$data.osm.selected.areaNode}> -->
            <h2 class = 'header'>Lets get some data!</h2>
            <div class = "data-buttons-container">
                <div class = "data-button-container" class:disabled={!$data.osm.selected.areaNode}>
                    {#if !$ui.data.responseState.facets}
                        {#if !$ui.data.loadingState.facets}
                        <button class = "data-button" on:click={getFacetData}>Get Facet data</button> {:else}<Loader/>{/if}
                        <div class ="data-description">This query retrieves Facet data from the Overpass API for each {#if $data.osm.response.byFacet} of the {$data.osm.response.byFacet.length} Facets{:else}Facet{/if}. This query should take about 2 seconds per facet.
                        </div>
                    {:else}
                         <div class ="data-response">
                            <div class = "icon"><CheckOutline/></div>
                            <div>Data retrieved!</div>
                        </div>
                        <div class ="data-description">
                            <p> Armed With the Facets data retrieved you can now visit the <i>Explore</i> section and see the Facet "scores" for {$data.osm.selected.areaName}.
                            </p>
                        </div>  
                    {/if}
                </div>

                <div class = "data-button-container">
                    {#if !$ui.data.responseState.benchmarks}
                        {#if !$ui.data.loadingState.benchmarks}
                        <button class = "data-button"on:click={getFacetBenchmarkData}>Get Facet benchmark data</button>{:else} <Loader/>{/if}
                        <div class ="data-description">
                            <p>This query will retrieve Facet data for  other locations to provide comparison data. The benchmarking feature is discussed in the <i>Explore</i> section. For now, a default of 3 other benchmark cities are requested, so this query should take about x4 the time of the "Get Facet data" query!.
                            </p>
                        </div>
                    {:else}
                         <div class ="data-response">
                            <div class = "icon"><CheckOutline/></div>
                            <div>Data retrieved!</div>
                        </div>
                        <div class ="data-description">
                            <p>Armed with the Facet benchmarks data, you can now visit the <i>Explore</i> section and see how Facet "scores" for {$data.osm.selected.areaName} compare to benchmark locations.
                            </p>
                        </div>  
                    {/if}
                </div>

                <div class = "data-button-container"  class:disabled={!$data.osm.selected.areaNode}>
                    {#if !$ui.data.responseState.buildings}
                        {#if !$ui.data.loadingState.buildings}
                        <button class = "data-button" on:click={() => getOsmBuildingsData($data.osm.selected.areaName, $data.osm.selected.location.geom.overpassBounds)}>Get geometry data</button>{:else} <Loader/>{/if}
                        <div class ="data-description">This query retrieves geometry data for buildings and roads. This feature is also discussed in more detail in the <i>Explore</i> section. It's just one query that can take anywhere from 5 to 60 seconds, depending on the size of the city.</div>
                    {:else}
                         <div class ="data-response">
                            <div class = "icon"><CheckOutline/></div>
                            <div>Data retrieved!</div>
                        </div>
                        <div class ="data-description">
                            <p>Building geometry data let's us build some really awesome representations of {$data.osm.selected.areaName} that might provide new and insightful ways to see and explore Facets and their connections to sustainable development all around us. These  ideas are discussed more at the conclusion of the <i>Explore</i> section.
                            </p>
                        </div>  
                    {/if}
                </div>
                
                <div class = "data-button-container" class:disabled={!$data.osm.selected.areaNode || !$ui.data.responseState.facets }>
                    {#if !$ui.data.responseState.facetHistory}
                        {#if !$ui.data.loadingState.facetHistory}
                        <button class = "data-button"on:click={getFacetHistoricalData}>Get Facet historical data</button>{:else}<Loader/>  {/if}
                        <div class ="data-description">This query will retrieve a historical series for each Facet. <em>Warning</em> the Overpass API is not optimised for querying historical datasets. It works, but it is really, <i>really</i> slow. It often takes more than 5 seconds per query, and we need to run every query for every date we want, for every Facet - so this one will take a few minutes and there's a high chance it will error out :( You can however, still use the <i>Explore</i> section without this data (or even while the query is running)</div>
                    {:else}
                         <div class ="data-response">
                            <div class = "icon"><CheckOutline/></div>
                            <div>Data retrieved!</div>
                        </div>
                        <div class ="data-description">
                            <p>Firstly, congratulations if this query didn't time out!! Now, armed with historical data, <i>Holocene</i> will show you trends about how Facet scores have changed over time.</p>
                        </div>  
                    {/if}
                </div> 
            </div>
        </div>
        <SdgDivider/>
        <div class = "right-button-container" on:click={handleUpdateSection} on:keydown={handleUpdateSection}>
            <RightArrow section={'compose'}/>
        </div>

    </div>
</section>



<!-- STYLES-->
<style>
    section{
        display:            grid;
    }
    .bg-container{
        grid-area:              1 / 1 / 4/ 2;     
        display:                grid;   
        align-items:            center;
        justify-items:          center;
        width:                  100%;
        height:                 100vh;
    }
    .query-option-container{
        margin-top:             10vh;
    }
    .data-buttons-container{
        display:                grid;
        /* grid-row-gap:           2.5vh; */
    }
    .data-button-container{
        display:                grid;
        grid-template-columns:  1fr 3fr;
        grid-column-gap:        2.5vw;
        border-top:             dotted var(--primary02) 1.5px;
        line-height:            1.5;
        font-size:              80%;
        padding:                1rem 0;
    }

    .disabled{
        pointer-events:     none;
    }
    .disabled  .data-description,
    .disabled  button{
        opacity:                0.5;
    }
    .data-button{
        min-height:             15vh;
    }
    button{
        font-weight:            700;
        margin:                 0;
        background-color:       transparent;
        color:                  var(--primary02);
        text-transform:         uppercase;
        letter-spacing:         0.05vw;
    }
    button:hover{
        background-color:   var(--primary02);
        color:              #fff
    }
    .data-description p:first-of-type{
        margin-block-start:     0;
    }
    .data-description p:last-of-type{
        margin-block-end:       0;
    }
    .data-response * {
        margin:                 0;
        text-align:             center;
        font-weight:            700;
    }
    .icon{
        font-size:              300%;
        line-height:            1;
        margin-bottom:          -0.25rem;
    }

    .reset-queries{
        cursor:                 pointer;
        font-weight:            600;
        text-decoration:        underline;
    }
    .reset-queries:hover{
        font-weight:            700;
    }

    .right-button-container{
        margin-top:             5vh;
        display:                flex;
        justify-content:        center;
    }


    /* Media Query for low resolution  Tablets, Ipads */
    @media (max-width: 767px) {
        .data-button-container{
            grid-template-columns:  1fr;
        }
        .data-button{
            min-height:             7.5vh;
        }
        button{
            margin-bottom:          1rem;
        }
    }
</style>