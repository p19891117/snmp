"use strict";

function point() {

    var _point = {};

    var css = document.styleSheets[0];
    var beforRule = css.rules[css.cssRules.length - 2];
    var afterRule = css.rules[css.cssRules.length - 1];
    _point.render = function (x, y, color, conent) {




        //oRule.style.borderColor=data.color+"transparent transparent"
        beforRule.style.background = "" + color + "";
        beforRule.style.content = "'" + conent + "'";

        afterRule.style.borderColor = "" + color + " transparent transparent";

        console.log(beforRule.style.borderColor)
        console.log(afterRule.style.borderColor)
        console.log(beforRule.style.content)

        var div = d3.select("body")
            .append("div")
            .attr("id","div"+x)
            .style("left", x + "px")
            .style("top", y + "px")
            .attr("class", "demoSpan1");





    }
    return _point;
}
