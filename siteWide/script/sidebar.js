$(document).ready(function () {
    let isPortrait = window.matchMedia("(max-aspect-ratio: 1)");
    let itemWidth;

    initialize();
    function initialize() {
        updateNavGrid();
        onResize();

        // Adaptive Listeners
        isPortrait.addListener(updateNavGrid);
        window.addEventListener("resize", onResize);
        $("#dropdownIcon").hover(
            function () {
                $("#navContainer>nav").css("display", "grid");
                $("#navContainer>nav").addClass("dropdownExpanded");
            },
            function () {
                $("#navContainer>nav").css("display", "none");
                $("#navContainer>nav").removeClass("dropdownExpanded");
            }
        );

        hideScrollBar();

        /* Ratio Profile Text */
        $("#profile").css("font-size", parseFloat($("#profile").css("height")) * .2);

    }

    function updateNavGrid() {
        if (isPortrait.matches) {
            itemWidth = parseFloat($("#navContainer").css("height")) * .75;
            let section = itemWidth + "px "
            $("#navContainer>nav").css("grid-template-columns", section + section + section + section + section);
            $("#navContainer>nav").css("grid-template-rows", "");
        } else {
            itemWidth = parseFloat($("#navContainer").css("width")) * .75;
            let section = itemWidth + "px "
            $("#navContainer>nav").css("grid-template-columns", "");
            $("#navContainer>nav").css("grid-template-rows", section + section + section + section + section);
        }
    }

    function onResize() {
        if (navHasGap()) {
            $("#dropdownIcon").css("display", "inline");
            $("#navContainer>nav").css("display", "none");
        } else {
            $("#dropdownIcon").css("display", "none");
            $("#navContainer>nav").css("display", "grid");
        }
    }

    function navHasGap() {
        let paddingMargin = 40;
        if (isPortrait.matches) {
            let columnString = $("#sidebar").css("grid-template-columns");
            let secondColumnSize = parseFloat(columnString.split(" ")[1]) - paddingMargin;
            return secondColumnSize - (itemWidth * 5) < 0;
        } else {
            let rowString = $("#sidebar").css("grid-template-rows");
            let secondRowSize = parseFloat(rowString.split(" ")[1]) - paddingMargin;
            return secondRowSize - (itemWidth * 5) < 0;
        }
    }

    function hideScrollBar() {
        $("main").css("overflow", "scroll");
        let mainMargin = parseFloat($("main").css("margin"));
        let mainPadding = parseFloat($("main").css("padding"));
        $("main").css("margin-right", -100 + "px");
        $("main").css("padding-right", 100 + "px");
        $("main").css("margin-bottom", -100 + "px");
        $("main").css("padding-bottom", 100 + "px");
    }
});