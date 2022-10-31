<!-- ABOUT HOLOCENE SUBSECTION COMPONENT-->
<script>
    import DownArrow            from '../../shared/DownArrow.svelte'
    import SdgDivider           from '../../shared/SdgDivider.svelte';
    import { changeSubsection } from '../../../lib/utils/nav.js';
    import { schema }           from '../../../data/stores/schema.js';
    import { getKeyValueCount } from '../../../data/api/tagInfo.js'
    import {format }             from 'd3'



    const promise = getKeyValueCount("boundary", "administrative")


</script>


<!-- HTML COMPONENT MARKUP-->
<section id = "about" class = "subsection">
    <div class = "subsection-content-wrapper">
        <h1>about holocene</h1>
        <SdgDivider/>
            <p>Measuring how cities and communities are progressing towards the UN Sustainable Development Goals (SDGs) is a complex task. Every city and every community have its own unique development context, resources and priorities. A common problem is that cities and communities lack access to powerful data and flexible data tools to help them understand what really matters.
            </p>
            <p><i>Holocene</i> is a prototype web-based tool that allows you to use OpenStreetMap (OSM) data to create your own set of metrics (called <i>Facets</i>) for <em>any city or community</em> that has been tagged (in OSM) as an 'administrative boundary'. Currently there are an incredible
            {#await promise then noBoundaries} <em>{@html format(",")(noBoundaries) }(!)</em>{/await} of listings in OSM that we <i>think</i> should be able to be analysed in <i>Holocene</i>. Many of these won't be that useful, but it means that the idea is that <i>Holocene</i> is equipped operate on vastly different and often more interesting scales.  
            </p>            
            <p><i>Holocene</i> also allows you to benchmark and track progress towards <em>all 17 SDGs</em> and their supporting targets and indicators. Again, this may not be useful to everyone - particularly those working through a narrow lens onto sustainable development. However some core principles of <i>Holocene</i> are that the application is accessible to everyone, and that it invites different perspectives. It is <em>an instrument designed to help us all work towards achieving the SDGs, together.</em> 
            </p>
    </div>

    <div class = "down-button-container">
        <DownArrow handler={changeSubsection} target="data"/>
    </div>
</section>



<!-- STYLES -->
<style>
    /** Subsection layout **/
    h1{
        text-align:             center;
        text-transform:         lowercase;
    }
    .subsection-content-wrapper{
        display:                grid;

    }
    .down-button-container{
        margin-top:             5vh;
    }
    .content-container{
        margin:                 2.5vh 0;
    }
</style>