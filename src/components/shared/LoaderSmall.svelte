
<div>
    <ul class="bokeh">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>

</div>

<style>
    div{
        width:      100%;
        margin:     0 auto;
        position:   relative;
        pointer-events:  none;
    }


.bokeh {
    font-size:      50vw;
    width:          1em;
    height:         1.15em;
    position:       relative;
    margin:         100px auto;
    border-radius:  50%;
    border:         .01em solid rgba(150,150,150,0.1);
    list-style:     none;
    pointer-events:  none;
}

.bokeh li {
    position:       absolute;
    width:          .25em;
    height:         .25em;
    border-radius:  50%;
}

.bokeh li:nth-child(            1) {
    left:                       50%;
    top:                        0;
    margin:                     0 0 0 -.1em;
    background:               #00C176;
    background:               var(--sdg_03);
    -webkit-transform-origin:   50% 250%;
    transform-origin:           50% 250%;
    -webkit-animation: 
        rota 1.13s linear infinite,
        opa 3.67s ease-in-out infinite alternate;
    animation: 
        rota 1.13s linear infinite,
        opa 3.67s ease-in-out infinite alternate;
}

.bokeh li:nth-child(2) {
    top: 50%; 
    right: 0;
    margin: -.1em 0 0 0;
    background: #FF003C;
    -webkit-transform-origin: -150% 50%;
    transform-origin: -150% 50%;
    -webkit-animation: 
        rota 1.86s linear infinite,
        opa 4.29s ease-in-out infinite alternate;
    animation: 
        rota 1.86s linear infinite,
        opa 4.29s ease-in-out infinite alternate;
}

.bokeh li:nth-child(3) {
    left: 50%; 
    bottom: 0;
    margin: 0 0 0 -.1em;
    background: #FABE28;
    -webkit-transform-origin: 50% -150%;
    transform-origin: 50% -150%;
    -webkit-animation: 
        rota 1.45s linear infinite,
        opa 5.12s ease-in-out infinite alternate;
    animation: 
        rota 1.45s linear infinite,
        opa 5.12s ease-in-out infinite alternate;
}

.bokeh li:nth-child(4) {
    top: 50%; 
    left: 0;
    margin: -.1em 0 0 0;
    background: #88C100;
    -webkit-transform-origin: 250% 50%;
    transform-origin: 250% 50%;
    -webkit-animation: 
        rota 1.72s linear infinite,
        opa 5.25s ease-in-out infinite alternate;
    animation: 
        rota 1.72s linear infinite,
        opa 5.25s ease-in-out infinite alternate;
}

@-webkit-keyframes rota {
    from { }
    to { -webkit-transform: rotate(360deg); }
}

@keyframes rota {
    from { }
    to { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
}

@-webkit-keyframes opa {
    0% { }
    12.0% { opacity: 0.80; }
    19.5% { opacity: 0.88; }
    37.2% { opacity: 0.64; }
    40.5% { opacity: 0.52; }
    52.7% { opacity: 0.69; }
    60.2% { opacity: 0.60; }
    66.6% { opacity: 0.52; }
    70.0% { opacity: 0.63; }
    79.9% { opacity: 0.60; }
    84.2% { opacity: 0.75; }
    91.0% { opacity: 0.87; }
}

@keyframes opa {
    0% { }
    12.0% { opacity: 0.80; }
    19.5% { opacity: 0.88; }
    37.2% { opacity: 0.64; }
    40.5% { opacity: 0.52; }
    52.7% { opacity: 0.69; }
    60.2% { opacity: 0.60; }
    66.6% { opacity: 0.52; }
    70.0% { opacity: 0.63; }
    79.9% { opacity: 0.60; }
    84.2% { opacity: 0.75; }
    91.0% { opacity: 0.87; }
}

</style>