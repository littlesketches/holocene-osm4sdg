<!-- COMPONENT FOR FACETxSDG DATA VIS-->
<script>
    import * as d3              from 'd3'
    import { onMount, afterUpdate }          from 'svelte';
    import { data }             from "../../data/stores/data.js";
    import { schema }           from "../../data/stores/schema.js";
    import { ui }               from "../../data/stores/ui.js";
    import {textWrap, slugify}  from "../../lib/utils/helpers.js"
    import { fade, fly }        from 'svelte/transition';
    import ArrowLeft            from "svelte-material-icons/ArrowLeft.svelte";
    import ArrowRight           from "svelte-material-icons/ArrowRight.svelte";
    import FacetMapSdgNav       from './FacetMapSdgNav.svelte';

    export let dataState = 'noData'

    // Helper functions
    const cumsum = arr => arr.map((sum => value => sum += value)(0));
    const numberFormatter= d3.format(",")

    ////////////////////////////////
    // DATA VISUALISATION  SETUP ///
    ////////////////////////////////

    $: showTarget = false   // Used when hovering over target to trigger icon view

    const facetSchema = $schema.data.osm.facets

    // Layout setup
    const  layout = {
        facetHeight:               80,
        facetWidth:                400,
        facetGap:                  20,
        facetBarChartHeight:       5,
        targetHeight:              120,
        targetWidth:               100,
        targetGap:                 20,
        goalWidth:                 350,
        noIndicatorsByGoal:        Object.values($schema.sdgs).map(  goalObj => d3.sum(Object.values(goalObj.target).map(d => d.indicatorList.length))),
        noIndicatorsByTarget:      Object.values($schema.sdgs).map(d => Object.values(d.target)).flat().map(d => d.indicatorList.length),
        noTargetsByGoal:           Object.values($schema.sdgs).map(d => Object.values(d.target).length)
    }

    // Calculation of layout dimensions and 'counts' 
    layout.facetGroupHeight         = ($schema.data.osm.facets.length) * (layout.facetHeight + layout.facetGap) - layout.facetGap
    layout.maxTargetsPerGoal        = d3.max(layout.noTargetsByGoal)
    layout.cumIndicatorsByGoal      = cumsum(layout.noIndicatorsByGoal)
    layout.cumIndicatorsByTarget    = cumsum(layout.noIndicatorsByTarget)
    layout.noIndictors              = d3.sum(layout.noIndicatorsByGoal)
    layout.noTargets                = d3.sum(layout.noTargetsByGoal)

    // SVG dimenstions and margins
    const dims = {
        height:  d3.max([
            1080, 
            layout.facetGroupHeight,
            (layout.maxTargetsPerGoal + 1) * (layout.targetHeight + layout.targetGap) - layout.targetGap
        ]),    // Height is adjusted to fit the longer of the (max) targets (per goal), or the no. of facets 
        width:          1620,
        margin: {
            top:        100,
            right:      40,
            bottom:     20,
            left:       150,
        }
    }

    // Layout data dependent on dims
    layout.indicatorGap = (dims.height - dims.margin.top - dims.margin.bottom)/ layout.noIndictors
   
    // Flattened data
    const targetData = Object.values($schema.sdgs).map(d => Object.values(d.target)).flat()
    const indicatorData = Object.values($schema.sdgs).map(d => Object.values(d.target)).flat().map(d => Object.entries(d.indicator)).flat()


    //////////////////////////////////////////////////
    // Transformation of Facet data when available ///
    //////////////////////////////////////////////////
    let timeDomain, facetTrendData, facetBarScale, currentData
    // Extract time array
    if(dataState === 'allData'){
        console.log('---PARSING AND TRANSFORMING DATA ---')
        timeDomain = [...$schema.time.historicalYearsAgo].reverse().concat([0])

        facetTrendData = Object.entries($data.osm.response.byFacet).map( ([key, value]) => {

            return  { // Facet index ('id')
                name:       value.name,
                countData:  timeDomain.map( d => {
                    const label = d > 0 ?  `yearAgo-${d}` : 'today'
                    const data = value[label][0].tags
                    return {
                        areas:      +data.areas,
                        nodes:      +data.nodes,
                        ways:       +data.ways,
                        relations:  +data.relations,
                        total:      +data.total
                    }
                })
            }
        })
    }

    if(dataState === 'currentData' || dataState === 'allData'){
        currentData = Object.values($data.osm.response.byFacet).map(facetData => facetData.today[0].tags)
        const maxFacetCount = d3.max(currentData.map(d => +d.total))
        facetBarScale = d3.scaleLinear()
            .domain([0,maxFacetCount])
            .range([0, layout.facetWidth - layout.facetHeight - layout.facetGap * 2.5])
    }

    /////////////////////////////////
    // INTERACTION EVENT HANDLERS ///
    /////////////////////////////////

    // Function to handle change in SDG in view
    function handleChangeSDG(){

        const duration = 1200, noGoals = Object.values($schema.sdgs).length
        let prevSdgCode, nextSdgCode
        // Determine direction to move the 'goals-wrapper' window
        if(this){
            const dir = this.getAttribute('direction')

            if(dir){
                if(dir === 'next'){
                    $ui.state.bySection.explore.sdg = $ui.state.bySection.explore.sdg < noGoals ? $ui.state.bySection.explore.sdg + 1 : 1
                } else if (dir == 'prev'){
                    $ui.state.bySection.explore.sdg = $ui.state.bySection.explore.sdg > 1 ? $ui.state.bySection.explore.sdg - 1 : noGoals
                } 
            } 
            const selGoal = +this.getAttribute('goal')
            if(selGoal){
                 $ui.state.bySection.explore.sdg = selGoal
            }
        }

        // Try to optimise what is being rendered
        prevSdgCode = $ui.state.bySection.explore.sdg === 1 ? noGoals : $ui.state.bySection.explore.sdg - 1
        nextSdgCode = $ui.state.bySection.explore.sdg === noGoals ? 1 : $ui.state.bySection.explore.sdg +1
        d3.selectAll(`.goal-group`).style('display', 'none')
        d3.selectAll(`.goal-${$ui.state.bySection.explore.sdg}, .goal-${prevSdgCode}, .goal-${nextSdgCode}`).style('display', 'block')

        // Move SDG 'window'
        d3.select('#goals-wrapper')
            .transition().duration(duration)
            .style('transform', `translate(0px, -${($ui.state.bySection.explore.sdg -1) * dims.height}px)`)


        // Transition the connector paths
        for( const el of document.querySelectorAll('.facet-connector')){
            const offsetX = +el.getAttribute('offsetx'),
                offsetY   = +el.getAttribute('offsety'),
                startX    = +el.getAttribute('startx'),
                startY    = +el.getAttribute('starty'),
                target    = el.getAttribute('target'),
                goal      = el.getAttribute('goal'),
                indicator = el.getAttribute('indicator')

            d3.select(el).transition().duration(duration)
                .attr('d', facetToIndicatorPath([startX, startY], goal, target, indicator, offsetX, offsetY))
        }


        // Helpers function to calculate facet-indicator connector paths
        function facetToIndicatorPath(startPos, goal, target, indicator, offsetX, offsetY ){
            const targetIndex  = $schema.sdgs[goal].targetList.indexOf(target),
                indicatorIndex = Object.values($schema.sdgs).map(d => Object.values(d.target))[goal-1][targetIndex].indicatorList.indexOf(indicator), 
                noIndicators   = Object.values($schema.sdgs).map(d => Object.values(d.target))[goal-1][targetIndex].indicatorList.length,  
                startOffsetX    = -5

            const endPos  = [
                dims.width * 0.55,  
                -offsetY + (goal -$ui.state.bySection.explore.sdg) * dims.height + (targetIndex+1) * (layout.targetHeight + layout.targetGap) 
            ]

            // Use Bezier link generator to return a linkPath
            const link = d3.linkHorizontal()       
                .source(d => d.source)              // Accepting object {source: [x,y],
                .target(d => d.target)              // and               target [x,y] }

            const linkPath = link({
                source: [startPos[0] + startOffsetX, startPos[1]], 
                target: [endPos[0], endPos[1] + layout.targetHeight * (indicatorIndex + 1) /(noIndicators + 1) ]
            })

            return linkPath
        };

    }; // end handleChangeSDG

    // Function to show connected elements on facet hover
    function handleFacetMouseover(){
        const duration = 0
        const facetIndex = +this.getAttribute('facetindex'),
            facetData = $schema.data.osm.facets[facetIndex],
            indicators = facetData.indicators.map( d => d.code), 
            targets = indicators.map(d => indicatorData.filter(e=> e[0] === d)).map(d => d[0][1].target), 
            indicatorSel = indicators.map(d => `.indicator-${slugify(d)}.indicator-group`).join(),
            targetsSel = targets.map(d => `.target-${slugify(d)}`).join()

        d3.selectAll('.indicator-group, .target-group, .facet-wrapper, .facet-connecter')
            .transition().duration(duration)
            .style('opacity', 0.1)

        d3.selectAll(`${indicatorSel}, ${targetsSel}, .facet-${facetIndex}`)
            .transition().duration(duration)
            .style('opacity', 1)

    }; // end handleFacetMouseover()

    // Function to show connected elements on indicator hover
    function handleIndicatorMouseover(){
        const duration = 0
        const targetClass = `.target-${slugify(this.getAttribute('target'))}.target-group`,
            indicatorClass = `.indicator-${slugify(this.getAttribute('indicator'))}`

        d3.selectAll(`.indicator-group, .facet-wrapper, .target-group:not(${targetClass})`)
            .transition().duration(duration)
            .style('opacity', 0.2)

        d3.selectAll('.facet-connector')
            .transition().duration(duration)
            .style('opacity', 0)

        d3.selectAll(indicatorClass)
            .transition().duration(duration)
            .style('opacity', null)

        d3.selectAll(`${indicatorClass}.facet-connecter`)
            .style('stroke-width', 2)
            .style('opacity', 1)

        d3.select(this)
            .transition().duration(duration)
            .style('opacity', null)
    }; // end handleIndicatorMouseover

    function handleTargetMouseover(){
        showTarget =  this.getAttribute('target')
    }; // end handhleIndicatorMouseover()

    // Function to clear all mouseover styling
    function handleMouseout(){
        d3.selectAll('.indicator-group, .target-group, .facet-wrapper, .facet-connector')
            .transition().duration(0)
            .style('opacity', null).style('stroke-width', null)

        showTarget =false
    }; // end handleMouseout

    function handleFacetDetails(){
        $ui.modal.facetIndex = this.getAttribute('facetindex')
        $ui.view.show.modal = true
        $ui.modal.type = 'facetDetails'
    }; // handleFacetDetails()

    /////////////////////////////////
    // SPARKLINE GENERATOR        ///
    /////////////////////////////////

    function sparklinePath(data, containerRadius){
        const timeArray = [...timeDomain].reverse()
        const chartData = data.map((d,i) => d.total)

        const yScale = d3.scaleLinear()
            .domain(d3.extent(chartData))
            .range([0, containerRadius])
        const xScale = d3.scaleLinear()
            .domain([d3.max(timeArray), 0])
            .range([0, containerRadius])

        const pointsData = chartData.map((d,i) => [xScale(timeArray[i]), yScale(d) ])

        const path = d3.line()(pointsData)

        return path
    }; // end sparklinePath()


    ///////////////////////////////////////////////////////////////////////////////
    // SVELTE ON MOUNT COMPONENT: Required for calling label wrapping and setup ///
    ///////////////////////////////////////////////////////////////////////////////

    afterUpdate( updateVis)
    onMount( updateVis)

    function updateVis(){
        handleChangeSDG()  // Update to SDG in focus

        // Label wrapping for facet labels
        d3.selectAll('.facet-label-wrapper *').remove()
        d3.selectAll('.facet-label-wrapper')
            .data($schema.data.osm.facets)
            .append('text')
            .attr('x', 0)
            .attr('dy', 0)
            .text((d, i) =>  d.name )
            .call(textWrap, layout.facetWidth - layout.facetHeight - layout.facetGap  , 1.1, true)       

        // Label wrapping for target labels
        d3.selectAll('.target-label-wrapper')
            .data(targetData)
            .append('text')
            .classed('target-label', true)
            .attr('x', 90 )
            .attr('y', layout.targetHeight * 0.1)
            .attr('dy', 0)
            .text(d => d.title)
            .call(textWrap, dims.width * 0.13, 1)       


        // Label wrapping for goal labels
        d3.selectAll('.goal-label-wrapper')
            .data(Object.values($schema.sdgs))
            .append('text')
            .classed('goal-label', true)
            .attr('x', 0 )
            .attr('y', 0)
            .attr('dy', 0)
            .text(d => d.title)
            .call(textWrap,layout.goalWidth, 1.1)       
    };

</script>


<!-- HTML / SVG COMPONENT MARKUP-->
<!-- Navigation -->
<div class = "nav-button-container" transition:fly="{{x:-100, duration:500}}">                 
    <div class = "nav-button" direction="prev" on:click={handleChangeSDG} on:keydown={handleChangeSDG} role-="button" target='previous'><ArrowLeft/></div>
    <div class = "nav-label">Sustainable Development Goals</div>
    <div class = "nav-button" direction="next" on:click={handleChangeSDG} on:keydown={handleChangeSDG} role-="button"target='next'><ArrowRight/></div>
</div>

<div class='sdg-nav-container top'>
    <FacetMapSdgNav handler={handleChangeSDG}/>
</div>


<!-- MAIN SVG VISUALSATION-->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svg id ="facet-map"  on:mouseover={handleMouseout}  viewBox="0 0 {dims.width} {dims.height}">
    <defs>
        <!-- Note: gradients seem to cause long  path  to tear/disapper so are disabled 
        <{#each Object.keys($schema.sdgs) as sdg}
       linearGradient id='positive_sdg{$ui.state.bySection.explore.sdg}' gradientUnits="userSpaceOnUse" x1={dims.width * 0.25} x2={dims.width * 0.44}>
            {#if +sdg < 10}
            <stop offset="0%" stop-color="var(--sdg_0{sdg})"/>
            {:else}
            <stop offset="0%" stop-color="var(--sdg_{sdg})"/>
            {/if}
            <stop offset="100%" stop-color="var(--positive)"/>
        </linearGradient>

        <linearGradient id='negative_sdg{sdg}' gradientUnits="userSpaceOnUse" x1={dims.width * 0.25} x2={dims.width *0.45}>
            {#if +sdg < 10}
            <stop offset="0%" stop-color="var(--sdg_0{sdg})"/>
            {:else}
            <stop offset="0%" stop-color="var(--sdg_{sdg})"/>
            {/if}
            <stop offset="100%" stop-color="var(--negative)"/>
        </linearGradient> 
        {/each}-->
    </defs>
    <!-- FACETS GROUP (LHS)-->
    <g class = 'facet-group'  style = 'transform:translate({dims.margin.left}px, {0}px)'> 
        <text y = 50 class = 'facet-header'>Facets</text>
        <text y = 75 class = 'facet-subheader'>built from OSM Data </text>

        {#each $schema.data.osm.facets as facetObj, i}
        {@const nodeRadius = (layout.facetHeight -layout.facetGap ) * 0.5 }
        {@const yOffset = i * (layout.facetHeight + layout.facetGap) + (dims.margin.top)}
        {@const indicatorClassList = facetObj.indicators.map(d => `indicator-${slugify(d.code)}`).join(' ')}

        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <g class = 'facet-wrapper facet-{i} {indicatorClassList}' facetIndex={i} 
            on:mouseover|stopPropagation={handleFacetMouseover} on:mouseout={handleMouseout} on:click={handleFacetDetails} on:keydown={handleFacetDetails}>
            <g  class = 'facet-container' style = 'transform:translate({0}px, {yOffset}px)'>
                <g class= 'facet-connections-group facet-{i}'>
                    {#each facetSchema[i].indicators as indicator, j}
                        {@const target      = indicatorData.filter(d=> d[0] === indicator.code)[0][1].target}
                        {@const goal        = indicatorData.filter(d=> d[0] === indicator.code)[0][1].goal }
                        {@const offsetX     = dims.margin.left}
                        {@const offsetY     = i * (layout.facetHeight + layout.facetGap) + (layout.targetHeight + layout.targetGap) }
                        {@const polarity    = indicator.impact > 0 ? 'positive' : 'negative' }
                        <path class = "facet-connector facet-{i} indicator-{slugify(indicator.code)} target-{slugify(target)} goal-{slugify(goal)} impact{indicator.impact} {polarity}"  
                            startX = {layout.facetWidth} startY = {layout.facetHeight * 0.5}
                            target={target} goal={goal} indicator={indicator.code} 
                            offsetX={offsetX} offsetY={offsetY}  />
                    {/each}
                </g>

                <rect class = 'facet-node facet-{i} {indicatorClassList}' on:mouseover|stopPropagation={handleFacetMouseover}  
                    on:mouseout={handleMouseout} facetIndex={i}    
                    x = 0 y = 0 width = {layout.facetWidth} height = {layout.facetHeight} ry = {layout.facetHeight * 0.5} />

                <g class = 'facet-spark-container'  facetIndex={i}  >
                    <circle class = 'facet-spark-outline' cy = {nodeRadius + layout.facetGap * 0.5} cx = {nodeRadius + layout.facetGap * 0.5} r = {nodeRadius}/>
                    {#if dataState === 'allData'}
                    {@const countData = facetTrendData[i].countData } 
                    <g style="transform:translate( {nodeRadius * 0.5+ layout.facetGap * 0.5}px, {nodeRadius * 0.5 +     layout.facetGap * 0.5}px)">
                        <path class = "facet-sparkline" d = {sparklinePath(countData, nodeRadius)}></path>
                    </g>
                    {/if}
                </g>

                <g class = 'facet-count-container'>
                    <g class = facet-bar-group style = 'transform:translate({layout.facetHeight}px, { layout.facetHeight - layout.facetBarChartHeight * 3}px)'>
                        {#if dataState !== 'noData'}
                        {@const countData = {nodes: +currentData[i].nodes , ways: +currentData[i].ways, relations: +currentData[i].relations} } 
                        {@const barWidth = [countData.nodes, countData.ways, countData.relations] }
                        {@const startPos = [0].concat(cumsum(barWidth)) }
                        <rect class = 'facet-bar nodes'     x = {facetBarScale(startPos[0])} width = {facetBarScale(barWidth[0])}  height = {layout.facetBarChartHeight} />
                        <rect class = 'facet-bar ways'      x = {facetBarScale(startPos[1])} width = {facetBarScale(barWidth[1])}  height = {layout.facetBarChartHeight} />
                        <rect class = 'facet-bar relations' x = {facetBarScale(startPos[2])} width = {facetBarScale(barWidth[2])}  height = {layout.facetBarChartHeight} />
                        <text class = 'facet-bar-label' x = {facetBarScale(startPos[3]) + 5} y = 5> {numberFormatter(+currentData[i].total)}</text> 
                        {/if}
                    </g>
                </g>

                <g class = 'facet-label-wrapper' style = 'transform:translate({nodeRadius * 2 + layout.facetGap }px, {nodeRadius}px)'></g>
            </g>
        </g>
        {/each}
    </g>

    <!-- SDGs GROUP (RHS)-->
    <g class = 'sdgs-group'>        
        <g id = "goals-wrapper"> <!-- Scroll wrapper to have one SDG in view -->
            {#each Object.entries($schema.sdgs) as [goalNo, goalObj], i}   
            <g class ='goal-group goal-{slugify(goalNo)}' style = 'transform:translate({dims.width - layout.goalWidth - 2 *dims.margin.right}px, {i * dims.height }px)'>
                <rect x = {(0)} width ={layout.goalWidth + 2 * dims.margin.right} height = {dims.height}/>
                {#if !showTarget}
                <image class = 'goal-tile'  x = {dims.margin.right}  y= {dims.margin.right} width= {layout.goalWidth}  
                    xlink:href = './static/img/the-global-goals-goals-and-targets/goal-{goalNo}/GOAL_{goalNo}_PRIMARY_ICON/GOAL_{goalNo}_SVG/TheGlobalGoals_Icons_Color_Goal_{goalNo}.svg'/>
                {:else}
                <image class = 'target-tile'  x = {dims.margin.right}  y= {dims.margin.right} width= {layout.goalWidth}  
                    xlink:href = './static/img/the-global-goals-goals-and-targets/goal-{$ui.state.bySection.explore.sdg}/GOAL_{$ui.state.bySection.explore.sdg}_TARGETS/GOAL_{$ui.state.bySection.explore.sdg}_TARGETS_SVG/GOAL_{$ui.state.bySection.explore.sdg}_TARGET_{showTarget.toUpperCase().replace('.', '-')}.svg'/>
                {/if}
                <g class = "goal-label-wrapper" class:hidden={showTarget} style = 'transform:translate({dims.margin.right}px, {layout.goalWidth + dims.margin.right * 3}px)'> </g>

                <text y = 50 x = {-(layout.goalWidth - 1 * dims.margin.right) + 100}  class = "target-header">Targets</text>
                <text y = 75 x = {-(layout.goalWidth - 1 * dims.margin.right) + 160}  class = "indicator-header">and indicators</text>

                <!-- FOR EACH TARGET-->
                {#each Object.entries(goalObj.target) as [targetNo, targetObj], j}                  
                <g class = 'target-group target-{slugify(targetNo)}'  target={targetNo} on:mouseover|stopPropagation={handleTargetMouseover}   on:mouseout={handleMouseout}  >
                    <g class ="target-wrapper" style = 'transform:translate({-layout.targetWidth}px, {(j) * (layout.targetHeight + layout.targetGap) +dims.margin.top}px)'>
                        <rect class = 'target-node' height = {layout.targetHeight} width = {layout.targetWidth} x = {10} />
                        <!-- <g class = 'target-label-wrapper' target={targetNo} style = 'transform:translate({0}px, {0}px)'></g> -->
                        <image class = 'target-tile'  x = {0} height= {layout.targetHeight}  
                            xlink:href = './static/img/the-global-goals-goals-and-targets/goal-{goalNo}/GOAL_{goalNo}_TARGETS/GOAL_{goalNo}_TARGETS_SVG/GOAL_{goalNo}_TARGET_{targetNo.toUpperCase().replace('.', )}.svg'/>

                        <!-- FOR EACH INDICATOR-->
                        {#each Object.entries(targetObj.indicator) as [indicatorNo, indicatorObj], k}    
                        {@const segmentAngle = Math.PI / Object.entries(targetObj.indicator).length}
                            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                            <g class = 'indicator-group indicator-{slugify(indicatorNo)}' style = 'transform:translate({0}px, {layout.targetHeight * 0.5}px)' indicator={indicatorNo} target={targetNo}
                                on:mouseover|stopPropagation={handleIndicatorMouseover}  
                                on:mouseout={handleMouseout}   >
                                <path class = 'indicator-arc' d = {
                                    d3.arc().innerRadius(layout.targetHeight * 0.5 * 0.25)
                                        .outerRadius(layout.targetHeight * 0.5)
                                        .startAngle(-k * segmentAngle)
                                        .endAngle(-(k+1) *segmentAngle)()
                                } />
                            </g>
                        {/each}
                        </g>
                    </g>
                {/each}
            </g>
            {/each}
        </g>
    </g>

    <g class = "annotation">
    </g>

</svg>

<!-- Bottom navigation -->
<div class='sdg-nav-container bottom'>
    <FacetMapSdgNav handler={handleChangeSDG}/>
</div>




<!-- STYLES -->
<style>

    /*** NAV BUTTON ****/
    .nav-button-container{
        margin-top:         5vh;
        display:            flex;
        padding-bottom:     2.5vh;
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

    /*** DATA VIS STYLING  *****/
    .sdg-nav-container{
        width:              70%;
    }
    .sdg-nav-container.top{
        width:              70%;
        padding-bottom:     2.5vh;
        border-bottom:      2px solid var(--primary03);
    }
    .sdg-nav-container.bottom{
        width:              70%;
        margin-top:         2.5vh;
        padding-top:        2.5vh;
        border-top:          2px solid var(--primary03);
    }

    svg#facet-map{
        max-width:          100%;
        max-height:         100%;
        margin-top:         4.5vh
    }
    .hidden{
        opacity:            0;
    }
    /*** FACETS   *****/
    .facet-header,
    .facet-subheader{
        fill:               var(--primary03);
    }
    .facet-header{
        font-weight:        700;
        font-size:          40px;
        text-transform:     uppercase;
        letter-spacing:     2px;
    }
    .facet-subheader{
        font-size:          20px;
    }

    .facet-wrapper{
        pointer-events:     all;
        transform-origin:   center center;
    }
    .facet-wrapper:hover{
        font-weight:       700;
    }   
    .facet-label-wrapper,
    .facet-connections-group, 
    .facet-bar,
    .facet-bar-label{
        pointer-events:     none;
    }
    .facet-label-wrapper{
        font-size:          16px;
    }
    .facet-node{
        fill:             rgb(237, 226, 226);
        stroke:             var(--primary03);
        stroke-width:       2px;
        cursor:             pointer;
    }
    .facet-spark-container{
        pointer-events: none;
    }
    .facet-spark-outline{
        fill:               var(--primary03);
    }
    .facet-sparkline{
        stroke:             var(--primary03-light);
        fill:               none;
        stroke-width:       3px;
        stroke-linecap:     round;
    }
    .facet-bar-label{
        font-size:          10px;
        font-weight:         600;
    }
    .facet-bar.nodes{
        fill:               var(--primary03);
    }
    .facet-bar.ways{
        fill:               var(--secondary01);
    }
    .facet-bar.relations{
        fill:               var(--primary02);
    }
    .facet-bar.areas{
        fill:               var(--secondary02);
    }


    path.facet-connector{
        fill:               none;
        stroke:             var(--primary03);
        stroke-opacity:     0.5;
        stroke-width:       1px;
    }

    .facet-connector.goal-1{  stroke: var(--sdg_01)}
    .facet-connector.goal-2{  stroke: var(--sdg_02)}
    .facet-connector.goal-3{  stroke: var(--sdg_03)}
    .facet-connector.goal-4{  stroke: var(--sdg_04)}
    .facet-connector.goal-5{  stroke: var(--sdg_05)}
    .facet-connector.goal-6{  stroke: var(--sdg_06)}
    .facet-connector.goal-7{  stroke: var(--sdg_07)}
    .facet-connector.goal-8{  stroke: var(--sdg_08)}
    .facet-connector.goal-9{  stroke: var(--sdg_09)}
    .facet-connector.goal-10{ stroke: var(--sdg_10)}
    .facet-connector.goal-11{ stroke: var(--sdg_11)}
    .facet-connector.goal-12{ stroke: var(--sdg_12)}
    .facet-connector.goal-13{ stroke: var(--sdg_13)}
    .facet-connector.goal-14{ stroke: var(--sdg_14)}
    .facet-connector.goal-15{ stroke: var(--sdg_15)}
    .facet-connector.goal-16{ stroke: var(--sdg_16)}
    .facet-connector.goal-17{ stroke: var(--sdg_17)}
    .facet-connector.positive{ stroke: var(--positive)}
    .facet-connector.negative{ stroke: var(--negative)}

    .facet-connector.impact1,
    .facet-connector.impact-1{
        stroke-width:       1px;
    }
    .facet-connector.impact2,
    .facet-connector.impact-2{
        stroke-width:       3px;
    }

    /******** SDG  PANE *********/
    /**** GOAL TILE NODE*/
    .goal-label-wrapper{
        font-size:          40px;
        font-weight:        700;
        fill:               #fff;
    }
    .goal-node{
        stroke:             none;
    }

    .target-header{
        font-weight:        700;
        font-size:          40px;
        text-transform:     uppercase;
        letter-spacing:     2px;
    }
    .indicator-header{
        font-size:          20px;
    }

    /**** TARGETS  *****/
    .target-group{
        transition:         200ms all;
    }
    .target-group.selected{
    }
    .target-node{
        stroke:             none;
    }
    .target-label-wrapper{
        font-size:          9.5px;
        font-weight:        400;
        fill:               #fff;        
    }

    /**** INDICATOR NODE*/
    .indicator-group{
        /* cursor:             pointer; */
    }
    .indicator-arc{
        stroke:             var(--primary03-light);
        stroke-width:       4px;        
    }

    .indicator-label{
        font-size:      6px;
        font-weight:    600;
    }

    .goal-1{ fill: var(--sdg_01)}
    .goal-2{ fill: var(--sdg_02)}
    .goal-3{ fill: var(--sdg_03)}
    .goal-4{ fill: var(--sdg_04)}
    .goal-5{ fill: var(--sdg_05)}
    .goal-6{ fill: var(--sdg_06)}
    .goal-7{ fill: var(--sdg_07)}
    .goal-8{ fill: var(--sdg_08)}
    .goal-9{ fill: var(--sdg_09)}
    .goal-10{ fill: var(--sdg_10)}
    .goal-11{ fill: var(--sdg_11)}
    .goal-12{ fill: var(--sdg_12)}
    .goal-13{ fill: var(--sdg_13)}
    .goal-14{ fill: var(--sdg_14)}
    .goal-15{ fill: var(--sdg_15)}
    .goal-16{ fill: var(--sdg_16)}
    .goal-17{ fill: var(--sdg_17)}

</style>