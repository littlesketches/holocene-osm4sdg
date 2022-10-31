<!-- SDG dot divider-->
<script>

    import { schema }           from './../../data/stores/schema.js';

    const dotRadius = 20,
        visWidth = (Object.keys($schema.sdgs).length * 2 + Object.keys($schema.sdgs).length - 1) * dotRadius
</script>


<!-- HTML COMPONENT MARKUP-->

<svg width="100%" viewBox = '0 0 {visWidth} {dotRadius * 2}'>
    {#each Object.keys($schema.sdgs) as sdgCode, i}
    <circle class = "sdg-dot goal-{sdgCode}" r = {dotRadius} cx = {dotRadius  + dotRadius * 3 * i} cy = {dotRadius}/>
    {/each}
</svg>




<!-- STYLES -->
<style>
    svg{
        margin:             2.5vh 0;
    }

    .goal-1{ fill: var(--sdg_01)}
    .goal-2{ fill: var(--sdg_02)}
    .goal-3{ fill: var(--sdg_03)}
    .goal-4{ fill: var(--sdg_04)}
    .goal-5{ fill: var(--sdg_05)}
    .goal-6{ fill: var(--sdg_06)}
    .goal-7{ fill: var(--sdg_07)}
    .goal-8{ fill: var(--sdg_08)}
    .goal-9{ fill: var(--sdg_09)}
    .goal-10{ fill: var(--sdg_10)}
    .goal-11{ fill: var(--sdg_11)}
    .goal-12{ fill: var(--sdg_12)}
    .goal-13{ fill: var(--sdg_13)}
    .goal-14{ fill: var(--sdg_14)}
    .goal-15{ fill: var(--sdg_15)}
    .goal-16{ fill: var(--sdg_16)}
    .goal-17{ fill: var(--sdg_17)}
</style>