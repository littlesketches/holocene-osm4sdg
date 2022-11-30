# Holocene

**This application is published [here](https://holocene-osm4sdg.vercel.app/)**

The application features reasonably detailed user guidance and information about it's purpose and (available) features.  This document does repeats some of that, but is intended to be more like a set of high level companion notes for developers and technically minded.  Code notes are also provided throughout the source code.

<br>

## About
*Holocene* is a tool (or 'instrument') that cities and communities can use to turn 'tagged' OpenStreetMap (OSM) data - which reflect elements of the real world - to develop a set of measures or a 'scorecard' against the UN Sustainable Development Goals (SDGs).

*Holocene* is s full-featured prototype that guides users through the process of *composing*  meaningful SDG metrics - known as *Facets* - for their desired city or community; and then  retrieves OSM data to produce an interactive, visual data visualisation and representations to help users understand and track progress towards the SDGs.

*Holocene* is a fully web-based and open sourced application, that is freely available. It is however, still am early prototype and will have bugs and (undocumentated) limitations. 
- *Holocene's* It's visual outputs include dense information visualisations and accordingly, it is highly  recommended that (this version) of Holocene be used on larger screens. 
- Accessibility and internationalisation (incl. language support) design has yet to be undertaken. Apologies here! 

<br>  

## Technology
*Holocene* is a client side web application, built with the [Svelte](https://svelte.dev/) component framework; however it is quite basic (and Svelte is used fairly lightly, and mainly to keep things organised)

It leverages the:
- [Nomantim API](https://nominatim.org/): to help users find the correct city boundary they are looking for, defined as an 'administrative boundary' in OSM; and the 
- [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API): to retrieve data for  user-specified OSM elements (i.e. that users have defined and connected to SDG indicators, detailed below).  

Data visualisations are produced in SVG [Svelte](https://svelte.dev/) with [D3.js](https://d3js.org/); or in WebGL canvas using [ThreeJS](https://threejs.org/) (note: a conventional ThreeJS project is simply mounted in a Svelte component. This project leverages and adapts previous work by Little Sketches (also the author of Holocone), thatis  published and used here under an MIT license).


<br>  

## Assets and acknowledgements
All SDG assets used in *Holocene* are attributed to and made available by the [United Nations](https://www.un.org/sustainabledevelopment/news/communications-material/)

For this prototype, *Holocene* also uses vector artwork adapted from Prakasit Khuansuwan's work made available under a free license from [Vecteezy](https://www.vecteezy.com/vector-art/1128259-travel-around-the-world-important-landmarks-poster). This will be replaced with original (or data generated) artwork in the future.

<br>

## Project history

This web application has been developed in October, 2022 for the [OSM4SDGs Challenge](https://ideas.unite.un.org/sdg11/Page/Challenge1).

The hope is that mode work will be done to improve the application in the not too distant future... and (or) that some other creative projects will come out.


<br>

## (Known) To dos
Minor
- [ ] Add a referrer for the Nomantim request
- [ ] Add custom benchmarks (city selector)
- [ ] Add a way to save/load retrieved Facet data   
- [ ] Improve mobile and a11y support



Major
- [ ] Enhance the Facet Composer
- [ ] ThreeJS scene data visualisation
- [ ] Incorporate national SDG datasets as context (with visualisations enhancements)
- [ ] Build on the musical theme...





<br>

## License
MIT License on this (...until a better one can be found, but it'll be permissive)