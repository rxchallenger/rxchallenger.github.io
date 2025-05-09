!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Popper = t());
})(this, function () {
  "use strict";
  for (
    var e = "undefined" != typeof window && "undefined" != typeof document,
      t = ["Edge", "Trident", "Firefox"],
      n = 0,
      r = 0;
    r < t.length;
    r += 1
  )
    if (e && navigator.userAgent.indexOf(t[r]) >= 0) {
      n = 1;
      break;
    }
  var o =
    e && window.Promise
      ? function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              window.Promise.resolve().then(function () {
                (t = !1), e();
              }));
          };
        }
      : function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              setTimeout(function () {
                (t = !1), e();
              }, n));
          };
        };
  function i(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function a(e, t) {
    if (1 !== e.nodeType) return [];
    var n = getComputedStyle(e, null);
    return t ? n[t] : n;
  }
  function f(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function s(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var t = a(e),
      n = t.overflow,
      r = t.overflowX,
      o = t.overflowY;
    return /(auto|scroll)/.test(n + o + r) ? e : s(f(e));
  }
  function p(e) {
    var t = e && e.offsetParent,
      n = t && t.nodeName;
    return n && "BODY" !== n && "HTML" !== n
      ? -1 !== ["TD", "TABLE"].indexOf(t.nodeName) &&
        "static" === a(t, "position")
        ? p(t)
        : t
      : e
      ? e.ownerDocument.documentElement
      : document.documentElement;
  }
  function l(e) {
    return null !== e.parentNode ? l(e.parentNode) : e;
  }
  function u(e, t) {
    if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
    var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      r = n ? e : t,
      o = n ? t : e,
      i = document.createRange();
    i.setStart(r, 0), i.setEnd(o, 0);
    var a,
      f,
      s = i.commonAncestorContainer;
    if ((e !== s && t !== s) || r.contains(o))
      return "BODY" === (f = (a = s).nodeName) ||
        ("HTML" !== f && p(a.firstElementChild) !== a)
        ? p(s)
        : s;
    var c = l(e);
    return c.host ? u(c.host, t) : u(e, l(t).host);
  }
  function c(e) {
    var t =
        "top" ===
        (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top")
          ? "scrollTop"
          : "scrollLeft",
      n = e.nodeName;
    if ("BODY" === n || "HTML" === n) {
      var r = e.ownerDocument.documentElement;
      return (e.ownerDocument.scrollingElement || r)[t];
    }
    return e[t];
  }
  function d(e, t) {
    var n = "x" === t ? "Left" : "Top",
      r = "Left" === n ? "Right" : "Bottom";
    return (
      parseFloat(e["border" + n + "Width"], 10) +
      parseFloat(e["border" + r + "Width"], 10)
    );
  }
  var h = void 0,
    m = function () {
      return (
        void 0 === h && (h = -1 !== navigator.appVersion.indexOf("MSIE 10")), h
      );
    };
  function g(e, t, n, r) {
    return Math.max(
      t["offset" + e],
      t["scroll" + e],
      n["client" + e],
      n["offset" + e],
      n["scroll" + e],
      m()
        ? n["offset" + e] +
            r["margin" + ("Height" === e ? "Top" : "Left")] +
            r["margin" + ("Height" === e ? "Bottom" : "Right")]
        : 0
    );
  }
  function v() {
    var e = document.body,
      t = document.documentElement,
      n = m() && getComputedStyle(t);
    return { height: g("Height", e, t, n), width: g("Width", e, t, n) };
  }
  var b = (function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })(),
    w = function (e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    },
    y =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
  function E(e) {
    return y({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function O(e) {
    var t = {};
    if (m())
      try {
        t = e.getBoundingClientRect();
        var n = c(e, "top"),
          r = c(e, "left");
        (t.top += n), (t.left += r), (t.bottom += n), (t.right += r);
      } catch (e) {}
    else t = e.getBoundingClientRect();
    var o = {
        left: t.left,
        top: t.top,
        width: t.right - t.left,
        height: t.bottom - t.top,
      },
      i = "HTML" === e.nodeName ? v() : {},
      f = i.width || e.clientWidth || o.right - o.left,
      s = i.height || e.clientHeight || o.bottom - o.top,
      p = e.offsetWidth - f,
      l = e.offsetHeight - s;
    if (p || l) {
      var u = a(e);
      (p -= d(u, "x")), (l -= d(u, "y")), (o.width -= p), (o.height -= l);
    }
    return E(o);
  }
  function x(e, t) {
    var n = m(),
      r = "HTML" === t.nodeName,
      o = O(e),
      i = O(t),
      f = s(e),
      p = a(t),
      l = parseFloat(p.borderTopWidth, 10),
      u = parseFloat(p.borderLeftWidth, 10),
      d = E({
        top: o.top - i.top - l,
        left: o.left - i.left - u,
        width: o.width,
        height: o.height,
      });
    if (((d.marginTop = 0), (d.marginLeft = 0), !n && r)) {
      var h = parseFloat(p.marginTop, 10),
        g = parseFloat(p.marginLeft, 10);
      (d.top -= l - h),
        (d.bottom -= l - h),
        (d.left -= u - g),
        (d.right -= u - g),
        (d.marginTop = h),
        (d.marginLeft = g);
    }
    return (
      (n ? t.contains(f) : t === f && "BODY" !== f.nodeName) &&
        (d = (function (e, t) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = c(t, "top"),
            o = c(t, "left"),
            i = n ? -1 : 1;
          return (
            (e.top += r * i),
            (e.bottom += r * i),
            (e.left += o * i),
            (e.right += o * i),
            e
          );
        })(d, t)),
      d
    );
  }
  function L(e) {
    var t = e.nodeName;
    return (
      "BODY" !== t && "HTML" !== t && ("fixed" === a(e, "position") || L(f(e)))
    );
  }
  function T(e, t, n, r) {
    var o = { top: 0, left: 0 },
      i = u(e, t);
    if ("viewport" === r)
      o = (function (e) {
        var t = e.ownerDocument.documentElement,
          n = x(e, t),
          r = Math.max(t.clientWidth, window.innerWidth || 0),
          o = Math.max(t.clientHeight, window.innerHeight || 0),
          i = c(t),
          a = c(t, "left");
        return E({
          top: i - n.top + n.marginTop,
          left: a - n.left + n.marginLeft,
          width: r,
          height: o,
        });
      })(i);
    else {
      var a = void 0;
      "scrollParent" === r
        ? "BODY" === (a = s(f(t))).nodeName &&
          (a = e.ownerDocument.documentElement)
        : (a = "window" === r ? e.ownerDocument.documentElement : r);
      var p = x(a, i);
      if ("HTML" !== a.nodeName || L(i)) o = p;
      else {
        var l = v(),
          d = l.height,
          h = l.width;
        (o.top += p.top - p.marginTop),
          (o.bottom = d + p.top),
          (o.left += p.left - p.marginLeft),
          (o.right = h + p.left);
      }
    }
    return (o.left += n), (o.top += n), (o.right -= n), (o.bottom -= n), o;
  }
  function D(e, t, n, r, o) {
    var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var a = T(n, r, i, o),
      f = {
        top: { width: a.width, height: t.top - a.top },
        right: { width: a.right - t.right, height: a.height },
        bottom: { width: a.width, height: a.bottom - t.bottom },
        left: { width: t.left - a.left, height: a.height },
      },
      s = Object.keys(f)
        .map(function (e) {
          return y({ key: e }, f[e], {
            area: ((t = f[e]), t.width * t.height),
          });
          var t;
        })
        .sort(function (e, t) {
          return t.area - e.area;
        }),
      p = s.filter(function (e) {
        var t = e.width,
          r = e.height;
        return t >= n.clientWidth && r >= n.clientHeight;
      }),
      l = p.length > 0 ? p[0].key : s[0].key,
      u = e.split("-")[1];
    return l + (u ? "-" + u : "");
  }
  function M(e, t, n) {
    return x(n, u(t, n));
  }
  function N(e) {
    var t = getComputedStyle(e),
      n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      r = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
    return { width: e.offsetWidth + r, height: e.offsetHeight + n };
  }
  function k(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }
  function B(e, t, n) {
    n = n.split("-")[0];
    var r = N(e),
      o = { width: r.width, height: r.height },
      i = -1 !== ["right", "left"].indexOf(n),
      a = i ? "top" : "left",
      f = i ? "left" : "top",
      s = i ? "height" : "width",
      p = i ? "width" : "height";
    return (
      (o[a] = t[a] + t[s] / 2 - r[s] / 2),
      (o[f] = n === f ? t[f] - r[p] : t[k(f)]),
      o
    );
  }
  function H(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function W(e, t, n) {
    return (
      (void 0 === n
        ? e
        : e.slice(
            0,
            (function (e, t, n) {
              if (Array.prototype.findIndex)
                return e.findIndex(function (e) {
                  return e[t] === n;
                });
              var r = H(e, function (e) {
                return e[t] === n;
              });
              return e.indexOf(r);
            })(e, "name", n)
          )
      ).forEach(function (e) {
        e.function &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var n = e.function || e.fn;
        e.enabled &&
          i(n) &&
          ((t.offsets.popper = E(t.offsets.popper)),
          (t.offsets.reference = E(t.offsets.reference)),
          (t = n(t, e)));
      }),
      t
    );
  }
  function A() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (e.offsets.reference = M(this.state, this.popper, this.reference)),
        (e.placement = D(
          this.options.placement,
          e.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (e.originalPlacement = e.placement),
        (e.offsets.popper = B(this.popper, e.offsets.reference, e.placement)),
        (e.offsets.popper.position = "absolute"),
        (e = W(this.modifiers, e)),
        this.state.isCreated
          ? this.options.onUpdate(e)
          : ((this.state.isCreated = !0), this.options.onCreate(e));
    }
  }
  function C(e, t) {
    return e.some(function (e) {
      var n = e.name;
      return e.enabled && n === t;
    });
  }
  function F(e) {
    for (
      var t = [!1, "ms", "Webkit", "Moz", "O"],
        n = e.charAt(0).toUpperCase() + e.slice(1),
        r = 0;
      r < t.length - 1;
      r++
    ) {
      var o = t[r],
        i = o ? "" + o + n : e;
      if (void 0 !== document.body.style[i]) return i;
    }
    return null;
  }
  function P() {
    return (
      (this.state.isDestroyed = !0),
      C(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.left = ""),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style[F("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function S(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function j(e, t, n, r) {
    var o = "BODY" === e.nodeName,
      i = o ? e.ownerDocument.defaultView : e;
    i.addEventListener(t, n, { passive: !0 }),
      o || j(s(i.parentNode), t, n, r),
      r.push(i);
  }
  function R(e, t, n, r) {
    (n.updateBound = r),
      S(e).addEventListener("resize", n.updateBound, { passive: !0 });
    var o = s(e);
    return (
      j(o, "scroll", n.updateBound, n.scrollParents),
      (n.scrollElement = o),
      (n.eventsEnabled = !0),
      n
    );
  }
  function U() {
    this.state.eventsEnabled ||
      (this.state = R(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }
  function Y() {
    var e, t;
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state =
        ((e = this.reference),
        (t = this.state),
        S(e).removeEventListener("resize", t.updateBound),
        t.scrollParents.forEach(function (e) {
          e.removeEventListener("scroll", t.updateBound);
        }),
        (t.updateBound = null),
        (t.scrollParents = []),
        (t.scrollElement = null),
        (t.eventsEnabled = !1),
        t)));
  }
  function I(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function q(e, t) {
    Object.keys(t).forEach(function (n) {
      var r = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) &&
        I(t[n]) &&
        (r = "px"),
        (e.style[n] = t[n] + r);
    });
  }
  function V(e, t, n) {
    var r = H(e, function (e) {
        return e.name === t;
      }),
      o =
        !!r &&
        e.some(function (e) {
          return e.name === n && e.enabled && e.order < r.order;
        });
    if (!o) {
      var i = "`" + t + "`",
        a = "`" + n + "`";
      console.warn(
        a +
          " modifier is required by " +
          i +
          " modifier in order to work, be sure to include it before " +
          i +
          "!"
      );
    }
    return o;
  }
  var z = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    G = z.slice(3);
  function _(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = G.indexOf(e),
      r = G.slice(n + 1).concat(G.slice(0, n));
    return t ? r.reverse() : r;
  }
  var X = "flip",
    J = "clockwise",
    K = "counterclockwise";
  function Q(e, t, n, r) {
    var o = [0, 0],
      i = -1 !== ["right", "left"].indexOf(r),
      a = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      f = a.indexOf(
        H(a, function (e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    a[f] &&
      -1 === a[f].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var s = /\s*,\s*|\s+/,
      p =
        -1 !== f
          ? [
              a.slice(0, f).concat([a[f].split(s)[0]]),
              [a[f].split(s)[1]].concat(a.slice(f + 1)),
            ]
          : [a];
    return (
      (p = p.map(function (e, r) {
        var o = (1 === r ? !i : i) ? "height" : "width",
          a = !1;
        return e
          .reduce(function (e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
              ? ((e[e.length - 1] = t), (a = !0), e)
              : a
              ? ((e[e.length - 1] += t), (a = !1), e)
              : e.concat(t);
          }, [])
          .map(function (e) {
            return (function (e, t, n, r) {
              var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                i = +o[1],
                a = o[2];
              if (!i) return e;
              if (0 === a.indexOf("%")) {
                return (E("%p" === a ? n : r)[t] / 100) * i;
              }
              if ("vh" === a || "vw" === a)
                return (
                  (("vh" === a
                    ? Math.max(
                        document.documentElement.clientHeight,
                        window.innerHeight || 0
                      )
                    : Math.max(
                        document.documentElement.clientWidth,
                        window.innerWidth || 0
                      )) /
                    100) *
                  i
                );
              return i;
            })(e, o, t, n);
          });
      })),
      p.forEach(function (e, t) {
        e.forEach(function (n, r) {
          I(n) && (o[t] += n * ("-" === e[r - 1] ? -1 : 1));
        });
      }),
      o
    );
  }
  var Z = {
      shift: {
        order: 100,
        enabled: !0,
        fn: function (e) {
          var t = e.placement,
            n = t.split("-")[0],
            r = t.split("-")[1];
          if (r) {
            var o = e.offsets,
              i = o.reference,
              a = o.popper,
              f = -1 !== ["bottom", "top"].indexOf(n),
              s = f ? "left" : "top",
              p = f ? "width" : "height",
              l = { start: w({}, s, i[s]), end: w({}, s, i[s] + i[p] - a[p]) };
            e.offsets.popper = y({}, a, l[r]);
          }
          return e;
        },
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: function (e, t) {
          var n = t.offset,
            r = e.placement,
            o = e.offsets,
            i = o.popper,
            a = o.reference,
            f = r.split("-")[0],
            s = void 0;
          return (
            (s = I(+n) ? [+n, 0] : Q(n, i, a, f)),
            "left" === f
              ? ((i.top += s[0]), (i.left -= s[1]))
              : "right" === f
              ? ((i.top += s[0]), (i.left += s[1]))
              : "top" === f
              ? ((i.left += s[0]), (i.top -= s[1]))
              : "bottom" === f && ((i.left += s[0]), (i.top += s[1])),
            (e.popper = i),
            e
          );
        },
        offset: 0,
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function (e, t) {
          var n = t.boundariesElement || p(e.instance.popper);
          e.instance.reference === n && (n = p(n));
          var r = T(e.instance.popper, e.instance.reference, t.padding, n);
          t.boundaries = r;
          var o = t.priority,
            i = e.offsets.popper,
            a = {
              primary: function (e) {
                var n = i[e];
                return (
                  i[e] < r[e] &&
                    !t.escapeWithReference &&
                    (n = Math.max(i[e], r[e])),
                  w({}, e, n)
                );
              },
              secondary: function (e) {
                var n = "right" === e ? "left" : "top",
                  o = i[n];
                return (
                  i[e] > r[e] &&
                    !t.escapeWithReference &&
                    (o = Math.min(
                      i[n],
                      r[e] - ("right" === e ? i.width : i.height)
                    )),
                  w({}, n, o)
                );
              },
            };
          return (
            o.forEach(function (e) {
              var t =
                -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
              i = y({}, i, a[t](e));
            }),
            (e.offsets.popper = i),
            e
          );
        },
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent",
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function (e) {
          var t = e.offsets,
            n = t.popper,
            r = t.reference,
            o = e.placement.split("-")[0],
            i = Math.floor,
            a = -1 !== ["top", "bottom"].indexOf(o),
            f = a ? "right" : "bottom",
            s = a ? "left" : "top",
            p = a ? "width" : "height";
          return (
            n[f] < i(r[s]) && (e.offsets.popper[s] = i(r[s]) - n[p]),
            n[s] > i(r[f]) && (e.offsets.popper[s] = i(r[f])),
            e
          );
        },
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function (e, t) {
          var n;
          if (!V(e.instance.modifiers, "arrow", "keepTogether")) return e;
          var r = t.element;
          if ("string" == typeof r) {
            if (!(r = e.instance.popper.querySelector(r))) return e;
          } else if (!e.instance.popper.contains(r))
            return (
              console.warn(
                "WARNING: `arrow.element` must be child of its popper element!"
              ),
              e
            );
          var o = e.placement.split("-")[0],
            i = e.offsets,
            f = i.popper,
            s = i.reference,
            p = -1 !== ["left", "right"].indexOf(o),
            l = p ? "height" : "width",
            u = p ? "Top" : "Left",
            c = u.toLowerCase(),
            d = p ? "left" : "top",
            h = p ? "bottom" : "right",
            m = N(r)[l];
          s[h] - m < f[c] && (e.offsets.popper[c] -= f[c] - (s[h] - m)),
            s[c] + m > f[h] && (e.offsets.popper[c] += s[c] + m - f[h]),
            (e.offsets.popper = E(e.offsets.popper));
          var g = s[c] + s[l] / 2 - m / 2,
            v = a(e.instance.popper),
            b = parseFloat(v["margin" + u], 10),
            y = parseFloat(v["border" + u + "Width"], 10),
            O = g - e.offsets.popper[c] - b - y;
          return (
            (O = Math.max(Math.min(f[l] - m, O), 0)),
            (e.arrowElement = r),
            (e.offsets.arrow = (w((n = {}), c, Math.round(O)), w(n, d, ""), n)),
            e
          );
        },
        element: "[x-arrow]",
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function (e, t) {
          if (C(e.instance.modifiers, "inner")) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var n = T(
              e.instance.popper,
              e.instance.reference,
              t.padding,
              t.boundariesElement
            ),
            r = e.placement.split("-")[0],
            o = k(r),
            i = e.placement.split("-")[1] || "",
            a = [];
          switch (t.behavior) {
            case X:
              a = [r, o];
              break;
            case J:
              a = _(r);
              break;
            case K:
              a = _(r, !0);
              break;
            default:
              a = t.behavior;
          }
          return (
            a.forEach(function (f, s) {
              if (r !== f || a.length === s + 1) return e;
              (r = e.placement.split("-")[0]), (o = k(r));
              var p = e.offsets.popper,
                l = e.offsets.reference,
                u = Math.floor,
                c =
                  ("left" === r && u(p.right) > u(l.left)) ||
                  ("right" === r && u(p.left) < u(l.right)) ||
                  ("top" === r && u(p.bottom) > u(l.top)) ||
                  ("bottom" === r && u(p.top) < u(l.bottom)),
                d = u(p.left) < u(n.left),
                h = u(p.right) > u(n.right),
                m = u(p.top) < u(n.top),
                g = u(p.bottom) > u(n.bottom),
                v =
                  ("left" === r && d) ||
                  ("right" === r && h) ||
                  ("top" === r && m) ||
                  ("bottom" === r && g),
                b = -1 !== ["top", "bottom"].indexOf(r),
                w =
                  !!t.flipVariations &&
                  ((b && "start" === i && d) ||
                    (b && "end" === i && h) ||
                    (!b && "start" === i && m) ||
                    (!b && "end" === i && g));
              (c || v || w) &&
                ((e.flipped = !0),
                (c || v) && (r = a[s + 1]),
                w &&
                  (i = (function (e) {
                    return "end" === e ? "start" : "start" === e ? "end" : e;
                  })(i)),
                (e.placement = r + (i ? "-" + i : "")),
                (e.offsets.popper = y(
                  {},
                  e.offsets.popper,
                  B(e.instance.popper, e.offsets.reference, e.placement)
                )),
                (e = W(e.instance.modifiers, e, "flip")));
            }),
            e
          );
        },
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport",
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function (e) {
          var t = e.placement,
            n = t.split("-")[0],
            r = e.offsets,
            o = r.popper,
            i = r.reference,
            a = -1 !== ["left", "right"].indexOf(n),
            f = -1 === ["top", "left"].indexOf(n);
          return (
            (o[a ? "left" : "top"] =
              i[n] - (f ? o[a ? "width" : "height"] : 0)),
            (e.placement = k(t)),
            (e.offsets.popper = E(o)),
            e
          );
        },
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function (e) {
          if (!V(e.instance.modifiers, "hide", "preventOverflow")) return e;
          var t = e.offsets.reference,
            n = H(e.instance.modifiers, function (e) {
              return "preventOverflow" === e.name;
            }).boundaries;
          if (
            t.bottom < n.top ||
            t.left > n.right ||
            t.top > n.bottom ||
            t.right < n.left
          ) {
            if (!0 === e.hide) return e;
            (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
          } else {
            if (!1 === e.hide) return e;
            (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
          }
          return e;
        },
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function (e, t) {
          var n = t.x,
            r = t.y,
            o = e.offsets.popper,
            i = H(e.instance.modifiers, function (e) {
              return "applyStyle" === e.name;
            }).gpuAcceleration;
          void 0 !== i &&
            console.warn(
              "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
            );
          var a = void 0 !== i ? i : t.gpuAcceleration,
            f = O(p(e.instance.popper)),
            s = { position: o.position },
            l = {
              left: Math.floor(o.left),
              top: Math.floor(o.top),
              bottom: Math.floor(o.bottom),
              right: Math.floor(o.right),
            },
            u = "bottom" === n ? "top" : "bottom",
            c = "right" === r ? "left" : "right",
            d = F("transform"),
            h = void 0,
            m = void 0;
          if (
            ((m = "bottom" === u ? -f.height + l.bottom : l.top),
            (h = "right" === c ? -f.width + l.right : l.left),
            a && d)
          )
            (s[d] = "translate3d(" + h + "px, " + m + "px, 0)"),
              (s[u] = 0),
              (s[c] = 0),
              (s.willChange = "transform");
          else {
            var g = "bottom" === u ? -1 : 1,
              v = "right" === c ? -1 : 1;
            (s[u] = m * g), (s[c] = h * v), (s.willChange = u + ", " + c);
          }
          var b = { "x-placement": e.placement };
          return (
            (e.attributes = y({}, b, e.attributes)),
            (e.styles = y({}, s, e.styles)),
            (e.arrowStyles = y({}, e.offsets.arrow, e.arrowStyles)),
            e
          );
        },
        gpuAcceleration: !0,
        x: "bottom",
        y: "right",
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function (e) {
          var t, n;
          return (
            q(e.instance.popper, e.styles),
            (t = e.instance.popper),
            (n = e.attributes),
            Object.keys(n).forEach(function (e) {
              !1 !== n[e] ? t.setAttribute(e, n[e]) : t.removeAttribute(e);
            }),
            e.arrowElement &&
              Object.keys(e.arrowStyles).length &&
              q(e.arrowElement, e.arrowStyles),
            e
          );
        },
        onLoad: function (e, t, n, r, o) {
          var i = M(0, t, e),
            a = D(
              n.placement,
              i,
              t,
              e,
              n.modifiers.flip.boundariesElement,
              n.modifiers.flip.padding
            );
          return (
            t.setAttribute("x-placement", a), q(t, { position: "absolute" }), n
          );
        },
        gpuAcceleration: void 0,
      },
    },
    $ = {
      placement: "bottom",
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: Z,
    },
    ee = (function () {
      function e(t, n) {
        var r = this,
          a =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(r.update);
          }),
          (this.update = o(this.update.bind(this))),
          (this.options = y({}, e.Defaults, a)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = t && t.jquery ? t[0] : t),
          (this.popper = n && n.jquery ? n[0] : n),
          (this.options.modifiers = {}),
          Object.keys(y({}, e.Defaults.modifiers, a.modifiers)).forEach(
            function (t) {
              r.options.modifiers[t] = y(
                {},
                e.Defaults.modifiers[t] || {},
                a.modifiers ? a.modifiers[t] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (e) {
              return y({ name: e }, r.options.modifiers[e]);
            })
            .sort(function (e, t) {
              return e.order - t.order;
            })),
          this.modifiers.forEach(function (e) {
            e.enabled &&
              i(e.onLoad) &&
              e.onLoad(r.reference, r.popper, r.options, e, r.state);
          }),
          this.update();
        var f = this.options.eventsEnabled;
        f && this.enableEventListeners(), (this.state.eventsEnabled = f);
      }
      return (
        b(e, [
          {
            key: "update",
            value: function () {
              return A.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return P.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return U.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return Y.call(this);
            },
          },
        ]),
        e
      );
    })();
  return (
    (ee.Utils = ("undefined" != typeof window ? window : global).PopperUtils),
    (ee.placements = z),
    (ee.Defaults = $),
    ee
  );
});
