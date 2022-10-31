import * as THREE from 'three'
import Experience from '../Experience.js'


////////////////////////////////////////////////////////
/// SETUP SHADER ANIMATIONS / UPDATE-ABLES  OBJECT   ///
////////////////////////////////////////////////////////

export default class Shaders {
    constructor() {
        this.experience = new Experience()
        this.time = this.experience.time
        this.shaderUpdatables = {}
    }

    update() {
        for (const object of Object.values(this.shaderUpdatables)) {
            object.uniforms.uTime.value = this.time.elapsed * 0.001
        }
    }
}




