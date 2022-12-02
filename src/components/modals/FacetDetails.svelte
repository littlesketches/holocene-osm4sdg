<!-- FACET MANAGEMENT MODAL-->
<script>
    import * as d3          from 'd3'
    import { ui }           from "../../data/stores/ui.js";
    import { schema }       from "../../data/stores/schema.js";
    import { data }         from "../../data/stores/data.js";
    import { onMount } from "svelte";
    import { format, map } from 'd3';
    import { attr } from 'svelte/internal';


    // Schema related data
    const facetObj = $schema.data.osm.facets[$ui.modal.facetIndex]
    const linkedGoals = [...new Set(facetObj.indicators.map(d => +d.code.slice(0, d.code.indexOf('.') )) )].sort(),
        linkedGoalsList = `${linkedGoals.slice(0, linkedGoals.length - 1).map(d => `SDG #${d}` ).join(", ")} and SDG #${linkedGoals[linkedGoals.length - 1]}`,
        noIndicators = facetObj.indicators.length

    const osmObjects = ['Nodes', 'Ways', 'Relations', 'Areas']  // For bar chart order

    const dims ={       // For trendline chart
        margin:     {
            top: 50, bottom: 30, left: 10, right: 10
        },
        width:      600,
        height:     300
    }

    // Variables where there is data available
    let facetData, maxCount
    if($ui.state.vis.facetSDGVis.dataState !== 'noData'){
        facetData = $data.osm.response.byFacet[$ui.modal.facetIndex]
        if($ui.state.vis.facetSDGVis.dataState === 'allData'){
            const sortedCounts = Object.values(facetData.today.tags).map(d => +d).sort((a, b) => a - b)
            maxCount = sortedCounts[sortedCounts.length -2]

        }
    }



        onMount( () => {
        if($ui.state.vis.facetSDGVis.dataState === 'allData'){
            const maxYearsAgo = d3.max([...$schema.time.historicalYearsAgo])
            const yearsAgoArray = [...$schema.time.historicalYearsAgo].reverse().concat([0])
            const timeDomain = yearsAgoArray.map(d => maxYearsAgo - d)
            const facetTrendData = Object.entries($data.osm.response.byFacet).map( ([key, value]) => {
                return  { // Facet index ('id')
                    name:       value.name,
                    countData:  yearsAgoArray.map( d => {
                        const label = d > 0 ?  `yearAgo-${d}` : 'today'
                        const data = value[label].tags
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

            const chartData = facetTrendData[$ui.modal.facetIndex].countData.map(d => d.total)
            const vis = d3.select('.trend-vis'),
                chart =  vis.append('g').classed('chart', true)
                    .attr('transform', `translate(${dims.margin.left}, ${dims.margin.top})`)

            const xScale = d3.scaleLinear()
                .domain([d3.max(timeDomain), 0])
                .range([dims.width  -  dims.margin.left - dims.margin.right, 0])

            const yScale = d3.scaleLinear()
                .domain(d3.extent(chartData))
                .range([dims.height - dims.margin.bottom - dims.margin.top, 0])

            const pointsData = chartData.map((d,i) => [timeDomain[i], d ])
            const path = d3.line()
                    .x(d => xScale(d[0]) ) 
                    .y(d => yScale(d[1]) ) 
                    .curve(d3.curveMonotoneX)

            const dotGroup = chart.append('g').classed('dots', true)

            chart.append('path')
                .classed('trendline', true)
                .attr('d', path(pointsData) )
                .style('stroke', '#fff')
                .style('stroke-width', 5)
                .style('fill', 'none')

            chart.append('g')
                .selectAll('circle')
                .data(pointsData)
                .join('circle')
                .attr('cx', d => xScale(d[0]))
                .attr('cy', d => yScale(d[1]))
                .attr('r', d =>  10)
                .style('fill', '#fff')

            chart.append('g')
                .selectAll('text')
                .data(pointsData)
                .join('text')
                    .attr('x', d => xScale(d[0]))
                    .attr('y', d => yScale(d[1]) + 40)
                    .style('fill', '#fff')
                    .style('text-anchor', 'middle')
                    .text(  d => d3.format(",")(d[1]) )


            chart.append('g')
                .selectAll('text')
                .data(pointsData)
                .join('text')
                    .attr('x', d => xScale(d[0]))
                    .attr('y', d => dims.height - 10)
                    .style('fill', '#fff')
                    .style('text-anchor', 'middle')
                    .text(  (d, i) => yearsAgoArray[i] > 1 ? `${yearsAgoArray[i]} years ago` : yearsAgoArray[i] ==1 ? '1 year ago' : 'Now' )
        }
    })

</script>

<!-- HTML COMPONENT MARKUP-->
<section>
    <div class = 'title-container'>
        <div class = "sub-title">About this Facet </div>
        <h1 class = "main-title">{@html facetObj.name} </h1>    
    </div>

    <div class = 'info-container'>
        <div class = 'item-container'>
            <div class ='info-label'>The story</div>
            <div class ='info-text'>{@html facetObj.storyline}</div>
        </div>
        <div class = 'item-container'>
            <div class ='info-label'>About this 'score'</div>
            <div class ='info-text'>{@html facetObj.description}</div>
        </div>
        <div class = 'item-container'>
            <div class ='info-label'>Connections </div>
            <div class = 'info-text'>
                {#if noIndicators >0 }
                This facet might help us understand progress towards {@html linkedGoalsList} through {#if noIndicators !== 1}connections to {@html noIndicators} indicators{:else}one indicator.{/if}
                {:else}
                This facet has not yet been mapped to influence any SDG indicators (and their parent targets and goals).
                {/if}
            </div>
        </div>
    </div>

    <div class = 'data-container'>
        {#if $ui.state.vis.facetSDGVis.dataState !== 'noData'}
            <div class = 'item-container'>
                <div class ='info-label'>OpenStreetMap objects</div>            
                <div class ='score-title'>{@html d3.format(',')(+facetData.today.tags.total)}</div>
                <div class = 'bar-chart-container '>
                    {#each osmObjects as name, i}
                    {@const count = facetData.today.tags[name.toLowerCase()]}
                    <div class = 'bar-container {name.toLowerCase()}'>
                        <div class = 'bar-label'>{@html name} ({@html d3.format(',')(+count)})</div>
                        <div class = "bar" style = "width:{count / maxCount * 100}%"></div>
                    </div>
                    {/each}
                </div>
            </div>
            {#if $ui.state.vis.facetSDGVis.dataState === 'allData'}
            <div class = 'item-container'>
                <div class ='info-label'>Changes over time</div>
                <svg class = 'trend-vis' viewBox = "0 0 {dims.width} {dims.height}"> </svg>
            </div>
            {/if}
        {:else}
        <div class = 'item-container'>
            <div class ='info-label'>Facet data has not been retrieved yet</div>   
            <div class ='info-text'>You can setup Facets and query OSM data in the <i>Compose</i> section</div>
        </div>
        {/if}
    </div>
</section>


<!-- STYLES -->
<style>

    section{
        color:                  #fff;
        display:                grid;
        grid-template-columns:  1fr 1fr;
        grid-template-rows:     auto 1fr;
        column-gap:             2.5vw;
        height:                 calc(100% - 2.5vw);
        overflow:               scroll;
        padding:                0vw 5vw;
    }
    .title-container{
        grid-area:              1 / 1 / 2 / 3;
        margin-bottom:          2.5vh;
    }
        .sub-title{
            margin-top:             2.5vh;
            font-size:              70%    
        }
        .main-title{
            color:                  var(--primary02-light);
            margin-block-start:     2.5vh;
            margin-block-end:       5vh;
            font-size:              200%;
        }
    .info-container{
        grid-area:              2 / 1 / 3 / 2;
    }
    .data-container{
        grid-area:              2 / 2 / 3 / 3;
    }


    .option-container{
        /* display:                grid;
        grid-template-columns:  2fr 2fr;
        column-gap:             5vw;
        padding-top:            1rem; */
    }

    .item-container {
        margin-bottom:             3.5vh;
    }
    .info-label{
        align-items:                center;
        font-weight:                700;
    }
    .info-text{
        font-size:              70%;
        line-height:            1.2;
        font-style:             italic;
    }

    .score-title{
        font-size:              300%;
        font-weight:            600;
        line-height:            1;
    }
    .score-subtitle{
        font-size:              50%;
        font-weight:            600;
    }

    /*******   BAR CHART*****/
    .bar-container{
        display:                grid;
        margin-top:             1.5vh;
    }
    .bar-label{
        font-size:              70%;
        font-weight:            700 ;
        line-height:            1.5;
    }
    .bar{
        height:                 5px;
        margin-bottom:          0px;
        border-radius:          2.5px;
    }
    .bar-data-label{
        /* text-align:             end; */
        font-size:              50%;
        font-weight:            400;
        line-height:            1;
        margin-top:             5px;
    }
    .bar-container.nodes *{         color:  var(--primary03);}
    .bar-container.nodes .bar{      background:  var(--primary03);}
    .bar-container.relations *{     color:  var(--secondary01);}
    .bar-container.relations .bar{  background:  var(--secondary01);}
    .bar-container.ways *{          color:  var(--primary02);}
    .bar-container.ways .bar{       background:  var(--primary02);}
    .bar-container.areas *{         color:  var(--secondary02);}
    .bar-container.areas .bar{      background:  var(--secondary02);}

    svg{
        overflow: visible;
    }
    .trendline{
        fill: none;
        stroke: pink;
        stroke-width: 5px;
    }

</style>


