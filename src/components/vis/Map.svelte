<!-- PROJECT MAP: LEAFLET MAP WITH SVG OVERLAYS-->
<script>
    import { onMount, onDestroy } from 'svelte';
	import { ui }       from '../../data/stores/ui'	 
    import L        from 'leaflet';

    export let geometryArray = null;

    let mapElement, map;

    // Tile URL options
    const tileURLs = {
        lightGrey:      'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', // Light grey
        worldImagery:   'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',                // World imagery grey   
        light:          'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        toner:          'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png'
    }

    // Add Leaflet map onload
    onMount(async () => {
        map = L.map(mapElement)

        L.tileLayer(tileURLs[$ui.state.vis.map.tiles], {
            attribution: $ui.state.vis.map.attribution
        }).addTo(map);

        // const boundary = L.polygon([geometryArray], $ui.state.vis.map.boundaryStyle).addTo(map);
        const boundary = L.polyline([geometryArray], $ui.state.vis.map.boundaryStyle).addTo(map);
        map.fitBounds(boundary.getBounds())

        $ui.state.bySection.compose.mapRendered = true
    });

    // Remove map when component is destroyed
    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
            $ui.state.bySection.compose.mapRendered = false
        }
    });

</script>


<!--  HTML COMPONENT MARKUP-->
<div class = "leafletMap" bind:this={mapElement}></div>


<!-- STYLES-->
<style>
    @import 'leaflet/dist/leaflet.css';
    .leafletMap{        
        width:              100%;
        min-height:         50vh;
        filter:             sepia(0.4);
        transition:         800ms all;
    }
    .leafletMap:hover{
        filter:             sepia(0.1);
    }
</style>



