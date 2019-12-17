var person = {
    name: ""
};
// 不能修改属性的值
Object.defineProperty(person, "name", {
    writable: false,
    value: "okok"
});


// data layer
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-149847604-1');

// google ad sense
(adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-3054816686501642",
    enable_page_level_ads: true
});

// navbar
$(document).ready(function () {
    var x = document.getElementById("hanburger");
});
//remove nav bar after you click, default not responding
function RemoveNavBar() {
    $("#hanburger").trigger("click");
    $(".navbar-toggle").attr('class', 'navbar-toggle collapsed');
    buttonClicked = false;
}
var buttonClicked = false;
$(function () {
    $(".navbar-toggle").click(function () {
        if (buttonClicked) {
            buttonClicked = false;
            $(".navbar-toggle").attr('class', 'navbar-toggle collapsed');
        } else {
            buttonClicked = true;
            $(".navbar-toggle").attr('class', 'navbar-toggle');
        }
    });
});
//<!-- Hotjar Tracking Code for www.shijiezhou.com -->
(function (h, o, t, j, a, r) {
    h.hj = h.hj || function () {
        (h.hj.q = h.hj.q || []).push(arguments)
    };
    h._hjSettings = { hjid: 679114, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

// Widgets
(function (d, h, m) {
    var js, fjs = d.getElementsByTagName(h)[0];
    if (d.getElementById(m)) {
        return;
    }
    js = d.createElement(h);
    js.id = m;
    js.onload = function () {
        window.makerWidgetComInit({
            position: "right",
            widget: "puulssizkzhs9zgg-zfiq8imqba8xl0hi-p2fyjqlhybcguv3s"
        })
    };
    js.src = "https://makerwidget.com/js/embed.js";
    fjs.parentNode.insertBefore(js, fjs)
}(document, "script", "dhm"))

// Extra test
// $.ajax({
//     url: 'http://122.51.161.100:3000/users'
// })
//     .done(function (res) {
//         console.log(res);
//     })
//     .fail(function (err) {
//         console.log('Error: ' + err.status);
//     });

// segment
!function () {
    var analytics = window.analytics = window.analytics || []; if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice."); else {
        analytics.invoked = !0; analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"]; analytics.factory = function (t) { return function () { var e = Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics } }; for (var t = 0; t < analytics.methods.length; t++) { var e = analytics.methods[t]; analytics[e] = analytics.factory(e) } analytics.load = function (t, e) { var n = document.createElement("script"); n.type = "text/javascript"; n.async = !0; n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js"; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(n, a); analytics._loadOptions = e }; analytics.SNIPPET_VERSION = "4.1.0";
        analytics.load("eF5itNfWONNXniBTNT3hmiexAq6n2Xeb");
        analytics.page();
    }
}();
