import * as THREE from 'three'
import Experience from '../../Experience.js'


////////////////////////////////////////////
/// ADD BASIC THREEJS FOG TO SCENE       ///
////////////////////////////////////////////

export default class Fog{
    constructor(){
        this.ref = new Experience()          // Reference to Experience singleton

        // Debug
        if(this.ref.debug.active){
            this.debugFolder = this.ref.debug.ui.__folders.Environment ? this.ref.debug.ui.__folders.Environment : this.ref.debug.ui.addFolder('Environment')
        }
        // Add fog to the scene object
        this.addFog() 
    }

    addFog(){
        this.ref.scene.fog = new THREE.FogExp2(this.ref.settings.fog.color, this.ref.settings.fog.density)

        // Debug
        if(this.ref.debug.active){
            const fogFolder = this.debugFolder.addFolder('Fog')
            fogFolder.add(this.ref.scene.fog, 'density', 0, 0.0005, 0.00001).name('Fog density')
            fogFolder.addColor(this.ref.settings.fog, 'color').name('Fog colour')
                .onChange(() => this.ref.scene.fog.color.set(this.ref.settings.fog.color))
        }
    }

}