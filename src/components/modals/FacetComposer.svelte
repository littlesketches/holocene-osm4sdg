<!-- MODAL CONTENT COMPONENT FOR EDITING A FACET-->
<script>
    import TrashCanOutline  from "svelte-material-icons/TrashCanOutline.svelte";
    import { ui }           from "../../data/stores/ui.js";
    import { schema }       from "../../data/stores/schema.js";

    export let mode

    let facetIndex, facet

    if(mode === 'facetEdit'){
        facetIndex = $ui.modal.facetIndex,
        facet = {...$schema.data.osm.facets[facetIndex] }

        facet.queryBody = facet.queryBody.replace(/\s+/g, '')       // Clean up spaces and tabs in default query (for cleaner text display)

    } else {
        facetIndex = $schema.data.osm.facetslength + 1
        facet = {       // New facet
            name:           '',
            description:    '',
            storyline:      '',
            queryBody:      `(\n\tnwr(area.searchArea) ;\n)`,
            indicators:     []
        }
    }

    // Tag edit data
    const handleSave = () => {
        console.log('Saving facet edit updates...')
        $schema.data.osm.facets[facetIndex] = facet
        $ui.modal.type = null
        $ui.view.show.modal = false
    }   

    const handleDelete = () => {
        console.log("Remove the facet...")
        $schema.data.osm.facets =  $schema.data.osm.facets.filter((d, i) => i !== facetIndex)
        $ui.modal.type = null
        $ui.view.show.modal = false
    }   

    const handleAdd = () =>{
        console.log("Adding  the facet...")
        $schema.data.osm.facets = [...$schema.data.osm.facets, facet]
        $ui.modal.type = null
        $ui.view.show.modal = false
    }

</script>


<!-- HTML COMPONENT MARKUP-->
<div class ="facet-composer-container">
    <h1 class = "main-title">OSM Data Facet editor</h1>
    <p class = "sub-title">Reconfigure this facet by editing the text fields below.</p>

    <div class = "input-container">
        <label class = "label" for="query-body">Title: </label>
        <textarea name = "query-body" class = "input-cell title"  
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' 
            bind:value={facet.name}/>
        <div></div>
        <div class = "note">
            The facet title is used in summary tables and visualisations so we'd suggest keeping it short!
        </div>
    </div>
    <div class = "input-container">
        <label class = "label"  for="storyline">Storyline: </label>
        <textarea name = "storyline" class = "input-cell storyline"  
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' 
            bind:value={facet.storyline}/>
        <div></div>
        <div class = "note">
            Storylines are a way of expressing how the data might impact or provide context for SDG indicators and targets. 
        </div>
    </div>
    <div class = "input-container">
        <label class = "label" for="description">Description:</label>
        <textarea name = "description" class = "input-cell description"  
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' 
            bind:value={facet.description}/>
        <div></div>
        <div class = "note">
            Descriptions can be used in any way you like. However  we suggest that they include a description of OSM data tags. This makes it easier for others to understand what the facet count or 'score' represents.
        </div>
    </div>
    <div class = "input-container">
        <label class = "label">Overpass query body: </label>
        <textarea class = "input-cell query"  
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' 
            bind:value={facet.queryBody}></textarea>
        <div></div>
        <div class = "note">
            Warning: configuring the Overpass query body reqyires knowledge of the <a target = "_blank" href = "https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QLOverpass">Overpass query language</a> amd OSM <a target = "_blank" href = "https://taginfo.openstreetmap.org/">tag definitions</a>( i.e. available key and values). When querying the Overpass API, the 'body' defined here is wrapped with input and output configurations (e.g. to defined the area being search, which is assigned the name 'searchArea' in the full query statements).
        </div>
    </div>

    {#if mode === 'facetEdit'}
    <div class = "button-container">
        <button on:click={handleSave}>Save changes and close</button>
    </div>
    <div class ="remove-option-container" role="button" on:click={handleDelete}>
        <div class = "remove-option">
            <div>Remove facet</div>
            <div class = 'remove-icon'><TrashCanOutline/></div> 
        </div>
    </div>
    {:else}
    <div class = "button-container">
        <button on:click={handleAdd}>Add a new facet</button>
    </div>
    {/if}
</div>

<!-- STYLES-->
<style>
    .main-title,
    .sub-title{
        color:                  var(--primary02-light);
        margin-block-end:      0.5rem;
    }
    .main-title{
        font-size:              250%;
    }
    .sub-title{
        margin-top:            0;
        margin-bottom:          1.5rem;
    }
    .facet-composer-container{
        color:                  #fff;
        display:                flex;
        flex-direction:         column;
        justify-content:        space-between;
        align-content:          center;
        height:                 calc(100% - 5vw);
        overflow:               scroll;
        margin:                 0vw 0;
        padding:                0vw 5vw;
    }
    .input-cell.title{
        font-weight:            700;
    }
    .input-cell{
        font-size:              80%;
    }
    .input-container{
        display:                grid;
        grid-template-columns:  1fr 3fr;
        padding-bottom:         1rem;
    }
    .remove-option-container{
        display:                flex;
        justify-content:        flex-end;
    }
    .remove-option{
        font-size:              70%;
        transition:             all 250ms;
        pointer-events:         visible;
        transform-origin:       center right;
        cursor:                 pointer;
        display:                flex;
        align-items:            center;
    }
    .remove-icon{
        font-size:              150%;
        padding-top:            5%;
        padding-left:           0.25rem;
    }
    .remove-option:hover{
        transform:              scale(1.05);
        color:                red;
        font-weight:            600;
    }
    label{
        font-size:              80%;
        line-height:            1.35;
    }
    textarea{
        color:                  #fff;
        background-color:       transparent;
        height:                 4rem;
        padding:                0.75rem;
        border-radius:          0.5rem;
        border:                 0.5px solid;
    }
    .note{
        font-size:              70%;
        line-height:            1.2;
        margin-top:             0.5rem;
        font-style:             italic;
    }
</style>