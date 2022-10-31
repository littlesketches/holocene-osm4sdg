import * as THREE       from 'three'
import * as CANNON      from 'cannon-es'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import Experience       from '../../Experience.js'


////////////////////////////////////
/// 3D TEXT PIECES (WITH PHYSICS ///
////////////////////////////////////

export default class LandscapeText {
    constructor() {
        this.ref            = new Experience()      // Reference to Experience singleton
        this.physics =  {                           // Class reference to physics objects
            world:          this.ref.world.physics.instance,
            updatables:     this.ref.world.physics.updatables,
            material:       this.ref.world.physics.material
        }
        this.font           = this.ref.resources.items.helvetika

        // 3D Text configuration
        this.textObjects = [
            {
                text: 'LITTLE',             // Full text string
                position: { x: -2, y: 2.5, z: -22.5 },
                rotation: { x: 0, y: Math.PI * 2.0, z: 0 },
                prop: 'mainTitle-little',                 // Reference to text properties object
            },
            {
                text: 'MELBOURNE',             // Full text string
                position: { x: 25, y: 3, z: -15 },
                rotation: { x: 0, y: Math.PI * -0.5, z: 0 },
                prop: 'mainTitle-melbourne',                 // Reference to text properties object
            },
        ]

        // Create text
        if(this.ref.settings.options.show3dText){
            this.createText()
        }
    }

    createText() {
        const font = this.font
        const textMaterial =  this.ref.materials.normal  // Material used for all text 3D text
        const textProperties = {
            default: {
                center: true,
                split: true,
                letterSpacing: 0.5,
                // Three JS text properties
                size: 5,
                depth: 2,
                curveSegments: 6,
                bevelEnabled: true,
            }
        }

        for (const obj of this.textObjects) {
            const textProps = textProperties[obj.prop] ? textProperties[obj.prop] : textProperties.default

            // Setup group for text characters (and split if set to true)
            const textGroup = new THREE.Group(),
                charsToRender = textProps.split ? obj.text.split("") : [obj.text],
                charLength = charsToRender.length

            // Add text geometry (by split text array) 
            let startX = 0, letterWidths = []
            for (let i = 0; i < charLength; i++) {
                if (charsToRender[i] !== " ") {

                    const textGeometry = new TextGeometry(
                        charsToRender[i],
                        {
                            font,
                            size: textProps.size,
                            height: textProps.depth,
                            curveSegments: textProps.curveSegments,
                            bevelEnabled: textProps.bevelEnabled,
                            bevelThickness: textProps.size * 0.025,
                            bevelSize: textProps.size * 0.025,
                            bevelOffset: 0,
                            bevelSegments: 16
                        }
                    )
                    if (textProps.center) textGeometry.center()

                    const text = new THREE.Mesh(textGeometry, textMaterial),
                        textBbox = new THREE.Box3().setFromObject(text),
                        textWidth = textBbox.max.x - textBbox.min.x

                    letterWidths.push(textWidth)  // Store all letter widths

                    if (i > 0) { // Increment the letter width
                        startX += (letterWidths[i - 1] + textWidth) * 0.5 + textProps.letterSpacing
                    }

                    text.position.x = startX
                    textGroup.add(text)

                } else { // Add a space
                    startX += textProps.size
                    letterWidths.push(5)  // Add a letter width for the space
                }
            }
            // Position text group and add to scene
            textGroup.position.set(obj.position.x, obj.position.y, obj.position.z)
            textGroup.rotation.set(obj.rotation.x, obj.rotation.y, obj.rotation.z)

            const children = [...textGroup.children],
                textGroupToAdd = new THREE.Group()

            textGroupToAdd.name = obj.prop

            for (let i = 0; i < children.length; i++) {
                // Get text geometry dims and world position
                const mesh = children[i],
                    worldPos = mesh.getWorldPosition(new THREE.Vector3()),
                    worldQuat = mesh.getWorldQuaternion(new THREE.Quaternion()),
                    bbox = new THREE.Box3().setFromObject(mesh),
                    bbox_x = bbox.max.x - bbox.min.x,
                    bbox_y = bbox.max.y - bbox.min.y,
                    bbox_z = bbox.max.z - bbox.min.z

                // Add each char to scene in world position
                textGroupToAdd.add(mesh)
                mesh.position.set(worldPos.x, worldPos.y, worldPos.z)
                mesh.quaternion.set(worldQuat.x, worldQuat.y, worldQuat.z, worldQuat.w)

                const body = new CANNON.Body({
                    mass:       10,
                    position:   new CANNON.Vec3(worldPos.x, worldPos.y, worldPos.z),
                    quaternion: new CANNON.Quaternion(worldQuat.x, worldQuat.y, worldQuat.z, worldQuat.w),
                    shape:      new CANNON.Box(new CANNON.Vec3(bbox_x * 0.5, bbox_y * 0.5, bbox_x * 1)), // use x value for depth to create larger footprint to present falling through floor
                    material:   this.ref.settings.physics.material.letter
                })
                // Add Each letter to the physics world
                this.ref.world.physics.instance.addBody(body)
                this.physics.updatables[`${obj.prop}_${i}`] = {
                    mesh,
                    body,
                    dof: { x: false, y: true, z: false }
                }
            }

            // Add text group to scene and create object reference
            this.ref.scene.add(textGroupToAdd)

        }
    }

}
