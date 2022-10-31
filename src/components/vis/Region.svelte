<script>
    import { data }     from "../../data/stores/data.js";
    import { schema }   from "../../data/stores/schema.js";
    import * as d3      from 'd3'
    import { onMount } from "svelte";


    const svgWidth = 1920, svgHeight = 1080
    const leafletEl = document.querySelector('path.leaflet-interactive'),
        leafletPath = leafletEl.getAttribute('d'),
        leafletBBox = leafletEl.getBBox(), 
        xMin        = leafletBBox.x, 
        yMin        = leafletBBox.y, 
        width       = leafletBBox.width, 
        height      = leafletBBox.height,
        scale       = svgWidth / width  * 0.5
</script>


<!-- HTML/ SVG COMPONENT MARKUP-->
<svg class = "boundary-svg" viewBox = '0 0 {svgWidth} {svgHeight}'>
    
    {#each Object.keys($schema.sdgs) as sdgCode, i }
    <g class="geoPath-wrapper goal-{sdgCode}" style = "transform:translate({svgWidth * 0.5 - 8.5*10+  i*10}px, {svgHeight * 0.25 - 8.5*10 + i*10}px)">
        <path class="geoPath" d = {leafletPath} style = "transform: scale({scale}) translate({-xMin - width * 0.5}px, {-yMin - height * 0.5}px) "/>
    </g>
    {/each}
</svg>


<!-- STYLE-->
<style>
    svg{
        width:      100%;
        overflow: visible;
    }
    path{
        fill:               none;
        stroke-width:       0.25px;
        stroke-linecap:     round;
        mix-blend-mode:     color-dodge;
    }

    .goal-1{  stroke: var(--sdg_01)}
    .goal-2{  stroke: var(--sdg_02)}
    .goal-3{  stroke: var(--sdg_03)}
    .goal-4{  stroke: var(--sdg_04)}
    .goal-5{  stroke: var(--sdg_05)}
    .goal-6{  stroke: var(--sdg_06)}
    .goal-7{  stroke: var(--sdg_07)}
    .goal-8{  stroke: var(--sdg_08)}
    .goal-9{  stroke: var(--sdg_09)}
    .goal-10{ stroke: var(--sdg_10)}
    .goal-11{ stroke: var(--sdg_11)}
    .goal-12{ stroke: var(--sdg_12)}
    .goal-13{ stroke: var(--sdg_13)}
    .goal-14{ stroke: var(--sdg_14)}
    .goal-15{ stroke: var(--sdg_15)}
    .goal-16{ stroke: var(--sdg_16)}
    .goal-17{ stroke: var(--sdg_17)}
</style>

