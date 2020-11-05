$(document).ready(function () {
    let isPortrait = window.matchMedia("(max-aspect-ratio: 1)");
    let itemSize = $("#navContainer a").outerWidth();
    let sidebarSize;


    // Initial Calls
    hideScrollBar();
    onResize();
    fitUsername();

    // Adaptive Listeners
    window.addEventListener("resize", onResize);
    $("#dropdownIcon").mouseenter(hoverDropdown); //mouseleave is declared alongside the .addClass point.


    function hideScrollBar() {
        $("main").css("overflow", "scroll");
        $("main").css("margin-right", -20 + "px");
        $("main").css("padding-right", 20 + "px");
        $("main").css("margin-bottom", -20 + "px");
        $("main").css("padding-bottom", 20 + "px");
    }

    function onResize() {
        if (navHasGap()) {
            hoverDropdown(false); //Closes hover menu
            $("#dropdownIcon").css("display", "inline");
            $("#navContainer>nav").css("display", "none");
        } else {
            $("#dropdownIcon").css("display", "none");
            $("#navContainer>nav").css("display", "grid");
        }
        if (isPortrait.matches) {
            sidebarSize = parseFloat($("#sidebar").css("height"));
            $("main").css("height", window.innerHeight - sidebarSize + "px");
        } else {
            sidebarSize = parseFloat($("#sidebar").css("width"));
            $("main").css("height", window.innerHeight + "px");
        }
    }

    function fitUsername() {
        let fontWeight = $("#profile").css("font-weight");
        let fontSize = $("#profile").css("font-size");
        let fontFamily = $("#profile").css("font-family");
        let font = fontWeight + " " + fontSize + " " + fontFamily;
        let text = $("#profile>span").text();

        // The following code block is adapted from: https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
        var canvas = fitUsername.canvas || (fitUsername.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        let textWidth = metrics.width;

        let containerSize = parseFloat($("#profile").css("width"));
        let ratio = containerSize / textWidth;

        $("#profile>span").css("font-size", ratio +"em");
    };

    function navHasGap() {
        let itemCount = $('#navContainer nav>a').filter(function () { 
            return this.style.display != 'none' 
        }).length;
        let gap = parseFloat($("#sidebar").css("--sidebarPadding"));
        let interiorContent = itemSize * itemCount + gap * (itemCount - 1);
        if (isPortrait.matches) {
            let columnString = $("#sidebar").css("grid-template-columns");
            let secondColumnSize = parseFloat(columnString.split(" ")[1]);
            return secondColumnSize - interiorContent < 0;
        } else {
            let rowString = $("#sidebar").css("grid-template-rows");
            let secondRowSize = parseFloat(rowString.split(" ")[1]);
            return secondRowSize - interiorContent < 0;
        }
    }

    function hoverDropdown(isHovered) {
        if (isHovered.type == "mouseenter") {
            $("#navContainer>nav").css("display", "grid");
            $("#navContainer>nav").addClass("dropdownExpanded");
            $(".dropdownExpanded").mouseleave(hoverDropdown);
            $(".dropdownExpanded").mouseleave(function(){
            });
        } else {
            $(".dropdownExpanded").off('mouseleave');
            $("#navContainer>nav").css("display", "none");
            $("#navContainer>nav").removeClass("dropdownExpanded");
        }
    }
});