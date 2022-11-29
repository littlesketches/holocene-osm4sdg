import * as THREE       from 'three'
import { sources }      from '../Config/sources.js'
import Settings         from '../Config/Settings.js'
import Debug            from './Utils/Debug.js'
import Sizes            from './Utils/Sizes.js'
import Time             from './Utils/Time.js'
import Camera           from './Camera.js'
import Controls         from './Controls.js'
import Renderer         from './Renderer.js'
import World            from './World/World.js'
import Resources        from './Utils/Resources.js'
import PostProcessing   from './PostProcessing.js'
import Interactions     from './Interactions.js'
import { Fog } from 'three'

let instance = null


// ThreeJS project template adapted from ThreeJS Journey (Bruno Simon) with Svelte mods: 
// a) sources.js paths routed to apps static folder; 
// b) datGUI loaded as a static module in Svelte component, then passed into Debug.js class (for SvelteKit ony)

export default class Experience{

    constructor(_canvas, datGUI, osmData){
        // Singleton class
        if(instance){ return instance } else {console.log("Experienced being created...")}
        instance = this
        
        // Global access
        window.experience = this

        // Data 
        this.data = {
            osm:    osmData             // Data passed in from svelte $data store (loaded from  Overpass API queries)
        }

        // Options
        this.canvas = _canvas               // Store reference to DOM canvas

        // Setup
        this.elements = {}                  // Element references: mainly used to reference components of grouped loaded models
        this.settings = (new Settings(osmData)).settings            // Reference to scene config settings

        // Scene setup
        this.resources  = new Resources(sources)
        this.debug      = new Debug(datGUI)         // dat GUI passed in as loaded module
        this.sizes      = new Sizes()
        this.time       = new Time()
        this.scene      = new THREE.Scene()

        this.camera     = new Camera()
        this.controls   = new Controls()
        this.renderer   = new Renderer()

        // Scene elements
        this.world      = new World()

        // Scene interaction and effects
        this.interactions     = new Interactions()
        this.postProcessing   = new PostProcessing()


        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }


    resize() {
        this.camera.resize()
        this.renderer.resize()
        this.postProcessing.resize()
    }

    update() {
        this.controls.update()
        this.world.update()
        // this.renderer.update()           // Update one of the renderer or  
        this.postProcessing.update()        // post processing
    }

    destroy() {
        console.log("DESTROYING the ThreeJS scene")
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material){
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                }
            }
        })


        // this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active){
            this.debug.ui.destroy()
        }

        this.world.destroy()
        instance = null             // Remove the singleton 
    }
}