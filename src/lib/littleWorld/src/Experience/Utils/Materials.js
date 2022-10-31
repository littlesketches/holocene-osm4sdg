import * as THREE       from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import Experience       from '../Experience'
import { wesPalettes }  from '../../Config/palettes.js'

////////////////////////////////////////////////////////
/// SETUP OF MATERIALS FOR (RE-)USE iN THE SCENE     ///
////////////////////////////////////////////////////////

export default class Materials {
    constructor() {
        this.experience = new Experience()
        this.settings = this.experience.settings
        this.experience.materials = {
            wireframe:  new THREE.MeshBasicMaterial({ wireframe: true }),
            normal:     new THREE.MeshNormalMaterial({ flatShading: true }),
            phong:  {
                white:      new THREE.MeshPhongMaterial({
                            }),
                red:        new THREE.MeshPhongMaterial({
                                side:   THREE.DoubleSide,
                                color:  0xff0000
                            })
            },
            line: {
                basic:      new THREE.LineBasicMaterial({ 
                                color:   0xffff00
                            })
            },
            palette: this.createMaterialPallette(),
            standard: {
                white:      new THREE.MeshStandardMaterial({
                                color:      0xffffff,
                            }), 
                black:      new THREE.MeshStandardMaterial({
                                color:      0x000000,
                            }), 
                road:      new THREE.MeshStandardMaterial({
                                color:      0xFFFFFF,
                            }), 
                ground:      new THREE.MeshStandardMaterial({
                                color:          0x88bfbb,
                                metalness:      0.35,
                                roughness:      0.7
                            }), 
                palette:  {
                    sdg1:     new THREE.MeshStandardMaterial({
                                    color:      0xe5243b,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }), 
                    sdg2:        new THREE.MeshStandardMaterial({
                                    color:      0xdda63a,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }), 
                    sdg3:       new THREE.MeshStandardMaterial({
                                    color:      0x4c9f38,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg4:      new THREE.MeshStandardMaterial({
                                    color:      0xc5192d,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg5:      new THREE.MeshStandardMaterial({
                                    color:      0xff3b21,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg6:      new THREE.MeshStandardMaterial({
                                    color:      0x26bde2,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg7:      new THREE.MeshStandardMaterial({
                                    color:      0xfcc30b,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg8:      new THREE.MeshStandardMaterial({
                                    color:      0xa21942,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg9:      new THREE.MeshStandardMaterial({
                                    color:      0xdd1367,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),

                    sdg10:      new THREE.MeshStandardMaterial({
                                    color:      0xFD9D24,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg11:      new THREE.MeshStandardMaterial({
                                    color:      0xbf8b2e,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg12:      new THREE.MeshStandardMaterial({
                                    color:      0x3f7e44,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg13:      new THREE.MeshStandardMaterial({
                                    color:      0x0a97d9,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg14:      new THREE.MeshStandardMaterial({
                                    color:      0xfd6925,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg15:      new THREE.MeshStandardMaterial({
                                    color:      0x56c02b,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg16:      new THREE.MeshStandardMaterial({
                                    color:      0x00689d,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                }),
                    sdg17:      new THREE.MeshStandardMaterial({
                                    color:      0x19486a,
                                    metalness:  materialConfig.standard.metalness,
                                    roughness:  materialConfig.standard.roughness,
                                })

                                
                }

            },
            shaders: {
                fresnel: this.createFresnel()
            }
        }
    }

    createMaterialPallette() {
        const obj = {}
        Object.entries(wesPalettes).forEach(([movieName, palette]) => {
            obj[movieName] = {}
            for (let i = 0; i < palette.length; i++) {
                const hexCode = palette[i]

                obj[movieName][`${movieName}_${i}`] = new THREE.MeshStandardMaterial({
                    color: hexCode,
                    emissive: hexCode,
                    emissiveIntensity: 0.125,
                    metalness: 0.3,
                    roughness: 1
                })
            }
        })

        let palette = {}
        for (const paletteName of this.settings.palette.wes) {
            palette = {
                ...palette,
                ...obj[paletteName]
            }
        }
        return palette
    }


    createMatCapMaterials() {

    }

    createFresnel() {

        // return THREE.extendMaterial(THREE.MeshStandardMaterial, {
        //     // Will be prepended to vertex and fragment code

        //     header: 'varying vec3 vNN; varying vec3 vEye;',
        //     fragmentHeader: 'uniform vec3 fresnelColor;',

        //     // Insert code lines by hinting at a existing

        //     vertex: {
        //         // Inserts the line after #include <fog_vertex>
        //         '#include <fog_vertex>': `

        //         mat4 LM = modelMatrix;
        //         LM[2][3] = 0.0;
        //         LM[3][0] = 0.0;
        //         LM[3][1] = 0.0;
        //         LM[3][2] = 0.0;

        //         vec4 GN = LM * vec4(objectNormal.xyz, 1.0);
        //         vNN = normalize(GN.xyz);
        //         vEye = normalize(GN.xyz-cameraPosition);`
        //     },
        //     fragment: {
        //         'gl_FragColor = vec4( outgoingLight, diffuseColor.a );': `
        //         gl_FragColor.rgb +=  ( 1.0 - -min(dot(vEye, normalize(vNN) ), 0.0) ) * fresnelColor;

        //         `
        //     },

        //     // Uniforms (will be applied to existing or added)

        //     uniforms: {
        //         diffuse: new THREE.Color('black'),
        //         fresnelColor: new THREE.Color('blue')
        //     }


        // });


        const FresnelShader = {
            uniforms: {},
            vertexShader: `
                varying vec3 vPositionW;
                varying vec3 vNormalW;
                void main() {
                    vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);
                    vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
            `,
            fragmentShader: `
                varying vec3 vPositionW;
                varying vec3 vNormalW;
                void main() {
                	vec3 color = vec3(1.0, 1.0, 1.0);
                	vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
                	float fresnelTerm = dot(viewDirectionW, vNormalW);
                	fresnelTerm = clamp(1.0 - fresnelTerm, 0.0, 1.0);
                	gl_FragColor = vec4( color * fresnelTerm, 0.8);
                }
            `
        };

        return new THREE.ShaderMaterial( {
            vertexShader:   FresnelShader.vertexShader,
            fragmentShader: FresnelShader.fragmentShader
        });

    }
}


const materialConfig = {
    standard: {
        metalness:      0.1,
        roughness:      0.9
    }
}