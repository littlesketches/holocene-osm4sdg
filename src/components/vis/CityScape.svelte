<!-- COMPONENT FOR WEBGL CANVAS FOR THREEJS SCENE-->
<script>
    import { onDestroy, beforeUpdate, onMount }   from 'svelte';
    import { data }                 from '../../data/stores/data.js'
    import { ui }                 from '../../data/stores/ui.js'
    import Experience               from '../../lib/littleWorld/src/Experience/Experience.js'


    let experience
    // Static loading of dat.GUI before instantiating experience
    onMount( render)
    // beforeUpdate( render)


    onDestroy( async () => {
        console.log('Need to properly destroy the ThreeJS objects....')
        experience.destroy()
        window.experience = null
    })


    async function render(){
        const inputData = {
            nodes:          $data.osm.response.buildings,
            center:         [
                +$data.osm.selected.location.geom.center.lon,
                +$data.osm.selected.location.geom.center.lat,
            ],
            bbox:           $data.osm.selected.location.geom.overpassBounds,
            boundaryPoints: $data.osm.selected.location.geom.pointsArray, 
            data:           $data.osm.selected.location.data,
            shape:          $data.osm.selected.location.geom.useBoundary  ? $data.osm.selected.location.geom.flattenedPointsArray.map(d => [d[1], d[0]] ) :
                            [
                                [$data.osm.selected.location.geom.pointsArray[0], $data.osm.selected.location.geom.pointsArray[1]],  
                                [$data.osm.selected.location.geom.pointsArray[0], $data.osm.selected.location.geom.pointsArray[3]],  
                                [$data.osm.selected.location.geom.pointsArray[2], $data.osm.selected.location.geom.pointsArray[3]],  
                                [$data.osm.selected.location.geom.pointsArray[2], $data.osm.selected.location.geom.pointsArray[1]] 
                            ]
        }

        import('dat.gui').then(datGUI => {
            // Create THREEJ SCENE
            experience = new Experience(
                document.getElementById('cityScape'), 
                datGUI, 
                inputData
            )
            console.log("-- RENDERING NEW EXPERIENCE", inputData)

            // ADD EVENT LISTENESRS
            // document.addEventListener('keypress', (e) =>{
                // if(e.code === "Space"){
                //     document.getElementById('cityScape').classList.toggle('orbit')
                // }

                // if(e.code === "Space"){
                //     document.querySelectged('.dg').
                // }
            // })
        })
    };

</script>


<!--COMPONENT HTML MARKUP-->
<div class = wrapper>
    <canvas id="cityScape" class="webgl"></canvas>
</div>



<!-- STYLES -->
<style>
    .wrapper{
        width:              85vw;
        overflow:           hidden;
    }
    .webgl{
        outline:            none;
        /* pointer-events:     none; */
    }
    .webgl.orbit{
        pointer-events:     auto;
    }
    /* Style for adding Stats monitor to the Dat GUI */
    :global(.dg li.gui-stats:not(.folder)){
        height: auto;
    }
</style>