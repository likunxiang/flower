"use strict";
var class2type = {},
	toString = class2type.toString,
	hasOwn = class2type.hasOwnProperty;

function type(e) {
	return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? class2type[toString.call(e)] ||
		"object" : typeof e
}

function isFunction(e) {
	return "function" === type(e)
}

function isArray(e) {
	return Array.isArray ? Array.isArray(e) : "array" === type(e)
}

function isPlainObject(e) {
	var t;
	if (!e || "object" !== type(e)) return !1;
	try {
		if (e.constructor && !hasOwn.call(e, "constructor") && !hasOwn.call(e.constructor.prototype, "isPrototypeOf"))
			return !1
	} catch (e) {
		return !1
	}
	for (t in e);
	return void 0 === t || hasOwn.call(e, t)
}

function extend() {
	for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
	var n, o, i, r, a, s, c = e[0] || {},
		f = 1,
		g = e.length,
		u = !1;
	for ("boolean" == typeof c && (u = c, c = e[f] || {}, f++), "object" != typeof c && isFunction(c) && (c = {}); f <
		g; f++)
		if (null != (a = e[f]))
			for (r in a) n = c[r], c !== (i = a[r]) && (u && i && (isPlainObject(i) || (o = isArray(i))) ? (s = o ? (
					o = !1, n && isArray(n) ? n : []) : n && isPlainObject(n) ? n : {}, c[r] = extend(u, s, i)) :
				void 0 !== i && (c[r] = i));
	return c
}

function isJSONString(e) {
	try {
		JSON.parse(e)
	} catch (e) {
		return !1
	}
	return !0
}
var EventType, log = {
		debug: !1,
		init: function(e) {
			this.debug = e.config.debug
		},
		log: function(e) {
			this.debug && console.log(e)
		},
		info: function(e) {
			this.debug && console.info(e)
		},
		error: function(e) {
			this.debug && console.error(e)
		}
	},
	localStorage = {
		data: {
			openid: "",
			systemInfo: null
		},
		init: function() {
			try {
				var e = wx.getStorageSync("__QDTracker__");
				e ? isJSONString(e) && (this.data = JSON.parse(e)) : wx.setStorageSync("__QDTracker__", JSON
					.stringify({}))
			} catch (e) {
				log.error(e)
			}
		},
		setValue: function(e, t) {
			this.data[e] = t
		},
		getValue: function(e) {
			return this.data[e] || ""
		},
		getCache: function() {
			return this.data
		},
		save: function() {
			try {
				return wx.setStorageSync("__QDTracker__", JSON.stringify(this.data)), !0
			} catch (e) {
				return log.error(e), !1
			}
		}
	};

function getSystemInfo() {
	try {
		return wx.getSystemInfoSync() || null
	} catch (e) {
		return log.error(e), null
	}
}

function login(t) {
	return new Promise(function(o, i) {
		wx.login({
			success: function(e) {
				wx.request({
					url: t.apiHost + "/mp/wx/getOpenId",
					method: "GET",
					data: {
						appid: t.appid,
						kfuin: t.kfuin,
						js_code: e.code
					},
					success: function(e) {
						var t = e.data || {
							code: -1,
							msg: "network error"
						};
						if (log.info(t), 0 === t.code) {
							var n = t.data || {};
							n.openid && n.session_key ? o(n) : i({
								errMsg: t.msg || "network error"
							})
						} else i({
							errMsg: t.msg || "network error"
						})
					},
					fail: function(e) {
						log.error(e), i(e)
					}
				})
			},
			fail: function(e) {
				i(e)
			}
		})
	})
}

function eventProxy(e, t, n) {
	if (e[t]) {
		var o = e[t];
		e[t] = function(e) {
			n.call(this, e, t), o.call(this, e)
		}
	} else e[t] = function(e) {
		n.call(this, e, t)
	}
}

function appLaunch(e) {
	return function() {
		this.QDTracker = e, this.sendEvent = function() {
			this.QDTracker.sendEvent.apply(e, arguments)
		}
	}
}

function appShow(t) {
	return function(e) {
		t.setConfig("scene", e.scene), t.setConfig("referrerInfo", e.referrerInfo)
	}
}

function appHide(e) {
	return function() {
		e.track(EventType.HIDE)
	}
}

function getUrl() {
	var e = getCurrentPages();
	if (e.length) {
		var t = e[e.length - 1],
			n = t.route,
			o = t.options || {},
			i = "";
		for (var r in o) o.hasOwnProperty(r) && ("" === i ? i = "?" + r + "=" + o[r] : i += "&" + r + "=" + o[r]);
		return "" + n + i
	}
	return ""
}

function pageLoad() {
	return function() {}
}

function pageUnload() {
	return function() {}
}

function pageShow(e) {
	return function() {
		e.setConfig("pageTitle", this.data.qdt && this.data.qdt.title || ""), e.setConfig("pageUrl", getUrl()), e
			.track(EventType.PV)
	}
}

function pageShare(n, o) {
	function i(e, t) {
		o.setConfig("pageTitle", n.data.qdt && n.data.qdt.title || ""), o.setConfig("pageUrl", getUrl()), o.track(
			EventType.SHARE, {
				shareTitle: e,
				shareUrl: t
			})
	}
	if (n.onShareAppMessage) {
		var r = n.onShareAppMessage;
		n.onShareAppMessage = function(e) {
			var t = r.call(n, e);
			return i(t.title, t.path), t
		}
	} else n.onShareAppMessage = function() {
		return i(), {}
	}
}

function pageHide() {
	return function() {}
}! function(e) {
	e[e.PV = 1] = "PV", e[e.CLICK = 2] = "CLICK", e[e.EVT = 3] = "EVT", e[e.SHARE = 4] = "SHARE", e[e.HIDE = 5] = "HIDE"
}(EventType = EventType || {});
var VERSION = "1.0.0";
localStorage.init();
var QDTracker = {
		config: {
			debug: !1,
			disableCache: !1,
			apiHost: "",//"https://admin.qidian.qq.com"
			version: VERSION,
			appid: "",
			kfuin: "",
			openid: "",
			isGetOpenIdComplete: !1,
			isGetSystemInfoComplete: !1
		},
		init: function(e) {
			void 0 === e && (e = {
				apiHost: "",
				appid: "",
				kfuin: ""
			}), extend(!0, this.config, e);
			var t = localStorage.getCache(),
				n = this.getConfig("disableCache");
			n || extend(!0, this.config, t), !n && t.openid && this.setConfig("isGetOpenIdComplete", !0), !n && t
				.systemInfo && this.setConfig("isGetSystemInfoComplete", !0), log.init(this)
		},
		precheck: function() {
			var i = this;
			return new Promise(function(t, n) {
				var e = i.getConfig("isGetOpenIdComplete");
				if (!i.getConfig("isGetSystemInfoComplete")) {
					var o = getSystemInfo();
					o && (i.setConfig("systemInfo", o), i.setConfig("isGetSystemInfoComplete", !0),
						localStorage.setValue("systemInfo", o), localStorage.save())
				}
				e ? t() : login({
					apiHost: i.getConfig("apiHost"),
					appid: i.getConfig("appid"),
					kfuin: i.getConfig("kfuin")
				}).then(function(e) {
					i.setConfig("openid", e.openid), i.setConfig("sessionKey", e.session_key), i
						.setConfig("isGetOpenIdComplete", !0), localStorage.setValue("openid", e
							.openid), localStorage.save(), t()
				}).catch(function(e) {
					n(e)
				})
			})
		},
		track: function(t, n, o) {
			var i = this,
				r = this;
			r.precheck().then(function() {
				var e = {
					kfuin: r.getConfig("kfuin"),
					appid: r.getConfig("appid"),
					openid: r.getConfig("openid"),
					title: r.getConfig("pageTitle") || "",
					url: r.getConfig("pageUrl") || "",
					eventtp: t,
					version: r.getConfig("version"),
					systemInfo: JSON.stringify(r.getConfig("systemInfo")),
					scene: r.getConfig("scene"),
					referrerInfo: JSON.stringify(r.getConfig("referrerInfo")),
					extraData: JSON.stringify(n || {})
				};
				r.send(e, o)
			}).catch(function(e) {
				i.config.debug && wx.showToast({
					title: "??????????????????????????????????????????????????????",
					icon: "none",
					duration: 5e3,
					mask: !0
				}), log.error(e)
			})
		},
		sendEvent: function(e, t, n, o) {
			this.track(EventType.EVT, {
				category: e,
				action: t,
				label: n
			}, o)
		},
		click: function(e, t) {
			this.track(EventType.CLICK, e, t)
		},
		send: function(e, t) {
			var n = this,
				o = 0,
				i = function() {
					wx.request({
						url: n.getConfig("apiHost") + "/ar/actCap/miniPrgRpt?kfuin=" + n.getConfig("kfuin"),
						method: "POST",
						header: {
							"content-type": "application/x-www-form-urlencoded"
						},
						data: e,
						success: function(e) {
							log.info(e), t && t()
						},
						fail: function(e) {
							log.error(e), o < 3 && (o++, i())
						}
					})
				};
			i()
		},
		getConfig: function(e) {
			return this.config[e]
		},
		setConfig: function(e, t) {
			this.config[e] = t
		}
	},
	app = App,
	page = Page;
App = function(e) {
	eventProxy(e, "onLaunch", appLaunch(QDTracker)), eventProxy(e, "onShow", appShow(QDTracker)), eventProxy(e,
		"onHide", appHide(QDTracker)), app(e)
}, Page = function(e) {
	eventProxy(e, "onLoad", pageLoad()), eventProxy(e, "onUnload", pageUnload()), eventProxy(e, "onShow", pageShow(
		QDTracker)), pageShare(e, QDTracker), eventProxy(e, "onHide", pageHide()), page(e)
}, module.exports = QDTracker;
