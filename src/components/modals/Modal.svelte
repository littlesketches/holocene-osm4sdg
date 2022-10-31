<!-- COMPONENT FOR MODAL --> 
<script>
    import { ui }               from "../../data/stores/ui.js";
    import { schema }           from "../../data/stores/schema.js";
    import { fade, fly }        from "svelte/transition";
    import FacetComposer        from "./FacetComposer.svelte";
    import FacetManager         from "./FacetManager.svelte";
    import FacetDetails         from "./FacetDetails.svelte";
    import CloseCircleOutline   from "svelte-material-icons/CloseCircleOutline.svelte";

    const closeModal= () =>  $ui.view.show.modal = false
</script>


<!-- HTML COMPONENT MARKUP-->
<section class = "modal-bg" transition:fade>
    <div class = "modal-container">
        <div class ="modal-content">
            {#if $ui.modal.type == 'facetEdit' || $ui.modal.type == 'facetAdd' }  
            <FacetComposer mode={$ui.modal.type}/> 
            {:else if $ui.modal.type == 'facetManage' }
            <FacetManager/> 
            {:else if $ui.modal.type == 'facetDetails' }
            <FacetDetails/> 
            {/if}
        </div>
        <div class = 'close-container' role="button" on:click={closeModal} on:keypress={closeModal}><CloseCircleOutline/></div>
    </div>
</section>


<!-- STYLES -->
<style>
    .modal-bg{
        position:           fixed;
        top:                0;
        left:               0;
        width:              100vw;
        height:             100vh;
        display:            grid;
        align-content:      center;
        justify-content:    center;
        z-index:            99;
        background:         radial-gradient(ellipse at center, transparent, #141f0b );
    }

    .modal-container{
        display:            grid;
        width:              80vw;
        height:             95vh;
        background-color: rgba(0, 0, 0, 0.9);
        border-radius:      2.5vw;
        border:             0.25vw solid #fff;
        z-index:            100;
    }
    .modal-content{
        grid-area:          1 / 1 / 2 / 2;
        width:              100%;
        height:             100%;
        justify-self:       center;
        overflow:            hidden;
    }
    .close-container{
        grid-area:          1 / 1 / 2 / 2;
        align-self:         start;
        justify-self:       end;
        color:              #fff;
        padding-right:      1.5vw;
        padding-top:        1.5vw;
        font-size:          4vw;
        cursor:             pointer;
        transition:         all 250ms;
    }
    .close-container:hover{
        transform:          scale(1.25);
        transform-origin:   50% 50%;
    }


    
    /* Media Query for Large screens */
    @media (min-width: 1281px) {
        .modal-container{
            width:              70vw;
        }
    }


</style>