import * as THREE from 'three'
import Experience from './Experience.js'

/////////////////////////////////
/// SETUP OF THREEJS RENDERER ///
/////////////////////////////////


export default class Renderer{

    constructor(){
        this.ref = new Experience()         // Reference to Experience singleton
        this.setInstance()                  // Renderer instance
    }

    setInstance(){
        this.instance = new THREE.WebGLRenderer({
            canvas:                 this.ref.canvas,
            antialias:              true,
            logarithmicDepthBuffer: this.ref.settings.options.logDepthBuffer
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding        = THREE.sRGBEncoding
        this.instance.toneMapping           = THREE.CineonToneMapping
        this.instance.toneMapping           = THREE.ACESFilmicToneMapping
        this.instance.toneMappingExposure   = this.ref.settings.lights.exposure;
        this.instance.shadowMap.enabled     = true
        this.instance.alpha                 = true
        this.instance.shadowMap.type        = THREE.PCFSoftShadowMap
        this.instance.setSize(this.ref.sizes.width, this.ref.sizes.height)
        this.instance.setPixelRatio(Math.min(this.ref.sizes.pixelRatio, 2))

        this.instance.setClearColor(0xfafeff, 1);
    }

    resize(){
        this.instance.setSize(this.ref.sizes.width, this.ref.sizes.height)
        this.instance.setPixelRatio(Math.min(this.ref.sizes.pixelRatio, 2))
    }

    update(){
        this.instance.render(this.ref.scene, this.ref.camera.instance)
    }
}