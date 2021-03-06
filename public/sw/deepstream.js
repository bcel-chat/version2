/*! deepstream.io-client-js 2.3.3 (c)2019 deepstreamHub GmbH, with parts (c)2019 Joyent and contributers  @licence Apache-2.0*/

! function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof self ? self : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).deepstream = t()
    }
}(function () {
    return function r(o, a, c) {
        function h(i, t) {
            if (!a[i]) {
                if (!o[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (u) return u(i, !0);
                    var n = new Error("Cannot find module '" + i + "'");
                    throw n.code = "MODULE_NOT_FOUND", n
                }
                var s = a[i] = {
                    exports: {}
                };
                o[i][0].call(s.exports, function (t) {
                    var e = o[i][1][t];
                    return h(e || t)
                }, s, s.exports, r, o, a, c)
            }
            return a[i].exports
        }
        for (var u = "function" == typeof require && require, t = 0; t < c.length; t++) h(c[t]);
        return h
    }({
        1: [function (t, e, i) {
            function n(t) {
                if (t) return function (t) {
                    for (var e in n.prototype) t[e] = n.prototype[e];
                    return t
                }(t)
            }
            void 0 !== e && (e.exports = n), n.prototype.on = n.prototype.addEventListener = function (t, e) {
                return this._callbacks = this._callbacks || Object.create(null), (this._callbacks[t] = this._callbacks[t] || []).push(e), this
            }, n.prototype.once = function (t, e) {
                function i() {
                    this.off(t, i), e.apply(this, arguments)
                }
                return i.fn = e, this.on(t, i), this
            }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (t, e) {
                if (this._callbacks = this._callbacks || Object.create(null), 0 == arguments.length) return this._callbacks = Object.create(null), this;
                var i, n = this._callbacks[t];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks[t], this;
                for (var s = 0; s < n.length; s++)
                    if ((i = n[s]) === e || i.fn === e) {
                        n.splice(s, 1);
                        break
                    } return 0 === n.length && delete this._callbacks[t], this
            }, n.prototype.emit = function (t) {
                this._callbacks = this._callbacks || Object.create(null);
                for (var e = new Array(arguments.length - 1), i = this._callbacks[t], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                if (i) {
                    n = 0;
                    for (var s = (i = i.slice(0)).length; n < s; ++n) i[n].apply(this, e)
                }
                return this
            }, n.prototype.listeners = function (t) {
                return this._callbacks = this._callbacks || Object.create(null), this._callbacks[t] || []
            }, n.prototype.hasListeners = function (t) {
                return !!this.listeners(t).length
            }, n.prototype.eventNames = function () {
                return this._callbacks ? Object.keys(this._callbacks) : []
            }
        }, {}],
        2: [function (t, e, i) {}, {}],
        3: [function (t, e, i) {
            var n, s, r = e.exports = {};

            function o() {
                throw new Error("setTimeout has not been defined")
            }

            function a() {
                throw new Error("clearTimeout has not been defined")
            }

            function c(e) {
                if (n === setTimeout) return setTimeout(e, 0);
                if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
                try {
                    return n(e, 0)
                } catch (t) {
                    try {
                        return n.call(null, e, 0)
                    } catch (t) {
                        return n.call(this, e, 0)
                    }
                }
            }! function () {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : o
                } catch (t) {
                    n = o
                }
                try {
                    s = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (t) {
                    s = a
                }
            }();
            var h, u = [],
                l = !1,
                d = -1;

            function p() {
                l && h && (l = !1, h.length ? u = h.concat(u) : d = -1, u.length && _())
            }

            function _() {
                if (!l) {
                    var t = c(p);
                    l = !0;
                    for (var e = u.length; e;) {
                        for (h = u, u = []; ++d < e;) h && h[d].run();
                        d = -1, e = u.length
                    }
                    h = null, l = !1,
                        function (e) {
                            if (s === clearTimeout) return clearTimeout(e);
                            if ((s === a || !s) && clearTimeout) return s = clearTimeout, clearTimeout(e);
                            try {
                                s(e)
                            } catch (t) {
                                try {
                                    return s.call(null, e)
                                } catch (t) {
                                    return s.call(this, e)
                                }
                            }
                        }(t)
                }
            }

            function E(t, e) {
                this.fun = t, this.array = e
            }

            function f() {}
            r.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (1 < arguments.length)
                    for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
                u.push(new E(t, e)), 1 !== u.length || l || c(_)
            }, E.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = f, r.addListener = f, r.once = f, r.off = f, r.removeListener = f, r.removeAllListeners = f, r.emit = f, r.prependListener = f, r.prependOnceListener = f, r.listeners = function (t) {
                return []
            }, r.binding = function (t) {
                throw new Error("process.binding is not supported")
            }, r.cwd = function () {
                return "/"
            }, r.chdir = function (t) {
                throw new Error("process.chdir is not supported")
            }, r.umask = function () {
                return 0
            }
        }, {}],
        4: [function (t, w, U) {
            (function (k) {
                ! function (t) {
                    var e = "object" == typeof U && U && !U.nodeType && U,
                        i = "object" == typeof w && w && !w.nodeType && w,
                        n = "object" == typeof k && k;
                    n.global !== n && n.self !== n && n.self !== n || (t = n);
                    var s, r, T = 2147483647,
                        m = 36,
                        C = 1,
                        N = 26,
                        o = 38,
                        a = 700,
                        S = 72,
                        y = 128,
                        O = "-",
                        c = /^xn--/,
                        h = /[^\x20-\x7E]/,
                        u = /[\x2E\u3002\uFF0E\uFF61]/g,
                        l = {
                            overflow: "Overflow: input needs wider integers to process",
                            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                            "invalid-input": "Invalid input"
                        },
                        d = m - C,
                        I = Math.floor,
                        g = String.fromCharCode;

                    function R(t) {
                        throw new RangeError(l[t])
                    }

                    function p(t, e) {
                        for (var i = t.length, n = []; i--;) n[i] = e(t[i]);
                        return n
                    }

                    function _(t, e) {
                        var i = t.split("@"),
                            n = "";
                        return 1 < i.length && (n = i[0] + "@", t = i[1]), n + p((t = t.replace(u, ".")).split("."), e).join(".")
                    }

                    function A(t) {
                        for (var e, i, n = [], s = 0, r = t.length; s < r;) 55296 <= (e = t.charCodeAt(s++)) && e <= 56319 && s < r ? 56320 == (64512 & (i = t.charCodeAt(s++))) ? n.push(((1023 & e) << 10) + (1023 & i) + 65536) : (n.push(e), s--) : n.push(e);
                        return n
                    }

                    function v(t) {
                        return p(t, function (t) {
                            var e = "";
                            return 65535 < t && (e += g((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += g(t)
                        }).join("")
                    }

                    function b(t, e) {
                        return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
                    }

                    function P(t, e, i) {
                        var n = 0;
                        for (t = i ? I(t / a) : t >> 1, t += I(t / e); d * N >> 1 < t; n += m) t = I(t / d);
                        return I(n + (d + 1) * t / (t + o))
                    }

                    function E(t) {
                        var e, i, n, s, r, o, a, c, h, u, l, d = [],
                            p = t.length,
                            _ = 0,
                            E = y,
                            f = S;
                        for ((i = t.lastIndexOf(O)) < 0 && (i = 0), n = 0; n < i; ++n) 128 <= t.charCodeAt(n) && R("not-basic"), d.push(t.charCodeAt(n));
                        for (s = 0 < i ? i + 1 : 0; s < p;) {
                            for (r = _, o = 1, a = m; p <= s && R("invalid-input"), l = t.charCodeAt(s++), (m <= (c = l - 48 < 10 ? l - 22 : l - 65 < 26 ? l - 65 : l - 97 < 26 ? l - 97 : m) || c > I((T - _) / o)) && R("overflow"), _ += c * o, !(c < (h = a <= f ? C : f + N <= a ? N : a - f)); a += m) o > I(T / (u = m - h)) && R("overflow"), o *= u;
                            f = P(_ - r, e = d.length + 1, 0 == r), I(_ / e) > T - E && R("overflow"), E += I(_ / e), _ %= e, d.splice(_++, 0, E)
                        }
                        return v(d)
                    }

                    function f(t) {
                        var e, i, n, s, r, o, a, c, h, u, l, d, p, _, E, f = [];
                        for (d = (t = A(t)).length, e = y, r = S, o = i = 0; o < d; ++o)(l = t[o]) < 128 && f.push(g(l));
                        for (n = s = f.length, s && f.push(O); n < d;) {
                            for (a = T, o = 0; o < d; ++o) e <= (l = t[o]) && l < a && (a = l);
                            for (a - e > I((T - i) / (p = n + 1)) && R("overflow"), i += (a - e) * p, e = a, o = 0; o < d; ++o)
                                if ((l = t[o]) < e && ++i > T && R("overflow"), l == e) {
                                    for (c = i, h = m; !(c < (u = h <= r ? C : r + N <= h ? N : h - r)); h += m) E = c - u, _ = m - u, f.push(g(b(u + E % _, 0))), c = I(E / _);
                                    f.push(g(b(c, 0))), r = P(i, p, n == s), i = 0, ++n
                                }++ i, ++e
                        }
                        return f.join("")
                    }
                    if (s = {
                            version: "1.4.1",
                            ucs2: {
                                decode: A,
                                encode: v
                            },
                            decode: E,
                            encode: f,
                            toASCII: function (t) {
                                return _(t, function (t) {
                                    return h.test(t) ? "xn--" + f(t) : t
                                })
                            },
                            toUnicode: function (t) {
                                return _(t, function (t) {
                                    return c.test(t) ? E(t.slice(4).toLowerCase()) : t
                                })
                            }
                        }, e && i)
                        if (w.exports == e) i.exports = s;
                        else
                            for (r in s) s.hasOwnProperty(r) && (e[r] = s[r]);
                    else t.punycode = s
                }(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof self ? self : {})
        }, {}],
        5: [function (t, e, i) {
            "use strict";
            e.exports = function (t, e, i, n) {
                e = e || "&", i = i || "=";
                var s = {};
                if ("string" != typeof t || 0 === t.length) return s;
                var r = /\+/g;
                t = t.split(e);
                var o = 1e3;
                n && "number" == typeof n.maxKeys && (o = n.maxKeys);
                var a, c, h = t.length;
                0 < o && o < h && (h = o);
                for (var u = 0; u < h; ++u) {
                    var l, d, p, _, E = t[u].replace(r, "%20"),
                        f = E.indexOf(i);
                    0 <= f ? (l = E.substr(0, f), d = E.substr(f + 1)) : (l = E, d = ""), p = decodeURIComponent(l), _ = decodeURIComponent(d), a = s, c = p, Object.prototype.hasOwnProperty.call(a, c) ? T(s[p]) ? s[p].push(_) : s[p] = [s[p], _] : s[p] = _
                }
                return s
            };
            var T = Array.isArray || function (t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
        }, {}],
        6: [function (t, e, i) {
            "use strict";
            var r = function (t) {
                switch (typeof t) {
                    case "string":
                        return t;
                    case "boolean":
                        return t ? "true" : "false";
                    case "number":
                        return isFinite(t) ? t : "";
                    default:
                        return ""
                }
            };
            e.exports = function (i, n, s, t) {
                return n = n || "&", s = s || "=", null === i && (i = void 0), "object" == typeof i ? a(c(i), function (t) {
                    var e = encodeURIComponent(r(t)) + s;
                    return o(i[t]) ? a(i[t], function (t) {
                        return e + encodeURIComponent(r(t))
                    }).join(n) : e + encodeURIComponent(r(i[t]))
                }).join(n) : t ? encodeURIComponent(r(t)) + s + encodeURIComponent(r(i)) : ""
            };
            var o = Array.isArray || function (t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            };

            function a(t, e) {
                if (t.map) return t.map(e);
                for (var i = [], n = 0; n < t.length; n++) i.push(e(t[n], n));
                return i
            }
            var c = Object.keys || function (t) {
                var e = [];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.push(i);
                return e
            }
        }, {}],
        7: [function (t, e, i) {
            "use strict";
            i.decode = i.parse = t("./decode"), i.encode = i.stringify = t("./encode")
        }, {
            "./decode": 5,
            "./encode": 6
        }],
        8: [function (t, e, i) {
            "use strict";
            var U = t("punycode"),
                D = t("./util");

            function A() {
                this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
            }
            i.parse = r, i.resolve = function (t, e) {
                return r(t, !1, !0).resolve(e)
            }, i.resolveObject = function (t, e) {
                return t ? r(t, !1, !0).resolveObject(e) : e
            }, i.format = function (t) {
                D.isString(t) && (t = r(t));
                return t instanceof A ? t.format() : A.prototype.format.call(t)
            }, i.Url = A;
            var M = /^([a-z0-9.+-]+:)/i,
                n = /:[0-9]*$/,
                L = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
                s = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
                V = ["'"].concat(s),
                B = ["%", "/", "?", ";", "#"].concat(V),
                x = ["/", "?", "#"],
                j = /^[+a-z0-9A-Z_-]{0,63}$/,
                H = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                G = {
                    javascript: !0,
                    "javascript:": !0
                },
                q = {
                    javascript: !0,
                    "javascript:": !0
                },
                $ = {
                    http: !0,
                    https: !0,
                    ftp: !0,
                    gopher: !0,
                    file: !0,
                    "http:": !0,
                    "https:": !0,
                    "ftp:": !0,
                    "gopher:": !0,
                    "file:": !0
                },
                Y = t("querystring");

            function r(t, e, i) {
                if (t && D.isObject(t) && t instanceof A) return t;
                var n = new A;
                return n.parse(t, e, i), n
            }
            A.prototype.parse = function (t, e, i) {
                if (!D.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                var n = t.indexOf("?"),
                    s = -1 !== n && n < t.indexOf("#") ? "?" : "#",
                    r = t.split(s);
                r[0] = r[0].replace(/\\/g, "/");
                var o = t = r.join(s);
                if (o = o.trim(), !i && 1 === t.split("#").length) {
                    var a = L.exec(o);
                    if (a) return this.path = o, this.href = o, this.pathname = a[1], a[2] ? (this.search = a[2], this.query = e ? Y.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this
                }
                var c = M.exec(o);
                if (c) {
                    var h = (c = c[0]).toLowerCase();
                    this.protocol = h, o = o.substr(c.length)
                }
                if (i || c || o.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var u = "//" === o.substr(0, 2);
                    !u || c && q[c] || (o = o.substr(2), this.slashes = !0)
                }
                if (!q[c] && (u || c && !$[c])) {
                    for (var l, d, p = -1, _ = 0; _ < x.length; _++) {
                        -1 !== (E = o.indexOf(x[_])) && (-1 === p || E < p) && (p = E)
                    } - 1 !== (d = -1 === p ? o.lastIndexOf("@") : o.lastIndexOf("@", p)) && (l = o.slice(0, d), o = o.slice(d + 1), this.auth = decodeURIComponent(l)), p = -1;
                    for (_ = 0; _ < B.length; _++) {
                        var E; - 1 !== (E = o.indexOf(B[_])) && (-1 === p || E < p) && (p = E)
                    } - 1 === p && (p = o.length), this.host = o.slice(0, p), o = o.slice(p), this.parseHost(), this.hostname = this.hostname || "";
                    var f = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!f)
                        for (var T = this.hostname.split(/\./), m = (_ = 0, T.length); _ < m; _++) {
                            var C = T[_];
                            if (C && !C.match(j)) {
                                for (var N = "", S = 0, y = C.length; S < y; S++) 127 < C.charCodeAt(S) ? N += "x" : N += C[S];
                                if (!N.match(j)) {
                                    var O = T.slice(0, _),
                                        I = T.slice(_ + 1),
                                        g = C.match(H);
                                    g && (O.push(g[1]), I.unshift(g[2])), I.length && (o = "/" + I.join(".") + o), this.hostname = O.join(".");
                                    break
                                }
                            }
                        }
                    255 < this.hostname.length ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), f || (this.hostname = U.toASCII(this.hostname));
                    var R = this.port ? ":" + this.port : "",
                        A = this.hostname || "";
                    this.host = A + R, this.href += this.host, f && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== o[0] && (o = "/" + o))
                }
                if (!G[h])
                    for (_ = 0, m = V.length; _ < m; _++) {
                        var v = V[_];
                        if (-1 !== o.indexOf(v)) {
                            var b = encodeURIComponent(v);
                            b === v && (b = escape(v)), o = o.split(v).join(b)
                        }
                    }
                var P = o.indexOf("#"); - 1 !== P && (this.hash = o.substr(P), o = o.slice(0, P));
                var k = o.indexOf("?");
                if (-1 !== k ? (this.search = o.substr(k), this.query = o.substr(k + 1), e && (this.query = Y.parse(this.query)), o = o.slice(0, k)) : e && (this.search = "", this.query = {}), o && (this.pathname = o), $[h] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                    R = this.pathname || "";
                    var w = this.search || "";
                    this.path = R + w
                }
                return this.href = this.format(), this
            }, A.prototype.format = function () {
                var t = this.auth || "";
                t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
                var e = this.protocol || "",
                    i = this.pathname || "",
                    n = this.hash || "",
                    s = !1,
                    r = "";
                this.host ? s = t + this.host : this.hostname && (s = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (s += ":" + this.port)), this.query && D.isObject(this.query) && Object.keys(this.query).length && (r = Y.stringify(this.query));
                var o = this.search || r && "?" + r || "";
                return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || $[e]) && !1 !== s ? (s = "//" + (s || ""), i && "/" !== i.charAt(0) && (i = "/" + i)) : s || (s = ""), n && "#" !== n.charAt(0) && (n = "#" + n), o && "?" !== o.charAt(0) && (o = "?" + o), e + s + (i = i.replace(/[?#]/g, function (t) {
                    return encodeURIComponent(t)
                })) + (o = o.replace("#", "%23")) + n
            }, A.prototype.resolve = function (t) {
                return this.resolveObject(r(t, !1, !0)).format()
            }, A.prototype.resolveObject = function (t) {
                if (D.isString(t)) {
                    var e = new A;
                    e.parse(t, !1, !0), t = e
                }
                for (var i = new A, n = Object.keys(this), s = 0; s < n.length; s++) {
                    var r = n[s];
                    i[r] = this[r]
                }
                if (i.hash = t.hash, "" === t.href) return i.href = i.format(), i;
                if (t.slashes && !t.protocol) {
                    for (var o = Object.keys(t), a = 0; a < o.length; a++) {
                        var c = o[a];
                        "protocol" !== c && (i[c] = t[c])
                    }
                    return $[i.protocol] && i.hostname && !i.pathname && (i.path = i.pathname = "/"), i.href = i.format(), i
                }
                if (t.protocol && t.protocol !== i.protocol) {
                    if (!$[t.protocol]) {
                        for (var h = Object.keys(t), u = 0; u < h.length; u++) {
                            var l = h[u];
                            i[l] = t[l]
                        }
                        return i.href = i.format(), i
                    }
                    if (i.protocol = t.protocol, t.host || q[t.protocol]) i.pathname = t.pathname;
                    else {
                        for (var d = (t.pathname || "").split("/"); d.length && !(t.host = d.shift()););
                        t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), i.pathname = d.join("/")
                    }
                    if (i.search = t.search, i.query = t.query, i.host = t.host || "", i.auth = t.auth, i.hostname = t.hostname || t.host, i.port = t.port, i.pathname || i.search) {
                        var p = i.pathname || "",
                            _ = i.search || "";
                        i.path = p + _
                    }
                    return i.slashes = i.slashes || t.slashes, i.href = i.format(), i
                }
                var E = i.pathname && "/" === i.pathname.charAt(0),
                    f = t.host || t.pathname && "/" === t.pathname.charAt(0),
                    T = f || E || i.host && t.pathname,
                    m = T,
                    C = i.pathname && i.pathname.split("/") || [],
                    N = (d = t.pathname && t.pathname.split("/") || [], i.protocol && !$[i.protocol]);
                if (N && (i.hostname = "", i.port = null, i.host && ("" === C[0] ? C[0] = i.host : C.unshift(i.host)), i.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === d[0] ? d[0] = t.host : d.unshift(t.host)), t.host = null), T = T && ("" === d[0] || "" === C[0])), f) i.host = t.host || "" === t.host ? t.host : i.host, i.hostname = t.hostname || "" === t.hostname ? t.hostname : i.hostname, i.search = t.search, i.query = t.query, C = d;
                else if (d.length) C || (C = []), C.pop(), C = C.concat(d), i.search = t.search, i.query = t.query;
                else if (!D.isNullOrUndefined(t.search)) {
                    if (N) i.hostname = i.host = C.shift(), (g = !!(i.host && 0 < i.host.indexOf("@")) && i.host.split("@")) && (i.auth = g.shift(), i.host = i.hostname = g.shift());
                    return i.search = t.search, i.query = t.query, D.isNull(i.pathname) && D.isNull(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.href = i.format(), i
                }
                if (!C.length) return i.pathname = null, i.search ? i.path = "/" + i.search : i.path = null, i.href = i.format(), i;
                for (var S = C.slice(-1)[0], y = (i.host || t.host || 1 < C.length) && ("." === S || ".." === S) || "" === S, O = 0, I = C.length; 0 <= I; I--) "." === (S = C[I]) ? C.splice(I, 1) : ".." === S ? (C.splice(I, 1), O++) : O && (C.splice(I, 1), O--);
                if (!T && !m)
                    for (; O--; O) C.unshift("..");
                !T || "" === C[0] || C[0] && "/" === C[0].charAt(0) || C.unshift(""), y && "/" !== C.join("/").substr(-1) && C.push("");
                var g, R = "" === C[0] || C[0] && "/" === C[0].charAt(0);
                N && (i.hostname = i.host = R ? "" : C.length ? C.shift() : "", (g = !!(i.host && 0 < i.host.indexOf("@")) && i.host.split("@")) && (i.auth = g.shift(), i.host = i.hostname = g.shift()));
                return (T = T || i.host && C.length) && !R && C.unshift(""), C.length ? i.pathname = C.join("/") : (i.pathname = null, i.path = null), D.isNull(i.pathname) && D.isNull(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.auth = t.auth || i.auth, i.slashes = i.slashes || t.slashes, i.href = i.format(), i
            }, A.prototype.parseHost = function () {
                var t = this.host,
                    e = n.exec(t);
                e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
            }
        }, {
            "./util": 9,
            punycode: 4,
            querystring: 7
        }],
        9: [function (t, e, i) {
            "use strict";
            e.exports = {
                isString: function (t) {
                    return "string" == typeof t
                },
                isObject: function (t) {
                    return "object" == typeof t && null !== t
                },
                isNull: function (t) {
                    return null === t
                },
                isNullOrUndefined: function (t) {
                    return null == t
                }
            }
        }, {}],
        10: [function (t, e, i) {
            "use strict";
            var s = t("./constants/constants"),
                n = t("./constants/merge-strategies"),
                r = t("component-emitter2"),
                o = t("./message/connection"),
                a = t("./event/event-handler"),
                c = t("./rpc/rpc-handler"),
                h = t("./record/record-handler"),
                u = t("./presence/presence-handler"),
                l = t("./default-options"),
                d = t("./utils/ack-timeout-registry"),
                p = function (t, e) {
                    this._url = t, this._options = this._getOptions(e || {}), this._connection = new o(this, this._url, this._options), this._ackTimeoutRegistry = new d(this, this._options), this.event = new a(this._options, this._connection, this), this.rpc = new c(this._options, this._connection, this), this.record = new h(this._options, this._connection, this), this.presence = new u(this._options, this._connection, this), this._messageCallbacks = {}, this._messageCallbacks[s.TOPIC.EVENT] = this.event._$handle.bind(this.event), this._messageCallbacks[s.TOPIC.RPC] = this.rpc._$handle.bind(this.rpc), this._messageCallbacks[s.TOPIC.RECORD] = this.record._$handle.bind(this.record), this._messageCallbacks[s.TOPIC.PRESENCE] = this.presence._$handle.bind(this.presence), this._messageCallbacks[s.TOPIC.ERROR] = this._onErrorMessage.bind(this), e && e.silentDeprecation || console.log("deepstream V3 is in maintenance mode\n  It's heavily recommended you try out V4 (@deepstream/client)\n  You can see the changlogs here https://deepstream.io/releases/client-js/v4-0-0/\n  It's currently in RC due to work required on website and binaries, however as far as\n  functionality goes its on par + some with V3 and resolves many of the issues in V3.\n  To silence this warning just pass in a silentDeprecation flag in options.\n  Example: deepstream(url, { silentDeprecation: true })\n\n  IF YOU ARE INSTALLING VIA GITHUB AND NOT NPM PLEASE USE THE V3 BRANCH AS MASTER WILL \n  SWITCH TO V4 END OF MONTH!\n")
                };

            function _(t, e) {
                return new p(t, e)
            }
            r(p.prototype), p.prototype.login = function (t, e) {
                return "function" == typeof t ? this._connection.authenticate({}, t) : this._connection.authenticate(t || {}, e), this
            }, p.prototype.loginAsync = function (t) {
                var e = this;
                return new Promise(function (i, n) {
                    e._connection.authenticate(t || {}, function (t, e) {
                        t ? i(e) : n(e)
                    })
                })
            }, p.prototype.close = function () {
                this._connection.close()
            }, p.prototype.getConnectionState = function () {
                return this._connection.getState()
            }, p.prototype.getUid = function () {
                return (new Date).getTime().toString(36) + "-" + (1e16 * Math.random()).toString(36).replace(".", "")
            }, p.prototype._$getAckTimeoutRegistry = function () {
                return this._ackTimeoutRegistry
            }, p.prototype._$onMessage = function (t) {
                this._messageCallbacks[t.topic] ? this._messageCallbacks[t.topic](t) : (t.processedError = !0, this._$onError(t.topic, s.EVENT.MESSAGE_PARSE_ERROR, "Received message for unknown topic " + t.topic)), t.action !== s.ACTIONS.ERROR || t.processedError || this._$onError(t.topic, t.data[0], t.data.slice(0))
            }, p.prototype._$onError = function (t, e, i) {
                var n = void 0;
                if (e !== s.EVENT.ACK_TIMEOUT && e !== s.EVENT.RESPONSE_TIMEOUT || this.getConnectionState() === s.CONNECTION_STATE.AWAITING_AUTHENTICATION && (n = "Your message timed out because you're not authenticated. Have you called login()?", setTimeout(this._$onError.bind(this, s.EVENT.NOT_AUTHENTICATED, s.TOPIC.ERROR, n), 1)), !this.hasListeners("error")) throw console.log("--- You can catch all deepstream errors by subscribing to the error event ---"), n = e + ": " + i, t && (n += " (" + t + ")"), new Error(n);
                this.emit("error", i, e, t), this.emit(e, t, i)
            }, p.prototype._onErrorMessage = function (t) {
                this._$onError(t.topic, t.data[0], t.data[1])
            }, p.prototype._getOptions = function (t) {
                var e = {};
                for (var i in l) void 0 === t[i] ? e[i] = l[i] : e[i] = t[i];
                return e
            }, _.CONSTANTS = p.prototype.CONSTANTS = s, _.MERGE_STRATEGIES = p.prototype.MERGE_STRATEGIES = n, e.exports = _
        }, {
            "./constants/constants": 11,
            "./constants/merge-strategies": 12,
            "./default-options": 13,
            "./event/event-handler": 14,
            "./message/connection": 15,
            "./presence/presence-handler": 18,
            "./record/record-handler": 22,
            "./rpc/rpc-handler": 24,
            "./utils/ack-timeout-registry": 27,
            "component-emitter2": 1
        }],
        11: [function (t, e, i) {
            "use strict";
            i.CONNECTION_STATE = {}, i.CONNECTION_STATE.CLOSED = "CLOSED", i.CONNECTION_STATE.AWAITING_CONNECTION = "AWAITING_CONNECTION", i.CONNECTION_STATE.CHALLENGING = "CHALLENGING", i.CONNECTION_STATE.AWAITING_AUTHENTICATION = "AWAITING_AUTHENTICATION", i.CONNECTION_STATE.AUTHENTICATING = "AUTHENTICATING", i.CONNECTION_STATE.OPEN = "OPEN", i.CONNECTION_STATE.ERROR = "ERROR", i.CONNECTION_STATE.RECONNECTING = "RECONNECTING", i.MESSAGE_SEPERATOR = String.fromCharCode(30), i.MESSAGE_PART_SEPERATOR = String.fromCharCode(31), i.TYPES = {}, i.TYPES.STRING = "S", i.TYPES.OBJECT = "O", i.TYPES.NUMBER = "N", i.TYPES.NULL = "L", i.TYPES.TRUE = "T", i.TYPES.FALSE = "F", i.TYPES.UNDEFINED = "U", i.TOPIC = {}, i.TOPIC.CONNECTION = "C", i.TOPIC.AUTH = "A", i.TOPIC.ERROR = "X", i.TOPIC.EVENT = "E", i.TOPIC.RECORD = "R", i.TOPIC.RPC = "P", i.TOPIC.PRESENCE = "U", i.TOPIC.PRIVATE = "PRIVATE/", i.EVENT = {}, i.EVENT.CONNECTION_ERROR = "connectionError", i.EVENT.CONNECTION_STATE_CHANGED = "connectionStateChanged", i.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED = "MAX_RECONNECTION_ATTEMPTS_REACHED", i.EVENT.CONNECTION_AUTHENTICATION_TIMEOUT = "CONNECTION_AUTHENTICATION_TIMEOUT", i.EVENT.ACK_TIMEOUT = "ACK_TIMEOUT", i.EVENT.NO_RPC_PROVIDER = "NO_RPC_PROVIDER", i.EVENT.RESPONSE_TIMEOUT = "RESPONSE_TIMEOUT", i.EVENT.DELETE_TIMEOUT = "DELETE_TIMEOUT", i.EVENT.UNSOLICITED_MESSAGE = "UNSOLICITED_MESSAGE", i.EVENT.MESSAGE_DENIED = "MESSAGE_DENIED", i.EVENT.MESSAGE_PARSE_ERROR = "MESSAGE_PARSE_ERROR", i.EVENT.VERSION_EXISTS = "VERSION_EXISTS", i.EVENT.NOT_AUTHENTICATED = "NOT_AUTHENTICATED", i.EVENT.MESSAGE_PERMISSION_ERROR = "MESSAGE_PERMISSION_ERROR", i.EVENT.LISTENER_EXISTS = "LISTENER_EXISTS", i.EVENT.NOT_LISTENING = "NOT_LISTENING", i.EVENT.TOO_MANY_AUTH_ATTEMPTS = "TOO_MANY_AUTH_ATTEMPTS", i.EVENT.INVALID_AUTH_MSG = "INVALID_AUTH_MSG", i.EVENT.IS_CLOSED = "IS_CLOSED", i.EVENT.RECORD_NOT_FOUND = "RECORD_NOT_FOUND", i.EVENT.NOT_SUBSCRIBED = "NOT_SUBSCRIBED", i.ACTIONS = {}, i.ACTIONS.PING = "PI", i.ACTIONS.PONG = "PO", i.ACTIONS.ACK = "A", i.ACTIONS.REDIRECT = "RED", i.ACTIONS.CHALLENGE = "CH", i.ACTIONS.CHALLENGE_RESPONSE = "CHR", i.ACTIONS.READ = "R", i.ACTIONS.CREATE = "C", i.ACTIONS.UPDATE = "U", i.ACTIONS.PATCH = "P", i.ACTIONS.DELETE = "D", i.ACTIONS.SUBSCRIBE = "S", i.ACTIONS.UNSUBSCRIBE = "US", i.ACTIONS.HAS = "H", i.ACTIONS.HEAD = "HD", i.ACTIONS.SNAPSHOT = "SN", i.ACTIONS.INVOKE = "I", i.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND = "SP", i.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED = "SR", i.ACTIONS.SUBSCRIPTION_HAS_PROVIDER = "SH", i.ACTIONS.LISTEN = "L", i.ACTIONS.UNLISTEN = "UL", i.ACTIONS.LISTEN_ACCEPT = "LA", i.ACTIONS.LISTEN_REJECT = "LR", i.ACTIONS.PROVIDER_UPDATE = "PU", i.ACTIONS.QUERY = "Q", i.ACTIONS.CREATEORREAD = "CR", i.ACTIONS.CREATEANDUPDATE = "CU", i.ACTIONS.EVENT = "EVT", i.ACTIONS.ERROR = "E", i.ACTIONS.REQUEST = "REQ", i.ACTIONS.RESPONSE = "RES", i.ACTIONS.REJECTION = "REJ", i.ACTIONS.PRESENCE_JOIN = "PNJ", i.ACTIONS.PRESENCE_LEAVE = "PNL", i.ACTIONS.WRITE_ACKNOWLEDGEMENT = "WA", i.CALL_STATE = {}, i.CALL_STATE.INITIAL = "INITIAL", i.CALL_STATE.CONNECTING = "CONNECTING", i.CALL_STATE.ESTABLISHED = "ESTABLISHED", i.CALL_STATE.ACCEPTED = "ACCEPTED", i.CALL_STATE.DECLINED = "DECLINED", i.CALL_STATE.ENDED = "ENDED", i.CALL_STATE.ERROR = "ERROR"
        }, {}],
        12: [function (t, e, i) {
            "use strict";
            e.exports = {
                REMOTE_WINS: function (t, e, i, n) {
                    n(null, e)
                },
                LOCAL_WINS: function (t, e, i, n) {
                    n(null, t.get())
                }
            }
        }, {}],
        13: [function (t, e, i) {
            "use strict";
            var n = t("./constants/merge-strategies");
            e.exports = {
                heartbeatInterval: 3e4,
                reconnectIntervalIncrement: 4e3,
                maxReconnectInterval: 18e4,
                maxReconnectAttempts: 5,
                rpcAckTimeout: 6e3,
                rpcResponseTimeout: 1e4,
                subscriptionTimeout: 2e3,
                maxMessagesPerPacket: 100,
                timeBetweenSendingQueuedPackages: 16,
                recordReadAckTimeout: 15e3,
                recordReadTimeout: 15e3,
                recordDeleteTimeout: 15e3,
                path: "/deepstream",
                mergeStrategy: n.REMOTE_WINS,
                recordDeepCopy: !0,
                nodeSocketOptions: null
            }
        }, {
            "./constants/merge-strategies": 12
        }],
        14: [function (t, e, i) {
            "use strict";
            var n = t("../message/message-builder"),
                s = t("../message/message-parser"),
                r = t("../utils/resubscribe-notifier"),
                o = t("../constants/constants"),
                a = t("../utils/listener"),
                c = t("component-emitter2"),
                h = function (t, e, i) {
                    this._options = t, this._connection = e, this._client = i, this._emitter = new c, this._listener = {}, this._ackTimeoutRegistry = i._$getAckTimeoutRegistry(), this._resubscribeNotifier = new r(this._client, this._resubscribe.bind(this))
                };
            h.prototype.eventNames = function () {
                return this._emitter.eventNames()
            }, h.prototype.subscribe = function (t, e) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument name");
                if ("function" != typeof e) throw new Error("invalid argument callback");
                this._emitter.hasListeners(t) || (this._ackTimeoutRegistry.add({
                    topic: o.TOPIC.EVENT,
                    action: o.ACTIONS.SUBSCRIBE,
                    name: t
                }), this._connection.sendMsg(o.TOPIC.EVENT, o.ACTIONS.SUBSCRIBE, [t])), this._emitter.on(t, e)
            }, h.prototype.unsubscribe = function (t, e) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument name");
                if (void 0 !== e && "function" != typeof e) throw new Error("invalid argument callback");
                this._emitter.off(t, e), this._emitter.hasListeners(t) || (this._ackTimeoutRegistry.add({
                    topic: o.TOPIC.EVENT,
                    action: o.ACTIONS.UNSUBSCRIBE,
                    name: t
                }), this._connection.sendMsg(o.TOPIC.EVENT, o.ACTIONS.UNSUBSCRIBE, [t]))
            }, h.prototype.emit = function (t, e) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument name");
                this._connection.sendMsg(o.TOPIC.EVENT, o.ACTIONS.EVENT, [t, n.typed(e)]), this._emitter.emit(t, e)
            }, h.prototype.listen = function (t, e) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument pattern");
                if ("function" != typeof e) throw new Error("invalid argument callback");
                !this._listener[t] || this._listener[t].destroyPending ? (this._listener[t] && this._listener[t].destroy(), this._listener[t] = new a(o.TOPIC.EVENT, t, e, this._options, this._client, this._connection)) : this._client._$onError(o.TOPIC.EVENT, o.EVENT.LISTENER_EXISTS, t)
            }, h.prototype.unlisten = function (t) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument pattern");
                var e = this._listener[t];
                e && !e.destroyPending ? e.sendDestroy() : this._listener[t] ? (this._ackTimeoutRegistry.add({
                    topic: o.TOPIC.EVENT,
                    action: o.EVENT.UNLISTEN,
                    name: t
                }), this._listener[t].destroy(), delete this._listener[t]) : this._client._$onError(o.TOPIC.RECORD, o.EVENT.NOT_LISTENING, t)
            }, h.prototype._$handle = function (t) {
                var e = t.data[t.action === o.ACTIONS.ACK ? 1 : 0];
                if (t.action !== o.ACTIONS.EVENT) {
                    if (t.action === o.ACTIONS.ACK && t.data[0] === o.ACTIONS.UNLISTEN && this._listener[e] && this._listener[e].destroyPending) return this._listener[e].destroy(), void delete this._listener[e];
                    if (this._listener[e]) this._listener[e]._$onMessage(t);
                    else if (t.action !== o.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED && t.action !== o.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
                        if (t.action !== o.ACTIONS.ACK) return t.action === o.ACTIONS.ERROR ? (t.data[0] === o.EVENT.MESSAGE_DENIED ? this._ackTimeoutRegistry.remove({
                            topic: o.TOPIC.EVENT,
                            name: t.data[1],
                            action: t.data[2]
                        }) : t.data[0] === o.EVENT.NOT_SUBSCRIBED && this._ackTimeoutRegistry.remove({
                            topic: o.TOPIC.EVENT,
                            name: t.data[1],
                            action: o.ACTIONS.UNSUBSCRIBE
                        }), t.processedError = !0, void this._client._$onError(o.TOPIC.EVENT, t.data[0], t.data[1])) : void this._client._$onError(o.TOPIC.EVENT, o.EVENT.UNSOLICITED_MESSAGE, e);
                        this._ackTimeoutRegistry.clear(t)
                    }
                } else t.data && 2 === t.data.length ? this._emitter.emit(e, s.convertTyped(t.data[1], this._client)) : this._emitter.emit(e)
            }, h.prototype._resubscribe = function () {
                var t = this._emitter._callbacks;
                for (var e in t) this._connection.sendMsg(o.TOPIC.EVENT, o.ACTIONS.SUBSCRIBE, [e])
            }, e.exports = h
        }, {
            "../constants/constants": 11,
            "../message/message-builder": 16,
            "../message/message-parser": 17,
            "../utils/listener": 28,
            "../utils/resubscribe-notifier": 29,
            "component-emitter2": 1
        }],
        15: [function (h, u, t) {
            (function (t) {
                "use strict";
                var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    } : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    e = t.WebSocket || t.MozWebSocket,
                    n = h("ws"),
                    s = h("./message-parser"),
                    r = h("./message-builder"),
                    o = h("../utils/utils"),
                    a = h("../constants/constants"),
                    c = function (t, e, i) {
                        this._client = t, this._options = i, this._authParams = null, this._authCallback = null, this._deliberateClose = !1, this._redirecting = !1, this._tooManyAuthAttempts = !1, this._connectionAuthenticationTimeout = !1, this._challengeDenied = !1, this._queuedMessages = [], this._reconnectTimeout = null, this._reconnectionAttempt = 0, this._currentPacketMessageCount = 0, this._sendNextPacketTimeout = null, this._currentMessageResetTimeout = null, this._endpoint = null, this._lastHeartBeat = null, this._heartbeatInterval = null, this._originalUrl = o.parseUrl(e, this._options.path), this._url = this._originalUrl, this._state = a.CONNECTION_STATE.CLOSED, this._createEndpoint()
                    };
                c.prototype.getState = function () {
                    return this._state
                }, c.prototype.authenticate = function (t, e) {
                    if ("object" === (void 0 === t ? "undefined" : i(t))) {
                        if (this._authParams = t, this._authCallback = e, !(this._tooManyAuthAttempts || this._challengeDenied || this._connectionAuthenticationTimeout)) return !0 === this._deliberateClose && this._state === a.CONNECTION_STATE.CLOSED ? (this._createEndpoint(), void(this._deliberateClose = !1)) : void(this._state === a.CONNECTION_STATE.AWAITING_AUTHENTICATION && this._sendAuthParams());
                        this._client._$onError(a.TOPIC.ERROR, a.EVENT.IS_CLOSED, "this client's connection was closed")
                    } else this._client._$onError(a.TOPIC.ERROR, a.EVENT.INVALID_AUTH_MSG, "authParams is not an object")
                }, c.prototype.sendMsg = function (t, e, i) {
                    this.send(r.getMsg(t, e, i))
                }, c.prototype.send = function (t) {
                    this._queuedMessages.push(t), this._currentPacketMessageCount++, null === this._currentMessageResetTimeout && (this._currentMessageResetTimeout = o.nextTick(this._resetCurrentMessageCount.bind(this))), this._state === a.CONNECTION_STATE.OPEN && this._queuedMessages.length < this._options.maxMessagesPerPacket && this._currentPacketMessageCount < this._options.maxMessagesPerPacket ? this._sendQueuedMessages() : null === this._sendNextPacketTimeout && this._queueNextPacket()
                }, c.prototype.close = function () {
                    clearInterval(this._heartbeatInterval), this._deliberateClose = !0, this._endpoint.close(), this._setState(a.CONNECTION_STATE.CLOSED)
                }, c.prototype._createEndpoint = function () {
                    this._endpoint = e ? new e(this._url) : new n(this._url, this._options.nodeSocketOptions), this._endpoint.onopen = this._onOpen.bind(this), this._endpoint.onerror = this._onError.bind(this), this._endpoint.onclose = this._onClose.bind(this), this._endpoint.onmessage = this._onMessage.bind(this)
                }, c.prototype._resetCurrentMessageCount = function () {
                    this._currentPacketMessageCount = 0, this._currentMessageResetTimeout = null
                }, c.prototype._sendQueuedMessages = function () {
                    if (this._state === a.CONNECTION_STATE.OPEN && this._endpoint.readyState === this._endpoint.OPEN)
                        if (0 !== this._queuedMessages.length) {
                            var t = this._queuedMessages.splice(0, this._options.maxMessagesPerPacket).join("");
                            0 !== this._queuedMessages.length ? this._queueNextPacket() : this._sendNextPacketTimeout = null, this._submit(t)
                        } else this._sendNextPacketTimeout = null
                }, c.prototype._submit = function (t) {
                    this._endpoint.readyState === this._endpoint.OPEN ? this._endpoint.send(t) : this._onError("Tried to send message on a closed websocket connection")
                }, c.prototype._queueNextPacket = function () {
                    var t = this._sendQueuedMessages.bind(this),
                        e = this._options.timeBetweenSendingQueuedPackages;
                    this._sendNextPacketTimeout = setTimeout(t, e)
                }, c.prototype._sendAuthParams = function () {
                    this._setState(a.CONNECTION_STATE.AUTHENTICATING);
                    var t = r.getMsg(a.TOPIC.AUTH, a.ACTIONS.REQUEST, [this._authParams]);
                    this._submit(t)
                }, c.prototype._checkHeartBeat = function () {
                    var t = 2 * this._options.heartbeatInterval;
                    Date.now() - this._lastHeartBeat > t && (clearInterval(this._heartbeatInterval), this._endpoint.close(), this._client._$onError(a.TOPIC.CONNECTION, a.EVENT.CONNECTION_ERROR, "heartbeat not received in the last " + t + " milliseconds"))
                }, c.prototype._onOpen = function () {
                    this._clearReconnect(), this._lastHeartBeat = Date.now(), this._heartbeatInterval = o.setInterval(this._checkHeartBeat.bind(this), this._options.heartbeatInterval), this._setState(a.CONNECTION_STATE.AWAITING_CONNECTION)
                }, c.prototype._onError = function (i) {
                    var t = this;
                    clearInterval(this._heartbeatInterval), this._setState(a.CONNECTION_STATE.ERROR), setTimeout(function () {
                        var e = void 0;
                        if ("ECONNRESET" === i.code || "ECONNREFUSED" === i.code) e = "Can't connect! Deepstream server unreachable on " + t._originalUrl;
                        else try {
                            e = JSON.stringify(i)
                        } catch (t) {
                            e = i.toString()
                        }
                        t._client._$onError(a.TOPIC.CONNECTION, a.EVENT.CONNECTION_ERROR, e)
                    }, 1)
                }, c.prototype._onClose = function () {
                    clearInterval(this._heartbeatInterval), !0 === this._redirecting ? (this._redirecting = !1, this._createEndpoint()) : !0 === this._deliberateClose ? this._setState(a.CONNECTION_STATE.CLOSED) : this._tryReconnect()
                }, c.prototype._onMessage = function (t) {
                    for (var e = s.parse(t.data, this._client), i = 0; i < e.length; i++) null !== e[i] && (e[i].topic === a.TOPIC.CONNECTION ? this._handleConnectionResponse(e[i]) : e[i].topic === a.TOPIC.AUTH ? this._handleAuthResponse(e[i]) : this._client._$onMessage(e[i]))
                }, c.prototype._handleConnectionResponse = function (t) {
                    t.action === a.ACTIONS.PING ? (this._lastHeartBeat = Date.now(), this._submit(r.getMsg(a.TOPIC.CONNECTION, a.ACTIONS.PONG))) : t.action === a.ACTIONS.ACK ? (this._setState(a.CONNECTION_STATE.AWAITING_AUTHENTICATION), this._authParams && this._sendAuthParams()) : t.action === a.ACTIONS.CHALLENGE ? (this._setState(a.CONNECTION_STATE.CHALLENGING), this._submit(r.getMsg(a.TOPIC.CONNECTION, a.ACTIONS.CHALLENGE_RESPONSE, [this._originalUrl]))) : t.action === a.ACTIONS.REJECTION ? (this._challengeDenied = !0, this.close()) : t.action === a.ACTIONS.REDIRECT ? (this._url = t.data[0], this._redirecting = !0, this._endpoint.close()) : t.action === a.ACTIONS.ERROR && t.data[0] === a.EVENT.CONNECTION_AUTHENTICATION_TIMEOUT && (this._deliberateClose = !0, this._connectionAuthenticationTimeout = !0, this._client._$onError(a.TOPIC.CONNECTION, t.data[0], t.data[1]))
                }, c.prototype._handleAuthResponse = function (t) {
                    if (t.action === a.ACTIONS.ERROR) {
                        if (t.data[0] === a.EVENT.TOO_MANY_AUTH_ATTEMPTS) this._deliberateClose = !0, this._tooManyAuthAttempts = !0;
                        else {
                            if (t.data[0] === a.EVENT.INVALID_AUTH_MSG) return this._deliberateClose = !0, void(this._authCallback && this._authCallback(!1, "invalid authentication message"));
                            this._setState(a.CONNECTION_STATE.AWAITING_AUTHENTICATION)
                        }
                        this._authCallback && this._authCallback(!1, this._getAuthData(t.data[1]))
                    } else t.action === a.ACTIONS.ACK && (this._setState(a.CONNECTION_STATE.OPEN), this._authCallback && this._authCallback(!0, this._getAuthData(t.data[0])), this._sendQueuedMessages())
                }, c.prototype._getAuthData = function (t) {
                    return void 0 === t ? null : s.convertTyped(t, this._client)
                }, c.prototype._setState = function (t) {
                    this._state = t, this._client.emit(a.EVENT.CONNECTION_STATE_CHANGED, t)
                }, c.prototype._tryReconnect = function () {
                    null === this._reconnectTimeout && (this._reconnectionAttempt < this._options.maxReconnectAttempts ? (this._setState(a.CONNECTION_STATE.RECONNECTING), this._reconnectTimeout = setTimeout(this._tryOpen.bind(this), Math.min(this._options.maxReconnectInterval, this._options.reconnectIntervalIncrement * this._reconnectionAttempt)), this._reconnectionAttempt++) : (this._clearReconnect(), this.close(), this._client.emit(a.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED, this._reconnectionAttempt)))
                }, c.prototype._tryOpen = function () {
                    this._originalUrl !== this._url && (this._url = this._originalUrl), this._createEndpoint(), this._reconnectTimeout = null
                }, c.prototype._clearReconnect = function () {
                    clearTimeout(this._reconnectTimeout), this._reconnectTimeout = null, this._reconnectionAttempt = 0
                }, u.exports = c
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof self ? self : {})
        }, {
            "../constants/constants": 11,
            "../utils/utils": 31,
            "./message-builder": 16,
            "./message-parser": 17,
            ws: 2
        }],
        16: [function (t, e, i) {
            "use strict";
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                o = t("../constants/constants"),
                a = o.MESSAGE_PART_SEPERATOR;
            i.getMsg = function (t, e, i) {
                if (i && !(i instanceof Array)) throw new Error("data must be an array");
                var n = [t, e];
                if (i)
                    for (var s = 0; s < i.length; s++) "object" === r(i[s]) ? n.push(JSON.stringify(i[s])) : n.push(i[s]);
                return n.join(a) + o.MESSAGE_SEPERATOR
            }, i.typed = function (t) {
                var e = void 0 === t ? "undefined" : r(t);
                if ("string" === e) return o.TYPES.STRING + t;
                if (null === t) return o.TYPES.NULL;
                if ("object" === e) return o.TYPES.OBJECT + JSON.stringify(t);
                if ("number" === e) return o.TYPES.NUMBER + t.toString();
                if (!0 === t) return o.TYPES.TRUE;
                if (!1 === t) return o.TYPES.FALSE;
                if (void 0 === t) return o.TYPES.UNDEFINED;
                throw new Error("Can't serialize type " + t)
            }
        }, {
            "../constants/constants": 11
        }],
        17: [function (t, e, i) {
            "use strict";
            var r = t("../constants/constants"),
                n = function () {
                    this._actions = this._getActions()
                };
            n.prototype.parse = function (t, e) {
                for (var i = [], n = t.split(r.MESSAGE_SEPERATOR), s = 0; s < n.length; s++) 2 < n[s].length && i.push(this._parseMessage(n[s], e));
                return i
            }, n.prototype.convertTyped = function (e, i) {
                var t = e.charAt(0);
                if (t === r.TYPES.STRING) return e.substr(1);
                if (t === r.TYPES.OBJECT) try {
                    return JSON.parse(e.substr(1))
                } catch (t) {
                    return void i._$onError(r.TOPIC.ERROR, r.EVENT.MESSAGE_PARSE_ERROR, t.toString() + "(" + e + ")")
                }
                return t === r.TYPES.NUMBER ? parseFloat(e.substr(1)) : t === r.TYPES.NULL ? null : t === r.TYPES.TRUE || t !== r.TYPES.FALSE && void(t !== r.TYPES.UNDEFINED && i._$onError(r.TOPIC.ERROR, r.EVENT.MESSAGE_PARSE_ERROR, "UNKNOWN_TYPE (" + e + ")"))
            }, n.prototype._getActions = function () {
                var t = {};
                for (var e in r.ACTIONS) t[r.ACTIONS[e]] = e;
                return t
            }, n.prototype._parseMessage = function (t, e) {
                var i = t.split(r.MESSAGE_PART_SEPERATOR),
                    n = {};
                return i.length < 2 ? (e._$onError(r.TOPIC.ERROR, r.EVENT.MESSAGE_PARSE_ERROR, "Insufficiant message parts"), null) : void 0 === this._actions[i[1]] ? (e._$onError(r.TOPIC.ERROR, r.EVENT.MESSAGE_PARSE_ERROR, "Unknown action " + i[1]), null) : (n.raw = t, n.topic = i[0], n.action = i[1], n.data = i.splice(2), n)
            }, e.exports = new n
        }, {
            "../constants/constants": 11
        }],
        18: [function (t, e, i) {
            "use strict";
            var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                r = function () {
                    function n(t, e) {
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }
                    return function (t, e, i) {
                        return e && n(t.prototype, e), i && n(t, i), t
                    }
                }();
            var o = t("component-emitter2"),
                a = t("../constants/constants"),
                c = t("../utils/resubscribe-notifier");

            function h(t, e, i) {
                if ("function" == typeof t && void 0 === e ? (e = t, t = i) : t = [t], void 0 !== e && "function" != typeof e) throw new Error("invalid argument callback");
                return {
                    userId: t,
                    callback: e
                }
            }
            e.exports = function () {
                function n(t, e, i) {
                    ! function (t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, n), this._options = t, this._connection = e, this._client = i, this._queryEmitter = new o, this._subscribeEmitter = new o, this._ackTimeoutRegistry = i._$getAckTimeoutRegistry(), this._resubscribeNotifier = new c(this._client, this._resubscribe.bind(this)), this._counter = 1, this._flush = this._flush.bind(this), this._flushTimeout = null, this._pendingSubscribes = {}, this._pendingUnsubscribes = {}
                }
                return r(n, [{
                    key: "getAll",
                    value: function (t, e) {
                        if ("function" == typeof t) this._connection.sendMsg(a.TOPIC.PRESENCE, a.ACTIONS.QUERY, [a.ACTIONS.QUERY]), this._queryEmitter.once(a.ACTIONS.QUERY, t);
                        else {
                            var i = this._counter++;
                            this._connection.sendMsg(a.TOPIC.PRESENCE, a.ACTIONS.QUERY, [i, t]), this._queryEmitter.once(i, e)
                        }
                    }
                }, {
                    key: "subscribe",
                    value: function (t, e) {
                        var i = h(t, e, a.ACTIONS.SUBSCRIBE);
                        this._subscribeEmitter.hasListeners(i.userId) || (i.userId === a.ACTIONS.SUBSCRIBE ? (this._sendGlobalSubscription(a.ACTIONS.SUBSCRIBE), this._subscribeEmitter.on(a.ACTIONS.SUBSCRIBE, i.callback)) : (delete this._pendingUnsubscribes[i.userId], this._pendingSubscribes[i.userId] = !0, this._flushTimeout || (this._flushTimeout = setTimeout(this._flush, 0)), this._subscribeEmitter.on(i.userId, i.callback)))
                    }
                }, {
                    key: "unsubscribe",
                    value: function (t, e) {
                        var i = h(t, e, a.ACTIONS.UNSUBSCRIBE);
                        i.userId === a.ACTIONS.UNSUBSCRIBE ? this._subscribeEmitter.off(a.ACTIONS.SUBSCRIBE, i.callback) : this._subscribeEmitter.off(i.userId, i.callback), this._subscribeEmitter.hasListeners(i.userId) || (i.userId === a.ACTIONS.UNSUBSCRIBE ? this._sendGlobalSubscription(a.ACTIONS.UNSUBSCRIBE) : (delete this._pendingSubscribes[i.userId], this._pendingUnsubscribes[i.userId] = !0, this._flushTimeout || (this._flushTimeout = setTimeout(this._flush, 0))))
                    }
                }, {
                    key: "_$handle",
                    value: function (t) {
                        if (t.action === a.ACTIONS.ERROR && t.data[0] === a.EVENT.MESSAGE_DENIED) this._ackTimeoutRegistry.remove(a.TOPIC.PRESENCE, t.data[1]), t.processedError = !0, this._client._$onError(a.TOPIC.PRESENCE, a.EVENT.MESSAGE_DENIED, t.data[1]);
                        else if (t.action === a.ACTIONS.ACK) this._ackTimeoutRegistry.clear(t);
                        else if (t.action === a.ACTIONS.PRESENCE_JOIN) this._subscribeEmitter.emit(a.ACTIONS.SUBSCRIBE, t.data[0], !0), this._subscribeEmitter.emit(t.data[0], !0, t.data[0]);
                        else if (t.action === a.ACTIONS.PRESENCE_LEAVE) this._subscribeEmitter.emit(a.ACTIONS.SUBSCRIBE, t.data[0], !1), this._subscribeEmitter.emit(t.data[0], !1, t.data[0]);
                        else if (t.action === a.ACTIONS.QUERY) {
                            try {
                                var e = JSON.parse(t.data[1]);
                                if ("object" === (void 0 === e ? "undefined" : s(e))) return void this._queryEmitter.emit(t.data[0], e)
                            } catch (t) {}
                            this._queryEmitter.emit(a.ACTIONS.QUERY, t.data)
                        } else this._client._$onError(a.TOPIC.PRESENCE, a.EVENT.UNSOLICITED_MESSAGE, t.action)
                    }
                }, {
                    key: "_resubscribe",
                    value: function () {
                        var t = Object.keys(this._subscribeEmitter._callbacks || {}); - 1 < t.indexOf(a.ACTIONS.SUBSCRIBE) && (t.splice(t.indexOf(a.ACTIONS.SUBSCRIBE), 1), this._sendGlobalSubscription(a.ACTIONS.SUBSCRIBE)), 0 < t.length && this._sendSubscriptionBulk(a.ACTIONS.SUBSCRIBE, t)
                    }
                }, {
                    key: "_flush",
                    value: function () {
                        var t = Object.keys(this._pendingSubscribes);
                        0 < t.length && (this._sendSubscriptionBulk(a.ACTIONS.SUBSCRIBE, t), this._pendingSubscribes = {});
                        var e = Object.keys(this._pendingUnsubscribes);
                        0 < e.length && (this._sendSubscriptionBulk(a.ACTIONS.UNSUBSCRIBE, e), this._pendingUnsubscribes = {}), this._flushTimeout = null
                    }
                }, {
                    key: "_sendSubscriptionBulk",
                    value: function (t, e) {
                        var i = this._counter++;
                        this._ackTimeoutRegistry.add({
                            topic: a.TOPIC.PRESENCE,
                            action: t,
                            name: i
                        }), this._connection.sendMsg(a.TOPIC.PRESENCE, t, [i, e])
                    }
                }, {
                    key: "_sendGlobalSubscription",
                    value: function (t) {
                        this._ackTimeoutRegistry.add({
                            topic: a.TOPIC.PRESENCE,
                            action: t,
                            name: t
                        }), this._connection.sendMsg(a.TOPIC.PRESENCE, t, [t])
                    }
                }]), n
            }()
        }, {
            "../constants/constants": 11,
            "../utils/resubscribe-notifier": 29,
            "component-emitter2": 1
        }],
        19: [function (t, e, i) {
            "use strict";
            var n = t("./record"),
                s = function (t) {
                    this.name = null, this._recordHandler = t, this._record = null, this._subscriptions = [], this._proxyMethod("delete"), this._proxyMethod("set"), this._proxyMethod("discard")
                };
            t("component-emitter2")(s.prototype), s.prototype.get = function (t) {
                if (null !== this._record) return this._record.get(t)
            }, s.prototype.subscribe = function () {
                var t = n.prototype._normalizeArguments(arguments);
                t.triggerNow = !0, this._subscriptions.push(t), null !== this._record && this._record.subscribe(t)
            }, s.prototype.unsubscribe = function () {
                var t = n.prototype._normalizeArguments(arguments),
                    e = [],
                    i = void 0;
                for (i = 0; i < this._subscriptions.length; i++) this._subscriptions[i].path === t.path && this._subscriptions[i].callback === t.callback || e.push(this._subscriptions[i]);
                this._subscriptions = e, null !== this._record && this._record.unsubscribe(t)
            }, s.prototype.setName = function (t) {
                if (this.name !== t) {
                    this.name = t;
                    var e = void 0;
                    if (null !== this._record && !this._record.isDestroyed) {
                        for (e = 0; e < this._subscriptions.length; e++) this._record.unsubscribe(this._subscriptions[e]);
                        this._record.discard()
                    }
                    for (this._record = this._recordHandler.getRecord(t), e = 0; e < this._subscriptions.length; e++) this._record.subscribe(this._subscriptions[e]);
                    this._record.whenReady(this.emit.bind(this, "ready")), this.emit("nameChanged", t)
                }
            }, s.prototype._proxyMethod = function (t) {
                this[t] = this._callMethodOnRecord.bind(this, t)
            }, s.prototype._callMethodOnRecord = function (t) {
                if (null === this._record) throw new Error("Can`t invoke " + t + ". AnonymousRecord not initialised. Call setName first");
                if ("function" != typeof this._record[t]) throw new Error(t + " is not a method on the record");
                var e = Array.prototype.slice.call(arguments, 1);
                return this._record[t].apply(this._record, e)
            }, e.exports = s
        }, {
            "./record": 23,
            "component-emitter2": 1
        }],
        20: [function (t, u, e) {
            "use strict";
            var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                d = t("../utils/utils"),
                i = /([^.[\]\s]+)/g,
                n = Object.create(null);

            function p(t, e, i) {
                var n = void 0,
                    s = void 0;
                if (null === t || null === e) return e;
                if (Array.isArray(t) && Array.isArray(e)) {
                    var r = void 0;
                    for (n = 0; n < e.length; n++) {
                        var o = p(t[n], e[n], !1);
                        if (!r) {
                            if (o === t[n]) continue;
                            for (r = [], s = 0; s < n; ++s) r[s] = t[s]
                        }
                        r[n] = o
                    }
                    return r = (r = r && !1 !== i ? d.deepCopy(r) : r) || (t.length === e.length ? t : e)
                }
                if (!Array.isArray(e) && "object" === (void 0 === t ? "undefined" : l(t)) && "object" === (void 0 === e ? "undefined" : l(e))) {
                    var a = void 0,
                        c = Object.keys(e);
                    for (n = 0; n < c.length; n++) {
                        var h = p(t[c[n]], e[c[n]], !1);
                        if (!a) {
                            if (h === t[c[n]]) continue;
                            for (a = Object.create(null), s = 0; s < n; ++s) a[c[s]] = t[c[s]]
                        }
                        a[c[n]] = e[c[n]]
                    }
                    return a = (a = a && !1 !== i ? d.deepCopy(a) : a) || (Object.keys(t).length === c.length ? t : e)
                }
                return e !== t ? !1 !== i ? d.deepCopy(e) : e : t
            }

            function _(t) {
                if (n[t]) return n[t];
                var e = "undefined" !== String(t) ? String(t).match(i) : [];
                if (!e) throw new Error("invalid path " + t);
                return n[t] = e, n[t]
            }
            u.exports.get = function (t, e, i) {
                for (var n = _(e), s = t, r = 0; r < n.length; r++) {
                    if (void 0 === s) return;
                    if ("object" !== (void 0 === s ? "undefined" : l(s))) throw new Error("invalid data or path");
                    s = s[n[r]]
                }
                return !1 !== i ? d.deepCopy(s) : s
            }, u.exports.set = function (t, e, i, n) {
                var s = _(e);
                if (0 === s.length) return p(t, i, n);
                var r = u.exports.get(t, e, !1),
                    o = p(r, i, n);
                if (o === r) return t;
                for (var a = d.shallowCopy(t), c = a, h = 0; h < s.length; h++) h === s.length - 1 ? c[s[h]] = o : c = void 0 !== c[s[h]] ? c[s[h]] = d.shallowCopy(c[s[h]]) : s[h + 1] && !isNaN(s[h + 1]) ? c[s[h]] = [] : c[s[h]] = Object.create(null);
                return a
            }
        }, {
            "../utils/utils": 31
        }],
        21: [function (t, e, i) {
            "use strict";
            var n = t("component-emitter2"),
                s = t("./record"),
                r = t("../constants/constants"),
                o = "entry-added",
                a = "entry-removed",
                c = "entry-moved",
                h = function (t, e, i) {
                    if ("string" != typeof e || 0 === e.length) throw new Error("invalid argument name");
                    this._recordHandler = t, this._record = this._recordHandler.getRecord(e, i), this._record._applyUpdate = this._applyUpdate.bind(this), this._record.on("delete", this.emit.bind(this, "delete")), this._record.on("discard", this._onDiscard.bind(this)), this._record.on("ready", this._onReady.bind(this)), this.isDestroyed = this._record.isDestroyed, this.isReady = this._record.isReady, this.name = e, this._queuedMethods = [], this._beforeStructure = null, this._hasAddListener = null, this._hasRemoveListener = null, this._hasMoveListener = null, this.delete = this._record.delete.bind(this._record), this.discard = this._record.discard.bind(this._record), this.whenReady = this._record.whenReady.bind(this)
                };
            n(h.prototype), h.prototype.getEntries = function () {
                var t = this._record.get();
                return t instanceof Array ? t : []
            }, h.prototype.isEmpty = function () {
                return 0 === this.getEntries().length
            }, h.prototype.setEntries = function (t, e) {
                var i = "entries must be an array of record names",
                    n = void 0;
                if (!(t instanceof Array)) throw new Error(i);
                for (n = 0; n < t.length; n++)
                    if ("string" != typeof t[n]) throw new Error(i);
                !1 === this._record.isReady ? this._queuedMethods.push(this.setEntries.bind(this, t, e)) : (this._beforeChange(), e ? this._record.set(t, e) : this._record.set(t), this._afterChange())
            }, h.prototype.setEntriesWithAck = function (t, e) {
                var n = this;
                return e ? this.setEntries(t, e) : new Promise(function (e, i) {
                    n.setEntries(t, function (t) {
                        return null === t ? e() : i(t)
                    })
                })
            }, h.prototype.removeEntry = function (t, e, i) {
                var n = e,
                    s = i;
                if ("function" == typeof e && (s = e, n = void 0), !1 !== this._record.isReady) {
                    var r = this._record.get(),
                        o = this._hasIndex(n),
                        a = [],
                        c = void 0;
                    for (c = 0; c < r.length; c++)(r[c] !== t || o && n !== c) && a.push(r[c]);
                    this._beforeChange(), s ? this._record.set(a, s) : this._record.set(a), this._afterChange()
                } else this._queuedMethods.push(this.removeEntry.bind(this, t, n, s))
            }, h.prototype.removeEntryWithAck = function (t, n, e) {
                var s = this;
                return "number" == typeof n && e ? this.removeEntry(t, n, e) : "function" == typeof n ? this.removeEntry(t, n) : new Promise(function (e, i) {
                    s.removeEntry(t, n, function (t) {
                        return null === t ? e() : i(t)
                    })
                })
            }, h.prototype.addEntry = function (t, e, i) {
                if ("string" != typeof t) throw new Error("Entry must be a recordName");
                var n = e,
                    s = i;
                if ("function" == typeof e && (s = e, n = void 0), !1 !== this._record.isReady) {
                    var r = this._hasIndex(n),
                        o = this.getEntries();
                    r ? o.splice(n, 0, t) : o.push(t), this._beforeChange(), s ? this._record.set(o, s) : this._record.set(o), this._afterChange()
                } else this._queuedMethods.push(this.addEntry.bind(this, t, n, s))
            }, h.prototype.addEntryWithAck = function (t, n, e) {
                var s = this;
                return "number" == typeof n && e ? this.addEntry(t, n, e) : "function" == typeof n ? this.addEntry(t, n) : new Promise(function (e, i) {
                    s.addEntry(t, n, function (t) {
                        return null === t ? e() : i(t)
                    })
                })
            }, h.prototype.subscribe = function () {
                var t = s.prototype._normalizeArguments(arguments);
                if (t.path) throw new Error("path is not supported for List.subscribe");
                var e = function (t) {
                    t(this.getEntries())
                }.bind(this, t.callback);
                t.callback.wrappedCallback = e, t.callback = e, this._record.subscribe(t)
            }, h.prototype.unsubscribe = function () {
                var t = s.prototype._normalizeArguments(arguments);
                if (t.path) throw new Error("path is not supported for List.unsubscribe");
                t.callback = t.callback.wrappedCallback, this._record.unsubscribe(t)
            }, h.prototype._onReady = function () {
                this.isReady = !0;
                for (var t = 0; t < this._queuedMethods.length; t++) this._queuedMethods[t]();
                this._queuedMethods = [], this.emit("ready")
            }, h.prototype._onDiscard = function () {
                this.isDestroyed = !0, this.emit("discard")
            }, h.prototype._applyUpdate = function (t) {
                if (t.action === r.ACTIONS.PATCH) throw new Error("PATCH is not supported for Lists");
                "[" !== t.data[2].charAt(0) && (t.data[2] = "[]"), this._beforeChange(), s.prototype._applyUpdate.call(this._record, t), this._afterChange()
            }, h.prototype._hasIndex = function (t) {
                var e = !1,
                    i = this.getEntries();
                if (void 0 !== t) {
                    if (isNaN(t)) throw new Error("Index must be a number");
                    if (t !== i.length && (t >= i.length || t < 0)) throw new Error("Index must be within current entries");
                    e = !0
                }
                return e
            }, h.prototype._beforeChange = function () {
                this._hasAddListener = 0 < this.listeners(o).length, this._hasRemoveListener = 0 < this.listeners(a).length, this._hasMoveListener = 0 < this.listeners(c).length, this._hasAddListener || this._hasRemoveListener || this._hasMoveListener ? this._beforeStructure = this._getStructure() : this._beforeStructure = null
            }, h.prototype._afterChange = function () {
                if (null !== this._beforeStructure) {
                    var t = this._getStructure(),
                        e = this._beforeStructure,
                        i = void 0,
                        n = void 0;
                    if (this._hasRemoveListener)
                        for (i in e)
                            for (n = 0; n < e[i].length; n++) void 0 !== t[i] && void 0 !== t[i][n] || this.emit(a, i, e[i][n]);
                    if (this._hasAddListener || this._hasMoveListener)
                        for (i in t)
                            if (void 0 === e[i])
                                for (n = 0; n < t[i].length; n++) this.emit(o, i, t[i][n]);
                            else
                                for (n = 0; n < t[i].length; n++) e[i][n] !== t[i][n] && (void 0 === e[i][n] ? this.emit(o, i, t[i][n]) : this.emit(c, i, t[i][n]))
                }
            }, h.prototype._getStructure = function () {
                var t = {},
                    e = void 0,
                    i = this._record.get();
                for (e = 0; e < i.length; e++) void 0 === t[i[e]] ? t[i[e]] = [e] : t[i[e]].push(e);
                return t
            }, e.exports = h
        }, {
            "../constants/constants": 11,
            "./record": 23,
            "component-emitter2": 1
        }],
        22: [function (t, e, i) {
            "use strict";
            var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                s = t("./record"),
                n = t("./anonymous-record"),
                r = t("./list"),
                o = t("../utils/listener"),
                a = t("../utils/single-notifier"),
                l = t("../constants/constants"),
                c = t("../message/message-parser"),
                d = t("../message/message-builder"),
                h = t("component-emitter2"),
                p = function (t, e, i) {
                    this._options = t, this._connection = e, this._client = i, this._records = {}, this._lists = {}, this._listener = {}, this._writeCallbacks = {}, this._destroyEventEmitter = new h, this._hasRegistry = new a(i, e, l.TOPIC.RECORD, l.ACTIONS.HAS, this._options.recordReadTimeout), this._snapshotRegistry = new a(i, e, l.TOPIC.RECORD, l.ACTIONS.SNAPSHOT, this._options.recordReadTimeout), this._headRegistry = new a(i, e, l.TOPIC.RECORD, l.ACTIONS.HEAD, this._options.recordReadTimeout)
                };
            p.prototype.recordNames = function () {
                return Object.keys(this._records)
            }, p.prototype.getRecord = function (t, e) {
                return this._records[t] || (this._records[t] = new s(t, e || {}, this._connection, this._options, this._client), this._records[t].on("error", this._onRecordError.bind(this, t)), this._records[t].on("destroyPending", this._onDestroyPending.bind(this, t)), this._records[t].on("delete", this._removeRecord.bind(this, t)), this._records[t].on("discard", this._removeRecord.bind(this, t))), this._records[t].usages++, this._records[t]
            }, p.prototype.getList = function (t, e) {
                return this._lists[t] ? this._records[t].usages++ : this._lists[t] = new r(this, t, e), this._lists[t]
            }, p.prototype.getAnonymousRecord = function () {
                return new n(this)
            }, p.prototype.listen = function (t, e) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument pattern");
                if ("function" != typeof e) throw new Error("invalid argument callback");
                !this._listener[t] || this._listener[t].destroyPending ? (this._listener[t] && this._listener[t].destroy(), this._listener[t] = new o(l.TOPIC.RECORD, t, e, this._options, this._client, this._connection)) : this._client._$onError(l.TOPIC.RECORD, l.EVENT.LISTENER_EXISTS, t)
            }, p.prototype.unlisten = function (t) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument pattern");
                var e = this._listener[t];
                e && !e.destroyPending ? e.sendDestroy() : this._listener[t] ? (this._listener[t].destroy(), delete this._listener[t]) : this._client._$onError(l.TOPIC.RECORD, l.EVENT.NOT_LISTENING, t)
            }, p.prototype.snapshot = function (i, t) {
                var n = this;
                if ("string" != typeof i || 0 === i.length) throw new Error("invalid argument: name");
                var e = this._records[i];
                return e && e.isReady ? t ? void t(null, e.get()) : Promise.resolve(e.get()) : t ? void this._snapshotRegistry.request(i, {
                    callback: t
                }) : new Promise(function (t, e) {
                    n._snapshotRegistry.request(i, {
                        resolve: t,
                        reject: e
                    })
                })
            }, p.prototype.has = function (i, t) {
                var n = this;
                if ("string" != typeof i || 0 === i.length) throw new Error("invalid argument: name");
                return this._records[i] ? t ? void t(null, !0) : Promise.resolve(!0) : t ? void this._hasRegistry.request(i, {
                    callback: t
                }) : new Promise(function (t, e) {
                    n._hasRegistry.request(i, {
                        resolve: t,
                        reject: e
                    })
                })
            }, p.prototype.head = function (i, t) {
                var n = this;
                if ("string" != typeof i || 0 === i.length) throw new Error("invalid argument: name");
                var e = this._records[i];
                return e && e.isReady ? t ? void t(null, e.version) : Promise.resolve(e.version) : t ? void this._headRegistry.request(i, {
                    callback: t
                }) : new Promise(function (t, e) {
                    n._headRegistry.request(i, {
                        resolve: t,
                        reject: e
                    })
                })
            }, p.prototype.setDataWithAck = function (t, n, s, e) {
                var r = this;
                if (s && e) this.setData(t, n, s, e);
                else {
                    if ("object" !== (void 0 === n ? "undefined" : u(n)) || !s) return n && s ? new Promise(function (e, i) {
                        r.setData(t, n, s, function (t) {
                            return null === t ? e() : i(t)
                        })
                    }) : new Promise(function (e, i) {
                        r.setData(t, n, function (t) {
                            return null === t ? e() : i(t)
                        })
                    });
                    this.setData(t, n, s)
                }
            }, p.prototype.setData = function (t, e, i, n) {
                var s = void 0,
                    r = void 0,
                    o = void 0;
                if (4 === arguments.length ? (s = e, r = i, o = n) : 3 === arguments.length ? "function" != typeof i ? (s = e, r = i) : (s = null, r = e, o = i) : 2 === arguments.length && (r = e), "string" != typeof t || 0 === t.length) throw new Error("invalid argument: recordName");
                if (n && "function" != typeof n) throw new Error("invalid argument: callback");
                if (s && ("string" != typeof s || 0 === s.length)) throw new Error("invalid argument: path");
                if (!s && (null === r || "object" !== (void 0 === r ? "undefined" : u(r)))) throw new Error("invalid argument: data must be an object when no path is provided");
                var a = this._records[t];
                if (a) s && o ? a.set(s, r, o) : s ? a.set(s, r) : o ? a.set(r, o) : a.set(r);
                else {
                    var c = s ? [t, -1, s, d.typed(r)] : [t, -1, r],
                        h = {};
                    o && (h.writeSuccess = !0, this._writeCallbacks[t] = {}, this._writeCallbacks[t][-1] = o), c.push(h), this._connection.sendMsg(l.TOPIC.RECORD, l.ACTIONS.CREATEANDUPDATE, c)
                }
            }, p.prototype._$handle = function (t) {
                var e = void 0;
                if (t.action === l.ACTIONS.ERROR && t.data[0] !== l.EVENT.VERSION_EXISTS && t.data[0] !== l.ACTIONS.SNAPSHOT && t.data[0] !== l.ACTIONS.HAS && t.data[0] !== l.ACTIONS.HEAD && t.data[0] !== l.EVENT.MESSAGE_DENIED) return t.processedError = !0, void this._client._$onError(l.TOPIC.RECORD, t.data[0], t.data[1]);
                if (t.action === l.ACTIONS.ACK || t.action === l.ACTIONS.ERROR) {
                    if (e = t.data[1], t.data[0] === l.ACTIONS.DELETE || t.data[0] === l.ACTIONS.UNSUBSCRIBE || t.data[0] === l.EVENT.MESSAGE_DENIED && t.data[2] === l.ACTIONS.DELETE) return this._destroyEventEmitter.emit("destroy_ack_" + e, t), void(t.data[0] === l.ACTIONS.DELETE && this._records[e] && this._records[e]._$onMessage(t));
                    if (t.data[0] === l.ACTIONS.SNAPSHOT) return t.processedError = !0, void this._snapshotRegistry.recieve(e, t.data[2]);
                    if (t.data[0] === l.ACTIONS.HAS) return t.processedError = !0, void this._hasRegistry.recieve(e, t.data[2]);
                    if (t.data[0] === l.ACTIONS.HEAD) return t.processedError = !0, void this._headRegistry.recieve(e, t.data[2])
                } else e = t.data[0];
                var i = !1,
                    n = this._records[e];
                n && (i = !0, n._$onMessage(t)), t.action === l.ACTIONS.READ && this._snapshotRegistry.hasRequest(e) ? (i = !0, this._snapshotRegistry.recieve(e, null, JSON.parse(t.data[2]))) : t.action === l.ACTIONS.HAS && this._hasRegistry.hasRequest(e) ? (i = !0, this._hasRegistry.recieve(e, null, c.convertTyped(t.data[1], this._client))) : t.action === l.ACTIONS.HEAD && this._headRegistry.hasRequest(e) ? (i = !0, this._headRegistry.recieve(e, null, Number(t.data[1]))) : t.action !== l.ACTIONS.WRITE_ACKNOWLEDGEMENT || n ? t.action === l.ACTIONS.ACK && t.data[0] === l.ACTIONS.UNLISTEN && this._listener[e] && this._listener[e].destroyPending ? (i = !0, this._listener[e].destroy(), delete this._listener[e]) : this._listener[e] ? (i = !0, this._listener[e]._$onMessage(t)) : t.action === l.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED ? i = !0 : t.action === l.ACTIONS.SUBSCRIPTION_HAS_PROVIDER && (i = !0) : (i = !0, s._handleWriteAcknowledgements(t, this._writeCallbacks[e], this._client)), i || (t.processedError = !0, this._client._$onError(l.TOPIC.RECORD, l.EVENT.UNSOLICITED_MESSAGE, e))
            }, p.prototype._onRecordError = function (t, e) {
                this._client._$onError(l.TOPIC.RECORD, e, t)
            }, p.prototype._onDestroyPending = function (t) {
                if (this._records[t]) {
                    var e = this._records[t]._$onMessage.bind(this._records[t]);
                    this._destroyEventEmitter.once("destroy_ack_" + t, e), this._removeRecord(t)
                } else this._client._$onError(l.TOPIC.RECORD, "Record attempted to be destroyed but does not exists", t)
            }, p.prototype._removeRecord = function (t) {
                delete this._records[t], delete this._lists[t]
            }, e.exports = p
        }, {
            "../constants/constants": 11,
            "../message/message-builder": 16,
            "../message/message-parser": 17,
            "../utils/listener": 28,
            "../utils/single-notifier": 30,
            "./anonymous-record": 19,
            "./list": 21,
            "./record": 23,
            "component-emitter2": 1
        }],
        23: [function (t, e, i) {
            "use strict";
            var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                l = t("./json-path"),
                r = t("../utils/resubscribe-notifier"),
                o = t("component-emitter2"),
                d = t("../constants/constants"),
                s = t("../message/message-builder"),
                a = t("../message/message-parser"),
                p = t("../utils/utils"),
                n = function (t, e, i, n, s) {
                    if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument name");
                    this.name = t, this.usages = 0, this._recordOptions = e, this._connection = i, this._client = s, this._options = n, this.isReady = !1, this.isDestroyed = !1, this.hasProvider = !1, this._$data = Object.create(null), this.version = null, this._eventEmitter = new o, this._queuedMethodCalls = [], this._writeCallbacks = {}, this._mergeStrategy = null, n.mergeStrategy && this.setMergeStrategy(n.mergeStrategy), this._ackTimeoutRegistry = s._$getAckTimeoutRegistry(), this._resubscribeNotifier = new r(this._client, this._sendRead.bind(this)), this._readAckTimeout = this._ackTimeoutRegistry.add({
                        topic: d.TOPIC.RECORD,
                        name: t,
                        action: d.ACTIONS.SUBSCRIBE,
                        timeout: this._options.recordReadAckTimeout
                    }), this._responseTimeout = this._ackTimeoutRegistry.add({
                        topic: d.TOPIC.RECORD,
                        name: t,
                        action: d.ACTIONS.READ,
                        event: d.EVENT.RESPONSE_TIMEOUT,
                        timeout: this._options.recordReadTimeout
                    }), this._sendRead()
                };
            o(n.prototype), n.prototype.setMergeStrategy = function (t) {
                if ("function" != typeof t) throw new Error("Invalid merge strategy: Must be a Function");
                this._mergeStrategy = t
            }, n.prototype.get = function (t) {
                return l.get(this._$data, t, this._options.recordDeepCopy)
            }, n.prototype.setWithAck = function (t, n, e) {
                var s = this;
                if (t && n && e) this.set(t, n, e);
                else {
                    if (!t || "function" != typeof n) return t && "object" === (void 0 === n ? "undefined" : h(n)) ? new Promise(function (e, i) {
                        s.set(t, n, function (t) {
                            return null === t ? e() : i(t)
                        })
                    }) : new Promise(function (e, i) {
                        s.set(t, function (t) {
                            return null === t ? e() : i(t)
                        })
                    });
                    this.set(t, n)
                }
            }, n.prototype.set = function (t, e, i) {
                var n = void 0,
                    s = void 0;
                if (1 === arguments.length) {
                    if ("object" !== (void 0 === t ? "undefined" : h(t))) throw new Error("invalid argument data");
                    s = t
                } else if (2 === arguments.length)
                    if ("string" == typeof t && 0 !== t.length && "function" != typeof e) n = t, s = e;
                    else {
                        if ("object" !== (void 0 === t ? "undefined" : h(t)) || "function" != typeof e) throw new Error("invalid argument path");
                        s = t, i = e
                    }
                else if (3 === arguments.length) {
                    if ("string" != typeof t || 0 === t.length || "function" != typeof i) throw new Error("invalid arguments, must pass in a string, a value and a function");
                    n = t, s = e
                }
                if (!n && (null === s || "object" !== (void 0 === s ? "undefined" : h(s)))) throw new Error("invalid arguments, scalar values cannot be set without path");
                if (this._checkDestroyed("set")) return this;
                if (!this.isReady) return this._queuedMethodCalls.push({
                    method: "set",
                    args: arguments
                }), this;
                var r = this._$data,
                    o = l.set(r, n, s, this._options.recordDeepCopy);
                if (r === o) {
                    if ("function" == typeof i) {
                        var a = null;
                        p.isConnected(this._client) || (a = "Connection error: error updating record as connection was closed"), p.requestIdleCallback(function () {
                            return i(a)
                        })
                    }
                    return this
                }
                var c = void 0;
                return "function" == typeof i && (c = {
                    writeSuccess: !0
                }, p.isConnected(this._client) ? this._setUpCallback(this.version, i) : p.requestIdleCallback(function () {
                    return i("Connection error: error updating record as connection was closed")
                })), this._sendUpdate(n, s, c), this._applyChange(o), this
            }, n.prototype.subscribe = function (t, e, i) {
                var n = this,
                    s = this._normalizeArguments(arguments);
                if (void 0 !== s.path && ("string" != typeof s.path || 0 === s.path.length)) throw new Error("invalid argument path");
                if ("function" != typeof s.callback) throw new Error("invalid argument callback");
                this._checkDestroyed("subscribe") || (s.triggerNow ? this.whenReady(function () {
                    n._eventEmitter.on(s.path, s.callback), s.callback(n.get(s.path))
                }) : this._eventEmitter.on(s.path, s.callback))
            }, n.prototype.unsubscribe = function (t, e) {
                var i = this._normalizeArguments(arguments);
                if (void 0 !== i.path && ("string" != typeof i.path || 0 === i.path.length)) throw new Error("invalid argument path");
                if (void 0 !== i.callback && "function" != typeof i.callback) throw new Error("invalid argument callback");
                this._checkDestroyed("unsubscribe") || this._eventEmitter.off(i.path, i.callback)
            }, n.prototype.discard = function () {
                var t = this;
                this._checkDestroyed("discard") || this.whenReady(function () {
                    t.usages--, t.usages <= 0 && (t.emit("destroyPending"), t._discardTimeout = t._ackTimeoutRegistry.add({
                        topic: d.TOPIC.RECORD,
                        name: t.name,
                        action: d.ACTIONS.UNSUBSCRIBE
                    }), t._connection.sendMsg(d.TOPIC.RECORD, d.ACTIONS.UNSUBSCRIBE, [t.name]))
                })
            }, n.prototype.delete = function () {
                var t = this;
                this._checkDestroyed("delete") || this.whenReady(function () {
                    t.emit("destroyPending"), t._deleteAckTimeout = t._ackTimeoutRegistry.add({
                        topic: d.TOPIC.RECORD,
                        name: t.name,
                        action: d.ACTIONS.DELETE,
                        event: d.EVENT.DELETE_TIMEOUT,
                        timeout: t._options.recordDeleteTimeout
                    }), t._connection.sendMsg(d.TOPIC.RECORD, d.ACTIONS.DELETE, [t.name])
                })
            }, n.prototype.whenReady = function (t) {
                var e = this;
                return !0 === this.isReady ? t ? void t(this) : Promise.resolve(this) : t ? void this.once("ready", t.bind(this, this)) : new Promise(function (t) {
                    return e.once("ready", t.bind(e, e))
                })
            }, n.prototype._$onMessage = function (t) {
                if (t.action === d.ACTIONS.READ) null === this.version ? (this._ackTimeoutRegistry.clear(t), this._onRead(t)) : this._applyUpdate(t, this._client);
                else if (t.action === d.ACTIONS.ACK) this._processAckMessage(t);
                else if (t.action === d.ACTIONS.UPDATE || t.action === d.ACTIONS.PATCH) this._applyUpdate(t, this._client);
                else if (t.action === d.ACTIONS.WRITE_ACKNOWLEDGEMENT) n._handleWriteAcknowledgements(t, this._writeCallbacks, this._client);
                else if (t.data[0] === d.EVENT.VERSION_EXISTS) this._recoverRecord(t.data[2], JSON.parse(t.data[3]), t);
                else if (t.data[0] === d.EVENT.MESSAGE_DENIED) this._clearTimeouts();
                else if (t.action === d.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
                    var e = a.convertTyped(t.data[1], this._client);
                    this.hasProvider = e, this.emit("hasProviderChanged", e)
                }
            }, n._handleWriteAcknowledgements = function (t, e, i) {
                for (var n = JSON.parse(t.data[1]), s = 0; s < n.length; s++) {
                    var r = e[n[s]];
                    void 0 !== r && (r(a.convertTyped(t.data[2], i)), delete e[n[s]])
                }
            }, n.prototype._recoverRecord = function (t, e, i) {
                i.processedError = !0, this._mergeStrategy ? this._mergeStrategy(this, e, t, this._onRecordRecovered.bind(this, t, e, i)) : this.emit("error", d.EVENT.VERSION_EXISTS, "received update for " + t + " but version is " + this.version)
            }, n.prototype._sendUpdate = function (t, e, i) {
                this.version++;
                var n = void 0;
                t ? (n = void 0 === i ? [this.name, this.version, t, s.typed(e)] : [this.name, this.version, t, s.typed(e), i], this._connection.sendMsg(d.TOPIC.RECORD, d.ACTIONS.PATCH, n)) : (n = void 0 === i ? [this.name, this.version, e] : [this.name, this.version, e, i], this._connection.sendMsg(d.TOPIC.RECORD, d.ACTIONS.UPDATE, n))
            }, n.prototype._onRecordRecovered = function (t, e, i, n, s) {
                if (n) this.emit("error", d.EVENT.VERSION_EXISTS, "received update for " + t + " but version is " + this.version);
                else {
                    var r = this.version;
                    this.version = t;
                    var o = this._$data;
                    if (p.deepEquals(o, e)) return;
                    var a = l.set(o, void 0, s, !1);
                    if (p.deepEquals(s, e)) {
                        this._applyChange(s);
                        var c = this._writeCallbacks[t];
                        return void(void 0 !== c && (c(null), delete this._writeCallbacks[t]))
                    }
                    var h = i.data[4];
                    if (h && JSON.parse(h).writeSuccess) {
                        var u = this._writeCallbacks[r];
                        delete this._writeCallbacks[r], this._setUpCallback(this.version, u)
                    }
                    this._sendUpdate(void 0, s, h), this._applyChange(a)
                }
            }, n.prototype._processAckMessage = function (t) {
                var e = t.data[0];
                e === d.ACTIONS.SUBSCRIBE ? this._ackTimeoutRegistry.clear(t) : e === d.ACTIONS.DELETE ? (this.emit("delete"), this._destroy()) : e === d.ACTIONS.UNSUBSCRIBE && (this.emit("discard"), this._destroy())
            }, n.prototype._applyUpdate = function (t) {
                var e = parseInt(t.data[1], 10),
                    i = void 0;
                if (i = t.action === d.ACTIONS.PATCH ? a.convertTyped(t.data[3], this._client) : JSON.parse(t.data[2]), null === this.version) this.version = e;
                else if (this.version + 1 !== e) return void(t.action === d.ACTIONS.PATCH ? this._connection.sendMsg(d.TOPIC.RECORD, d.ACTIONS.SNAPSHOT, [this.name]) : this._recoverRecord(e, i, t));
                this.version = e, this._applyChange(l.set(this._$data, t.action === d.ACTIONS.PATCH ? t.data[2] : void 0, i))
            }, n.prototype._onRead = function (t) {
                this.version = parseInt(t.data[1], 10), this._applyChange(l.set(this._$data, void 0, JSON.parse(t.data[2]))), this._setReady()
            }, n.prototype._setReady = function () {
                this.isReady = !0;
                for (var t = 0; t < this._queuedMethodCalls.length; t++) this[this._queuedMethodCalls[t].method].apply(this, this._queuedMethodCalls[t].args);
                this._queuedMethodCalls = [], this.emit("ready")
            }, n.prototype._setUpCallback = function (t, e) {
                var i = Number(this.version) + 1;
                this._writeCallbacks[i] = e
            }, n.prototype._sendRead = function () {
                this._connection.sendMsg(d.TOPIC.RECORD, d.ACTIONS.CREATEORREAD, [this.name])
            }, n.prototype._applyChange = function (t) {
                if (!this.isDestroyed) {
                    var e = this._$data;
                    this._$data = t;
                    for (var i = this._eventEmitter.eventNames(), n = 0; n < i.length; n++) {
                        l.get(t, i[n], !1) !== l.get(e, i[n], !1) && this._eventEmitter.emit(i[n], this.get(i[n]))
                    }
                }
            }, n.prototype._normalizeArguments = function (t) {
                if (1 === t.length && "object" === h(t[0])) return t[0];
                for (var e = Object.create(null), i = 0; i < t.length; i++) "string" == typeof t[i] ? e.path = t[i] : "function" == typeof t[i] ? e.callback = t[i] : "boolean" == typeof t[i] && (e.triggerNow = t[i]);
                return e
            }, n.prototype._clearTimeouts = function () {
                this._ackTimeoutRegistry.remove({
                    ackId: this._readAckTimeout,
                    silent: !0
                }), this._ackTimeoutRegistry.remove({
                    ackId: this._responseTimeout,
                    silent: !0
                }), this._ackTimeoutRegistry.remove({
                    ackId: this._deleteAckTimeout,
                    silent: !0
                }), this._ackTimeoutRegistry.remove({
                    ackId: this._discardTimeout,
                    silent: !0
                })
            }, n.prototype._checkDestroyed = function (t) {
                return !!this.isDestroyed && (this.emit("error", "Can't invoke '" + t + "'. Record '" + this.name + "' is already destroyed"), !0)
            }, n.prototype._destroy = function () {
                this._clearTimeouts(), this._eventEmitter.off(), this._resubscribeNotifier.destroy(), this.isDestroyed = !0, this.isReady = !1, this._client = null, this._eventEmitter = null, this._connection = null
            }, e.exports = n
        }, {
            "../constants/constants": 11,
            "../message/message-builder": 16,
            "../message/message-parser": 17,
            "../utils/resubscribe-notifier": 29,
            "../utils/utils": 31,
            "./json-path": 20,
            "component-emitter2": 1
        }],
        24: [function (t, e, i) {
            "use strict";
            var o = t("../constants/constants"),
                n = t("../utils/resubscribe-notifier"),
                r = t("./rpc-response"),
                a = t("./rpc"),
                c = t("../message/message-parser"),
                h = t("../message/message-builder"),
                s = function (t, e, i) {
                    this._options = t, this._connection = e, this._client = i, this._rpcs = {}, this._providers = {}, this._ackTimeoutRegistry = i._$getAckTimeoutRegistry(), this._resubscribeNotifier = new n(this._client, this._reprovide.bind(this))
                };
            s.prototype.providerNames = function () {
                return Object.keys(this._providers)
            }, s.prototype.provide = function (t, e) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument name");
                if (this._providers[t]) throw new Error("RPC " + t + " already registered");
                if ("function" != typeof e) throw new Error("invalid argument callback");
                this._ackTimeoutRegistry.add({
                    topic: o.TOPIC.RPC,
                    name: t,
                    action: o.ACTIONS.SUBSCRIBE
                }), this._providers[t] = e, this._connection.sendMsg(o.TOPIC.RPC, o.ACTIONS.SUBSCRIBE, [t])
            }, s.prototype.unprovide = function (t) {
                if ("string" != typeof t || 0 === t.length) throw new Error("invalid argument name");
                this._providers[t] && (delete this._providers[t], this._ackTimeoutRegistry.add({
                    topic: o.TOPIC.RPC,
                    name: t,
                    action: o.ACTIONS.UNSUBSCRIBE
                }), this._connection.sendMsg(o.TOPIC.RPC, o.ACTIONS.UNSUBSCRIBE, [t]))
            }, s.prototype.make = function (i, t, e) {
                var n = this;
                if ("string" != typeof i || 0 === i.length) throw new Error("invalid argument name");
                var s = this._client.getUid(),
                    r = h.typed(t);
                if (this._connection.sendMsg(o.TOPIC.RPC, o.ACTIONS.REQUEST, [i, s, r]), !e || "function" != typeof e) return new Promise(function (t, e) {
                    n._rpcs[s] = new a(i, {
                        resolve: t,
                        reject: e
                    }, n._options, n._client)
                });
                this._rpcs[s] = new a(i, {
                    callback: e
                }, this._options, this._client)
            }, s.prototype._getRpc = function (t, e, i) {
                var n = this._rpcs[t];
                return n || (this._client._$onError(o.TOPIC.RPC, o.EVENT.UNSOLICITED_MESSAGE, i), null)
            }, s.prototype._respondToRpc = function (t) {
                var e = t.data[0],
                    i = t.data[1],
                    n = null,
                    s = void 0;
                t.data[2] && (n = c.convertTyped(t.data[2], this._client)), this._providers[e] ? (s = new r(this._connection, e, i), this._providers[e](n, s)) : this._connection.sendMsg(o.TOPIC.RPC, o.ACTIONS.REJECTION, [e, i])
            }, s.prototype._$handle = function (t) {
                var e = void 0,
                    i = void 0;
                if (t.action !== o.ACTIONS.REQUEST)
                    if (t.action !== o.ACTIONS.ACK || t.data[0] !== o.ACTIONS.SUBSCRIBE && t.data[0] !== o.ACTIONS.UNSUBSCRIBE) {
                        if (t.action === o.ACTIONS.ERROR) {
                            if (t.data[0] === o.EVENT.MESSAGE_PERMISSION_ERROR) return;
                            if (t.data[0] === o.EVENT.MESSAGE_DENIED && t.data[2] === o.ACTIONS.SUBSCRIBE) return void this._ackTimeoutRegistry.remove({
                                topic: o.TOPIC.RPC,
                                action: o.ACTIONS.SUBSCRIBE,
                                name: t.data[1]
                            })
                        }
                        t.action === o.ACTIONS.ERROR || t.action === o.ACTIONS.ACK ? (i = t.data[0] === o.EVENT.MESSAGE_DENIED && t.data[2] === o.ACTIONS.REQUEST ? t.data[3] : t.data[2], e = t.data[1]) : (e = t.data[0], i = t.data[1]);
                        var n = this._getRpc(i, e, t.raw);
                        null !== n && (t.action === o.ACTIONS.ACK ? n.ack() : t.action === o.ACTIONS.RESPONSE ? (n.respond(t.data[2]), delete this._rpcs[i]) : t.action === o.ACTIONS.ERROR && (t.processedError = !0, n.error(t.data[0]), delete this._rpcs[i]))
                    } else this._ackTimeoutRegistry.clear(t);
                else this._respondToRpc(t)
            }, s.prototype._reprovide = function () {
                for (var t in this._providers) this._connection.sendMsg(o.TOPIC.RPC, o.ACTIONS.SUBSCRIBE, [t])
            }, e.exports = s
        }, {
            "../constants/constants": 11,
            "../message/message-builder": 16,
            "../message/message-parser": 17,
            "../utils/resubscribe-notifier": 29,
            "./rpc": 26,
            "./rpc-response": 25
        }],
        25: [function (t, e, i) {
            "use strict";
            var n = t("../constants/constants"),
                s = t("../utils/utils"),
                r = t("../message/message-builder"),
                o = function (t, e, i) {
                    this._connection = t, this._name = e, this._correlationId = i, this._isAcknowledged = !1, this._isComplete = !1, this.autoAck = !0, s.nextTick(this._performAutoAck.bind(this))
                };
            o.prototype.ack = function () {
                !1 === this._isAcknowledged && (this._connection.sendMsg(n.TOPIC.RPC, n.ACTIONS.ACK, [n.ACTIONS.REQUEST, this._name, this._correlationId]), this._isAcknowledged = !0)
            }, o.prototype.reject = function () {
                this.autoAck = !1, this._isComplete = !0, this._isAcknowledged = !0, this._connection.sendMsg(n.TOPIC.RPC, n.ACTIONS.REJECTION, [this._name, this._correlationId])
            }, o.prototype.error = function (t) {
                this.autoAck = !1, this._isComplete = !0, this._isAcknowledged = !0, this._connection.sendMsg(n.TOPIC.RPC, n.ACTIONS.ERROR, [t, this._name, this._correlationId])
            }, o.prototype.send = function (t) {
                if (!0 === this._isComplete) throw new Error("Rpc " + this._name + " already completed");
                this.ack();
                var e = r.typed(t);
                this._connection.sendMsg(n.TOPIC.RPC, n.ACTIONS.RESPONSE, [this._name, this._correlationId, e]), this._isComplete = !0
            }, o.prototype._performAutoAck = function () {
                !0 === this.autoAck && this.ack()
            }, e.exports = o
        }, {
            "../constants/constants": 11,
            "../message/message-builder": 16,
            "../utils/utils": 31
        }],
        26: [function (t, e, i) {
            "use strict";
            var s = t("../constants/constants"),
                n = t("../message/message-parser"),
                r = function (t, e, i, n) {
                    this._options = i, this._response = e, this._client = n, this._ackTimeoutRegistry = n._$getAckTimeoutRegistry(), this._ackTimeout = this._ackTimeoutRegistry.add({
                        topic: s.TOPIC.RPC,
                        action: s.ACTIONS.ACK,
                        name: t,
                        timeout: this._options.rpcAckTimeout,
                        callback: this.error.bind(this)
                    }), this._responseTimeout = this._ackTimeoutRegistry.add({
                        topic: s.TOPIC.RPC,
                        action: s.ACTIONS.REQUEST,
                        name: t,
                        event: s.EVENT.RESPONSE_TIMEOUT,
                        timeout: this._options.rpcResponseTimeout,
                        callback: this.error.bind(this)
                    })
                };
            r.prototype.ack = function () {
                this._ackTimeoutRegistry.remove({
                    ackId: this._ackTimeout
                })
            }, r.prototype.respond = function (t) {
                var e = n.convertTyped(t, this._client);
                this._response.callback ? this._response.callback(null, e) : this._response.resolve(e), this._complete()
            }, r.prototype.error = function (t) {
                this._response.callback ? this._response.callback(t.event || t) : this._response.reject(t.event || t), this._complete()
            }, r.prototype._complete = function () {
                this._ackTimeoutRegistry.remove({
                    ackId: this._ackTimeout
                }), this._ackTimeoutRegistry.remove({
                    ackId: this._responseTimeout
                })
            }, e.exports = r
        }, {
            "../constants/constants": 11,
            "../message/message-parser": 17
        }],
        27: [function (t, e, i) {
            "use strict";
            var n = t("../constants/constants"),
                s = function (t, e) {
                    this._options = e, this._client = t, this._register = {}, this._counter = 1, t.on("connectionStateChanged", this._onConnectionStateChanged.bind(this))
                };
            t("component-emitter2")(s.prototype), s.prototype.add = function (t) {
                var e = t.timeout || this._options.subscriptionTimeout;
                return this._client.getConnectionState() !== n.CONNECTION_STATE.OPEN || e < 1 ? -1 : (this.remove(t), t.ackId = this._counter++, t.event = t.event || n.EVENT.ACK_TIMEOUT, t.__timeout = setTimeout(this._onTimeout.bind(this, t), e), (this._register[this._getUniqueName(t)] = t).ackId)
            }, s.prototype.remove = function (t) {
                if (t.ackId)
                    for (var e in this._register) t.ackId === this._register[e].ackId && this.clear({
                        topic: this._register[e].topic,
                        action: this._register[e].action,
                        data: [this._register[e].name]
                    });
                this._register[this._getUniqueName(t)] && this.clear({
                    topic: t.topic,
                    action: t.action,
                    data: [t.name]
                })
            }, s.prototype.clear = function (t) {
                var e = void 0;
                e = t.action === n.ACTIONS.ACK && 1 < t.data.length ? t.topic + t.data[0] + (t.data[1] ? t.data[1] : "") : t.topic + t.action + t.data[0], this._register[e] && clearTimeout(this._register[e].__timeout), delete this._register[e]
            }, s.prototype._onTimeout = function (t) {
                if (delete this._register[this._getUniqueName(t)], t.callback) delete t.__timeout, delete t.timeout, t.callback(t);
                else {
                    var e = "No ACK message received in time" + (t.name ? " for " + t.name : "");
                    this._client._$onError(t.topic, t.event, e)
                }
            }, s.prototype._getUniqueName = function (t) {
                return t.topic + t.action + (t.name ? t.name : "")
            }, s.prototype._onConnectionStateChanged = function (t) {
                if (t !== n.CONNECTION_STATE.OPEN)
                    for (var e in this._register) clearTimeout(this._register[e].__timeout)
            }, e.exports = s
        }, {
            "../constants/constants": 11,
            "component-emitter2": 1
        }],
        28: [function (t, e, i) {
            "use strict";
            var o = t("../constants/constants"),
                a = t("./resubscribe-notifier"),
                n = function (t, e, i, n, s, r) {
                    this._topic = t, this._callback = i, this._pattern = e, this._options = n, this._client = s, this._connection = r, this._ackTimeoutRegistry = s._$getAckTimeoutRegistry(), this._ackTimeoutRegistry.add({
                        topic: this._topic,
                        name: e,
                        action: o.ACTIONS.LISTEN
                    }), this._resubscribeNotifier = new a(s, this._sendListen.bind(this)), this._sendListen(), this.destroyPending = !1
                };
            n.prototype.sendDestroy = function () {
                this.destroyPending = !0, this._connection.sendMsg(this._topic, o.ACTIONS.UNLISTEN, [this._pattern]), this._resubscribeNotifier.destroy()
            }, n.prototype.destroy = function () {
                this._callback = null, this._pattern = null, this._client = null, this._connection = null
            }, n.prototype.accept = function (t) {
                this._connection.sendMsg(this._topic, o.ACTIONS.LISTEN_ACCEPT, [this._pattern, t])
            }, n.prototype.reject = function (t) {
                this._connection.sendMsg(this._topic, o.ACTIONS.LISTEN_REJECT, [this._pattern, t])
            }, n.prototype._createCallbackResponse = function (t) {
                return {
                    accept: this.accept.bind(this, t.data[1]),
                    reject: this.reject.bind(this, t.data[1])
                }
            }, n.prototype._$onMessage = function (t) {
                t.action === o.ACTIONS.ACK ? this._ackTimeoutRegistry.clear(t) : t.action === o.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND ? this._callback(t.data[1], !0, this._createCallbackResponse(t)) : t.action === o.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED ? this._callback(t.data[1], !1) : this._client._$onError(this._topic, o.EVENT.UNSOLICITED_MESSAGE, t.data[0] + "|" + t.data[1])
            }, n.prototype._sendListen = function () {
                this._connection.sendMsg(this._topic, o.ACTIONS.LISTEN, [this._pattern])
            }, e.exports = n
        }, {
            "../constants/constants": 11,
            "./resubscribe-notifier": 29
        }],
        29: [function (t, e, i) {
            "use strict";
            var n = t("../constants/constants"),
                s = function (t, e) {
                    this._client = t, this._resubscribe = e, this._isReconnecting = !1, this._connectionStateChangeHandler = this._handleConnectionStateChanges.bind(this), this._client.on("connectionStateChanged", this._connectionStateChangeHandler)
                };
            s.prototype.destroy = function () {
                this._client.removeListener("connectionStateChanged", this._connectionStateChangeHandler), this._connectionStateChangeHandler = null, this._client = null
            }, s.prototype._handleConnectionStateChanges = function () {
                var t = this._client.getConnectionState();
                t === n.CONNECTION_STATE.RECONNECTING && !1 === this._isReconnecting && (this._isReconnecting = !0), t === n.CONNECTION_STATE.OPEN && !0 === this._isReconnecting && (this._isReconnecting = !1, this._resubscribe())
            }, e.exports = s
        }, {
            "../constants/constants": 11
        }],
        30: [function (t, e, i) {
            "use strict";
            var o = t("../constants/constants"),
                r = t("./resubscribe-notifier"),
                n = function (t, e, i, n, s) {
                    this._client = t, this._connection = e, this._topic = i, this._action = n, this._timeoutDuration = s, this._requests = {}, this._ackTimeoutRegistry = t._$getAckTimeoutRegistry(), this._resubscribeNotifier = new r(this._client, this._resendRequests.bind(this)), this._onResponseTimeout = this._onResponseTimeout.bind(this)
                };
            n.prototype.hasRequest = function (t) {
                return !!this._requests[t]
            }, n.prototype.request = function (t, e) {
                this._requests[t] || (this._requests[t] = [], this._connection.sendMsg(this._topic, this._action, [t]));
                var i = this._ackTimeoutRegistry.add({
                    topic: this._topic,
                    event: o.EVENT.RESPONSE_TIMEOUT,
                    name: t,
                    action: this._action,
                    timeout: this._timeoutDuration,
                    callback: this._onResponseTimeout
                });
                this._requests[t].push({
                    response: e,
                    ackId: i
                })
            }, n.prototype.recieve = function (t, e, i) {
                var n = this._requests[t];
                if (n) {
                    for (var s = 0; s < n.length; s++) {
                        var r = n[s];
                        this._ackTimeoutRegistry.remove({
                            ackId: r.ackId
                        }), r.response.callback ? r.response.callback(e, i) : e ? r.response.reject(i) : r.response.resolve(i)
                    }
                    delete this._requests[t]
                } else this._client._$onError(this._topic, o.EVENT.UNSOLICITED_MESSAGE, "no entry for " + t)
            }, n.prototype._onResponseTimeout = function (t) {
                var e = "No response received in time for " + this._topic + "|" + this._action + "|" + t.name;
                this._client._$onError(this._topic, o.EVENT.RESPONSE_TIMEOUT, e)
            }, n.prototype._resendRequests = function () {
                for (var t in this._requests) this._connection.sendMsg(this._topic, this._action, [t])
            }, e.exports = n
        }, {
            "../constants/constants": 11,
            "./resubscribe-notifier": 29
        }],
        31: [function (t, e, h) {
            (function (e) {
                "use strict";
                var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    } : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    i = t("../constants/constants"),
                    n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                    r = "object";
                h.isNode = void 0 !== e && "[object process]" === e.toString(), h.nextTick = function (t) {
                    h.isNode ? e.nextTick(t) : setTimeout(t, 0)
                }, h.trim = function (t) {
                    return t.trim ? t.trim() : t.replace(n, "")
                }, h.deepEquals = function (t, e) {
                    return t === e || (void 0 === t ? "undefined" : s(t)) === r && (void 0 === e ? "undefined" : s(e)) === r && JSON.stringify(t) === JSON.stringify(e)
                }, h.deepCopy = function (t) {
                    return (void 0 === t ? "undefined" : s(t)) === r ? JSON.parse(JSON.stringify(t)) : t
                }, h.shallowCopy = function (t) {
                    if (Array.isArray(t)) return t.slice(0);
                    if ((void 0 === t ? "undefined" : s(t)) === r) {
                        for (var e = Object.create(null), i = Object.keys(t), n = 0; n < i.length; n++) e[i[n]] = t[i[n]];
                        return e
                    }
                    return t
                }, h.setTimeout = function (t, e) {
                    return null !== e ? setTimeout(t, e) : -1
                }, h.setInterval = function (t, e) {
                    return null !== e ? setInterval(t, e) : -1
                }, h.requestIdleCallback = !h.isNode && self.requestIdleCallback && self.requestIdleCallback.bind(self) || function (t) {
                    var e = Date.now();
                    return setTimeout(function () {
                        t({
                            didTimeout: !1,
                            timeRemaining: function () {
                                return Math.max(0, 50 - (Date.now() - e))
                            }
                        })
                    }, 1)
                }, h.cancelIdleCallback = !h.isNode && self.cancelIdleCallback && self.cancelIdleCallback.bind(self) || function (t) {
                    clearTimeout(t)
                };
                var o = /^wss:|^ws:|^\/\//,
                    a = /^http:|^https:/,
                    c = t("url");
                h.parseUrl = function (t, e) {
                    var i = t;
                    if (a.test(i)) throw new Error("Only ws and wss are supported");
                    o.test(i) ? 0 === i.indexOf("//") && (i = "ws:" + i) : i = "ws://" + i;
                    var n = c.parse(i);
                    if (!n.host) throw new Error("invalid url, missing host");
                    return n.protocol = n.protocol ? n.protocol : "ws:", "/" === n.pathname && "/" !== t.charAt(t.length - 1) && (n.pathname = e), n.pathname = n.pathname ? n.pathname : e, c.format(n)
                }, h.isConnected = function (t) {
                    return t.getConnectionState() === i.CONNECTION_STATE.OPEN
                }
            }).call(this, t("_process"))
        }, {
            "../constants/constants": 11,
            _process: 3,
            url: 8
        }]
    }, {}, [10])(10)
});