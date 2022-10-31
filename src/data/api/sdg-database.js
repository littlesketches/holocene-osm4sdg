//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///                                                        ///
/// UN STATS SDGs API                                      ///
/// ------------------------------------------------------ ///
/// Unused in production as a static copy of SDG           ///
/// information and structure is preferred, however this   ///
/// API is used as the source. Ideally, an API with        ///     
/// language support would be sought and used              ///    
///                                                        ///            
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

import { staticData } from '../static/sdgs.js'

const queries = {
    "Goals": {
        url:    `https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=true`,
        desc:   "SDG Goal list with all child targets and indicators"
    }
}

async function getSDGData(){
    const url = `https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=true`
    console.log('Getting SDG data...')
    const startTime = Date.now()
    fetch(`${url}`)
        .then((response) => response.json() )
        .then((data) => {
            console.log(data)
            console.log(`Request took ${(Date.now() - startTime)}ms, `)
        })     
};


// Export
export let sdgData  = staticData