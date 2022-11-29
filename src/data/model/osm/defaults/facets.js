export {
    DefaultFacets
}

// bits , facets // cluster
class DefaultFacets{

    constructor(){
        return [
            {
                name:           'Presence of schools and universities',
                description:    'A series of tag combinations for "schools" and universities',
                storyline:      'The presence of local education institutions are closely tied to (nearly) all indicators under SDG #4  and SDG8 ',
                queryBody: `(
                    nwr(area.searchArea)["amenity"~"school|university"];
                    nwr(area.searchArea)["building"~"school|university"];
                    nwr(area.searchArea)["university"];
                )`,
                indicators: [
                    { code: "4.1.1",     impact: 2 },  
                    { code: "4.1.2",     impact: 2 },  
                    { code: "4.2.1",     impact: 2 },  
                    { code: "4.2.2",     impact: 2 },  
                    { code: "4.3.1",     impact: 2 },  
                    { code: "4.4.1",     impact: 2 },  
                    { code: "4.6.1",     impact: 2 },  
                    { code: "4.a.1",     impact: 2 },  
                    { code: "4.b.1",     impact: 2 },  
                    { code: "4.4.1",     impact: 2 },  
                    { code: "1.4.1",     impact: 1 },  
                    { code: "8.2.1",     impact: 2 },  
                    { code: "8.4.2",     impact: 2 },  
                    { code: "8.5.1",     impact: 1 },  
                    { code: "8.5.2",     impact: 1 },  
                    { code: "8.6.1",     impact: 1 },  
                    { code: "9.c.1",     impact: 1 },  
                ]
            }, 

            {
                name:           'Presence of durable housing (buildings)',
                storyline:      'The number of mapped dwellings is a good indicator of durable housing and formal settlements.',
                description:    'All OSM objects tagged as "building with values of "house",  "residential" and "apartment". The "yes" value is also included which might inflate the totals as many of these are not assigned a tag that can help identify whether a building is for housing. A more sophisticated Facet could be built to model the proportion of "yes" tags that are housing vs other types to get a more accurate count.',
                queryBody:      `(
                    nwr(area.searchArea)["building" ~ "yes|residential|house|apartments"]; 
                )`,
                indicators: [
                    { code: "11.1.1",    impact: 2 }, 
                    { code: "11.3.1",    impact: -1 }, 
                    { code: "11.a.1",    impact: 1 }, 
                    { code: "16.1.4",    impact: 1 }, 
                    { code: "17.6.1",    impact: 2 }, 
                    { code: "1.4.1",     impact: 2 }, 
                    { code: "1.4.2",     impact: 2 }
                ]
            },
            {
                name:           'Extent of public transport infrastructure',
                description:  'All ways and relations tagged with a key of "public_transport" and all elements tagged as a "services" with values of "bus" and "tram"',
                storyline:      'The availability of public transport infrastructure - particularly relative to city and/or population density, is an indictor of general access to mobility and the provision of public transport services.',
                queryBody: `(
                    wr(area.searchArea)["public_transport"];
                    nwr(area.searchArea)["service" ~ "bus|tram"];
                )`,
                indicators: [
                    { code: "11.2.1",    impact: 2 },
                    { code: "16.1.4",    impact: 1 },
                    { code: "9.1.2",    impact: 1 },
                ]
            },
            {
                name:           'Disabled access to transport services and parking',
                description:    'All nodes tagged with "capacity:disabled" and for "wheelchair',
                storyline:      "This is an indicator of a city's level of services for citizens with mobility disabilities to access to public transport.",
                queryBody: `(
                    nwr(area.searchArea)["capacity:disabled"];
                    nwr(area.searchArea)["wheelchair"];
                )`,
                indicators: [
                    { code: "11.2.1",    impact: 2 }, 
                    { code: "11.3.2",    impact: 1 }, 
                    { code: "11.4.1",    impact: 1 }, 
                    { code: "11.5.2",    impact: 1 },
                    { code: "11.7.2",    impact: 1 }
                ]
            }, 
            {
                name:           'Presence cultural heritage institutions',
                description:    'All OSM elements tagged with a key of "museum", or "tourism" (with values of either "museum", "artwork" or "attraction"',
                storyline:      "The presence of these types of institutions are a indicator of a City's capacity and/or willingness to preserve local culture.",
                queryBody: `(
                    nwr(area.searchArea)["museum"];
                    nwr(area.searchArea)["tourism" ~ "museum|artwork|attraction"];
                )`,
                indicators: [
                    { code: "11.4.1",    impact: 2 }, 
                    { code: "8.9.1",    impact: 1 }, 
                ]
            }, 
            {
                name:           'Access to parks natural areas wooded and grassland areas, and water bodies',
                description:    '"Natural" tagged objects in OSM that are of value "wood", "water or "grassland" (i.e. most commonly tagged natural elements) ',
                storyline:      'The availability of natural areas within a cities boundary - particularly relative to size and density, is an indicator of how well a city is able to balance urban development demands with the need to provide citizens with access to green spaces and native spaces.',
                queryBody: `(
                    nwr(area.searchArea)["natural" ~ "wood|water|grassland"];
                    nwr(area.searchArea)["amenity" ~ "park"];
                )`,
                indicators: [
                    { code: "11.4.1",     impact:  2},  
                    { code: "11.7.1",     impact:  1},  
                ]
            }, 
            {
                name:           'Access to social amenities: clubs, pubs and restaurants',
                description:    'All "shop" tags with value of "alcohol" and "amenities" with values of "bar", "pub" and "nightclub"',
                storyline:      'The presence of these types of social gathering places can be indicator of local culture, including having perverse outcomes of alcoholism.',
                queryBody: `(
                    nwr(area.searchArea)["shop" ~ "alcohol|convenience"];
                    nwr(area.searchArea)["amenity" ~ "pub|bar|nightclub"];
                )`,
                indicators: [
                    { code: "3.5.2",     impact: -1 },  
                    { code: "3.1.1",     impact: -1 },  
                    { code: "11.3.2",    impact: 1 }, 
                    { code: "11.4.1",    impact: 1 }, 
                    { code: "11.5.2",    impact: 1 },
                    { code: "11.7.2",    impact: 1 }
                ]
            }, 
            {
                name:           'Access to waste and recycling amenities',
                description:    'All objects tagged with the key of "waste" and the key of "amenity" with value of "recycling" or "waste_basket',
                storyline:      'These objects are typically public rubbish bins. THey might be an indicator the level of public waste and sanitation services available, and have linkages to circular economy and public healthd indicators',
                queryBody: `(
                    nwr(area.searchArea)["waste"];
                    nwr(area.searchArea)["amenity" ~ "recycling|waste_basket"];
                )`,
                indicators: [
                    { code: "11.6.1",     impact: 2 },  
                ]
            }, 
            {
                name:           'Access to local recycling services',
                description:    'All local recycling centers (tagged with key:value pair  of "recycling_type:centre. ',
                storyline:      "These are typically large recycling centres and are an indicator of a city's capacity to operate a local circular economy",
                queryBody: `(
                    nwr(area.searchArea)["recycling_type"="centre"];
                )`,
                indicators: [
                    { code: "11.6.1",     impact: 2 },  
                    { code: "11.6.2",     impact: 2 },  
                    { code: "12.1.1",     impact: 1 },  
                    { code: "12.2.2",     impact: 1 },  
                    { code: "12.4.2",     impact: 1 },  
                    { code: "12.5.1",     impact: 2 },  
                    { code: "3.9.2",     impact: 1 },  
                ]
            }, 
            {
                name:           'Availability of electricity grid infrastructure services',
                description:    'All objects tagged with the key of "power" and values of either "generator" or "substation"',
                storyline:      'Substations and generators are an indicator of a (reasonably) well developed electricity grid and the consistent supply of electricity to the community.',
                queryBody: `(
                    nwr(area.searchArea)["power" ~"generator|substation"];
                )`,
                indicators: [
                    { code: "11.6.1",     impact: 2 },  
                    { code: "11.6.2",     impact: 2 },  
                    { code: "12.a.1",     impact: 1 },  
                    { code: "13.2.2",     impact: 1 },  
                    { code: "1.4.1",     impact: 1 },  
                    { code: "7.1.1",     impact: 2 },  
                    { code: "7.1.2",     impact: 2 },  
                    { code: "7.b.1",     impact: 1 },  

                ]
            }, 
            {
                name:           'Availability of (public) drinking water services and toilets',
                description:    'All objects tagged with "drinking_water:yes", indicating that public dirnking water is available, as wells as objects tagged with "toilets". These objects indicate that basic public sanitation services are readily available in the city.' ,
                storyline:      ' ',
                queryBody: `(
                    nwr(area.searchArea)["drinking_water"="yes"];
                    nwr(area.searchArea)["toilets"];
                )`,
                indicators: [
                    { code: "1.4.1",     impact: 1 },  
                    { code: "3.6.1",     impact: 1 },  
                    { code: "6.2.1",     impact: 1 },  
                    { code: "11.6.2",     impact: 2 },  
                ]
            }, 
            {
                name:           'Public internet access',
                description:    'All OSM tags with value of "internet_access',
                storyline:      "This tag indicates whether internet is available at mapped places (e.g. public wifi) and is an indicator of the level and sophistication of a city's internet services general availability",
                queryBody: `(
                    nwr(area.searchArea)["internet_access"];
                )`,
                indicators: [
                    { code: "11.5.3",    impact: 2 },  
                    { code: "1.4.1",     impact: 1 },  
                    { code: "17.8.1",    impact: 2 },  
                    { code: "9.c.1",     impact: 1 },  
                ]
            }, 
            {
                name:           'Traffic calming and safety measures',
                description:    'Traffic management infrastructure tagged with "traffic_calming", "traffic_sign" and "traffic_signals" (as a well as the tag of "amenity:driving schools"!)',
                storyline:      "Traffic management infrastructure and safety services are an indicator of the city's approach to traffic management and pedestrian safety",
                queryBody: `(
                    nwr(area.searchArea)["traffic_calming"];
                    nwr(area.searchArea)["traffic_sign"];
                    nwr(area.searchArea)["traffic_signals"];
                    nwr(area.searchArea)["amenity"="driving_school"];
                )`,
                indicators: [
                    { code: "3.6.1",     impact: 1 },  
                    { code: "11.6.2",     impact: 2 },  
                ]
            }, 
        ]

    }
}

