import * as THREE from 'three'
import Experience from './Experience.js'


export default class Interactions{

    constructor(){
        this.ref = new Experience()                 // Reference to Experience singleton
        this.controls = this.ref.controls 
        this.debug = this.ref.debug 

        this.raycaster = new THREE.Raycaster()
        this.colliders = {}

        this.addInteractivity()
    }


    fireRaycaster(pointer, colliderArray) {

        this.raycaster.setFromCamera(pointer, this.ref.camera.instance)
        const intersects = this.raycaster.intersectObjects(colliderArray, true)

        if (intersects.length > 0) {
            return intersects[0].object
        } else {
            return false
        }
    }


    addInteractivity() {
        this.ref.canvas.addEventListener('click', (evt) => {
            const mouse = {
                x: (evt.clientX / window.innerWidth) * 2 - 1,
                y: - (evt.clientY / window.innerHeight) * 2 + 1
            }

            // Check for collision with buildings colliders
            const intersectedObject = this.fireRaycaster(mouse, this.colliders.buildings)
            if (intersectedObject['info']) {
                console.log(intersectedObject.info)
            } 
        })

        document.addEventListener("keydown",  (event) => {
            // Turn off orbit controls and 
            if(event.keyCode === 16){ // Shift
                this.controls.instance.enabled = !this.controls.instance.enabled
                if(this.controls.instance.enabled){
                    this.debug.ui.show()
                } else {
                    this.debug.ui.hide()
                }
            }
        });


    }

}