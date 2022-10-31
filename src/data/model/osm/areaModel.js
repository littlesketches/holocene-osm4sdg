/********* *UNUSED / DEVELOPEMNT MODELLING *********** */
import {
    queryOverpass, 
    createQuery
} from '../../api/overpass.js'


export { areaModel }


function areaModel(areaName, bounds, type) {
    let arr = []
    switch(type){
        case 'landuse':
            arr = landuseConfig
            break
        case 'surface':
            arr = surfaceConfig
            break
        case 'natural':
            arr = naturalConfig
            break
    }
    


    const obj = {} 
    const queries = [], promiseArray = []    

    for(const el of arr){

        obj[el.value] = {}
        const queryBody = `(
            wr[${el.value}](area.searchArea);
        )`

        const query = createQuery(areaName, bounds, queryBody, 'geom')
        promiseArray.push(queryOverpass(query)) 

    }

    return Promise.all(promiseArray)
        .then(res => {
            res.forEach( (d, i) => {
                // obj[landuseConfig[i].value] = {
                //     current: {
                //         features:  d
                //     } 
                // }                 
                obj[arr[i].value] = d
            })        
            return obj
        }) 
};





const keyValueConfig = {

    surface: {
        farmland: {

        },
        residential: {

        },
        grass: {

        },
        forest: {

        },
        meadow: {

        }



    },
    natural: {

    },
    landuse: {

    }

}



const landuseConfig = [
    {
        "value": "farmland",
        "description": "Area of farmland used mainly for tillage (annual crops).",
    },
    {
        "value": "residential",
        "description": "An area with predominantly houses or apartment buildings.",
    },
    {
        "value": "grass",
        "description": "A smaller area of grass, usually mown and managed.",
    },
    {
        "value": "forest",
        "description": "Forest or woodland, sometimes considered to be restricted to managed woodlands or tree plantations.",
    },
    {
        "value": "meadow",
        "description": "An area of meadow or pasture: land primarily vegetated by grass and other non-woody plants, mainly used for hay or grazing.",
    },
    // {
    //     "value": "orchard",
    //     "description": "Used to mark intentional planting of trees or shrubs maintained for food production",
    // },
    // {
    //     "value": "farmyard",
    //     "description": "Area of land with farm buildings (farmhouse, sheds, stables, barns, etc.)",
    // },
    {
        "value": "industrial",
        "description": "An area with predominantly workshops, factories or warehouses.",
    },
    // {
    //     "value": "vineyard",
    //     "description": "Used to tag vineyards, a piece of land where grapes are grown.",
    // },
    // {
    //     "value": "cemetery",
    //     "description": "A place where people, or sometimes animals are buried that isn't part of a place of worship",
    // },
    // {
    //     "value": "commercial",
    //     "description": "A commercial zone, predominantly offices or services.",
    // },
    // {
    //     "value": "allotments",
    //     "description": "allotment gardens with multiple land parcels assigned to individuals or families for gardening.",
    // },
    // {
    //     "value": "reservoir",
    //     "description": "An artificial lake which may be used to store water.",
    // },
    // {
    //     "value": "retail",
    //     "description": "An area that encloses predominantly shops.",
    // },
    // {
    //     "value": "basin",
    //     "description": "An area of land artificially graded to hold water.",
    // },
    // {
    //     "value": "quarry",
    //     "description": "An area of land used for surface extraction (open-pit mining).",
    // },
    // {
    //     "value": "construction",
    //     "description": "An area being built on.",
    // },
    // {
    //     "value": "recreation_ground",
    //     "description": "An open green space for general recreation, which often includes formal or informal pitches, nets and so on. Often municipally owned, sometimes part of colleges / companies or commercially operated.",
    // },
    // {
    //     "value": "village_green",
    //     "description": "A village green is a distinctive area of grassy public land in a village centre. Not a generic tag for urban greenery.",
    // },
    // {
    //     "value": "brownfield",
    //     "description": "Land which was developed which is no longer in use",
    // },
    // {
    //     "value": "greenhouse_horticulture",
    //     "description": "Land area used for growing plants in greenhouses.",
    // },
    // {
    //     "value": "garages",
    //     "description": "Denotes areas occupied by multiple private garage buildings",
    // },
    // {
    //     "value": "military",
    //     "description": "Area used for military purposes.",
    // },
    // {
    //     "value": "religious",
    //     "description": "An area used for religious purposes",
    // },
    // {
    //     "value": "logging",
    //     "description": "An area where some or all trees have been cut down.",
    // },
    // {
    //     "value": "greenfield",
    //     "description": "Undeveloped land scheduled to turn into a construction site",
    // },
    // {
    //     "value": "aquaculture",
    //     "description": "An area on land or water that is used to farm aquatic organisms.",
    // },
    // {
    //     "value": "railway",
    //     "description": "An area of land dedicated to train operation or support, around tracks, yards, sidings, station complexes, and ancillary man-made objects along the tracks.",
    // },
    // {
    //     "value": "plant_nursery",
    //     "description": "Represents land that is used solely for plant nurseries, which grow live plants for sale",
    // },
    // {
    //     "value": "landfill",
    //     "description": "A site for permanent or long term storage of waste materials.",
    // },
    // {
    //     "value": "flowerbed",
    //     "description": "An area designated for flowers",
    // },
    // {
    //     "value": "highway",
    //     "description": "land used for a highway, including all auxiliary areas like associated footways and verges, ditches, etc.",
    // },
    // {
    //     "value": "salt_pond",
    //     "description": "A place where sea water is evaporated to extract its salt",
    // },
    // {
    //     "value": "education",
    //     "description": "An area predominately used for educational purposes/facilities.",
    // }
]

const surfaceConfig = [
    {
        "value": "asphalt",
        "description": "Specifies that object is paved with asphalt concrete",
    },
    {
        "value": "unpaved",
        "description": "Indicates that the feature has an unpaved surface, such as gravel or grass.",
    },
    {
        "value": "paved",
        "description": "Describes the surface of a feature roughly as predominantly paved over the whole surface area; i.e., covered with paving stones, concrete or bitumen. This value gives only a rough description; use a more precise value if possible",
    },
    {
        "value": "ground",
        "description": "No special surface, the ground itself has marks of human or animal usage. This value gives only a rough description; if possible, use a more precise value such as grass, clay, sand, earth, gravel or pebblestone.",
    },
    {
        "value": "concrete",
        "description": "Cement based concrete, forming a large surface.",
    },
    {
        "value": "paving_stones",
        "description": "A surface paved with artificial blocks (block pavers, bricks) or natural stones (flagstones), with a flat top.",
    },
    {
        "value": "gravel",
        "description": "This tag has very large meaning range. Used for cases ranging from huge gravel pieces like track ballast used as surface, through small pieces of gravel to compacted surface.",
    },
    {
        "value": "dirt",
        "description": "Used for where surface is exposed earth/soil/dirt but it is not sand or gravel or rock.",
    },
    {
        "value": "grass",
        "description": "Specifies that object has grass as a surface.",
    },
    {
        "value": "compacted",
        "description": "Describes the surface of a feature as unpaved compacted.",
    },
    {
        "value": "sand",
        "description": "Specifies that object has sand as a surface.",
    }
]

const naturalConfig = [
    {
        "value": "tree",
        "count": 20098736,
        "fraction": 0.357,
        "in_wiki": true,
        "description": "A single tree",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "water",
        "count": 12395957,
        "fraction": 0.2202,
        "in_wiki": true,
        "description": "Any inland body of water, from natural such as a lake or pond to artificial like a moat or canal",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "wood",
        "count": 8441613,
        "fraction": 0.15,
        "in_wiki": true,
        "description": "Tree-covered area (a 'forest' or 'wood')",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "scrub",
        "count": 3676125,
        "fraction": 0.0653,
        "in_wiki": true,
        "description": "Uncultivated land covered with shrubs, bushes or stunted trees.",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "wetland",
        "count": 2811687,
        "fraction": 0.0499,
        "in_wiki": true,
        "description": "A natural area subject to inundation or with waterlogged ground",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "grassland",
        "count": 1317212,
        "fraction": 0.0234,
        "in_wiki": true,
        "description": "Areas where the vegetation is dominated by grasses (Poaceae) and other herbaceous (non-woody) plants.",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "tree_row",
        "count": 1220581,
        "fraction": 0.0217,
        "in_wiki": true,
        "description": "A line of trees",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "coastline",
        "count": 1121935,
        "fraction": 0.0199,
        "in_wiki": true,
        "description": "The mean high water (springs) line between the sea and land (with the water on the right side of the way)",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "peak",
        "count": 832913,
        "fraction": 0.0148,
        "in_wiki": true,
        "description": "The top (summit) of a hill or mountain.",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "bare_rock",
        "count": 787535,
        "fraction": 0.014,
        "in_wiki": true,
        "description": "An area with sparse or no vegetation, so that the bedrock becomes visible",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "cliff",
        "count": 664662,
        "fraction": 0.0118,
        "in_wiki": true,
        "description": "A vertical or almost vertical natural drop in terrain, usually with a bare rock surface. The bottom of the cliff is on the right side of the way.",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "sand",
        "count": 589681,
        "fraction": 0.0105,
        "in_wiki": true,
        "description": "An area covered by sand with no or very little vegetation.",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "heath",
        "count": 441814,
        "fraction": 0.0078,
        "in_wiki": true,
        "description": "A dwarf-shrub habitat, characterised by open, low growing woody vegetation, often dominated by plants of the Ericaceae.",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "scree",
        "count": 260204,
        "fraction": 0.0046,
        "in_wiki": true,
        "description": "Unconsolidated angular stones formed by rockfall and weathering from adjacent rockfaces",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "rock",
        "count": 219601,
        "fraction": 0.0039,
        "in_wiki": true,
        "description": "A notable rock or group of rocks attached to the underlying bedrock",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "spring",
        "count": 158247,
        "fraction": 0.0028,
        "in_wiki": true,
        "description": "A place where ground water flows naturally from the ground",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "beach",
        "count": 157936,
        "fraction": 0.0028,
        "in_wiki": true,
        "description": "landform along a body of water which consists of sand, shingle or other loose material",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "ridge",
        "count": 150858,
        "fraction": 0.0027,
        "in_wiki": true,
        "description": "A mountain landform with a continuous elevated crest or linear hill",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "shrub",
        "count": 121412,
        "fraction": 0.0022,
        "in_wiki": true,
        "description": "A shrub.",
        "desclang": "en",
        "descdir": "ltr"
    }, 
    {
        "value": "glacier",
        "count": 79802,
        "fraction": 0.0014,
        "in_wiki": true,
        "description": "A permanent body of ice formed naturally from snow that is moving under its own weight.",
        "desclang": "en",
        "descdir": "ltr"
    }
]


