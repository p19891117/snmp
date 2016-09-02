/**
 * 时间轴：向左箭头
 */
function pre() {
    if (!$("#timeline").is(":animated") && $("#timeline").position().left < 0) {
        $("#timeline").animate({
            left : "+=300px"
        });
    }
}

/**
 * 时间轴：向右箭头
 */
function next() {
    var l_l = $("#last").offset().left;
    var l_t = $("#next").offset().left;
    var l_r = l_l - l_t; 
    if (!$("#timeline").is(":animated") && l_r > -10) {
        $("#timeline").animate({
            left : "-=300px"
        });
    }
}