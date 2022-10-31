import * as geolib from 'geolib'

export { getRelativePos }

// Convert GPS position [lat, lon] to position relative to a centerpoint (that equals [x =09, y = 0]) 
const getRelativePos = (objPos, centerPos) => {
    // Get distance to center and bearing angel
    const dis = geolib.getDistance(objPos, centerPos),                  
        bearing = geolib.getRhumbLineBearing(objPos, centerPos)         

    // Calculate X by centerPos.x + distance * cos(rad) and Y by centerPoi.y + distance * sin(rad)
    const x = centerPos[0] + (dis * Math.cos(bearing * Math.PI / 180)),
        y = centerPos[1] + (dis * Math.sin(bearing * Math.PI / 180))

    // Retuen points (with X transposed)
    return [-x / 100, y / 100]
}