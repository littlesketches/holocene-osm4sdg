// User interface store objects
import { writable }             from 'svelte/store';
import { buildSDGsSchema }      from '../static/sdgs.js';
import { DefaultFacets }        from '../model/osm/defaults/facets.js';
import { DefaultBenchmarks }    from '../model/osm/defaults/benchmarks.js';
export { schema }

const historicalYearsAgo =   [1, 3, 5]        // Array of 'years' ago to query Overpass data

// Initialise schema store object
const schema = writable({
    sdgs:       buildSDGsSchema(),         // Builds SDG structure from static schema files (from SDG database API)    

    data: {
        osm:  {
            facets:         new DefaultFacets(),
            benchmarks:     new DefaultBenchmarks()
        }
    },
    time:  {
        historicalYearsAgo:    historicalYearsAgo,
        now:  {
            date:   new Date()
        },
        datesByYearAgo:    addDateObject()         // Add object with historical data for Overpass date queries
    }     
})


// Function to add a date object for Overpass historical queries
function addDateObject(){
    const obj = {}
    // Setup "today" date data
    const dateNow = new Date()
    const today = {
        year:   dateNow.getFullYear(),
        month:  dateNow.getMonth() < 10 ? `0${dateNow.getMonth()}` : dateNow.getMonth(),
        day:    dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate(),
    }

    // Add dates going back five years
    for( const d of historicalYearsAgo){
        obj[d] = {
            year:   today.year - d,
            month:  today.month,
            day:    today.day
        }

        addOverpassTime(obj[d] )
    }

    return obj
    
    // Helper to create date string in OverpassAPI format (at midnight)
    function addOverpassTime(d){
        d.overpass=  `${d.year}-${d.month}-${d.day}T00:00:00Z`
    }    
}; // end dateData




