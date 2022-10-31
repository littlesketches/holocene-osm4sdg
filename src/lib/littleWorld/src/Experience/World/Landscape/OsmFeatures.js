////////////////////////////////////////////////////////////
/// URBAN LANDSCAPE GEOMETRY BUILT FROM OSM DATA         ///
/// ---------------------------------------------------- ///
/// Developed and extended by Little Sketches from       ///
/// Jianfeng Wu's starter guide for using OSM buildings  ///
/// data in ThreeJS                                      ///
/// https://www.youtube.com/watch?v=Fvo7AJvtQPY&t=2446s  ///
///                                                      ///
////////////////////////////////////////////////////////////


import * as THREE           from  'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import Experience           from '../../Experience.js'
import { getRelativePos }   from '../../../DataModel/utils.js'
import { osmConfig }        from '../../../Config/osm.js'
import { analyseFeatures }  from '../../../DataModel/OSM/osmSchema.js'


// Scoped variables
let featuresSchema          // Used to reference features schema

const geometries = {        // Object used for collating geometries by type to merge
    buildings: {
        all: []
    },             // Used for merging building geometries
    ways: {},
    regions: {}
}


const groups = {        // Object to hold THREEJS groups for organising scene
    buildings: {},
    ways: {}
}

const regionData = {}



////////////////////////////////////////////////////////////
// Export class for generating Open Street Map features  ///
////////////////////////////////////////////////////////////

export default class OsmFeatures {

    constructor() {
        this.ref = new Experience()             // Reference to Experience singleton
        // this.ref.boundaryMesh = {}              // Add the boundary meshes so that they can be accessed for boundary checks outside OsmFeatures class
        this.osmData =  this.ref.data.osm

        this.materials = this.ref.materials
        this.settings = this.ref.settings
        this.colliders =  this.ref.interactions.colliders
        this.colliders.buildings = []           // Store collider helpers for use in Interactions class
        this.osmConfig = osmConfig              // OSM configuration settings    

        // 1. "Boundary" shape
        this.ref.boundaryMesh = this.createBoundaryMesh(this.osmData.shape) // Add the boundary meshes so that they can be accessed for boundary checks outside OsmFeatures class
        // 2. Open Street Maps data
        featuresSchema = analyseFeatures(this.osmData.nodes.elements)
        this.createGroups()                // Create group for interactive components
        this.createFeatures(this.osmData.nodes.elements.filter(d => d.tags))  // Create features for all features with tags
        this.addMergedFeatures()              // Render (add to scene) features as merged geometry groups
        if (this.settings.model.showGridHelper) {
            this.addGridHelper()
        }
    }


    ///////////////////////////////////////////////////   
    //// URBAN LANDSCAPE SCENE SETUP               ////
    ///////////////////////////////////////////////////   

    addGridHelper() {
        const gridHelper = new THREE.GridHelper(60, 160, new THREE.Color(0x000000), new THREE.Color(0x333333))
        this.ref.scene.add(gridHelper)

        const axesHelper = new THREE.AxesHelper(50);
        this.ref.scene.add(axesHelper)
    };

    createGroups() {
        // 0. REGIONS (and interactivity helper) groups
        this.regions = new THREE.Group()
        this.regions.name = "Land mass regions"

        // 1. BUILDINGS: Create grouping structure by building type and for interaction helpers
        this.buildings = new THREE.Group()
        this.buildings.name = "Buildings group"

        for (const typeObj of featuresSchema.buildingTypes) {
            const buildingGroup = groups.buildings[Object.keys(typeObj)[0]] = new THREE.Group()
            this.buildings.add(buildingGroup)
        }

        groups.buildingsHelpers = new THREE.Group()
        groups.buildingsHelpers.name = "Buildings box helpers"
        this.buildings.add(groups.buildingsHelpers)

        // 2. WAYS: Create grouping structure by way type
        this.ways = new THREE.Group()
        this.ways.name = "Ways group"

        for (const typeObj of featuresSchema.highwayTypes) {
            const wayGroup = groups.ways[Object.keys(typeObj)[0]] = new THREE.Group()
            this.ways.add(wayGroup)
        }

        // 3. Add buildings and ways parent groups to the scene
        // this.ref.scene.add(this.regions)
        this.ref.scene.add(this.buildings)
        this.ref.scene.add(this.ways)


        // X. OPTIONAL + TESTING 
        if (this.settings.model.interactivity.showHelpers) {
            this.helpers = new THREE.Group()
            this.helpers.name = "Helpers BBox group"
            this.ref.scene.add(this.helpers)
        }
    };


    ///////////////////////////////////////////////////   
    //// METHODS TO RENDER FEATURES TO THE SCENE   ////
    ///////////////////////////////////////////////////   

    createFeatures(features) { // Create geometries for each feature to be rendered
        // Loop through all features in the data set to create geometries
        for (const el of features) {
            // a. For all building features
            if (el.tags['building']) {
                if(el.geometry.type.toLowerCase() === 'linestring'){
                    this.generateBuilding([el.geometry.coordinates], el.tags, el.geometry.type.toLowerCase() )
                } 
                else if (el.geometry.type.toLowerCase() === 'geometrycollection') {
                    // for( const d of el.geometry.geometries){
                        this.generateBuilding( el.geometry.geometries, el.tags, el.geometry.type.toLowerCase())
                    // }
                }
            }
            // b. All Highway features (with "points" excluded)              
            if (el.tags["highway"] && el.geometry.type.toLowerCase() !== 'point') {
                this.generateWay(el.geometry.coordinates, el.tags, el.geometry.type)
            }
        }
    };

    addMergedFeatures() {      // Merge geometries and add meshes
        // 1. Merge and add building geometries by building type
        let materialCounter = 0

        for (const [type, group] of Object.entries(groups.buildings)) {

            if (typeof geometries.buildings[type] === 'undefined') {
                console.log(`${type} is not defined`)
            } else {
                const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries.buildings[type])
                const materialsArray = Object.keys(this.materials.standard.palette),
                    materialName = materialsArray[materialCounter % materialsArray.length],
                    material = this.materials.standard.palette[materialName]
                material.side = 2

                const mesh = new THREE.Mesh(mergedGeometry, material)
                mesh.name = `merged-buildings-${type}`

                this.buildings.add(mesh)
                materialCounter++
            }
        }

        // 2. Merge and add Ways geometries
        for (const [type, group] of Object.entries(groups.ways)) {

            if(!Object.values(geometries.ways).length > 0) return
            const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries.ways[type])
            const material = this.materials.standard.roads
            const mesh = new THREE.Mesh(mergedGeometry, material)
            mesh.name = `merged-buildings-${type}`
            mesh.rotateX(-Math.PI * 0.5)
            mesh.rotateZ(Math.PI)
            this.ways.add(mesh)
        }
    };


    ////////////////////////////////////////////////////////////////
    //// BUILDINGS AS EXTRUDED SHAPES WITH INTERACTION HELPERS  ////
    ////////////////////////////////////////////////////////////////

    generateBuilding(data, info, type) {
        const levelHeight = 0.05, floorHeighInMetres = 4, defaultNoLevels = 2, maxLevels = 95, maxHeight = 900

        let levels = info["building:levels"] ? +info["building:levels"] < maxLevels ?  +info["building:levels"] : null : null,
            minHeight = info["min_height"] ? +info["min_height"] / floorHeighInMetres * levelHeight : null,
            height = info["height"] ? +info["height"].replace(/[^\d.-]/g, '') / floorHeighInMetres * levelHeight : null

        if(height > maxHeight) height =  maxHeight
        if(isNaN(height)) height = 0

        let geometryHeight = (height ? height : levels ? levels * levelHeight : levelHeight * defaultNoLevels)

        if(minHeight) geometryHeight = geometryHeight - minHeight

        // 1. Create building shape with holes
        let shape
        const holes = []

        if(!data) {
            console.log(data, info)
            return
        }

        for (let i = 0; i < data.length; i++) {
            const el = (type !== 'geometrycollection') ? data[i] : data[i].coordinates
            if (i == 0) {
                shape = this.genShape(el, this.osmData.center)
            } else {
                holes.push(this.genShape(el, this.osmData.center))
            }
        }

        for (const hole of holes) {
            shape.holes.push(hole)
        }

        // 2. Create building geometry
        const randHeightOffset = (2 + Math.random() * 10) / 500     // Added offset to prevent overlapping 

        const geometry = this.genGeometry(shape, { 
            curveSegments:      1, 
            depth:              geometryHeight + randHeightOffset , 
            bevelEnabled:       false 
        })
        geometry.rotateX(Math.PI * 0.5)
        geometry.rotateZ(Math.PI)
        if(minHeight)  geometry.translate(0, minHeight, 0)           

        // 3. Add geometry to array for merging
        if (typeof geometries.buildings[info.building] === 'undefined') {
            geometries.buildings[info.building] = []
        }
        geometries.buildings[info.building].push(geometry)

        // console.log({
        //     data, info, levels, geometryHeight, shape, geometry
        // })


        // 4. Create helper geometry for collider
        if (this.settings.model.interactivity.buildings.events) {
            const helper = this.genHelper(geometry, 'buildings')
            if (helper) {
                helper.name = info["name"] ? info["name"] : "Building"
                helper.info = info
                
                this.colliders.buildings.push(helper)

                if (this.settings.model.interactivity.showHelpers) {
                    this.helpers.add(helper)
                }
            }
        }
    };
    
    genShape(points, center) {      // Generate a shape from points
        const shape = new THREE.Shape()
        for (let i = 0; i < points.length; i++) {
            const relPoint = getRelativePos(points[i], center)
            if (i == 0) {
                shape.moveTo(relPoint[0], relPoint[1])
            } else {
                shape.lineTo(relPoint[0], relPoint[1])
            }
        }

        return shape
    };

    genGeometry(shape, settings) {  // Generate a THREE geometru from shape and settings
        const geometry = new THREE.ExtrudeGeometry(shape, settings)
        geometry.computeBoundingBox()
        return geometry
    };

    genHelper(geometry, group) {     // Generate helper 'hitboxes' for geometry interaction

        if(this.settings.model.interactivity[group].precision === 'geometry'){ 
            return new THREE.Mesh(geometry, this.materials.wireframe)

        } else { // For a simple bounding box hitbox
            if (!geometry.boundingBox) geometry.computeBoundingBox()                       
            const box3 = geometry.boundingBox
            if (!isFinite(box3.max.x))  return false
            const helper = new THREE.Box3Helper(box3, 0xffff00)        
            helper.updateMatrixWorld()
            return new THREE.Mesh(box3, this.materials.wireframe)
        }
    };


    ////////////////////////////////////
    //// WAYS: ROADS AND PATHWAYS   ////
    ////////////////////////////////////

    generateWay(d, info, geotype) {

        // Ensure array for storing geometries is created for way type
        const type = info.highway
        if (typeof geometries.ways[type] === 'undefined') {
            geometries.ways[type] = []
        }

        switch (geotype) {
            // POLYGONS: Ways specified as polygons (i.e. as shape areas)
            case 'Polygon':
                // a. Create array of 2D coordinates
                const polyPoints = []
                for (let i = 0; i < d[0].length; i++) {
                    const el = d[0][i]
                    if ((!el[0] || !el[1])) return         // Check for defined two dimensional array
                    const relPos = getRelativePos(el, this.osmData.center)
                    // Add 2D coordinates
                    polyPoints.push(relPos[0])
                    polyPoints.push(relPos[1])
                }

                // b. Create ThreeJS shape from shape points
                const polyShape = shapeFromPoints(polyPoints),
                    polyGeometry = new THREE.ShapeGeometry(polyShape)

                // c. Add geometry by way type for merging into mesh
                geometries.ways[type].push(polyGeometry)
                break

            case 'GeometryCollection':
                return

            // STRINGS: Ways specified as string coordinates where shape geometries are generated
            case 'LineString':
            default:
                // 0. Create points for line and points2D for creating a mesh
                const points = [],          // 1. For Vec 3 points used for creating lines (not rendered)
                    points2D = []           // 2. For centerline points used for creating meshes

                for (let i = 0; i < d.length; i++) {
                    const el = d[i]
                    if ((!el[0] || !el[1])) return         // Check for defined two dimensional array

                    const relPos = getRelativePos(el, this.osmData.center)

                    // Add vec3 points and 2D coordinates
                    points.push(new THREE.Vector3(-relPos[0], -0.005, relPos[1]))
                    points2D.push(relPos[0])
                    points2D.push(relPos[1])
                }

                // 1. BASIC LINES
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points),
                    lineMaterial = this.materials.line.basic,
                    lineMesh = new THREE.Line(lineGeometry, lineMaterial)


                // 2. CREATE PATH SHAPE MESHES
                // Check that way type is defined in osmCOnfig
                if (!this.osmConfig.ways[info.highway]) {
                    console.log(`~~ ${info.highway} is not a configured way/path but has been added`)

                    this.osmConfig.ways[info.highway] = {
                        render:             true, 
                        width:              0.05,
                        materialName:       null
                    }
                }

                // a. Create shape points from path points2D
                const pathWidth = this.osmConfig.ways[info.highway].width,
                    shapePoints = createPathPoints(points2D, pathWidth)

                // b. Create ThreeJS shape and geometry
                const shape = shapeFromPoints(shapePoints),
                    wayGeometry = new THREE.ShapeGeometry(shape)

                // c. Add geometry by way type for merging into mesh
                geometries.ways[type].push(wayGeometry)


                // x. Supporting function to create geometry points
                function createPathPoints(pathArray, pathWidth) {
                    const pointsArray = [],
                        pathArrayReverse = pathArray.slice().reverse().map((d, i, arr) => (i % 2 === 0 ? arr[i + 1] : arr[i - 1]))

                    // Add points by traversing path points from both directions, separately
                    addPoints(pathArray)
                    addPoints(pathArrayReverse)

                    return pointsArray

                    // Supporting function to calc offset points along a array
                    function addPoints(array) {
                        let x, y,               // Point being assessed
                            xNext, yNext,       // Next point on path
                            xPrev, yPrev,       // Prev point on path
                            theta,              // Angle of direction vector (relative to x-axis)
                            xPos, yPos          // Calculated coords

                        for (let i = 0; i < array.length; i++) {
                            if (i % 2 === 0) {  // Apply to each "x" coord 
                                x = array[i]
                                y = array[i + 1]

                                // For all points use the angle to the second point for theta
                                if (i < array.length - 2) {
                                    xNext = array[i + 2]
                                    yNext = array[i + 3]
                                    theta = Math.atan2(yNext - y, xNext - x) - Math.PI * 0.5

                                    xPos = x + pathWidth * 0.5 * Math.cos(theta)
                                    yPos = y + pathWidth * 0.5 * Math.sin(theta)


                                    // Except the last point where the angle to that point can be used
                                } else {
                                    xPos = x + pathWidth * 0.5 * Math.cos(theta)
                                    yPos = y + pathWidth * 0.5 * Math.sin(theta)
                                }
                                // Add calcuated points to array
                                pointsArray.push(xPos)
                                pointsArray.push(yPos)
                            }
                        }
                    }
                };
        }

        function shapeFromPoints(pointsArray) {
            const shape = new THREE.Shape()

            for (let i = 0; i < pointsArray.length; i++) {
                if (i % 2 === 0) {
                    const x1 = pointsArray[i],
                        y1 = pointsArray[i + 1]

                    if (i == 0) {
                        shape.moveTo(x1, y1)
                    } else {
                        shape.lineTo(x1, y1)
                    }
                }
            }

            return shape
        };
    };


    ///////////////////////////////////////
    //// BOUNDARY / REGION LANDSHAPE   ////
    ///////////////////////////////////////

    createBoundaryMesh(array) {
        const shape = this.genShape(array, this.osmData.center),
            geometry = this.genGeometry(shape, { curveSegments: 1, depth: 0.5, bevelEnabled: true }),
            mesh = new THREE.Mesh(geometry, this.materials.standard.ground)

        mesh.rotateX(-Math.PI * 0.5)
        mesh.rotateZ(Math.PI)
        mesh.translateZ(-0.75)

       this.ref.scene.add(mesh)
    };

};
