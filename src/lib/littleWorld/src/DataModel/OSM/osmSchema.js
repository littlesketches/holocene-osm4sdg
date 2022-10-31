export { analyseFeatures }

const analyseFeatures = (features) => {

    const data = {   
        noTags:             features.filter(d => !d.tags),
        buildings:          features.filter(d => d.tags['building']),
        highways:           features.filter(d => d.tags['highway'] && d.geometry.type.toLowerCase() !== 'point'),

        buildingTypes:      (() => {
            const types = [...new Set(features.filter(d => d.tags['building']).map( d => d.tags['building']) )].sort()
            return types.map(type => {
                return {
                    [type]: {
                        no:     features.filter(d => d.tags['building'] === type).length,
                        els:    features.filter(d => d.tags['building'] === type)
                    }
                }
            })
        })(),   

        buildingTypesByNo:   (() => {
            const types = [...new Set(features.filter(d => d.tags['building']).map( d => d.tags['building']) )].sort()
            return types.map(type => {
                return {
                    [type]: features.filter(d => d.tags['building'] === type).length
                }
            })
        })(),   

        highwayTypes:      (() => {
            const types = [...new Set(features.filter(d => d.tags['highway'] && d.tags._osm_type.toLowerCase() !== 'point').map( d => d.tags['highway']) )].sort()
            return types.map(type => {
                return {
                    [type]: {
                        no:     features.filter(d => d.tags['highway'] === type).length,
                        els:    features.filter(d => d.tags['highway'] === type)
                    }
                }
            })
        })()
    }

    data.highwayGeometryTypes =   (() => {
        const types = [...new Set(data.highways.map( d => d.geometry.type)) ] 
        return types.map(type => {
            return {
                [type]: {
                    no:     data.highways.filter(d => d.geometry.type === type).length,
                    els:    data.highways.filter(d => d.geometry.type === type)
                }
            }
        })
    })()

    console.log('--- OSM FEATURES ---', data)
    return data

}

