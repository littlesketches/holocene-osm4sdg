<!-- COMPONENT FOR -->
<script>
    import { fade }     from "svelte/transition";
    import Home         from "./components/sections/Home.svelte";
    import Compose     from "./components/sections/Compose.svelte";
    import Explore      from "./components/sections/Explore.svelte";
    import Modal        from "./components/modals/Modal.svelte";

    import { ui }       from "./data/stores/ui.js";
    import { schema }   from "./data/stores/schema.js";
    import { data }     from "./data/stores/data.js";

    // Setup UI view from props (i.e. from query params)
    export let params
    $ui.view.show.guide = params.has('guide') 

    // Function to navigate between sections: passed to each section
    function updateSectionUI() { 
        $ui.view.section = this.getAttribute('section')
        document.getElementById(`${$ui.view.section}-title`).scrollIntoView({behavior: "smooth"})
    };

    // For debugging: reference stores as global variables
    window.schema   = $schema
    window.ui       = $ui
    window.data     = $data

</script>



<!-- HTML COMPONENT MARKUP: ALL LAYERED SECTIONS-->
<div id = "app-wrapper" class:guide={$ui.view.show.guide} >
    <Home {updateSectionUI}/>
    <Compose {updateSectionUI}/>
    <Explore {updateSectionUI}/>
</div>


{#if $ui.view.show.modal}
<Modal/>
{/if}


<!-- STYLES -->
<style>
    .guide{
        /* transform-origin:   center right; */
        transform:          translate(-20%, 0%) scale(0.6);
        /* border:             solid 20px; */
        /* margin:             -1.25vw; */
        /* padding-right: 3vw; */
    }
    .guide #app-wrapper{
        /* margin: 5px */
    }
    
</style>