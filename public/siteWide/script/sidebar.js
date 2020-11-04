$(document).ready(function () {
    let isPortrait = window.matchMedia("(max-aspect-ratio: 1)");
    let itemSize = $("#navContainer a").outerWidth();
    let sidebarSize;

    // Initial Calls
    hideScrollBar();
    updateNavGrid();
    onResize();
    fitUsername();

    // Adaptive Listeners
    isPortrait.addListener(updateNavGrid);
    window.addEventListener("resize", onResize);
    $("#dropdownIcon").mouseenter(hoverDropdown); //mouseleave is declared alongside the .addClass point.

    function updateNavGrid() {
        if (isPortrait.matches) {
            let section = itemSize + "px "
            $("#navContainer>nav").css("grid-template-columns", section + section + section + section + section);
            $("#navContainer>nav").css("grid-template-rows", "");

        } else {
            let section = itemSize + "px "
            $("#navContainer>nav").css("grid-template-columns", "");
            $("#navContainer>nav").css("grid-template-rows", section + section + section + section + section);

        }
    }

    function onResize() {
        if (navHasGap()) {
            $("#dropdownIcon").css("display", "inline");
            hoverDropdown(false);
            $("#navContainer>nav").css("display", "none");
        } else {
            $("#dropdownIcon").css("display", "none");
            $("#navContainer>nav").css("display", "grid");
        }
        if (isPortrait.matches) {
            sidebarSize = parseFloat($("#sidebar").css("height"));
        } else {
            sidebarSize = parseFloat($("#sidebar").css("width"));
        }
    }

    function navHasGap() {
        if (isPortrait.matches) {
            let columnString = $("#sidebar").css("grid-template-columns");
            let secondColumnSize = parseFloat(columnString.split(" ")[1]);
            return secondColumnSize - (itemSize * 5) < 0;
        } else {
            let rowString = $("#sidebar").css("grid-template-rows");
            let secondRowSize = parseFloat(rowString.split(" ")[1]);
            return secondRowSize - (itemSize * 5) < 0;
        }
    }

    function hideScrollBar() {
        $("main").css("overflow", "scroll");
        $("main").css("margin-right", -100 + "px");
        $("main").css("padding-right", 100 + "px");
        $("main").css("margin-bottom", -100 + "px");
        $("main").css("padding-bottom", 100 + "px");
        if (isPortrait.matches) {
            $("main").css("height", "calc(100% - " + sidebarSize);
        } else {
            $("main").css("height", "100%")
        }
    }

    function hoverDropdown(isHovered) {
        if (isHovered.type == "mouseenter") {
            $("#navContainer>nav").css("display", "grid");
            $("#navContainer>nav").addClass("dropdownExpanded");
            $(".dropdownExpanded").mouseleave(hoverDropdown);
        } else {
            $("#navContainer>nav").css("display", "none");
            $("#navContainer>nav").removeClass("dropdownExpanded");
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
});