

export {
    updateSectionUI,
    changeSubsection 
}

async function updateSectionUI(el, ref){

    ref = el.getAttribute('section')
    console.log(ref, el)
    document.getElementById(`${ref}-title`)
            .scrollIntoView({behavior: "smooth"})
};

function changeSubsection(){

    document.getElementById(this.getAttribute('target')).scrollIntoView({behavior: "smooth"})
};
