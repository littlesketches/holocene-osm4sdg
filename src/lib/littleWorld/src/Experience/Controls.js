import * as THREE        from 'three'
import Experience        from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


///////////////////////////////
/// SETUP OF ORBIT CONTROLS ///
///////////////////////////////


export default class Controls{

    constructor(){
        this.ref = new Experience()         // Reference to Experience singleton
        this.setInstance()                  // Orbit controls instance
    }

    setInstance(){
        this.instance = new OrbitControls(this.ref.camera.instance, this.ref.canvas)
        this.instance.enableDamping = true
        this.instance.enableDamping = true;
        this.instance.minDistance = 0;
        this.instance.maxDistance = 100;
        this.instance.maxPolarAngle = Math.PI * 0.475; 

        this.instance.target.set(
            this.ref.settings.camera.target.x, 
            this.ref.settings.camera.target.y, 
            this.ref.settings.camera.target.z
        )
    }

    update(){
        this.instance.target.y = Math.max(this.instance.target.y, 0)        // Keeps target above the xz-plane
        this.instance.update()
    }
}