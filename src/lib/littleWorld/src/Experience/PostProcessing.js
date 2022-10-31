import * as THREE from 'three'
import Experience from './Experience.js'

import { EffectComposer }   from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass }       from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass }       from 'three/examples/jsm/postprocessing/ShaderPass.js'

import { LuminosityShader }      from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader }   from 'three/examples/jsm/shaders/SobelOperatorShader.js';
import { BokehPass }             from 'three/examples/jsm/postprocessing/BokehPass.js';
import { UnrealBloomPass }       from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { DotScreenPass }         from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { HalftonePass }          from 'three/examples/jsm/postprocessing/HalftonePass';
import { FilmPass }              from 'three/examples/jsm/postprocessing/FilmPass';
import { RGBShiftShader }        from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { GlitchPass }            from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { SMAAPass }              from 'three/examples/jsm/postprocessing/SMAAPass.js'



/////////////////////////////////////////
/// SETUP OF POST PROCESSING EFFECTS  ///
/////////////////////////////////////////

export default class PostProcessing{

    constructor(){
        this.ref = new Experience()                 // Reference to Experience singleton
        this.effects = {}                           // Object to hold effects passes

        // Debug
        if(this.ref.debug.active){
            this.debugFolder =  this.ref.debug.ui.__folders['Post processing effects'] ? this.ref.debug.ui.__folders['Post processing effects']  : this.ref.debug.ui.addFolder('Post processing effects')
        }

        // Effect composer and render target
        this.setInstance()                      

        // Effect passes
        this.addSobelPass()
        this.addDepthOfFieldPass()
        this.addBloomPass()
        this.addDotScreenPass()
        this.addRgbHalftonePass()
        this.addFilmPass()
        this.addGlitchPass()
        this.addTintPass()
        this.addGammaCorrectionPass()
        this.addAntiAliasPass()
    }

    setInstance(){
        const renderTarget  = new THREE.WebGLRenderTarget( 800, 600, { samples: 2 })
        this.instance = new EffectComposer(this.ref.renderer.instance, renderTarget)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.instance.setSize(this.ref.sizes.width, this.ref.sizes.height)

        const renderPass = new RenderPass(this.ref.scene, this.ref.camera.instance)
        // renderPass.clear = true
        this.instance.addPass(renderPass)

        // console.log("Render target:", renderTarget)
        // console.log("Render pass:", renderPass)
    }

    // Resize an update methods
    resize(){
        this.instance.setSize(this.ref.sizes.width, this.ref.sizes.height)
        this.instance.setPixelRatio(Math.min(this.ref.sizes.pixelRatio, 2))
    }

    update(){
        this.instance.render()
    }

    /////////////////////////////////////////
    //// Add individual effects passes  ////
    /////////////////////////////////////////

    addSobelPass(){
        this.effects.grayScale = new ShaderPass( LuminosityShader );
        this.instance.addPass(this.effects.grayScale );

        this.effects.sobelPass = new ShaderPass( SobelOperatorShader );
        this.effects.sobelPass.uniforms[ 'resolution' ].value.x = this.ref.sizes.width * Math.min(this.ref.sizes.pixelRatio, 2)
        this.effects.sobelPass.uniforms[ 'resolution' ].value.y = this.ref.sizes.height * Math.min(this.ref.sizes.pixelRatio, 2)
        this.effects.grayScale.enabled = false
        this.effects.sobelPass.enabled = false

        this.instance.addPass( this.effects.sobelPass )

        const sobelToggle = () => {
            this.effects.grayScale.enabled = this.effects.sobelPass.enabled
        }

        if(this.ref.debug.active){
            const folder  = this.debugFolder.addFolder('Sobel (outline)') 
            folder.add(this.effects.sobelPass, 'enabled').name('Enabled').onChange( () => sobelToggle())
        }
    }

    addDepthOfFieldPass(){
        this.effects.dofPass = new BokehPass( this.ref.scene, this.ref.camera.instance, {
            focus:      500,
            aperture:   0.025,
            maxblur:    0.01,
            width:      this.ref.sizes.width,
            height:     this.ref.sizes.height
        } )
        this.instance.addPass(this.effects.dofPass)
        this.effects.dofPass.enabled = false

        if(this.ref.debug.active){
            const folder =this.debugFolder.addFolder('Depth of field') 
            folder.add(this.effects.dofPass, 'enabled').name('Enabled')
            folder.add(this.effects.dofPass.uniforms.focus, 'value').min(10).max(3000).step(10).name('Focus')
            folder.add(this.effects.dofPass.uniforms.aperture, 'value').min(0).max(10 * 0.00001).step(0.1 * 0.00001).name('Aperture')
            folder.add(this.effects.dofPass.uniforms.maxblur, 'value').min(0).max(0.01).step(0.001).name('Max blur')
        }
    }

    addBloomPass(){
        this.effects.unrealBloomPass = new UnrealBloomPass()
        this.effects.unrealBloomPass.enabled = false
        this.instance.addPass(this.effects.unrealBloomPass)

        // Bloom settings and debug controls
        this.effects.unrealBloomPass.strength = 1.3
        this.effects.unrealBloomPass.radius = 1
        this.effects.unrealBloomPass.threshold = 0.6

        if(this.ref.debug.active){
            const folder =this.debugFolder.addFolder('Bloom') 
            folder.add(this.effects.unrealBloomPass, 'enabled').name('Enabled')
            folder.add(this.effects.unrealBloomPass, 'strength').min(0).max(2).step(0.001).name('Strength')
            folder.add(this.effects.unrealBloomPass, 'radius').min(0).max(2).step(0.001).name('Radius')
            folder.add(this.effects.unrealBloomPass, 'threshold').min(0).max(1).step(0.001).name('Treshold')
        }
    }

    addDotScreenPass(){
        this.effects.dotScreenPass = new DotScreenPass()
        this.effects.dotScreenPass.enabled = false
        this.instance.addPass(this.effects.dotScreenPass)
        if(this.ref.debug.active){
            const folder =this.debugFolder.addFolder('Dot') 
            folder.add(this.effects.dotScreenPass, 'enabled').name('Enabled')
        }
    }

    addRgbHalftonePass(){
        const params = {
            shape: 1,
            radius: 4,
            rotateR: Math.PI / 12,
            rotateB: Math.PI / 12 * 2,
            rotateG: Math.PI / 12 * 3,
            scatter: 0,
            blending: 1,
            blendingMode: 1,
            greyscale: false,
            disable: false
        };

        this.effects.halftonePass = new HalftonePass( this.ref.sizes.width, this.ref.sizes.height, params )
        this.effects.halftonePass.enabled = false
        this.instance.addPass(this.effects.halftonePass)

        if(this.ref.debug.active){
            const controller = {
                radius:         this.effects.halftonePass.uniforms[ 'radius' ].value,
                rotateR:        this.effects.halftonePass.uniforms[ 'rotateR' ].value / ( Math.PI / 180 ),
                rotateG:        this.effects.halftonePass.uniforms[ 'rotateG' ].value / ( Math.PI / 180 ),
                rotateB:        this.effects.halftonePass.uniforms[ 'rotateB' ].value / ( Math.PI / 180 ),
                scatter:        this.effects.halftonePass.uniforms[ 'scatter' ].value,
                shape:          this.effects.halftonePass.uniforms[ 'shape' ].value,
                greyscale:      this.effects.halftonePass.uniforms[ 'greyscale' ].value,
                blending:       this.effects.halftonePass.uniforms[ 'blending' ].value,
                blendingMode:   this.effects.halftonePass.uniforms[ 'blendingMode' ].value,
                disable:        this.effects.halftonePass.uniforms[ 'disable' ].value
            };

            const onGUIChange = () => {
                // update uniforms
                this.effects.halftonePass.uniforms[ 'radius' ].value = controller.radius;
                this.effects.halftonePass.uniforms[ 'rotateR' ].value = controller.rotateR * ( Math.PI / 180 );
                this.effects.halftonePass.uniforms[ 'rotateG' ].value = controller.rotateG * ( Math.PI / 180 );
                this.effects.halftonePass.uniforms[ 'rotateB' ].value = controller.rotateB * ( Math.PI / 180 );
                this.effects.halftonePass.uniforms[ 'scatter' ].value = controller.scatter;
                this.effects.halftonePass.uniforms[ 'shape' ].value = controller.shape;
                this.effects.halftonePass.uniforms[ 'greyscale' ].value = controller.greyscale;
                this.effects.halftonePass.uniforms[ 'blending' ].value = controller.blending;
                this.effects.halftonePass.uniforms[ 'blendingMode' ].value = controller.blendingMode;
                this.effects.halftonePass.uniforms[ 'disable' ].value = controller.disable;
            }


            const folder =this.debugFolder.addFolder('RGB halftone') 

            folder.add(this.effects.halftonePass, 'enabled').name('Enabled')
            folder.add( controller, 'shape', { 'Dot': 1, 'Ellipse': 2, 'Line': 3, 'Square': 4 } ).onChange( onGUIChange );
			folder.add( controller, 'radius', 1, 25 ).onChange( onGUIChange );
			folder.add( controller, 'rotateR', 0, 90 ).onChange( onGUIChange );
			folder.add( controller, 'rotateG', 0, 90 ).onChange( onGUIChange );
			folder.add( controller, 'rotateB', 0, 90 ).onChange( onGUIChange );
			folder.add( controller, 'scatter', 0, 1, 0.01 ).onChange( onGUIChange );
			folder.add( controller, 'greyscale' ).onChange( onGUIChange );
			folder.add( controller, 'blending', 0, 1, 0.01 ).onChange( onGUIChange );
			folder.add( controller, 'blendingMode', { 'Linear': 1, 'Multiply': 2, 'Add': 3, 'Lighter': 4, 'Darker': 5 } ).onChange( onGUIChange );

        }

    }
    
    addFilmPass(){
        this.effects.filmPass = new FilmPass()
        this.effects.filmPass.enabled = false

        this.instance.addPass(this.effects.filmPass)
        if(this.ref.debug.active){
            const folder =this.debugFolder.addFolder('Film') 
            folder.add(this.effects.filmPass, 'enabled').name('Enabled')
            folder.add(this.effects.filmPass.uniforms.grayscale, 'value').name('Grayscale').min(0).max(1).step(0.01);
			folder.add( this.effects.filmPass.uniforms.nIntensity, 'value').name('nIntensity').min(0).max(1).step(0.01);
			folder.add( this.effects.filmPass.uniforms.sIntensity, 'value').name('sIntensity').min(0).max(1).step(0.01);
			folder.add( this.effects.filmPass.uniforms.sCount, 'value').name('sCount').min(0).max(10000).step(1);
        }
    }

    addTintPass(){
        const TintShader = {
            uniforms:
            {
                tDiffuse: { value: null },
                uTint: { value: null }
            },
            vertexShader: `
                varying vec2 vUv;

                void main()
                {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

                    vUv = uv;
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform vec3 uTint;

                varying vec2 vUv;

                void main()
                {
                    vec4 color = texture2D(tDiffuse, vUv);
                    color.rgb += uTint;

                    gl_FragColor = color;
                }
            `
        }

        this.effects.tintPass = new ShaderPass(TintShader)
        this.effects.tintPass.material.uniforms.uTint.value = new THREE.Vector3()
        this.effects.tintPass.enabled = false
        
        this.instance.addPass(this.effects.tintPass)
        if(this.ref.debug.active){
            const folder = this.debugFolder.addFolder('RGB tint') 
            folder.add(this.effects.tintPass, 'enabled').name('Enabled')
            folder.add(this.effects.tintPass.material.uniforms.uTint.value, 'x').min(- 1).max(1).step(0.001).name('red')
            folder.add(this.effects.tintPass.material.uniforms.uTint.value, 'y').min(- 1).max(1).step(0.001).name('green')
            folder.add(this.effects.tintPass.material.uniforms.uTint.value, 'z').min(- 1).max(1).step(0.001).name('blue')
        }
    }

    addGlitchPass(){
        this.effects.glitchPass = new GlitchPass()
        this.effects.glitchPass.enabled = false
        this.instance.addPass(this.effects.glitchPass)
        if(this.ref.debug.active){
            const folder =this.debugFolder.addFolder('Glitch') 
            folder.add(this.effects.glitchPass, 'enabled').name('Enabled')
            folder.add(this.effects.glitchPass, 'goWild').name('Go wild')
        }
    }

    addGammaCorrectionPass(){
        this.effects.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
        this.effects.gammaCorrectionPass.enabled = false
        this.instance.addPass(this.effects.gammaCorrectionPass)
        if(this.ref.debug.active){
            const gammaFolder = this.debugFolder.addFolder('Gamma correction') 
            gammaFolder.add(this.effects.gammaCorrectionPass, 'enabled').name('Enabled')

        }
    }

    addAntiAliasPass(){
        // Antialias pass (for non-retina and non WebGL2 browsers)
        if(this.ref.renderer.instance.getPixelRatio() === 1 && !this.ref.renderer.instance.capabilities.isWebGL2) {
            this.effects.smaaPass = new SMAAPass()
            this.effects.smaaPass.enabled = true
            this.instance.addPass(this.effects.smaaPass)

            // Antialias pass debug controls
            if(this.ref.debug.active){
                this.debugFolder.addFolder(this.effects.smaaPass, 'enabled').name('Enabled')
            }
        }
    }


}