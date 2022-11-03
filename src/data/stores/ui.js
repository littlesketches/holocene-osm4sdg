// User interface store objects
import { writable } from 'svelte/store';


export const ui = writable({

    view: {          // Navigation state
        section:               'home',      // Name of visible section ["home", "compose", "explore"]
        subsection:            'title',        // UNUSED
        show: {
            modal:              false,      // Main (nearly) full screen information modal 
            confirmation :      false,      // Confirmation box modal        
            guide:              true,       // Shows app in "guide" / "backstory" mode 
            datGUI:             false       // SHows the ThreeJS scene debug
        },
    },

    state: {
        mode:                   'user',            // App mode state: currently unused)   
        language:               'en',              // Language mode: currently unused
        
        bySection:{ 
            home: {
            },
            compose: {
                sdg:            11,             // SDG in default focus for indicator mapping vis
                mapRendered:    false
            },
            explore: {
                sdg:            11,             // SDG in default focus for indicator mapping vis
            }
        },
        vis: {
            map:{               // For Leaflet map
                tiles:          'worldImagery',
                attribution:    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                boundaryStyle:  {
                    color:              'var(--primary02)',
                    stroke:             true,
                    weight:             2,
                }
            },
            cityScape: {        // For 3D city scape scene
                orbitControls:      true,       // Boolean for enabling orbit controls
                autoRotate:         false,
            },
            facetSDGVis: {
                dataState:          'noData'  // States of 'noData', 'currentOnly', 'allData'
            }
        },
    },

    modal: {
        type:           null,
        facetIndex:     null,
    },

    data: {
        loadingState: {
            facets:             false,
            facetHistory:       false,
            benchmarks:         false,
            buildings:          false
        }, 
        responseState: {
            facets:             false,
            facetHistory:       false,
            benchmarks:         false,
            buildings:          false
        }, 
    }
})

