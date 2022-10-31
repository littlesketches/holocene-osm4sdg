import * as THREE        from 'three'
import Experience        from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//////////////////////////////////////////////
/// PERSPECTIVE CAMERA AND ORBIT CONTROLS ///
//////////////////////////////////////////////


export default class Camera{

    constructor(){
        this.ref = new Experience()     // Reference to Experience singleton
        this.setInstance()              // Camera instance
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(
            this.ref.settings.camera.fov, 
            this.ref.sizes.width / this.ref.sizes.height, 
            this.ref.settings.camera.perspective.near, 
            this.ref.settings.camera.perspective.far
        )
        this.instance.position.set(
            this.ref.settings.camera.pos.x, 
            this.ref.settings.camera.pos.y, 
            this.ref.settings.camera.pos.z
        )
        this.instance.name = 'camera'

        // Add camera to scene
        this.ref.scene.add(this.instance)
    }

    resize(){
        this.instance.aspect = this.ref.sizes.width / this.ref.sizes.height
        this.instance.updateProjectionMatrix()
    }


}