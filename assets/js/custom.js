!(function (e) {
  "use strict";
  e(".owl-carousel").owlCarousel({
    loop: !0,
    margin: 30,
    nav: !0,
    pagination: !0,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 2 } },
  }),
    e(window).scroll(function () {
      e(window).scrollTop() >= e(".header-text").height() - e("header").height()
        ? e("header").addClass("background-header")
        : e("header").removeClass("background-header");
    }),
    o(),
    (window.sr = new scrollReveal()),
    e(".menu-trigger").length &&
      e(".menu-trigger").on("click", function () {
        e(this).toggleClass("active"), e(".header-area .nav").slideToggle(200);
      }),
    e("a[href*=\\#]:not([href=\\#])").on("click", function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var t = this.hash,
          o = e(this.hash);
        if ((o = o.length ? o : e("[name=" + this.hash.slice(1) + "]")).length)
          return (
            e(window).width() < 991 &&
              (e(".menu-trigger").removeClass("active"),
              e(".header-area .nav").slideUp(200)),
            e("html,body").animate(
              { scrollTop: o.offset().top },
              700,
              "swing",
              function () {
                window.location.hash = t;
              }
            ),
            !1
          );
      }
    }),
    e(document).ready(function () {
      e('a[href^="#welcome"]').addClass("active"),
        e(".menu-item").on("click", function (t) {
          t.preventDefault();
          var o = this,
            n = this.hash,
            i = e(n);
          e("html, body")
            .stop()
            .animate({ scrollTop: i.offset().top }, 500, "swing", function () {
              (window.location.hash = n),
                e(".menu-item").removeClass("active"),
                e(o).addClass("active");
            });
        }),
        e(window).scroll(function (t) {
          var o = e(document).scrollTop() + 80;
          0 !== o
            ? e(".menu-item")
                .not('[href=""]')
                .not('[href="javascript:;"]')
                .each(function () {
                  var t = e(this),
                    n = e(t.attr("href"));
                  n.position().top <= o && n.position().top + n.height() > o
                    ? (e(".menu-item").removeClass("active"),
                      t.addClass("active"))
                    : t.removeClass("active");
                })
            : e('a[href^="#welcome"]').addClass("active");
        });
    });
  const t = {
    settings: { first_expanded: !1, toggle: !1 },
    openAccordion: function (e, t) {
      if (t.children.length) {
        e.classList.add("is-open");
        let o = Math.floor(t.children[0].offsetHeight);
        t.style.height = o + "px";
      }
    },
    closeAccordion: function (e, t) {
      e.classList.remove("is-open"), (t.style.height = 0);
    },
    init: function (e) {
      const t = this;
      let o = t.settings.first_expanded;
      e.classList.contains("is-first-expanded") && (o = !0);
      let n = t.settings.toggle;
      e.classList.contains("is-toggle") && (n = !0);
      const i = e.getElementsByClassName("accordion"),
        s = e.getElementsByClassName("accordion-head"),
        a = e.getElementsByClassName("accordion-body");
      for (let e = 0; e < i.length; e++) {
        i[e];
        const c = s[e],
          l = a[e];
        c.addEventListener("click", function (e) {
          if (n)
            c.classList.contains("is-open")
              ? t.closeAccordion(c, l)
              : t.openAccordion(c, l);
          else {
            for (let e = 0; e < a.length; e++) t.closeAccordion(s[e], a[e]);
            t.openAccordion(c, l);
          }
        }),
          0 === e && o && t.openAccordion(c, l);
      }
    },
  };
  function o() {
    var t = e(window).width();
    e(".submenu").on("click", function () {
      t < 992 &&
        (e(".submenu ul").removeClass("active"),
        e(this).find("ul").toggleClass("active"));
    });
  }
  !(function () {
    const e = document.getElementsByClassName("accordions");
    for (let o = 0; o < e.length; o++) t.init(e[o]);
  })(),
    e(".home-seperator").length &&
      e(".home-seperator .left-item, .home-seperator .right-item").imgfix(),
    e(".count-item").length &&
      e(".count-item strong").counterUp({ delay: 10, time: 1e3 }),
    e(window).on("load", function () {
      e(".cover").length &&
        e(".cover").parallax({
          imageSrc: e(".cover").data("image"),
          zIndex: "1",
        }),
        e("#preloader").animate({ opacity: "0" }, 600, function () {
          setTimeout(function () {
            e("#preloader").css("visibility", "hidden").fadeOut();
          }, 300);
        });
    }),
    e(window).on("resize", function () {
      o();
    });
})(window.jQuery);
