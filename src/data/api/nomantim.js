//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///                                                        ///
/// OSM NOMANTIM API SEARCH                                ///
/// ------------------------------------------------------ ///
/// - Used for location string search                      ///
/// - Returns probability ranked list and associated OSM   ///
/// node data for first pass results                       ///
///                                                        ///    
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


import {queryOverpassByNode} from './overpass.js'
export { getNomantim }


async function getNomantim(searchString){
    console.log(`...Querying Nomantim API for "${searchString}"`)
    const startTime = Date.now()
    const url = 'https://nominatim.openstreetmap.org/search.php?',
        params = 'format=jsonv2&addressdetails=[0|1]extratags=[0|1]namedetails=[0|1]&q='

    return fetch(`${url}${params}${searchString}`)
        .then((response) => response.json() )
        .then((data) => {
            console.log(`...Nomantim search string took ${(Date.now() - startTime)}ms and returned`, data)
            return data.filter(d => d.category === 'boundary')      // Filter results for type of (adminstrative) 'boundary'
        })
};

