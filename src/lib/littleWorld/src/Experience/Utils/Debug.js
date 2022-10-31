// import * as dat from 'dat.gui'  (not used in Svelte as module needs to be statically loaded)
import Stats from 'three/examples/jsm/libs/stats.module'

////////////////////////////////////////////////////////
/// SETUP DAT.GUI WITH RENDERING STATS               ///
////////////////////////////////////////////////////////

export default class Debug{
    constructor(dat){
        const params = new URLSearchParams(window.location.search)
        this.active = params.has('debug')
        this.active = true

        if(this.active){
            this.ui = new dat.GUI()
            // Organise main folders 
            this.sceneFolder = this.ui.addFolder('Scene performance')
            this.animationFolder = this.ui.addFolder('Environment')
            this.animationFolder = this.ui.addFolder('Urban landscape')
            this.animationFolder = this.ui.addFolder('Plants')
            this.animationFolder = this.ui.addFolder('Creatures')

            this.animationFolder = this.ui.addFolder('Post processing effects')

            // Add framerate stats to dat.gui
            this.stats = Stats()
            this.createStats()
        }
    }

    createStats(){
        // Create DOM element for Stats.js (integrated into Dat GUI)
        this.stats.dom.style.position = 'static'
        const statsContainer = this.sceneFolder.domElement

        const perfLi = document.createElement("li"),            // Requires CSS to reset height to auto, applied in global CSS to match library CSS specifity
            perfContainer = document.createElement("div"),
            perfPropName    = document.createElement("span"),
            perfStatsContainer = document.createElement("span");

        perfPropName.classList.add('title')
        perfPropName.innerHTML = "Perf. monitor"

        perfLi.appendChild(perfContainer)
        perfLi.classList.add("gui-stats")

        perfContainer.appendChild(perfPropName)
        perfContainer.appendChild(perfStatsContainer)
        perfContainer.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr;'

        perfStatsContainer.appendChild( this.stats.dom);

        statsContainer.firstChild.appendChild(perfLi);
    }
} 