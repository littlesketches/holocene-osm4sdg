import * as THREE from 'three'
import Experience from '../../Experience.js'


////////////////////////////////////////////
/// PARTICLE-BASED FIREFLIES             ///
////////////////////////////////////////////

export default class Fireflies {
    constructor() {
        this.ref = new Experience()                 // Reference to Experience singleton
        this.shaderUpdatables = this.ref.world.shaders.shaderUpdatables

        // Debug
        if (this.ref.debug.active) {
            this.debugFolder = this.ref.debug.ui.__folders.Creatures ? this.ref.debug.ui.__folders.Creatures.addFolder('Fireflies') : this.ref.debug.ui.addFolder('Creatures').addFolder('Fireflies')
        }
        // Add fireflies
        this.createFireflies()
    }

    createFireflies() {
        // Create geometry
        const firefliesGeometry = new THREE.BufferGeometry()
        this.firefliesCount = 50000
        const positionArray = new Float32Array(this.firefliesCount * 3)
        const scaleArray = new Float32Array(this.firefliesCount)

        // Position particles (in buffer array)
        for (let i = 0; i < this.firefliesCount; i++) {
            const xPos = (Math.random() - 0.5) * this.ref.settings.model.dims.width
            const zPos = (Math.random() - 0.5) * this.ref.settings.model.dims.depth
            const yPos = 0

            positionArray[i * 3 + 0] = xPos 
            positionArray[i * 3 + 1] = yPos + (10 + (Math.random() * 15 - 10)) /100
            positionArray[i * 3 + 2] = zPos 

            scaleArray[i] = (1 + Math.random() * 100) / 40
        }

        firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
        firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

        // Material
        this.firefliesMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uSize: { value: 100 }
            },
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })

        // Create points object
        this.fireflies = new THREE.Points(firefliesGeometry, this.firefliesMaterial)
        this.fireflies.visible = this.ref.settings.options.showFireflies
        this.fireflies.name = "particles-fireflies"

        // Add to scene and shader updatables
        this.ref.scene.add(this.fireflies)
        this.shaderUpdatables.fireflies = this.firefliesMaterial

        // Debug
        if (this.ref.debug.active) {
            this.debugFolder.add(this.fireflies, 'visible').name('Show fireflies!')
                .onChange(() => this.ref.settings.options.showFireflies = this.fireflies.visible)
            this.debugFolder.add(this.firefliesMaterial.uniforms.uSize, 'value')
                .min(0).max(1000).step(1).name('Firefly size')
        }

    }

}



////////////////////////////////////////////////////////////
/// FIREFLIES SHADERS                                    ///
////////////////////////////////////////////////////////////

const firefliesVertexShader = `
    // Conditions and variables to render with logarithmic depth buffer enabled
    #ifdef USE_LOGDEPTHBUF
        #define EPSILON 1e-6

        #ifdef USE_LOGDEPTHBUF_EXT
            varying float vFragDepth;
        #endif

        uniform float logDepthBufFC;
    #endif

    // Shader variables
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSize;

    attribute float aScale;

    void main()
    {
        // Conditions to render with logarithmic depth buffer enabled
        #ifdef USE_LOGDEPTHBUF
            gl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;
            #ifdef USE_LOGDEPTHBUF_EXT
                vFragDepth = 1.0 + gl_Position.w;
            #else
                gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;
            #endif
        #endif


        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
        modelPosition.x += sin(uTime + modelPosition.x * 100.0) * 0.1;
        modelPosition.z += cos(uTime + modelPosition.x * 100.0) * 0.1;

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;

        gl_Position = projectionPosition;
        
        gl_PointSize = uSize * aScale * uPixelRatio;
        gl_PointSize *= (1.0 / - viewPosition.z);
    }
`

const firefliesFragmentShader = `
    // Conditions and variables to render with logarithmic depth buffer enabled
    #ifdef USE_LOGDEPTHBUF
        uniform float logDepthBufFC;
        #ifdef USE_LOGDEPTHBUF_EXT
            // #extension GL_EXT_frag_depth : enable
            varying float vFragDepth;
        #endif
    #endif


    void main()
    {
        #if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)

            gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;

        #endif


        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 0.05 / distanceToCenter - 0.1;

        gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
    } 
`