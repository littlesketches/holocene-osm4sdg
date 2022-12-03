<!-- COMPONENT FOR OSM LOCATION SEARCH (Nominatim) AND GETTING GEOMETRY/BOUNDARY NODE (OVERPASS)-->
<script>
	import { fade, fly }            from 'svelte/transition';
    import * as geolib              from 'geolib'
    import * as d3                  from 'd3'
    import Map                      from "../../vis/Map.svelte";
    import Region                   from "../../vis/Region.svelte";
    import DownArrow                from "../../shared/DownArrow.svelte";
    import ChevronUp                from "svelte-material-icons/ChevronUp.svelte";
    import Magnify                  from "svelte-material-icons/Magnify.svelte";
    import Loader                   from '../../shared/Loader.svelte';
    import { ui }                   from "../../../data/stores/ui.js";
    import { data }                 from "../../../data/stores/data.js";
    import { changeSubsection }     from "../../../lib/utils/nav.js";
    import { fixPathDirection }     from "../../../lib/utils/helpers.js";
    import { OsmStore }             from '../../../data/model/osm/defaults/osmStore.js'
    import { getNominatim }          from "../../../data/api/nominatim.js"
    import { getOverpassBoundaryByNode }    from "../../../data/api/overpass.js"
    import { facetBoundaryTypeCheck }       from "../../../data/model/osm/facetModel.js"


    // Dynamic variables 
    $: state = {     // State for Nominatim location search
        searching:              false,
        searchResult:           null,
        searchSelectionIndex:   0,       // Index of search result array
    }
    $: cityName         = null      


    /// HANDLER FUNCTIONS
    // Function to handle search bar search and display results, including #1 ranke result as 'selected'
    async function handleSearch(){
        $data.osm.selected.location.geom.pointsArray = null

        if($data.osm.query.searchInput === ''){
            console.log('*** USER SUBMITTED EMPTY LOCATION SEARCH: not executed')
        } else {
            console.log('>>> USER SUBMITTED LOCATION SEARCH FOR: ', $data.osm.query.searchInput)
            // Execute Nomatim search
            state.searching = true
            state.searchResult = await getNominatim($data.osm.query.searchInput)
            state.searching = false

            cityName = state.searchResult[0].display_name
            // Store Nomatim for first (highest ranked) result
            await storeNominatimData(state.searchResult[0])

            // Execute OverPass node query for first (highest ranked) result (triggers UI update)
            await getOverpassGeom(state.searchResult[0])

            // Check whether boundary works for retrieving
            $data.osm.selected.useAreaSearch = await facetBoundaryTypeCheck( $data.osm.selected.areaName, $data.osm.selected.location.geom.overpassBounds)
        }
    }; // end handleSearch()

    // Function to reset the search bar and clear any stored search data
    async function handleResetSearch() {
        console.log(">>> RESETTING SEARCH")
        $data.osm.query.searchInput     = ''
        state.searchResult              = null
        state.searchSelectionIndex      = null   
        cityName                        = null
        $ui.state.vis.cityScape.render  = null
        clearNominatimData()
        clearOverpassGeomData()

        $ui.data = {
            loadingState: {
                facets:             false,
                facetHistory:       false,
                benchmarks:         false,
                buildings:          false
            }, 
            responseState: {
                facets:             false,
                facetHistory:       false,
                benchmarks:         false,
                buildings:          false
            }
        }


    }; // end handleResetSearch()

    // Function to select another city option from the  dearch list
    async function handleUpdateFromList(){
        clearOverpassGeomData()
        cityName = null
        // Reset selections        
        state.searchSelectionIndex  =  +this.getAttribute('index')
        await getOverpassGeom(state.searchResult[state.searchSelectionIndex])              // Execute OverPass node query    
        cityName = state.searchResult[state.searchSelectionIndex].display_name             // Update UI
    }; // end selectSearchResultItem()


    // HELPER FUNCTIONS
        // Function to store Nominatim (search bar) data for 'selected' result
        async function storeNominatimData(nomObj){
            $data.osm.selected.areaNode = nomObj
            $data.osm.selected.areaName = nomObj.display_name.slice(0, nomObj.display_name.indexOf(","))
            $data.osm.selected.location.meta.nomamtimName = nomObj.display_name
            $data.osm.selected.location.meta.address = nomObj.address

            $data.osm.selected.location.geom.center = { lat: nomObj.lat, lon: nomObj.lon }
            $data.osm.selected.location.geom.NominatimBounds = nomObj.boundingBox
            console.log(`~~~ Stored Nominatim object data for ${$data.osm.selected.areaName}`, $data.osm.selected )
        };

        // Function to clear Nominatim data in $data store
        function clearNominatimData(nomObj){
            $data.osm.selected.areaNode = null
            $data.osm.selected.areaName = null
            $data.osm.selected.location.meta = new OsmStore().selected.location.meta

            $data.osm.selected.location.geom.center = null
            $data.osm.selected.location.geom.NominatimBounds = null

            console.log('*** STORED Nominatim DATA CLEARED')
        };

        // Function to query Overpass and store the geometry data from a node 
        async function getOverpassGeom(obj){
            if(typeof obj.osm_id !== 'undefined'){
                console.log(`--- BOUNDARY NODE FOUND >>> GETTING DATA FOR NODE ${obj.osm_id}`)

                // Setting a value for the selected.boundaryNode and location.geom.pointsArray will trigger the UI (incl. Map)
                $data.osm.selected.boundaryNode = await getOverpassBoundaryByNode(obj.osm_id)    
                if(!$data.osm.selected.boundaryNode) {
                    console.log('BOUNDARY NODE FAILED!!!')
                    return
                }
                $data.osm.selected.location.geom.osmPointsArray = $data.osm.selected.boundaryNode.elements[0].members       
                        .filter(d => d.type === 'way' && d.role === 'outer')
                        .map(d => d.geometry.map(e => Object.values(e)))
          
                $data.osm.selected.location.geom.flattenedPointsArray = fixPathDirection($data.osm.selected.location.geom.osmPointsArray).flat()

                console.log(`~~~ Geometry array extracted and updated (shown on Leaflef map)`)

                // Other data is stored
                $data.osm.selected.location.geom.overpassBounds = [
                    $data.osm.selected.boundaryNode.elements[0].bounds.minlat,       
                    $data.osm.selected.boundaryNode.elements[0].bounds.minlon, 
                    $data.osm.selected.boundaryNode.elements[0].bounds.maxlat, 
                    $data.osm.selected.boundaryNode.elements[0].bounds.maxlon 
                ]
                $data.osm.selected.location.tags = $data.osm.selected.boundaryNode.elements[0].tags

                $data.osm.selected.location.data.area        = geolib.getAreaOfPolygon($data.osm.selected.location.geom.flattenedPointsArray)      // Calculate are from boundary points
                $data.osm.selected.location.data.population  = $data.osm.selected.location.tags.population ? +$data.osm.selected.location.tags.population : null  
                $data.osm.selected.location.data.country     = $data.osm.selected.location.meta.address.country ? $data.osm.selected.location.meta.address.country : null  
                $data.osm.selected.location.data.countryCode     = $data.osm.selected.location.meta.address.country_code ? $data.osm.selected.location.meta.address.country_code : null  
                $data.osm.selected.location.data.state      = $data.osm.selected.location.meta.address.state ? $data.osm.selected.location.meta.address.state : null  

                console.log(`~~~ Metadata and key stats stored for boundary node`)
                console.log("Check of meta: ",  $data.osm.selected.location)

            } else {
                console.log('*** NO BOUNDARY NODE: no geometry shown', obj)
            }
        }; // end getOverpassGeom()

        // Function to clear Overpass (boundary node) data from $data store
        function clearOverpassGeomData(){
            $data.osm.selected.boundaryNode = null
            $data.osm.selected.location.tags = null
            $data.osm.selected.location.geom = new OsmStore().selected.location.geom

            console.log('*** STORED OVERPASS BOUNDARY GEOMETRY DATA CLEARED')
        }; // end clearOverpassGeom()

        // Function to clear Overpass "area", "feature" and "facet" model data 
        function clearOverpassResponseData(){
            $data.osm
            $ui.state.vis.cityScape.render = null
        };

</script>


<!-- HTML COMPONENT MARKUP-->
<section id="locate" class = "subsection">
    <div class = "subsection-content-wrapper">
        <div class = "title-container">
            <h1>Locate a city</h1>
            {#if !state.searchResult}
            <p transition:fade>We'll start by finding the place you're looking for. This search looks administrative boundaries in OSM, so in theory you can look for cities of communities of wildly different sizes. And if it doesn't already exist, you might even consider <a target = "_blank" href="https://wiki.openstreetmap.org/wiki/Contribute_map_data">contributing a boundary to OSM</a> yourself!</p>
            {/if}            
        </div>

        <!--- SEARCH BAR VIEW -->
        {#if !state.searchResult}
        <div>
            {#if !state.searching}
            <div class = "search-bar-container" >
                <input id="search-term" bind:value={$data.osm.query.searchInput} type="text" 
                    placeholder="Type in a search term">
                <div id="search-button" class="input-icon" role=“button”  on:click={handleSearch} on:keypress={handleSearch}>
                    <Magnify width="2em" height="2em"/>
                </div>
            </div>
            {#if $data.osm.query.searchInput}
            <div class="reminder" transition:fade>Click to run the search<ChevronUp/></div>
            {/if}
            <div class = "note">Hint: try adding more detail to your search term after a comma (','). For example, "Melbourne, Australia" will return a more focused result than just "Melbourne". A more accurate jurisdiction name like "City of Melbourne" might also improve your search results</div>
            {/if}
        </div>
        <!--- SEARCH RESULTS VIEW -->
        {:else}
        <h2 class = 'header' transition:fade>Search results for "{@html $data.osm.query.searchInput}"</h2>
        <div class = "results-container" transition:fly="{{ y: 50, duration: 200 }}">
            {#if state.searchResult.length > 0}
            <div class ="location-results-container"  transition:fade>
                <!-- Best match search result -->
                <div class="search-selection">
                    {#if $data.osm.selected.boundaryNode && $data.osm.selected.location.geom.osmPointsArray}
                    <Map geometryArray={$data.osm.selected.location.geom.osmPointsArray}/>
                    <div>
                        <h3>{@html cityName}</h3>
                    </div>
                    {#if $data.osm.selected.location.data.area}
                    <div class = "tag-container">
                        <div class = 'tag-label'> Estimated size:  </div>
                        <div class = 'tag-label'>
                            {d3.format(',.3r')($data.osm.selected.location.data.area/1000000)} km<sup style="font-size: 50%">2</sup>  
                        </div>
                    </div>
                    {/if}
                    {#if $data.osm.selected.location.data.population >0}
                    <div class = "tag-container">
                        <div class = 'tag-label'> Estimated population: </div>
                        <div class = 'tag-label'>
                            {d3.format(',')($data.osm.selected.location.data.population)} people
                        </div>
                    </div>
                    {/if}

                    {:else}
                    <div class = 'loader-container'>
                       <Loader/>
                    </div>
                    {/if}    
                </div>

                <!-- Other search results and options-->
                <div class="search-others">
                    <div>
                        <h3>Not what you're looking for?</h3>
                    </div>
                    {#if state.searchResult.length > 1}
                    <div>
                        <p>We found {@html state.searchResult.length} results for "{@html $data.osm.query.searchInput}". You can change the selected location by tapping a new selection from this list (of <a target="_blank" href="https://nominatim.openstreetmap.org/ui/">Nominatim "display names"</a>).
                        </p>
                        <ol class ="search-other-container">
                            {#each state.searchResult as d, i (i) }
                            <li class="search-return-item item-{i}" class:selected={state.searchSelectionIndex === i} index={i}
                                on:click={handleUpdateFromList} on:keypress={handleUpdateFromList} >
                                {@html d.display_name}
                            </li>
                            {/each}            
                        </ol>
                    </div>
                    {/if}
                    <p>If the city or community you're looking for isn't listed you can try a new search term.
                    <div class = "reset-search-container">
                        <button  class = "reset-search-button"on:click={handleResetSearch} on:keypress={handleResetSearch}>Search again</button>
                    </div>
                </div>

            </div>

            {:else}
            <div>
                <div>We couldn't find anything in OSM :(</div>
                <div class = "reset-search-container">
                    <button  class = "reset-search-button"on:click={handleResetSearch} on:keypress={handleResetSearch}>Search again?</button>
                </div>
            </div>
            {/if}
        </div>
        {/if}

        <!-- NAV TO NEXT-->
        <div class = "down-button-container" target="curate" on:click={changeSubsection} on:keypress={changeSubsection}>
            {#if !$data.osm.selected.boundaryNode}
            <div class = "down-button-label">Read on without <br>a selected location</div>
            {:else} 
            <div class = "down-button-label">Continue with<br>{$data.osm.selected.areaName}</div>
            {/if}   
            <DownArrow target={"generate"} handler={changeSubsection} section="compose"/>
        </div>
        
    </div>
</section>



<!-- STYLES -->
<style>
    .subsection-content-wrapper{
        display:                grid;
        grid-template-rows:     auto auto 1fr;
        min-height:             100vh;
    }
    .title-container{
        /* width:              0%; */
    }
     /** Search bar */
    .search-bar-container,
    .search-progress-container{
        grid-area:          2 / 1 / 3/ 2;
        display:            flex;
        width:              100%;
        align-items:        center;
        transition:         all 250ms;  
    }
    .search-bar-container{
        border-bottom:    	1px solid #000;
    }
    .down-button-container{
        display:            flex;
        flex-direction:     column;
        align-items:        center;
        align-self:         end;
        margin-top:         5vh;
        margin-bottom:      5vh;
    }
    .down-button-label{
        font-weight:        600;
        text-align:         center;
        line-height:        1.35;
        padding-bottom:     1rem
    }

    input:focus{
        outline:            none;
        background-color:   transparent;
    }

    #search-term{
        width:              100%;
        padding:            1rem 0rem 0.5rem;
        font-size:          1.25rem;
        font-weight:        700;
    }

    .input-icon{
        height:             100%;
        margin-bottom:     -1rem;
        cursor:             pointer;
        align-items:        center;
    }
    .input-icon:hover{
        color:              var(--primary03);
    }
    .loader-container{
        display:            flex;
        justify-content:   center;
    }

    /**** SEARCH ITEMS ****/
    .location-results-container{
        display:                grid;
        grid-template-columns:  3fr 2fr;     
        column-gap:             5vw;
    }
    .search-selection{
        grid-area:              1 / 1 / 2 / 2;
        padding:                2.5vw;
        height:                 fit-content;
        background:             var(--primary02);
        color:                  #fff;
        border-radius:          1.25vw;
    }
    .search-other-container{
        padding-inline-start:   1rem;
    }
    .search-return-item{
        cursor:                pointer;
        font-size:             80%;
    }  
    .search-return-item:hover{
        font-weight:            700;
    }   
    li.selected{
        font-weight:            700;
    }
    .tag-container{
        display:                grid;
        grid-template-columns:  1fr 1fr;
        justify-content:        end;
        align-content:          end;
        font-size:              70%;
        padding-top:            0.5rem
    }
    .tag-label,
    .tag-value{
        align-self:             baseline;
        line-height:            1.25;
    }

    /**** HELPERS  ****/
    .note{
        font-weight:        300;
        font-size:          70%;
        line-height:        1.25;
        padding-top:        2rem;
        font-style:         italic;
    }
    .reminder{
        font-size:          70%;
        text-align:         end;
    }

    /* Media Query for Mobile Devices */
    /* Media Query for low resolution  Tablets, Ipads */
    @media (max-width: 1024px){
        .location-results-container{
            grid-template-columns:  1fr;     
        }
        .note, .reminder, .title-container,
        .search-bar-container,
        .search-progress-container{
            width: 100%
        }
    }
        
    /* Media Query for Laptops and Desktops */
    @media (min-width: 1025px) and (max-width: 1280px){
        .location-results-container{
            grid-template-columns:  1fr;     
        }
    }
        
    /* Media Query for Large screens */
    @media (min-width: 1601px) {
        .note, .reminder, .title-container,
        .search-bar-container,
        .search-progress-container{
            width: 70%
        }
    }


</style>