//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///                                                        ///
/// TAGINGO API QUERIES (OF OSM TAG DATA)                  ///
/// ------------------------------------------------------ ///
/// Functions to query the TagInfo API for current stats   ///
/// (incl. counts)  of elements . Not used extensively but ///
/// provides another API option fof querying OSM data      ///
///                                                        ///
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export {
    getKeyValueCount,
    getTagKeyStats,
    getkeyDefintion, 
    keyCountList, 
    keyDefs
}


const querytype = {
    url: `https://taginfo.openstreetmap.org/api/4/key/values?key=natural&filter=all&lang=en&sortname=count&sortorder=desc&page=1&rp=10&qtype=value&format=json_pretty`
}

async function getKeyValueCount(key, value){
    return fetch(`https://taginfo.openstreetmap.org/api/4/tag/overview?key=${key}&value=${value}&relations`)
        .then((response) => response.json() )
        .then((res) => {
            return res.data.counts.filter(d => d.type === 'relations')[0].count  
        });
}; 


// async function getKeyValueCount(key, value){
//     return fetch(`https://taginfo.openstreetmap.org/api/4/search/by_key_and_value?query=${key}%3D${value}`)
//         .then((response) => response.json() )
//         .then((res) => {
//             console.log(res.data)
//             return res.data.filter(d => d.key === key && d.value === value)[0].count_all  
//         });
// }; 

// Suraface queries

async function getTagKeyStats(key){
    return fetch(`https://taginfo.openstreetmap.org/api/4/key/stats?key=${key}`)
        .then((response) => response.json() )
        .then((data) => {
            return data       
        });
}; 


async function getkeyDefintion(key){
    return fetch(`https://taginfo.openstreetmap.org/api/4/key/overview?key=${key}`)
        .then((response) => response.json() )
        .then((data) => {
            return data       
        });

};

const featureKeys = [
    'surface', 
    'building',
    'highway'
]

const keyCountList = [
    'amenity',
    'surface',
    'building',
    'highway',
    'natural',
    'landuse',
    'waterway',
    'service',
    'leisure',
    'railway',
    'public',
]
// Other useuful keys
// start_date
// lit
// bicycle
// railway

const keyDefs = {
    amenity:    await getkeyDefintion('amenity'),
    surface:    await getkeyDefintion('surface'),
    building:   await getkeyDefintion('building'),
    highway:    await getkeyDefintion('highway'),
    natural:    await getkeyDefintion('natural'),
    landuse:    await getkeyDefintion('landuse'),
    waterway:    await getkeyDefintion('waterway'),
    service:    await getkeyDefintion('service'),
    leisure:    await getkeyDefintion('leisure'),
    railway:    await getkeyDefintion('railway'),
    public:    await getkeyDefintion('railway'),
}


console.log('----TAGINFO.JS  TESTING ')
console.log({keyDefs})

