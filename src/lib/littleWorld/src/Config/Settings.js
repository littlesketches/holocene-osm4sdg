
///////////////////////////////////////////////
/// THREEJS SCENE SETTINGS OBJECT           ///
///////////////////////////////////////////////

const params = new URLSearchParams(window.location.search)

export default class Settings {

    constructor(osmData){
        console.log(osmData)
        const area = osmData.data.area / 1000000

        this.settings = {              // Global object for settings, references (and state)   
            camera: {
                type:           'perspective',
                pos:            { x: -1.15 * area ,     y: 0.7 * area,    z: 1.15 * area  }, 
                target:         { x: 0 ,        y: 1,    z: 0   }, 
                perspective: {  
                    fov:        35,
                    near:       0.1,
                    far:        5000000
                }
            },
            lights:{
                exposure:           0.25,
                ambientLight: {
                    sky:            '#FFFFFF',
                    ground:         '#FFFFFF',  
                    intensity:      0.5
                },
                directionalLight: {
                    color:          '#FFFFFF',
                    intensity:      10
                }
            },
            fog: {
                color:              'rgb(123, 125, 150)',
                density:            0.00125,
            },

            physics:{
                heightData:         [],
                objMap:             {},
                material:           {},
                contactMaterial:    {}
            },

            debug: {
                urban: { // Visibility state
                    buildings:      true,
                    roads:          true,
                    footpaths:      true,
                    bikepaths:      true
                }
            },   

            options: {  // Rendering options 
                logDepthBuffer:     params.has('logDB'),
                simulatePhysics:    false,
                show3dText:         true,
                showFireflies:      false
            },

            palette: {
                wes:        ['isleOfDogs1', 'isleOfDogs2'],
                grass:      '#A4CD9B',
                water:      '#4882A5',
                flowers:    [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405, 0xFF9CDA, 0x428CD4, 0xf5259a, 0xf4d000, 0xf185b7, 0x483d9c, 0x0f1d53, 0xbbd966, 0xfa1256], 
                sdgs:       [ 0xe5243b, 0xdda63a, 0x4c9f38, 0xc5192d, 0xff3b21, 0x26bde2, 0xfcc30b, 0xa21942, 0xfd6925, 0xdd1367, 0xFD9D24, 0xbf8b2e, 0x3f7e44, 0x0a97d9, 0x56c02b, 0x00689d, 0x19486a]
            },

            model:{ 
                dims: {
                    width:          50,
                    depth:          50,

                },
                showGridHelper:     false,
                interactivity: {
                    showHelpers:    false,
                    buildings:  {
                        events:     true,
                        precision:  'geometry', // 'geometry' or bbox'
                    }    
                }    
            }
        }

    }

}


