import * as d3 from 'd3'

import { queryOverpass,  createQuery} from '../../api/overpass.js'
export { facetModelCurrent, facetModelHistorical, facetModel, facetBoundaryTypeCheck }

// Model for querying facet data
// Note: To prevent 429 (Too many requests) errors, queries are forcefully queued

let noFacets

const responseData = {}

// Facet model that only returns current data
async function facetModelCurrent(facetData, areaName, bounds, useArea) {

    const startTime = Date.now()
    const obj = {}  // Returned object
    
    // For each facet
    for(let i = 0; i < facetData.length; i++) {
        console.log(`--------FACET #${i} ------------`)
        const facet = facetData[i]
        const queryBody = useArea ? facet.queryBody : facet.queryBody.replace('(area.searchArea)', '') 
     
        // Query for the current time (most important!)
        const query = createQuery(areaName, bounds, queryBody, 'count')

        obj[i] = {                      
            name:       facet.name,
            today:      await queryOverpass(query)        // Requests for current data are generally fast   
        }
    }

    console.log(`-------- ALL FACETS DONE ------------`)
    console.log(`...request took ${(Date.now() - startTime)}ms)`)
    return obj
}; // End facetModelCurrent


// Facet model that returns historical data to given object
async function facetModelHistorical(obj, facetData, areaName, bounds, dateObj, useArea) {
    console.log(obj, facetData, areaName, bounds, dateObj)

    const startTime = Date.now()

    // For each facet
    for(let i = 0; i < facetData.length; i++) {
        console.log(`--------HISTORICAL FACET #${i} ------------`)

        const facet = facetData[i]
        /// Query for historical data ONE at a time!! ...hopefully prevents 429 too many requests error
        const  promiseArray = []   
        for(const yearAgoEntries of Object.entries(dateObj)) {
            const queryBody = useArea ? facet.queryBody : facet.queryBody.replace('(area.searchArea)', ''), 
                query = createQuery(areaName, bounds, queryBody, 'count', yearAgoEntries[1].overpass)
            obj[i][`yearAgo-${yearAgoEntries[0]}`] = await queryOverpass(query)
        }
    }

    console.log(`-------- ALL FACETS DONE ------------`)
    console.log(`...request took ${(Date.now() - startTime)}ms)`)
    return null
}; // End facetModelHistorical


// Facet model that returns current and historical data
async function facetModel(facetData, areaName, bounds, dateObj, useArea) {

    const startTime = Date.now()
    const obj = {}  // Returned object

    // For each facet
    for(let i = 0; i < facetData.length; i++) {
        console.log(`--------FACET #${i} ------------`)

        const facet = facetData[i]
        // Query for the current time (most important!)
        const queryBody = useArea ? facet.queryBody : facet.queryBody.replace('(area.searchArea)', '') ,
            query = createQuery(areaName, bounds, facet.queryBody, 'count')

        obj[i] = {                      
            name:       facet.name,
            today:      await queryOverpass(query)        // Requests for current data are generally fast   
        }

        /// Query for historical data with a Promise.all: 
        // >> Mulitple requests tends to tigger a 429 "Too many requests error"
        const  promiseArray = []   
        for(const yearAgoEntries of Object.entries(dateObj)) {
            const query = createQuery(areaName, bounds, facet.queryBody, 'count', yearAgoEntries[1].overpass)
            promiseArray.push(queryOverpass(query) )

            obj[i][`yearAgo-${yearAgoEntries[0]}`] = null
        }

        await Promise.all(promiseArray)
            .then(res => {
                res.forEach( (d, j) => {
                    console.log(d, Object.keys(dateObj)[j])
                    obj[i][`yearAgo-${Object.keys(dateObj)[j]}`] = d                 
                })        
                return obj
            }).catch(err => {
                console.log(err)
            }) 
    }

    console.log(`-------- ALL FACETS DONE ------------`)
    console.log(`...request took ${(Date.now() - startTime)}ms)`)
    return obj
}; // End facetModel


// Facet model that queries for buildings count to check if data is being returned by 
async function facetBoundaryTypeCheck(areaName, bounds) {
    const queryBody = `(nwr(area.searchArea)["building"]; )`,
        query = createQuery(areaName, bounds, queryBody, 'count')

    const result = await queryOverpass(query)
    const boundarySearchCheck = +result[0].tags.total === 0 ? false : true

    return boundarySearchCheck
}; // end facetBoundaryTypeCheck()