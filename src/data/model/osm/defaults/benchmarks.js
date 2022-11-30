export {
    DefaultBenchmarks
}

// A set o 
class DefaultBenchmarks{

    constructor(){
        const shuffled = [...candidates].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3)
    }
}


const candidates = [
    {
        areaName:   'Blantyre',
        country:    'Malawi',
        node:       7347100 
    }, 
    {
        areaName:   'Cagayan de Oro',
        country:    'Philippines',
        node:       2404870 
    },
    {
        areaName:   'Geneva',
        country:    'Switzerland',
        node:       1685488 
    }, 
    {
        areaName:   'Kathmandu',
        country:    'Nepal',
        node:       4583125 
    },
    {
        areaName:   'Port Au Prince',
        country:    'Haiti',
        node:       387318 
    }, 
    {
        areaName:   'Ofunato',
        country:    'Japan',
        node:       963792 
    }, 
    {
        areaName:   'City of Melbourne',
        country:    'Australia',
        node:       2404870 
    }, 

]