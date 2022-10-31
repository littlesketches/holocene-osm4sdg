<!-- SDG COLOURED DOT NAVIGATION BAR-->
<script>
    import { schema }           from "../../data/stores/schema.js";
    import { ui }           from "../../data/stores/ui.js";

    export let handler
    const dotRadius = 20,
        visWidth = (Object.keys($schema.sdgs).length * 2 + Object.keys($schema.sdgs).length - 1) * dotRadius
</script>

<!-- HTML / SVG COMPONETN MARKUP-->
<svg id = "svg-nav" width="100%" viewBox = '0 0 {visWidth} {dotRadius * 2}'>
    {#each Object.keys($schema.sdgs) as sdgCode, i}
    {@const selected = +sdgCode === +$ui.state.bySection.explore.sdg}
    <g style="transform:translate({dotRadius  + dotRadius * 3 * i}px, {dotRadius}px)">      
        <g goal={sdgCode} class = "sdg-dot goal-{sdgCode}" on:click={handler} on:keydown={handler} class:selected={selected}>
            <circle r = {dotRadius} />
            <text x ="-1.5" y=8>{@html sdgCode}</text>
        </g>
    </g>
    {/each}
</svg>


<!--STYLES -->
<style>
    svg{
        overflow:           visible;
    }
    text{
        fill:           #fff;
        font-weight:        700;
        text-anchor:        middle;
        letter-spacing:     -2px;
        font-size:          24px;
    }
    g.selected.sdg-dot{
        transform:         scale(1.5);
    }
    .sdg-dot {
        cursor:             pointer;
        transition:         250ms all;
    }
    .sdg-dot:hover{
        transform:         scale(1.25);
    }
 /******************/
    #svg-nav .goal-1{ fill: var(--sdg_01)}
    #svg-nav .goal-2{ fill: var(--sdg_02)}
    #svg-nav .goal-3{ fill: var(--sdg_03)}
    #svg-nav .goal-4{ fill: var(--sdg_04)}
    #svg-nav .goal-5{ fill: var(--sdg_05)}
    #svg-nav .goal-6{ fill: var(--sdg_06)}
    #svg-nav .goal-7{ fill: var(--sdg_07)}
    #svg-nav .goal-8{ fill: var(--sdg_08)}
    #svg-nav .goal-9{ fill: var(--sdg_09)}
    #svg-nav .goal-10{ fill: var(--sdg_10)}
    #svg-nav .goal-11{ fill: var(--sdg_11)}
    #svg-nav .goal-12{ fill: var(--sdg_12)}
    #svg-nav .goal-13{ fill: var(--sdg_13)}
    #svg-nav .goal-14{ fill: var(--sdg_14)}
    #svg-nav .goal-15{ fill: var(--sdg_15)}
    #svg-nav .goal-16{ fill: var(--sdg_16)}
    #svg-nav .goal-17{ fill: var(--sdg_17)}


</style>