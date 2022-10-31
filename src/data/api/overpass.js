//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///                                                        ///
/// OVERPASS API FOR OSM DATA                              ///
/// ------------------------------------------------------ ///
/// Helper functions to create and execute queries over    ///
/// the standard browser Fetch API                         ///
/// - Boundary node for shape and area definition          ///
/// - OSM element tag data for data analysis               ///
/// - Geometry data for model creation in ThreeJS          ///   
///                                                        ///       
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export {
    queryOverpassByNode,
    getOverpassBoundaryByNode,
    queryOverpass,
    createQuery, 
    createBuildingsQuery
}

// Function to get OSM data from nodeID via Overpass API
async function getOverpassBoundaryByNode(nodeID){
    const startTime = Date.now()
    let query = `
        [out:json][timeout:180];
        rel(${nodeID});
        out geom;`

    console.log(`...Making Overpass request for node ${nodeID} with query: `, query)
    return fetch(`https://overpass-api.de/api/interpreter?data=${query}`)
        .then((response) => response.json() )
        .then((data) => {
            console.log(`~~~ Overpass request for boundary node took ${(Date.now() - startTime)}ms `, data)
            return data       // Return (first) relation node as the boundary (note: should be only one relation for a node)
        }).catch( err => {
            console.log(err)
            return null
        })
}; // end queryOverpassByNode()


// Function to get OSM data from nodeID via Overpass API
async function queryOverpassByNode(nodeID, output ='geom'){
    const startTime = Date.now()
    const query = `
        [out:json][timeout:180];
        (
            nwr(${nodeID});
        );
        out ${output};
    `
    console.log('...Making Overpass request for node ID with query...', nodeID, query)
    return fetch(`https://overpass-api.de/api/interpreter?data=${query}`)
        .then((response) => response.json() )
        .then((data) => {
            console.log(`...request ${(Date.now() - startTime)}ms and returned:`, data)
            return data.elements.filter( d => d.type === 'relation')[0]         // Return (first) relation node as the boundary (note: should be only one relation for a node)
        });
}; // end queryOverpassByNode()


// General unction to get OSM data with query via Overpass API
async function queryOverpass(query, dataReturn = 'elements'){
    const startTime = Date.now()
    console.log('Making Overpass request...', query)

    return fetch(`https://overpass-api.de/api/interpreter?data=${query}`)
        .then((response) => response.json() )
        .then((data) => {
            console.log(`Request took ${(Date.now() - startTime)}ms`, data)
            return dataReturn === 'elements' ? data.elements : data
        });
}; // end queryOverpass()


// Function to create the general Overpass  query with area
function createQuery(searchString, bbox, queryBody, output = 'meta', date = null, timeout = 180){
    // a. Modify the search string to only the first term (denoted as being before a comma)
    if(searchString.indexOf(",") > 0){
        searchString = searchString.slice(0, searchString.indexOf(",")).trim()
    }

    // c. Return Overpass query with: 1) query 'settings', 2) Search area defintion 3) query 'body' (gathered), and 4 )output
    return `
        [out:json][timeout:${timeout}]
        ${date ? `[date:"${date}"]`: ''}
        ${typeof bbox !== 'undefined' ? `[bbox:${bbox.toString()}];` : ';'}
        area[name="${searchString}"]->.searchArea;
        ${queryBody};   
        out ${output};`
}; // end createQuery()


// Function to create query for buildings and streets geometry query
function createBuildingsQuery(areaName, bbox, timeout = 300){

    // a. Modify the area name search string to only the first term (denoted as being before a comma)
    if(areaName && areaName.indexOf(",") > 0){
        areaName = areaName.slice(0, areaName.indexOf(",")).trim()
    }

    // c. Return Overpass query with GeoJSON type output 
    return areaName ?  // Where an area name is provided
        ` 
        [out:json][timeout:${timeout}]
        ${bbox ? `[bbox:${bbox.toString()}];` : ';'}
        area[name="${areaName}"]->.searchArea;
        (
            way[building](area.searchArea);
            relation["building"]["type"="multipolygon"](area.searchArea);
            way["highway"](area.searchArea);    
        );
        convert item ::=::,::geom=geom(),_osm_type=type();
        out geom;
    `   
     : // Fallback option where an area name is not provided, use just the bouding
    `
        [out:json][timeout:${timeout}]
        ${bbox ? `[bbox:${bbox.toString()}];` : ';'}
        (
            way[building];
            relation["building"]["type"="multipolygon"];
            way["highway"];    
        );
        convert item ::=::,::geom=geom(),_osm_type=type();
        out geom;
    `
}; // end createBuildingsQuery()

