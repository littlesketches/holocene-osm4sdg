<!-- TITLE PAGE FOR HTE IDENTIFY SECTION-->
<script>
    import AbstractLines        from '../../svg/AbstractLines.svelte'
    import Landscape            from '../../svg/Landscape.svelte'
    import DownArrow            from '../../shared/DownArrow.svelte'
    import { changeSubsection }  from '../../../lib/utils/nav.js'
</script>


<!-- HTML COMPONENT MARKUP-->
<section id ="compose-title" class = "subsection">    
    <div class = "bg-container">
    </div>
    <div class = "title-container">
        <div>
            <h1>Connecting what matters</h1>
            <p>Use this section to <em>locate</em> the city you're interested in, and to <em>curate</em> how OSM data might help you better understand how the community is progressing towards the SDGs, and challenges they might be facing. 
            </p>
        </div>
    </div>
    <div class = "down-button-container">
        <DownArrow handler={changeSubsection} target="locate" section="compose"/>
    </div> 
</section>



<!-- STYLES-->
<style>
    h1{
        font-size:          8vw;
        line-height:        1.1;
        margin-block-end:   0;
    }
    
    p{
        font-size:          125%;
        line-height:        1.5;
    }
    section{
        display:            grid;
        width:              100%;
        color:              var(--primary02);
    }
    .bg-container{
        grid-area:          1 / 1 / 4/ 2;     
        display:            grid;   
        align-items:        center;
        justify-items:      center;
        width:              100%
    }
    img{
        width:              100%;
        height:             100%;
        object-fit:         cover;
        opacity:            0.5;
    }
    .title-container{
        grid-area:          2 / 1 / 4/ 2;  
        margin:             0% 25%;
        color:              var(--primary02);
        z-index:            10;
    }

    .down-button-container{
        margin-bottom:          5vh;
    }

    @media (max-width: 1024px){
        .title-container{
            margin:             0% 15%;

        }
    }

</style>