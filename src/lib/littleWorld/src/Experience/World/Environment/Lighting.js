import * as THREE from 'three'
import Experience from '../../Experience.js'


////////////////////////////////////////////
/// SCENE LIGHTING AND ENVIRONMENT MAP   ///
////////////////////////////////////////////

export default class Lighting{
    constructor(){
        this.ref = new Experience()              // Reference to Experience singleton

        // Debug
        if(this.ref.debug.active){
            this.debugFolder = this.ref.debug.ui.__folders.Environment ? this.ref.debug.ui.__folders.Environment : this.ref.debug.ui.addFolder('Environment')
        }

        this.setSunLight()
        this.setHemiLight()
        this.setEnvironmentMap()
    }

    
    setSunLight(){ // Directional light with positibn controlled by the SkyShader
        this.sunLight = new THREE.DirectionalLight(
            this.ref.settings.lights.directionalLight.color,
            this.ref.settings.lights.directionalLight.intensity
        )

        // Set up shadow properties for the light
        // this.sunLight.castShadow             = true
        this.sunLight.shadow.mapSize.height  = 1024 * 3; 
        this.sunLight.shadow.mapSize.width   = 1024 * 3; 
        this.sunLight.shadow.camera.near     = 1000; 
        this.sunLight.shadow.camera.far      = 10000; 
        this.sunLight.shadow.camera.left     = -5000; 
        this.sunLight.shadow.camera.right    = 5000; 
        this.sunLight.shadow.camera.top      = 5000; 
        this.sunLight.shadow.camera.bottom   = -5000; 
        this.sunLight.shadow.bias            = -0.0001; 
        this.sunLight.shadow.radius          = 10; 
        this.sunLight.shadowCameraVisible   = true;

        this.sunLight.name = 'light-sun'
        this.ref.scene.add(this.sunLight)     



    }

    setHemiLight(){     // Hemisphere light
        this.ambientLight = new THREE.HemisphereLight(
            this.ref.settings.lights.ambientLight.sky,
            this.ref.settings.lights.ambientLight.ground,
            this.ref.settings.lights.ambientLight.intensity
        );

        this.ambientLight.name = 'light-hemisphere'
        this.ref.scene.add(this.ambientLight)     

        if(this.ref.debug.active){
            const ambientFolder = this.debugFolder.addFolder('Ambient hemisphere light')

            ambientFolder.add(this.ambientLight, 'intensity')
                .name('Intensity')
                .min(0).max(5).step(0.01)

            ambientFolder.addColor(this.ref.settings.lights.ambientLight, 'sky')
                .name('Sky colour')
                .onChange(() => this.ambientLight.color.set(this.ref.settings.lights.ambientLight.sky))

            ambientFolder.addColor(this.ref.settings.lights.ambientLight, 'ground')
                .name('Ground colour')
                .onChange(() => this.ambientLight.groundColor.set(this.ref.settings.lights.ambientLight.ground))


        }
    }

    setEnvironmentMap(){ // Environment map
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.ref.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding        
        this.ref.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.ref.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.ref.debug.active){
            const envMapFolder = this.debugFolder.addFolder('Environment map light')
            envMapFolder
                .add(this.environmentMap, 'intensity')
                .name('Intensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}