<!-- FACET MANAGEMENT MODAL-->
<script>

    import { ui }           from "../../data/stores/ui.js";
    import { schema }       from "../../data/stores/schema.js";
    import { DefaultFacets} from '../../data/model/osm/defaults/facets'

    let actionMessage = null

    function handleRestore(){
        $schema.data.osm.facets = new DefaultFacets().facets  
        actionMessage = "Default Facet settings have been restored"
    };

    // Function to handle file exporting
    function handleExport(){
        const saveAs = (blob, name) => {
            const a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
            a.download = name
            a.rel = 'noopener'
            a.href = URL.createObjectURL(blob)

            setTimeout(() => URL.revokeObjectURL(a.href), 40 /* sec */ * 1000)
            setTimeout(() => a.click(), 0)
        }

        const blob = new Blob([JSON.stringify($schema.data.osm.facets)], {type: "text/plain;charset=utf-8"});

        saveAs(blob, "holocene-facets.json");
        actionMessage = "Facet file has been saved to your default downloads folder"
    };

    // Function to handle file loading
    function handleLoad(){
        const fileSelector = document.getElementById('file-selector');
        fileSelector.click()

        fileSelector.addEventListener('change', function(){
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                const uploadFile = this.files[0];
                const filereader = new window.FileReader();
                filereader.onload = function(){
                    // Error handling: check for structure then update tool with settings
                    try{
                        $schema.data.osm.facets = JSON.parse(filereader.result);
                        actionMessage = "Facet file has been loaded"		            	
                    } catch(err){
                        // window.alert("Error parsing uploaded file\nerror message: " + err.message);
                        return;
                    }
                };
                filereader.readAsText(uploadFile);
            }
        })
    }; 

</script>

<!-- HTML COMPONENT MARKUP-->
<div class ="facet-manager-container">
    <h1 class = "main-title">Facet management</h1>
    <p class = "instruction">
    <!-- By default, Holocene will save your Facets configuration data to your devices local storage (in your browser) once you run a request. This means you don't have to worry about saving any custom Facets configuration and they should be ready for you next time you use Holocene.  -->
    Holocene provides the following options for managing Facet settings:</p>
    <div class = 'option-container'>
        <div>
            <div class ='option-label'>Restore Holocene defaults</div>
            <div class = 'note'>Holocene comes with some preset Facets that can be restored at any time. This will overwrite your current Facet settings.
            </div>
        </div>
        <div>
            <button on:click={handleRestore}>Restore default Facets</button>
        </div>
    </div>
    <div class = 'option-container'>
        <div>
            <div class ='option-label'>Save your Facets</div>
            <div  class = 'note'>You can save you Facet patch (settings) to a text file (in JSON) to keep or share offline. 
            </div>
        </div>
        <div>
            <button on:click={handleExport}>Export Facet patch</button>
        </div>
    </div>
    <div class = 'option-container'>
        <div>
            <div class ='option-label'>Load your Facets</div>
            <div class = 'note'>Saved Facet patch (settings) files can be loaded with this option
            </div>
        </div>
        <div>
            <button  on:click={handleLoad}>Load Facet settings</button>
        </div>
    </div>
     <input type="file" id="file-selector" >
    {#if actionMessage}
    <div class = "action-message">{@html actionMessage}</div>
    {/if}
</div>


<!-- STYLES -->

<style>
    .main-title{
        color:                  var(--primary02-light);
        margin-block-end:      0;
    }
    .instruction{
        font-size:              80%;
        line-height:            1.5;
    }

    .facet-manager-container{
        color:                  #fff;
        display:                flex;
        flex-direction:         column;
        height:                 calc(100% - 5vw);
        overflow:               scroll;
        padding:                0vw 5vw;
    }

    .option-container{
        display:                grid;
        grid-template-columns:  2fr 2fr;
        column-gap:             5vw;
        padding-top:            1rem;
    }
    .option-label{
        display:                flex;
        align-items:            center;
        font-weight:            700;
    }
    .note{
        font-size:              70%;
        line-height:            1.2;
        margin-top:             0.5rem;
        font-style:             italic;
    }

    .action-message{
        color:                  var(--primary02);
        padding-top:            2.5vh;               
        text-align:             center;
    }

    #file-selector{
        height:                 0;
        width:                 0;
        display: none;
    }
</style>


