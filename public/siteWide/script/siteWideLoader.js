$(document).ready(function () {
    var htmlImport = $('[import-html]');
    jQuery.each(htmlImport, function () {
        var file = 'siteWide/html/' + $(this).attr('id') + '.html';
        $(this).load(file);
    });
    var cssImport = $('[import-css]');
    jQuery.each(cssImport, function () {
        var cssLink = $("<link>");
        $("head").append(cssLink); //IE hack: append before setting href
        cssLink.attr({
            rel: "stylesheet",
            type: "text/css",
            href: 'siteWide/style/' + $(this).attr('id') + '.css'
        });
    });
    var jsImport = $('[import-js]');
    jQuery.each(jsImport, function () {
        var scriptPath = 'siteWide/script/' + $(this).attr('id') + '.js';
        $("body").append($.getScript(scriptPath));
    });
});