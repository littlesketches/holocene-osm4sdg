import { matcapNames } from './palettes.js'

export const sources = [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            './static/littleWorld/textures/environmentMap/px.jpg',
            './static/littleWorld/textures/environmentMap/nx.jpg',
            './static/littleWorld/textures/environmentMap/py.jpg',
            './static/littleWorld/textures/environmentMap/ny.jpg',
            './static/littleWorld/textures/environmentMap/pz.jpg',
            './static/littleWorld/textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'helvetika',
        type: 'font',
        path: './static/littleWorld/fonts/helvetiker_regular.typeface.json'
    }
]

// Add matcaps
for (const filename of matcapNames){
    sources.push({
        name: filename.slice(0, filename.indexOf('.')),
        type: 'matcap',
        path: `./static/littleWorld/img/matcap/${filename}`
    })
}