<!-- COMPONENT FOR THE MAIN TITLE PAGE -->
<script>
    import DownArrow            from '../../shared/DownArrow.svelte'
    import CitiesSkyline        from '../../svg/CitiesSkyline.svelte'
    import { changeSubsection } from '../../../lib/utils/nav.js';
</script>

<!-- HTML COMPONENT MARKUP-->
<section id = "home-title"  class = "subsection">
    <div class = "title-content-wrapper">
        <h1 class ="main-title">Holocene</h1>
        <div class = "subtitle">
            An instrument for composing real-world facets of sustainable development
        </div>
        <div class = "down-button-container">
            <DownArrow handler={changeSubsection} target="about" section="home"/>
        </div>
    </div>
    <div class = "subsection-bg-wrapper">
        <CitiesSkyline/>
    </div>
</section>


<!-- STYLES -->
<style>
    /** Subsection layout **/
    .title-content-wrapper{
        grid-area:              1 / 1 / 2 / 2;
        text-align:             center;
        display:                grid;
        grid-template-rows:     2fr 2fr 1fr;
        height:                 100vh;
    }

    .main-title{
        font-size:              12vw;
        font-weight:            700;
        text-transform:         lowercase;
        letter-spacing:         1vw;
        margin-block-start:     0;
        margin-block-end:       0;
        align-self:             end;
    }
    .subtitle{
        text-transform:         lowercase;
        font-size:              3vw;   
        line-height:            1.25;
        align-self:             start;
        justify-self:           center;
        max-width:              70%
    }
    .subsection-bg-wrapper{
        align-items:            end;
    }

    .down-button-container{
        margin-bottom:          0vh;
    }

    /* Media Query for Mobile Devices &low resolution  Tablets, Ipads */
    @media (max-width: 767px) {
        .title-content-wrapper{
            grid-template-rows:     3fr 2fr 1fr;
        }
        .down-button-container{
            margin-bottom:          10vh;
        }
    }
        
    /* Media Query for Tablets Ipads portrait mode */
    @media (min-width: 768px) and (max-width: 1024px){
        .title-content-wrapper{
            grid-template-rows:     4fr 2fr 1fr;
        }
        .down-button-container{
            margin-bottom:          10vh;
        }
    }
        
    /* Media Query for Laptops and Desktops */
    @media (min-width: 1025px) and (max-width: 1600px){
        .down-button-container{
            margin-bottom:          5vh;
        }
    }
        
    /* Media Query for very Large screens */
    @media (min-width: 1601px) {
        .subtitle{ 
            font-size:              2.5vw;   
        }
    }



</style>