$(document).ready(function () {
    let path = "templates/";
    let htmlImport = $('[import-html]');
    jQuery.each(htmlImport, function () {
        let file = path + $(this).attr('id') + '.html';
        $(this).load(file);
    });
    let cssImport = $('[import-css]');
    jQuery.each(cssImport, function () {
        let cssLink = $("<link>");
        $("head").append(cssLink); //IE hack: append before setting href
        cssLink.attr({
            rel: "stylesheet",
            type: "text/css",
            href: path + $(this).attr('id') + '.css'
        });
    });
    let jsImport = $('[import-js]');
    jQuery.each(jsImport, function () {
        let scriptPath = path + $(this).attr('id') + '.js';
        $("body").append($.getScript(scriptPath));
    });
});