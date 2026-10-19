// CloudFront Function (runtime: cloudfront-js-2.0)
// Not attached. Attach on viewer-request of distribution E3UPPLM5N2GQ5Z
// when the site is next deployed.
//
// autoconnecto.in/product currently 404s. Only the home page redirects
// to www. This sends every apex request to https://www.autoconnecto.in.
//
// HTTP that never reaches CloudFront cannot be redirected here. The
// distribution viewer protocol policy has to be "Redirect HTTP to HTTPS",
// and both hostnames have to be alternate domain names on this distribution.
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
    return req;
}
