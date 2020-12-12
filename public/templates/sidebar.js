$(document).ready(function () {
    let isPortrait = window.matchMedia("(max-aspect-ratio: " + getComputedStyle(document.body).getPropertyValue('--resolutionRatioPoint') + ")");
    let itemSize = $("#navContainer a").outerWidth();
    let sidebarSize;

    console.log("AA");
    $.ajax({
        url: "/test",
        dataType: "text",
        type: "GET",
        success: function (data) {
            console.log("SUCCESS HTML:", data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });

    // Initial Calls
    hideScrollBar();
    onResize();
    fitUsername();

    // Adaptive Listeners
    window.addEventListener("resize", onResize);

    function hideScrollBar() {
        $("main").css("overflow", "scroll");
        $("main").css("margin-right", -20 + "px");
        $("main").css("padding-right", 20 + "px");
        $("main").css("margin-bottom", -20 + "px");
        $("main").css("padding-bottom", 20 + "px");
    }

    function onResize() {
        if (navHasGap()) {
            hoverDropdown(false);
            $("#dropdownIcon").css("display", "none");
            $("#navContainer>nav").css("display", "grid");

            $('#dropdownIcon').off("click", hoverDropdown.bind(this, false));
            $('main').off("click", hoverDropdown.bind(this, false));
            $("#dropdownIcon").off("mouseenter", hoverDropdown.bind(this, true));
            
            $(".dropdownExpanded").off("mouseleave", hoverDropdown.bind(this, false));
        } else {
            hoverDropdown(false);
            $("#dropdownIcon").css("display", "inline");
            $("#navContainer>nav").css("display", "none");

            $('#dropdownIcon').on("click", hoverDropdown.bind(this, true));
            $('main').on("click", hoverDropdown.bind(this, false));
            $("#dropdownIcon").on("mouseenter", hoverDropdown.bind(this, true));
            $(".dropdownExpanded").on("mouseleave", hoverDropdown.bind(this, false));
            $(".dropdownExpanded").on("mouseleave", function(){console.log("AAA")});
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

        $("#profile>span").css("font-size", ratio + "em");
    };

    function navHasGap() {
        let itemCount = $('#navContainer nav>a').filter(function () {
            return this.style.display != 'none'
        }).length;
        let minGap = parseFloat($("#sidebar").css("--sidebarPadding"));
        let interiorContent = itemSize * itemCount + minGap * (itemCount - 1);
        if (isPortrait.matches) {
            let columnString = $("#sidebar").css("grid-template-columns");
            let secondColumnSize = parseFloat(columnString.split(" ")[1]);
            return secondColumnSize - interiorContent >= 0;
        } else {
            let rowString = $("#sidebar").css("grid-template-rows");
            let secondRowSize = parseFloat(rowString.split(" ")[1]);
            return secondRowSize - interiorContent >= 0;
        }
    }

    function hoverDropdown(display) {
        if (display) {
            $("#navContainer>nav").css("display", "grid");
            $("#navContainer>nav").addClass("dropdownExpanded");
        } else {
            $("#navContainer>nav").css("display", "none");
            $("#navContainer>nav").removeClass("dropdownExpanded");
        }
    }
});