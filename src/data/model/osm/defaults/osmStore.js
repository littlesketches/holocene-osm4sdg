export { OsmStore }


// Default class for data.osm object: used for initialisation and resetting
class OsmStore {
    constructor(){
        return  {

            selected: {             //Data for use selected location
                areaName:           null,           // Selected Nomantim result display name (pre comma)
                areaNode:           null,           // Nomantim search result 
                boundaryNode:       null,           // OSM node by osm.id (from Overpass query)        
                useBoundary:        true,
                location: {
                    meta:           {
                        address:            null,      // Nomantim search result address
                        nomamtimName:       null       // Nomantim search result display name
                    }, 
                    tags:                   null,        // OSM node tags
                    geom: {
                        osmPointsArray:         null,       // Stores array of arrays defining paths by 2D point arrays (i.e. [lat, lon])
                        flattenedPointsArray:   null,       // Stores 'fixed' and flattened array of points (used for 3D model only)
                        nomantimBounds:         null,       // Nomantim search boudndingbox of format [minlat, maxlat, minlon, maxlon]
                        overpassBounds:         null,       // OSM node bounding box converted to array for overpass
                        center:                 null,       // Extracted from Nomantim search result
                        useBoundary:            true        // Denotes whether the areaName returns elements from Overpass. Changed to false if a bbox has to be used
                    },
                    data: {
                        area:               null,        // Calculated/estiamted from boundary coordinates                
                        population:         null,
                        country:            null,        
                        countryCode:        null,        
                    }
                },   

            },
            query: {
                searchInput:        '',         // User search input
                displayInput:       null,       // Display name 
            },

            response:  {          // Response data
                byFacet:            null,
                benchmarks:        null
            }
        }
    }
}
