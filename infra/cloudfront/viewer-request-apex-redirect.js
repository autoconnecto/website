// CloudFront Function (runtime: cloudfront-js-2.0)
// Live name: www-static-rewrite on distribution E3UPPLM5N2GQ5Z.
//
// autoconnecto.in is an alternate name on the same distribution as www.
// Send it to https://www and keep the path. Then rewrite extensionless
// Next export routes to the .html object S3 actually stores.
function queryString(qs) {
    var parts = [];
    var key;
    for (key in qs) {
        if (!Object.prototype.hasOwnProperty.call(qs, key)) continue;
        var entry = qs[key];
        if (entry.multiValue) {
            var i;
            for (i = 0; i < entry.multiValue.length; i++) {
                parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(entry.multiValue[i].value));
            }
        } else if (entry.value) {
            parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(entry.value));
        } else {
            parts.push(encodeURIComponent(key));
        }
    }
    return parts.length ? "?" + parts.join("&") : "";
}

function handler(event) {
    var req = event.request;
    var hostHeader = req.headers.host;
    var host = hostHeader && hostHeader.value ? hostHeader.value.toLowerCase() : "";
    if (host === "autoconnecto.in") {
        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                location: {
                    value: "https://www.autoconnecto.in" + req.uri + queryString(req.querystring),
                },
            },
        };
    }

    var uri = req.uri;
    if (uri.endsWith("/")) {
        req.uri = uri + "index.html";
        return req;
    }
    var last = uri.substring(uri.lastIndexOf("/") + 1);
    if (last.indexOf(".") === -1) {
        req.uri = uri + ".html";
    }
    return req;
}
