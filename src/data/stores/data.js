// Data store object

import { writable } from 'svelte/store';
import { OsmStore } from '../model/osm/defaults/osmStore.js';

export const data = writable({
    osm:            new OsmStore(),  
})
