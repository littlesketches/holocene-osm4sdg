<!--  HOLOCENE DATA SUBSECTION COMPONENT-->
<script>
    import DownArrow            from '../../shared/DownArrow.svelte'
    import { changeSubsection }  from '../../../lib/utils/nav.js';
    import SdgDivider           from '../../shared/SdgDivider.svelte';
</script>


<!-- HTML COMPONENT MARKUP -->
<section id ="data" class = "subsection">

    <div class = "subsection-content-wrapper">
        <h1>Open source x open data</h1>
        <SdgDivider/>
        <p>This version of <i>Holocene</i> is a fully working prototype built on top of the amazing OpenStreetMap project and its various data APIs, primarily: the <a target = "_blank" href="https://wiki.openstreetmap.org/wiki/Overpass_API">Overpass API</a>, as well as the <a  target = "_blank" href ="https://nominatim.openstreetmap.org/ui/search.html">Nomantim search API</a> and the <a target="_blank" href ="https://taginfo.openstreetmap.org/taginfo/apidoc">tagInfo API</a>. This tool would not be possible without these incredible open source resources (and associated tools and projects: <a target="_blank" href = "https://overpass-turbo.eu/">Overpass Turbo</a> and <a target = "_blank" href ="https://taginfo.openstreetmap.org/">TagInfo</a> and <a target="_blank" href = "https://osmbuildings.org/"> OSM Buildings</a>. A huge <em>thank you </em>to everyone involved in those projects, and to those at the wonderful <a target ="_blank" href="https://wiki.osmfoundation.org/wiki/Main_Page">OpenStreetMap Foundation.</a>
        </p>
        <p>Finally, to all the millions of OSM data contributors and community members, thank you too!</p>
        <div class = 'image-container'>
            <img src='./static/img/osm_logo.svg'/>
        </div>
        <div class = "note">
            <p>...one more note: Holocene has been designed with an eye on incorporating other open source data sets. We're not sure what they might be right now, or how they'll work, but we look forward to exploring how they might play together!</p>
        </div>

    </div>

    <div class = "down-button-container">
        <DownArrow handler={changeSubsection} target="guide" section="home"/>
    </div>
</section>


<!-- STYLES -->
<style>
    h1{
        text-align:             center;
        text-transform:         lowercase;
    }
    .note,
    .image-container{
        display:                flex;
        justify-content:        center;
    }
    .down-button-container{
        margin-bottom:          10vh;
    }
    .note{
        margin-top:             3rem;
        font-style:             italic;
        text-align:             center;
    }
</style>