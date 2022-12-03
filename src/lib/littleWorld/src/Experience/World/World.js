import Experience       from '../Experience.js'
import Shaders          from '../Shaders/Shaders.js'
import Materials        from '../Utils/Materials.js'
import SkyClass         from './Environment/Sky.js'
import Lighting         from './Environment/Lighting.js'
import Fog              from './Environment/Fog.js'

import OsmFeatures      from './Landscape/OsmFeatures.js'
import Fireflies        from './Animated/Fireflies.js'



//////////////////////////////////////
/// COMPOSITION OF THE WORLD SCENE ///
//////////////////////////////////////

export default class World{
    constructor(){
        this.ref     = new Experience()             // Reference to Experience singleton

        // Wait for resources, then setup each element
        this.ref.resources.on('ready', () => {
            // Controllers for animation related models
            this.shaders = new Shaders()

            // Materials and meshes
            this.materials = new Materials()

            // Built environment: OSM features
            this.osmFeatures = new OsmFeatures()
            if(this.osmFeatures){
                this.fireflies = new Fireflies()
            }    

            // Environment
            this.lighting = new Lighting()
            // this.sky = new SkyClass()          // Sky must be added after lighting as it controls the sun directional light
            this.fog = new Fog()

        })
    }

    // Update animated elements
    update(){

        if(this.shaders)
            this.shaders.update()

        // FPS stats monitor
        if(this.ref.debug.active)
            this.ref.debug.stats.update()

    }

    destroy(){
        console.log('Need to remove the osmFeatures')
        this.osmFeatures.destroy()
    }
}