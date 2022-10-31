import * as d3 from 'd3'

export { slugify, capitaliseFirst, getRandomInt, textWrap, fixPathDirection }

function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, '').toLowerCase(); // trim           
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;",      // remove accents, swap ñ for n, etc
        to   = "aaaaeeeeiiiioooouuuunc------"
    for (let i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    return str;
};

const capitaliseFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// SCG text wrap funciton
function textWrap(text, width, lineHeight, centerVertical = false) {

    text.each(function() {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            y = text.attr("y"),
            x = text.attr("x"),
            fontSize = parseFloat(text.style("font-size")),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));

            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y",  y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }                    
        }            
        if(centerVertical){
            const translateY = lineNumber === 0 ? fontSize * 0.6 : - (lineNumber - 1) * 0.5 * fontSize
            // console.log('Center vertical', {
            //     lines: lineNumber + 1, 
            //     fontSize, translateY 
            // })
            text.style("transform",  `translateY(${translateY}px)`)
        }
    })
}; // end wrap()


// Function check fix path directions of multi-path boundary arrays
function fixPathDirection(arrayOfPaths){
    return arrayOfPaths.map((array, i) => {
        if(i===0){
            return array
        } else {
            const prevArray = arrayOfPaths[i-1] 
            const lastPoint = prevArray[prevArray.length - 1]
            const firstPoint = array[0]
            const check = lastPoint[0] === firstPoint[0] && lastPoint[1] == firstPoint[1]
            return check ? array : array.reverse()
        }
    })
};


