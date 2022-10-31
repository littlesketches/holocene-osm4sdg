import EventEmitter from './EventEmitter.js'

//////////////////////////////
/// SETUP SCREEN RESIZING  ///
//////////////////////////////

export default class Sizes extends EventEmitter{
    constructor(){
        super()

        // Setup
        this.width = window.innerWidth * 0.85
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () =>{
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}