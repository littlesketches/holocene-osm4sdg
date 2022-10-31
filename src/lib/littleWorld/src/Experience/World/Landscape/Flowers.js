import * as THREE           from 'three'
import * as d3              from 'd3'
import Experience           from '../../Experience.js'
import { osmConfig }        from '../../../Config/osm.js'
import { getRelativePos }   from '../../../DataModel/utils.js'

//////////////////////////////////////////////////////////////
/// FLOWERS IN TREE POSITIONS USING THREEJS INSTANCED MESH ///
//////////////////////////////////////////////////////////////


// Export class for generating flowers
export default class Flowers {
    constructor() {
        this.ref = new Experience()            // Reference to Experience singleton
        this.osmConfig = osmConfig

        // Debug
        if (this.ref.debug.active) {
            this.debugFolder =  this.ref.debug.ui.__folders.Plants ? this.ref.debug.ui.__folders.Plants.addFolder('Flowers')  : this.ref.debug.ui.addFolder('Plants').addFolder('FLowers')
        }

        // Create instanced mesh from tree data
        this.createInstancedMeshFromData()      

        // Setup of instanced flowers: adapted from ThreeJS instancing example
        this.resource = this.ref.resources.items.flower     // Flower model
        this.flowers = new THREE.Group()
        this.flowers.name = 'instance-flowers'

        this.proximityFactor = 500000           // Lon/Lat rounding factor to filter out trees with close proximity
        this.baseScale = 1                      // Model scale (before randomisation)

		this.stemMesh
        this.blossomMesh
	    this.stemGeometry
        this.blossomGeometry
	    this.stemMaterial 
        this.blossomMaterial
        this.instanceDummyObj = new THREE.Object3D();

        this.count

        this.ages
        this.scales 
    }


    async createInstancedMeshFromData(){
        Promise.all([
            d3.csv('./static/littleWorld/data/city-of-melbourne-trees.csv'),        // CoM tree data
            d3.csv('./static/littleWorld/data/yarra-street-and-park-trees.csv'),    // Yarra tree data
            d3.csv('./static/littleWorld/data/city-of-port-phillip-trees.csv')      // Port Phillip tree data
        ])
        .then( (data) => {
            data.forEach(lgaData => {
                lgaData.forEach( d => {    
                    d.Latitude     = +d.Latitude 
                    d.Longitude    = +d.Longitude
                    d.LonLatStr    = `${Math.round(+d.Latitude * this.proximityFactor)/ this.proximityFactor},${Math.round(+d.Longitude) / this.proximityFactor}`
                })            
            })

            // Flatten / concat data
            const flattenedData = data.flat() 
            // Filter by Lon/Lat rounding
            let filteredData = [...new Map(flattenedData.map(item => [item.LonLatStr, item])).values()];    

            // Filter by model bounds (and returned)
            if( this.ref.settings.model.boundaryCheck){
                filteredData = this.getBoundedData(filteredData)
            }

            return filteredData

        }).then( data => {

            // Set data for instance and animations
            this.count = data.length
            this.ages = new Float32Array( this.count );
            this.scales = new Float32Array( this.count );

            // Call create instanced mesh
            this.createInstancedMesh(data)
            this.addOptions()
        })

    }

    createInstancedMesh(coordData){
        // console.log(`-- Nothing but ${coordData.length} flowers!!`)
        const _stemMesh = this.resource.scene.getObjectByName( 'Stem' );
        const _blossomMesh = this.resource.scene.getObjectByName( 'Blossom' );        

        this.stemGeometry = _stemMesh.geometry.clone();
        this.blossomGeometry = _blossomMesh.geometry.clone();

        const defaultTransform = new THREE.Matrix4()
            .makeRotationX( Math.PI )
            .multiply( new THREE.Matrix4().makeScale(1, 1, 1 ) );

        this.stemGeometry.applyMatrix4( defaultTransform );
        this.blossomGeometry.applyMatrix4( defaultTransform );

        this.stemMaterial = _stemMesh.material;
        this.blossomMaterial = _blossomMesh.material;
        // Note: for shadows, might need to add a custom depth material, see => https://discourse.threejs.org/t/shadow-for-instances/7947/5

        this.stemMesh = new THREE.InstancedMesh( this.stemGeometry, this.stemMaterial, this.count );
        this.blossomMesh = new THREE.InstancedMesh( this.blossomGeometry, this.blossomMaterial,this.count );

        // Get coordinates
        this.positions = coordData.map((d, i) => {
            const relPos =  getRelativePos([d.Longitude,  d.Latitude], this.osmConfig.center)
            return {
                x: -relPos[0],
                y:  0,
                z:  relPos[1]
            }
        }).sort(() => Math.random() - 0.5)
        

        // Assign random colors to the blossoms.
        const color = new THREE.Color();
        for ( let i = 0; i <  this.positions.length; i ++ ) {
            color.setHex( this.ref.settings.palette.flowers[ Math.floor( Math.random() * this.ref.settings.palette.flowers.length ) ] );
            this.blossomMesh.setColorAt( i, color );
        }

        // Add individual transforms
        this.updateTransforms()

        // Instance matrices will be updated every frame.
        this.stemMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
        this.blossomMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );

        // Add to flowers group
        this.flowers.add(this.stemMesh)
        this.flowers.add(this.blossomMesh)

        // Add flowers to scene
        this.ref.scene.add(this.flowers );
        this.update()

    }

    updateTransforms(positions){
        // Add individual transforms
        for ( let i = 0; i <  this.positions.length; i++){
            this.instanceDummyObj.position.set(  this.positions[i].x,   this.positions[i].y,   this.positions[i].z);
            const scale = (Math.random() * 2.0 + 0.25) * this.baseScale
            this.instanceDummyObj.scale.set( scale, scale, scale);
            this.instanceDummyObj.rotation.x = ( - Math.PI * 0.5 );
            this.instanceDummyObj.rotation.z = ( Math.PI * 0.25 * i );
            this.instanceDummyObj.updateMatrix();

            this.stemMesh.setMatrixAt( i, this.instanceDummyObj .matrix );
            this.blossomMesh.setMatrixAt( i, this.instanceDummyObj .matrix );
        }
    }

    getBoundedData(data){        // Note: check is slow for large datasets
        return data.filter(d => {
            let intersection = false
            // Check coordinates are within bounds
            const relPos = getRelativePos([d.Longitude, d.Latitude], this.osmConfig.center)

            ray.el.origin.x = relPos[0]
            ray.el.origin.z = relPos[1]
            ray.caster.ray = ray.el

            for( const [name, mesh] of Object.entries(this.ref.boundaryMesh) ){
                const intersects = ray.caster.intersectObject(mesh, true)
                intersection = intersects.length > 0 ? true : false
                console.log(name)
            }

            return intersection
        })
    }

    addOptions(){         // Debug options

        if (this.ref.debug.active) {
            this.debugFolder.add(this, 'count', 0, this.count)
                .name('Number')
                .onChange( () => {
					this.stemMesh.count = this.count;
					this.blossomMesh.count = this.count;                
                })

            this.debugFolder.add(this, 'baseScale', 0, 10)
                .name('Base scale')
                .onChange( () => {
                    this.updateTransforms()
                    this.update()
                })
        }
    }

    update(){
        this.stemMesh.instanceMatrix.needsUpdate = true;
        this.blossomMesh.instanceMatrix.needsUpdate = true;
    }
}


// Scoped variables
// Raycaster for checking boundary conditions
const ray = {
    el:          new THREE.Ray(),    
    origin:      new THREE.Vector3(),    
    caster:      new THREE.Raycaster()
}
ray.el.direction = new THREE.Vector3(0, -1, 0).normalize(),
ray.el.origin.y = 100

