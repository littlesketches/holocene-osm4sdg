<!-- COMPONENT FOR THE CURATE SUBSECTION -->
<script>
	import { fade, fly, slide } from 'svelte/transition';
    import { sum }              from "d3";
    import DownArrow            from '../../shared/DownArrow.svelte'

    import SdgDivider           from '../../shared/SdgDivider.svelte';
    import { ui }               from "../../../data/stores/ui.js";
    import { data }             from "../../../data/stores/data.js";
    import { schema }           from "../../../data/stores/schema.js";
    import { slugify }          from "../../../lib/utils/helpers.js"
    import { changeSubsection } from '../../../lib/utils/nav.js'

    import Settings             from "svelte-material-icons/Settings.svelte";
    import PlusCircleOutline    from "svelte-material-icons/PlusCircleOutline.svelte";
    import ChevronDoubleDown    from "svelte-material-icons/ChevronDoubleDown.svelte";
    import ChevronDoubleRight   from "svelte-material-icons/ChevronDoubleRight.svelte";
    import ArrowLeft            from "svelte-material-icons/ArrowLeft.svelte";
    import ArrowRight           from "svelte-material-icons/ArrowRight.svelte";
    import CloseThick           from "svelte-material-icons/CloseThick.svelte";
    import ChevronUp            from "svelte-material-icons/ChevronUp.svelte";
    import ChevronDown          from "svelte-material-icons/ChevronDown.svelte";

    const totalTargets = sum(Object.values($schema.sdgs).map(d => d.targetList.length))
    const totalIndicators =  sum(Object.values($schema.sdgs).map(d => Object.values(d.target)).flat().map(d => d.indicatorList.length))

    // Extract the table structure for the selected SDG
    $:  sdgObj       = $schema.sdgs[$ui.state.bySection.compose.sdg]
    $:  noTargets    = sdgObj.targetList.length
    $:  noIndicators = sum(
            Object.values(sdgObj.target)
                .map(d => d.indicatorList.filter(d => d !== "na").length)
        )


    $:  naIndicators = sum(
            Object.values(sdgObj.target)
                .map(d => d.indicatorList.filter(d => d === "na").length)
        )
    $: tableIndicators = noIndicators + naIndicators
    $: showIndicator = null

    ////// COLLAPSIBLE PANES AND UI ////
	const paneVisbility= {
        dataContext:             false,
        facetIntroduction:       false,
        facetComposer:           false,
        facetTableHowTo:         false
    }

    function togglePane(){
        Object.keys(paneVisbility).map( key => {
            if(this.id !== key){ paneVisbility[key] = false }
        })
        paneVisbility[this.id] = ! paneVisbility[this.id]
    };

    // Function to toggle and update mapped indicators (from HTML table)
    function handleIndicatorMapping(){  
     
        const direction          = this.getAttribute('direction'),
            facetIndex           = this.getAttribute('facetIndex'),
            indicatorCode        = this.getAttribute('i_code'),
            facet                = $schema.data.osm.facets[facetIndex],
            facetIndicatorIndex  = facet.indicators.map(d => d.code).indexOf(indicatorCode)         // -1 indicates a non-mapped facet
        let facetIndicatorImpact = facetIndicatorIndex > -1 ? facet.indicators[facetIndicatorIndex]['impact'] : 0

        switch(direction){
            case 'up':
                if(facetIndicatorImpact === 2) return 
                facetIndicatorImpact++
                break

            case 'down':
                if(facetIndicatorImpact === -2) return 
                facetIndicatorImpact--
                break
        }

        // Clear the classes for visual representation oif cells in the table
        const cell =  document.querySelector(`.indicator-map-cell.icode-${slugify(indicatorCode)}.facet-${facetIndex}`)
        const classes = ['positive', 'negative', 'impact1', 'impact2', 'impact-1', 'impact-2']
        for(const d of classes){ cell.classList.remove(d) }

        // For each case update the facet store data and the class of the 
        if(facetIndicatorIndex === -1 && facetIndicatorImpact !== 0){ // Add a new incdictor and impact
            facet.indicators = [...facet.indicators, {
                code:  indicatorCode,   impact: facetIndicatorImpact
            }]
            console.log("Add an indicator")

        } else if(facetIndicatorIndex > -1 && facetIndicatorImpact=== 0 ){  // Remove an indicator
            facet.indicators = facet.indicators.filter((d, i) => i !== facetIndicatorIndex)
            console.log("Remove an indicator")

        } else if(facetIndicatorIndex > -1 && facetIndicatorImpact !== 0 ){  // Update an indicator
            console.log("Update an indicator")
            facet.indicators[facetIndicatorIndex].impact =  facetIndicatorImpact
            facet.indicators = facet.indicators
        }


        if(facetIndicatorImpact > 0) {
            cell.classList.add('positive')
            cell.classList.add(`impact${facetIndicatorImpact}`)
        }
        if(facetIndicatorImpact < 0) {
            cell.classList.add('negative')
            cell.classList.add(`impact${facetIndicatorImpact}`)
        }
    
    }; // end handleIndicatorMapping()

    // Function to launch modal window for Facet editing
    function handleEditFacet(){
        $ui.modal.type = 'facetEdit'
        $ui.view.show.modal = true

        $ui.modal.facetIndex = +this.getAttribute('facetindex')
    }; // end handleEditFacet()

    // Function to launch modal window for adding a Facet
    function handleAddFacet(){
        $ui.modal.type = 'facetAdd'
        $ui.view.show.modal = true
    }; 

    // Function to launch modal for managing Facet save files 
    function handleManageFacets(){
        $ui.modal.type = 'facetManage'
        $ui.view.show.modal = true
    };

    // Function to change the SDG in view (via dynamic variable)
    function handleChangeSDG(){
        if(this.getAttribute('target') === 'next'){
            $ui.state.bySection.compose.sdg = +$ui.state.bySection.compose.sdg < Object.keys($schema.sdgs).length ? +$ui.state.bySection.compose.sdg + 1 : 1
        } else {
            $ui.state.bySection.compose.sdg = +$ui.state.bySection.compose.sdg > 1 ? +$ui.state.bySection.compose.sdg -1 : Object.keys($schema.sdgs).length
        }
    };

    // Function to change the SDG Target in view 
    function handleChangeTarget(){
        const targetList = sdgObj.targetList,
            currentIndex = targetList.indexOf(showIndicator)
        if(this.getAttribute('target') === 'next'){
            showIndicator = currentIndex < targetList.length - 1 ? targetList[currentIndex + 1] : targetList[0]
        } else {
            showIndicator = currentIndex > 0 ? targetList[currentIndex - 1] : targetList[targetList.length -1]
        }
    };

    // Function to show the indicator details
    function handleTargetDetails(){
        showIndicator = this.getAttribute('targetCode')         
console.log(showIndicator)   
        const targetCode = this.getAttribute('targetCode')
    };

    // Function to show the fisrt target details
    function openTargetDetails(){
        showIndicator =  `${$ui.state.bySection.compose.sdg}.1`
        const targetCode = this.getAttribute('targetCode')
    };

    // Function to show the indicator details
    function handleCloseTargetDetails(){
        showIndicator = null           
    };

</script>

<!-- HTML COMPONENT MARKUP-->
<section id ="curate" class = "subsection">
    <!-- PART 1: CONCEPT INTRO -->
    <div class = "subsection-content-wrapper">
        <div id = "curate-1" class ='curate-section'>
            <h1>Curate OSMxSDG connections</h1>
            <SdgDivider/>
            <p>In <i>Holocene</i> we create connections between data to better understand the world around us. Here you can read more about how that's done in these sections; or if you already know what you're doing, you can move onto setup Facets and generate data!</p>

            <!-- OSMxSDG DATA CONTEXT-->
            <h2 class = 'header'>What data matters?</h2>
            <div id = "dataContext" class="collapse__header" type="button" 
                class:selected="{paneVisbility.dataContext}" on:click={togglePane}  on:keydown={togglePane}>
                <div class='toggle-label'>Learn about the data used in Holocene</div>
                <div class="toggle-icon down">&#8595;</div>
            </div>
            {#if paneVisbility.dataContext}
            <div class = "collapse__body"  transition:slide>    
                <p>OpenStreetMap contains a lot of data. This is data that has been generated, tagged and organised by millions of human contributors. It is a treasure trove but it can be a bit messy and intimidating to get started with. As OSM puts it:</p>
                <blockquote>
                    OpenStreetMap uses tags to add meaning to geographic objects. There is no fixed list of those tags. New tags can be invented and used as needed. Everybody can come up with a new tag and add it to new or existing objects. This makes OpenStreetMap enormously flexible, but sometimes also a bit hard to work with. 
                    <div class = "source">&mdash; from <a href ="https://taginfo.openstreetmap.org/about" target = "_blanks">tagInfo.openstreetmap.org</a></div>
                </blockquote>
                <p>The UN Sustainable Development Goals (SDGs) provide a much more structured (albeit incredibly wide reaching) data model to work with. They consists of: 17 goal, each with a subsets of targets ({@html totalTargets} in total) and supporting indicators ({@html totalIndicators} in total).
            </div>
            {/if}

            <!-- FACET INTRODUCTION  -->
            <h2 class = 'header'>Introducing <i>Facets</i></h2>
            <div id = "facetIntroduction" class="collapse__header" type="button" 
                class:selected="{paneVisbility.facetIntroduction}" on:click={togglePane}  on:keydown={togglePane}>
                <div class='toggle-label'>Learn about what we mean by Facets</div>
                <div class="toggle-icon down">&#8595;</div>
            </div>
            {#if paneVisbility.facetIntroduction}
            <div class = "collapse__body"  transition:slide>
                <p>There are many challenges to interpreting what OSM data really <i>means</i> in the context of a particular city or community. For a start, although there are billions of objects mapped in OSM, the overall coverage of mapping varies between locations: you're more likely to find more objects, with more detailed tagging information in populated cities (where there are more mappers!); or where community mapping projects have taken place. So much like the SDGs (and their myriad of targets and indicators), there is no magical data measure - or set of measures - that link OSM data to SDGs, for everywhere in the world. <em>What we need a more flexible approach that recognises that we're trying to solve a messy human made problem, with messy human made data.</em>
                </p>
                <p>In Holocene, we tackle this problem with what we call <em>'Facets'</em>: these are just groups of objects sharing one or more OSM tags. Its a simple idea: create a customisable count of objects that share any (set of) OSM-tagged characteristics - and link that 'Facet' to any of the SDG indicators (and their parent targets and goals). Providing context for measuring progress and benchmarking are another challenge - we'll get to that shortly - but on the surface we can give Facets a friendly, human-readable description and title. Under the surface, facets are powered by the OSM Overpass query language which means that they can be extremely customisable and powerful.
                </p>
            </div>
            {/if}

            <!-- FACET COMPOSER DETAILS -->
            <h2 class = 'header'>Configuring Facets and managing presets</h2>
            <div id = "facetComposer" class="collapse__header" type="button" 
                class:selected="{paneVisbility.facetComposer}" on:click={togglePane}  on:keydown={togglePane}>
                <div class='toggle-label'>Learn how create Facets</div>
                <div class="toggle-icon down">&#8595;</div>
            </div>
            {#if paneVisbility.facetComposer}
            <div class = "collapse__body"  transition:slide>    
                <p>Facets are a simple concept but they can be tricky to compose and configure. This is mainly because your choices need to be translated into the Overpass query language in order to get the OSM data we need. A more sophisticated and potentially a visual Facet composer is imagined for <i>Holocene</i> in the future, however this is significant design challenge!
                </p>
                <p>For now, <i>Holocene</i> helps you get started by providing some default 'presets' and sets of links to SDG indicators - that we'll call 'patch' -  that you can use to get started. This starter 'patch' is designed to help you get going and provides a working example you cam edit and build on. And if you're wondering, yes there is a connection here to the terminology used in modular electronic music synthesizers!. 
                </p>
            </div>
            {/if}
        </div>

        <h1 class = 'header table'>Facet Composer</h1>
        <div>The interactive Facets <i>Composer</i> is a table-like interface that can be used to configure and map each Facet to <i>any</i> SDG indicator.</div>
        <div id = "facetTableHowTo" class="collapse__header" type="button" 
            class:selected="{paneVisbility.facetTableHowTo}" on:click={togglePane}  on:keydown={togglePane}>
            <div class='toggle-label'>Learn how to use the Facets Composer</div>
            <div class="toggle-icon down">&#8595;</div>
        </div>
        {#if paneVisbility.facetTableHowTo}
        <div class = "collapse__body"  transition:slide>    
            <p>The Facet Composer represents each facet in a row. Along that row, each coloured circle indicates where an SDG indicator has been mapped to a Facet. Filled circles indicate where a Facet has a positive relationship and moves in the same direction as a indicator: a higher Facet 'score' helps achieve the mapped SDG. Unfilled circled that have a coloured outline are the opposite: a higher Facet score is detrimental to achieving the linked SDG. Small circles with a light grey outlines mean that there is no link between Facet and indicator.</p>
            <p>
            All mapped circles come in two sizes which you can think of and use to indicate a small or large impact or linkage. To edit these mappings, simple tap on the arrow heads above and below each circle.</p> 
        </div>
        {/if}
    </div>

    <!-- PART 2: FACET x INDICACTOR MAPPING -->   
    <div  class = "curate-table-content-wrapper">
  
        <div id = "curate-2" class ='curate-section'>
            <div class = 'facet-mapping-container goal-{$ui.state.bySection.compose.sdg}'>
                <!-- NAVIGATION-->
                {#if !showIndicator}
                <div class = "table-nav-container">     
                    <div class = "nav-button-container"> 
                        <div class = "nav-button" on:click={handleChangeSDG} on:keydown={handleChangeSDG} role-="button" target='previous'><ArrowLeft/></div>
                        <div class = "nav-label">Change goal</div>
                        <div class = "nav-button"  on:click={handleChangeSDG} on:keydown={handleChangeSDG} role-="button"target='next'><ArrowRight/></div>
                   </div>
                    <div class = "nav-button-container target-close-container"  on:click={openTargetDetails} on:keydown={openTargetDetails}>
                        <div class = "target-button" >  
                            <div class = "nav-label">Browse targets</div>
                            <ArrowRight/>
                        </div>
                    </div>
                </div>
                {:else}
                <div class = "table-nav-container">     
                    <div class = "nav-button-container" >                    
                        <div class = "nav-button" on:click={handleChangeTarget} on:keydown={handleChangeTarget} role-="button" target='previous'><ArrowLeft/></div>
                        <div class = "nav-label">Change target</div>
                        <div class = "nav-button"  on:click={handleChangeTarget} on:keydown={handleChangeTarget} role-="button"target='next'><ArrowRight/></div>
                    </div>

                    <div class = "nav-button-container target-close-container"  on:click={handleCloseTargetDetails} on:keydown={handleCloseTargetDetails}>
                        <div class = "target-button" >  
                            <div class = "nav-label">Close target details</div>
                            <CloseThick/>
                        </div>
                    </div>
                </div>
                {/if}

                <!-- GOAL (+ TARGET/INDICATOR DETAILS) CONTAINER-->
                <div class = 'goal-container'>
                    <div class = "sdg-tile-container">
                        {#if !showIndicator}
                        <img class = 'goal-icon' alt="SDG Goal icon" src = {`./static/img/the-global-goals-goals-and-targets/goal-${$ui.state.bySection.compose.sdg}/GOAL_${$ui.state.bySection.compose.sdg}_PRIMARY_ICON/GOAL_${$ui.state.bySection.compose.sdg}_SVG/TheGlobalGoals_Icons_Color_Goal_${$ui.state.bySection.compose.sdg}.svg`} >
                        {:else}
                        <div class ="target-tile-container">
                            <img class = 'target-tile' alt="SDG target icon" src = {`./static/img/the-global-goals-goals-and-targets/goal-${$ui.state.bySection.compose.sdg}/GOAL_${$ui.state.bySection.compose.sdg}_TARGETS/GOAL_${$ui.state.bySection.compose.sdg}_TARGETS_SVG/GOAL_${$ui.state.bySection.compose.sdg}_TARGET_${showIndicator.replace(".", "-")}.svg`}>
                        </div>
                        {/if}
                    </div> 
                    <div class = 'sdg-content-container'>
                        {#if !showIndicator}
                        <div class = "goal-title-container">
                            <h2 class = "goal-header">{@html sdgObj.title } </h2>
                        </div>
                        <div class = "goal-instruction-container">
                            <p>SDG#{@html $ui.state.bySection.compose.sdg} is supported by <span>{@html noTargets} targets and {@html noIndicators} indicators</span> that are represented by their codes and as columns of the Facet Composer table.</p>
                        </div>

                        {:else}
                        <div class = "target-container">
                            <div class = "target-description-container">
                                <div class = 'target-label'></div>
                                <div class = 'target-description'>{@html sdgObj.target[showIndicator].title} </div> 
                               <div class = 'indicators-label'>Indicators</div>     
                                {#each Object.entries(sdgObj.target[showIndicator].indicator) as indEntry}
                                    {#if indEntry[0] !== 'na'}
                                    <div class = "indicator-item">{@html indEntry[0]} {@html indEntry[1].description} </div>  
                                    {:else}
                                    <div class = "indicator-item">No indicators have been set for this target</div>  
                                    {/if}
                                {/each}
                                <div>
                            </div>
                            </div>
                        </div>
                        {/if}
                    </div>
                 </div>

                <!-- FACET TO SDG INDICATOR MAPPING TABLE-->
                <div class= "facet-table-container">
                    <table>
                        <!-- TABLE HEADER SECTION -->
                        <thead>
                            <!-- Targets sub-row/section-->
                            <tr class ="target-header-row targets">
                                <th class="facet-header-container" rowspan = 1>
                                    <div class ="facet-header">Facets</div>
                                </th>
                                {#each Object.entries(sdgObj.target) as target (target[0]) }
                                <th class = 'target-header-container' colspan = {target[1].indicatorList.length} targetCode ={target[0]}
                                    on:click={handleTargetDetails} on:keydown={handleTargetDetails}>
                                    <div class ='target-icon-container'>
                                        <img class = 'target-icon' alt="SDG target icon" src = {`./static/img/the-global-goals-goals-and-targets/goal-${$ui.state.bySection.compose.sdg}/GOAL_${$ui.state.bySection.compose.sdg}_TARGETS/GOAL_${$ui.state.bySection.compose.sdg}_TARGETS_SVG/GOAL_${$ui.state.bySection.compose.sdg}_TARGET_${target[0].replace(".", "-") }.svg`}>
                                    </div>
                                    <div class = 'target-header' >{@html target[0]}</div>
                                </th>
                                {/each}
                            </tr>

                            <!-- Indicators sub-row/section -->
                            <tr class ="indicator-header-row indicators">
                                <th class= "facet-subheader facet-subheader-container">
                                    <div>
                                        <div class = "facet-header-icon"><ChevronDoubleDown/> </div>
                                        <div class = "facet-label upper">Compose</div>
                                    </div>
                                     <div>
                                        <div class = "facet-label">x</div>
                                    </div>
                                     <div class= 'facet-subheader-connect'>
                                        <div class = "facet-label upper">Connect</div>
                                        <div class = "facet-header-icon"><ChevronDoubleRight/></div>
                                    </div>
                                </th>
                                {#each Object.entries(sdgObj.target) as target (target[0]) }
                                    {#each target[1].indicatorList as indicator }
                                    <th class = "indicator-header" 
                                        targetCode ={target[0]} indicatorCode={indicator} 
                                        on:click={handleTargetDetails} on:keydown={handleTargetDetails}>
                                        <div>{@html indicator}</div>
                                    </th>
                                    {/each}
                                {/each}
                            </tr>
                        </thead>

                        <!-- TABLE BODY SECTION -->
                        <tbody>
                            {#each $schema.data.osm.facets as facetObj, i}
                            <tr class ="facet-row" >
                                <td class = "facet-label-container" facetIndex = {i} on:click={handleEditFacet} on:keypress={handleEditFacet}>
                                    <div class = "facet-edit-icon">
                                        <Settings/>
                                    </div>
                                    <div>
                                        {@html facetObj.name}
                                    </div>
                                </td>

                                {#each Object.entries(sdgObj.target) as target (target[0]) }
                                    {#each target[1].indicatorList as indicator }
                                    {@const facetIndicatorIndex = facetObj.indicators.map(d=>d.code).indexOf(indicator) }
                                    {@const facetImpact = facetObj.indicators.map(d=>d.impact)[facetIndicatorIndex] }

                                        <td class ="indicator-map-cell-container">
                                            <div class = "cell-wrapper">
                                                <div class ="indicator-map-icon" direction ="up" 
                                                    i_code = {indicator} facetIndex={i} impact={facetImpact}
                                                    on:click={handleIndicatorMapping} on:keypress={handleIndicatorMapping} >
                                                    <ChevronUp/>
                                                </div>
                                                <div class ="indicator-cell-container">

                                                    <div class ="indicator-map-cell icode-{slugify(indicator)} facet-{i}" 
                                                        class:positive={facetImpact > 0}
                                                        class:negative={facetImpact < 0}
                                                        class:impact1={facetImpact === 1}
                                                        class:impact2={facetImpact === 2}
                                                        class:impact-1={facetImpact === -1}
                                                        class:impact-2={facetImpact === -2}
                                                        >
                                                        <!-- {#if facetImpact > 0}+{:else if facetImpact < 0}-{/if} -->
                                                    </div>
                                                </div>


                                                <div class ="indicator-map-icon"  direction ="down" 
                                                    i_code = {indicator} facetIndex={i} impact={facetImpact}
                                                    on:click={handleIndicatorMapping} on:keypress={handleIndicatorMapping}>
                                                    <ChevronDown/>
                                                </div>

                                            </div>
                                        </td>
                                    {/each}
                                {/each}
                            </tr>
                            {/each}
                        </tbody>
                    </table>     

                    <!--- OPTIONS TO MANAGE FACETS-->
                    <div class ='facet-management-container'>
                        <div class = "facet-option" role="button" on:click={handleAddFacet} on:keydown={handleAddFacet}>
                            <PlusCircleOutline/>
                            <div class = 'facet-option-label'> Add a new facet</div>
                        </div>
                        <div class = "facet-option" role="button" on:click={handleManageFacets} on:keydown={handleManageFacets}>
                            <div class = 'add-facet-label' >Manage Facet data </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class = "down-button-container">
            <DownArrow handler={changeSubsection} section="compose" target="generate"/>
        </div>

    </div>
</section>

<!-- STYLES-->
<style>
    h2.header{
        margin-block-end: 0;
    }
    h1.header{
        margin-block-start:     7.5vh;
        margin-block-end:        1rem;
    }

    section{
        display:                grid;
    }
    .specify-container{
        margin:                 25vh 0;
        display:                grid;
    }
    blockquote{
        font-style:             italic;
    }
    blockquote .source{
        text-align:             end;
    }
    .facet-mapping-container{
        margin-top:             10vh;
    }

    /******  GOAL "INFO" BLOCK ***********/
    .goal-container{
        display:                grid;
        column-gap:             5vw;
        grid-template-columns:  3fr 5fr;
        padding:                2.5vh 0;
        border-top:             10px solid;
        border-bottom:          10px solid;
    }
        .sdg-tile-container{
            grid-area:          1 / 1 / 2 / 2;
        }
        .sdg-content-container{
            grid-area:          1 / 2 / 2 / 3;
            grid-template-rows: 2rem auto auto;
        }
        .goal-title-container{
            grid-area:      1 / 2 / 2 / 3;
            max-width:      var(--max-text-width);
        }
        .goal-instruction-container{
            grid-area:      2 / 2 / 3 / 4;
            max-width:      var(--max-text-width);
        }

    /******  GOAL AND TARGET NAVIGATION BUTTONS   ***********/
    .sdg-nav-container{
        grid-area:          1 / 3 / 2 / 4;
        display:            grid;
        justify-content:    end;
        height:             fit-content;
    }
    .nav-button-container{
        display:            flex;
        padding-bottom:     1rem;
    }
    .nav-button-container div{
        margin-right:       0.25rem;
        display:            flex;
        align-items:        center;
    }
    .target-close-container{
        cursor:             pointer;
    }
    .nav-label{
        font-size:          80%;
        font-weight:        700;
        text-transform:     uppercase;
    }
    .nav-button{
        font-size:          150%;
        cursor:             pointer;
        transition:         250ms all;

    }
    .nav-button:hover{
        transform:              scale(1.05);
        font-weight:            600;
    }

    .goal-header{
        font-size:              200%;
        line-height:            1.15;
        margin-block-start:     0rem;
        margin-block-end:       1rem;
    }
    .goal-1  .goal-container{ color: var(--sdg_01); }   
    .goal-2  .goal-container{ color: var(--sdg_02); }   
    .goal-3  .goal-container{ color: var(--sdg_03); }   
    .goal-4  .goal-container{ color: var(--sdg_04); }   
    .goal-5  .goal-container{ color: var(--sdg_05); }   
    .goal-6  .goal-container{ color: var(--sdg_06); }   
    .goal-7  .goal-container{ color: var(--sdg_07); }   
    .goal-8  .goal-container{ color: var(--sdg_08); }   
    .goal-9  .goal-container{ color: var(--sdg_09); }   
    .goal-10 .goal-container{ color: var(--sdg_10); }   
    .goal-11 .goal-container{ color: var(--sdg_11); }   
    .goal-12 .goal-container{ color: var(--sdg_12); }   
    .goal-13 .goal-container{ color: var(--sdg_13); }   
    .goal-14 .goal-container{ color: var(--sdg_14); }   
    .goal-15 .goal-container{ color: var(--sdg_15); }   
    .goal-16 .goal-container{ color: var(--sdg_16); }   
    .goal-17 .goal-container{ color: var(--sdg_17); }   

    /******  TARGETS-INDICATOR BLOCK ***********/
    .curate-table-content-wrapper{
        width:                      80%;
    }
    .target-container{
        display:                    grid;
        grid-template-rows:         auto auto;
        grid-template-columns:      auto auto;
        column-gap:                 2.5VW;
        height:                     100%
    }
        .target-tile-container{
            grid-area:              2 / 1 / 4 / 2;
            display:                flex;
            flex-direction:         column;
            justify-content:        flex-end;
        }
        
        .target-tile{
            width:                  100%;
            height:                 fit-content;
        }
        .table-nav-container{
            grid-area:              1 / 1 / 2 / 3;
            display:                flex;
            justify-content:        space-between;
            height:                 fit-content;
        }
        .target-description-container{
            grid-area:              1 / 2 / 3 / 3;
        }
        .target-description{
            font-size:              125%;
            font-weight:            600;
            margin-bottom:          3rem;
        }
        .indicators-label{
            margin-bottom:          0.5rem;
            text-transform:         uppercase;
            letter-spacing:         0.05rem;
            font-weight:            600;
        }
        .indicator-item{
            font-size:              100%;
            margin-bottom:          1rem;
        }



    /*********** FACET MAPPING TABLE ***********/

    .goal-1  .facet-table-container{ color: var(--sdg_01); }   
    .goal-2  .facet-table-container{ color: var(--sdg_02); }   
    .goal-3  .facet-table-container{ color: var(--sdg_03); }   
    .goal-4  .facet-table-container{ color: var(--sdg_04); }   
    .goal-5  .facet-table-container{ color: var(--sdg_05); }   
    .goal-6  .facet-table-container{ color: var(--sdg_06); }   
    .goal-7  .facet-table-container{ color: var(--sdg_07); }   
    .goal-8  .facet-table-container{ color: var(--sdg_08); }   
    .goal-9  .facet-table-container{ color: var(--sdg_09); }   
    .goal-10 .facet-table-container{ color: var(--sdg_10); }   
    .goal-11 .facet-table-container{ color: var(--sdg_11); }   
    .goal-12 .facet-table-container{ color: var(--sdg_12); }   
    .goal-13 .facet-table-container{ color: var(--sdg_13); }   
    .goal-14 .facet-table-container{ color: var(--sdg_14); }   
    .goal-15 .facet-table-container{ color: var(--sdg_15); }   
    .goal-16 .facet-table-container{ color: var(--sdg_16); }   
    .goal-17 .facet-table-container{ color: var(--sdg_17); }   

    .facet-table-container{
        overflow:               scroll;
        padding-bottom:         5vh;
        max-width:              80vw
    }
    table{
        width:                  100%;
        border-collapse:        collapse;
        margin-top:             2.5vh;
    }
    thead{
        border-bottom:          2px  solid;
    }
    .target-header-container{
        vertical-align:         bottom;
    }
    .target-icon-container{
        display:                flex;
        justify-content:        center;
    }
    .target-icon{
        max-height:             5vw;
        max-width:              100%;
        cursor:                 pointer;        
    }
    .facet-header{
        text-transform:         uppercase;
        letter-spacing:         0.1rem;
    }
    .facet-header,
    .key-value-header{
        text-align:             left;
    }

    .target-header-row{
        font-weight:            500;
        font-size:              80%;
    }
    .indicator-header-row{
        font-weight:            400;
        font-size:              65%;
    }
    .target-header{
        border-bottom:          solid 1px;
        padding:                0 5px; 
    }
    .indicator-header{
        min-width:              1.75vw;
    }
    .target-header, 
    .indicator-header{
        cursor:                 pointer;    
    }
    .target-header:hover,
    .indicator-header:hover{
        font-weight:            700;
    }

    .facet-subheader-container{
        display:                flex;
        grid-template-columns:  1.75rem auto 1.75rem;
        align-items:            center;
        justify-content:        space-between;
    }
    .facet-subheader-container div{
        display:                flex;
    }
    .facet-label.upper{
        text-transform:         uppercase;
    }
    .facet-subheader-connect{
        margin-right:           1rem
    }

    .facet-header{
        font-size:              3vw;
        line-height:            1;
        padding-bottom:         0.25rem
    }   
    .facet-subheader{
        text-align:             left;   
        font-size:              125%;
        line-height:            1.1;
    }

    tr.facet-row, 
    .facet-label-container{
        font-weight:            700;
        font-size:              100%;
        min-height:             4rem;
        line-height:            1;
    }
    tr.facet-row{
        border-bottom:          1px solid; 
    }
    .facet-label-container{
        cursor:                 pointer;
        display:                grid;
        grid-template-columns:  1.75rem 1fr;
        align-items:            center;
        line-height:            1.1;
        transition:             all 250ms;
    }
    .facet-label-container:hover{
        color:                  #fff;
    }
    .goal-1  .facet-label-container:hover{  background-color:  var(--sdg_1); }
    .goal-2  .facet-label-container:hover{  background-color:  var(--sdg_2); }
    .goal-3  .facet-label-container:hover{  background-color:  var(--sdg_3); }
    .goal-4  .facet-label-container:hover{  background-color:  var(--sdg_4); }
    .goal-5  .facet-label-container:hover{  background-color:  var(--sdg_5); }
    .goal-6  .facet-label-container:hover{  background-color:  var(--sdg_6); }
    .goal-7  .facet-label-container:hover{  background-color:  var(--sdg_7); }
    .goal-8  .facet-label-container:hover{  background-color:  var(--sdg_8); }
    .goal-9  .facet-label-container:hover{  background-color:  var(--sdg_9); }
    .goal-10 .facet-label-container:hover{  background-color:  var(--sdg_10); }
    .goal-11 .facet-label-container:hover{  background-color:  var(--sdg_11); }
    .goal-12 .facet-label-container:hover{  background-color:  var(--sdg_12); }
    .goal-13 .facet-label-container:hover{  background-color:  var(--sdg_13); }
    .goal-14 .facet-label-container:hover{  background-color:  var(--sdg_14); }
    .goal-15 .facet-label-container:hover{  background-color:  var(--sdg_15); }
    .goal-16 .facet-label-container:hover{  background-color:  var(--sdg_16); }
    .goal-17 .facet-label-container:hover{  background-color:  var(--sdg_17); }

    .facet-label{
        line-height:            1.1;
        padding:                0.25rem 0;
    }
    .facet-header-icon,
    .facet-edit-icon{
        font-size:              150%
    }

    .cell-wrapper{
        display:                flex;
        flex-direction:         column;
        justify-content:        center;
        align-content:          0 center;
        min-height:             3vw; 
    }
    .indicator-map-icon, 
    .indicator-cell-container{
        display:                flex;
        justify-content:        center;
    }
    .indicator-map-icon{
        cursor:                 pointer;    
        transform-origin:       center center;
        opacity:                0.5;
        transition:             all 300ms;
    }
    .indicator-map-icon:hover{
        opacity:                1; 
        transform:              scale(1.5)
    }

    .indicator-map-cell{
        background:             transparent;
        border-radius:          50%;
        transition:             all 300ms;
        width:                  1.25vw;
        height:                 1.25vw;
        border:                 solid rgba(0, 0, 0, 0.2);
        display:                flex;
        align-items:            center;
        justify-content:        center;
        font-weight:            200;
        border-width:           0.5px;
    }
    .indicator-map-cell.positive,
    .indicator-map-cell.negative{
        border-width:           2.5px;
    }

    .goal-1  .indicator-map-cell.positive{ background: var(--sdg_01); color: #fff; border: solid var(--primary02-light)}
    .goal-2  .indicator-map-cell.positive{ background: var(--sdg_02); color: #fff; border: solid var(--primary02-light)}
    .goal-3  .indicator-map-cell.positive{ background: var(--sdg_03); color: #fff; border: solid var(--primary02-light)}
    .goal-4  .indicator-map-cell.positive{ background: var(--sdg_04); color: #fff; border: solid var(--primary02-light)}
    .goal-5  .indicator-map-cell.positive{ background: var(--sdg_05); color: #fff; border: solid var(--primary02-light)}
    .goal-6  .indicator-map-cell.positive{ background: var(--sdg_06); color: #fff; border: solid var(--primary02-light)}
    .goal-7  .indicator-map-cell.positive{ background: var(--sdg_07); color: #fff; border: solid var(--primary02-light)}
    .goal-8  .indicator-map-cell.positive{ background: var(--sdg_08); color: #fff; border: solid var(--primary02-light)}
    .goal-9  .indicator-map-cell.positive{ background: var(--sdg_09); color: #fff; border: solid var(--primary02-light)}
    .goal-10 .indicator-map-cell.positive{ background: var(--sdg_10); color: #fff; border: solid var(--primary02-light)}
    .goal-11 .indicator-map-cell.positive{ background: var(--sdg_11); color: #fff; border: solid var(--primary02-light)}
    .goal-12 .indicator-map-cell.positive{ background: var(--sdg_12); color: #fff; border: solid var(--primary02-light)}
    .goal-13 .indicator-map-cell.positive{ background: var(--sdg_13); color: #fff; border: solid var(--primary02-light)}
    .goal-14 .indicator-map-cell.positive{ background: var(--sdg_14); color: #fff; border: solid var(--primary02-light)}
    .goal-15 .indicator-map-cell.positive{ background: var(--sdg_15); color: #fff; border: solid var(--primary02-light)}
    .goal-16 .indicator-map-cell.positive{ background: var(--sdg_16); color: #fff; border: solid var(--primary02-light)}
    .goal-17 .indicator-map-cell.positive{ background: var(--sdg_17); color: #fff; border: solid var(--primary02-light)}


    .goal-1  .indicator-map-cell.negative{ border: solid var(--sdg_01); }
    .goal-2  .indicator-map-cell.negative{ border: solid var(--sdg_02); }
    .goal-3  .indicator-map-cell.negative{ border: solid var(--sdg_03); }
    .goal-4  .indicator-map-cell.negative{ border: solid var(--sdg_04); }
    .goal-5  .indicator-map-cell.negative{ border: solid var(--sdg_05); }
    .goal-6  .indicator-map-cell.negative{ border: solid var(--sdg_06); }
    .goal-7  .indicator-map-cell.negative{ border: solid var(--sdg_07); }
    .goal-8  .indicator-map-cell.negative{ border: solid var(--sdg_08); }
    .goal-9  .indicator-map-cell.negative{ border: solid var(--sdg_09); }
    .goal-10 .indicator-map-cell.negative{ border: solid var(--sdg_10); }
    .goal-11 .indicator-map-cell.negative{ border: solid var(--sdg_11); }
    .goal-12 .indicator-map-cell.negative{ border: solid var(--sdg_12); }
    .goal-13 .indicator-map-cell.negative{ border: solid var(--sdg_13); }
    .goal-14 .indicator-map-cell.negative{ border: solid var(--sdg_14); }
    .goal-15 .indicator-map-cell.negative{ border: solid var(--sdg_15); }
    .goal-16 .indicator-map-cell.negative{ border: solid var(--sdg_16); }
    .goal-17 .indicator-map-cell.negative{ border: solid var(--sdg_17); }


    .indicator-map-cell.imapct1, 
    .indicator-map-cell.impact-1{
        width:                  1vw;
        height:                 1vw;
    }
    .indicator-map-cell.impact2, 
    .indicator-map-cell.impact-2{
        width:                  2vw;
        height:                 2vw;
    }


    /*********FACET MANAGEMENT OPTIONS CONTAINER*/
    .facet-management-container{
        display:            flex;
        justify-content:    space-between ;
    }
    .facet-option{
        display:            flex;
        margin-top:         1rem;
        justify-items:      center;    
        cursor:             pointer;        
    }
    .facet-option:hover{
        font-weight:        700;
    }
    .facet-option-label,
    .add-facet-label{
        font-size:          80%;
        padding-left:       0.25rem;
        margin-top:         -0.25rem;
    }


    /* Media Query for low resolution  Tablets, Ipads */
    @media (max-width: 767px) {
        .facet-label-container{
            font-size:                  50%    
        }
        .facet-subheader-container div{
            display:                none;
        }
        .goal-container{
            column-gap:             0vw;
            grid-template-columns:  none;
        }
        .indicator-map-cell{

        }
    }
    /* Media Query for Tablets Ipads portrait mode */
    @media (min-width: 768px) and (max-width: 1024px){
        .facet-label-container{
            font-size:                  70%;    
        }
    }
    /* Media Query for Laptops and Desktops */
    @media (min-width: 1025px){
        .facet-label-container{
            font-size:                  80%;    
        }
    }
        
</style>