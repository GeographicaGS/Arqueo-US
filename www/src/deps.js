var deps = {};

deps.templateFolder = "js/template";
deps.JS = {
	ThirdParty:{
		src: [
			"js/lib/jquery-2.0.3.min.js",
			"js/lib/underscore-min.js",
			"js/lib/backbone-min.js",
			"js/lib/leaflet/leaflet.js",
		],
		desc: "Third party library"
	}
	,Core: {
		src: [
			"js/lib/fancybox/jquery.fancybox.js",
			// Namespace
			"js/namespace.js",
			// Config file
			"js/config.js",
			"js/map.js",
			// --------------------
			// ------  Views ------
			// --------------------
			"js/view/error_view.js",
			"js/view/notfound_view.js",
			"js/view/home_view.js",
			"js/view/map_view.js",
			"js/view/staff_view.js",
			"js/view/publications_view.js",

			// router
			"js/router.js",
			// app
			"js/app.js",
			"js/topics.js",
			"js/gSLayerWMS.js",

		],
		desc: "Core library."
	}
};

deps.CSS = {
	ThirdParty:{
		src : [
			"js/lib/leaflet/leaflet.css",
		]
	},
	Core: {
		src: [
			"css/lib/WWW-Styles/reset.css",
			"css/lib/WWW-Styles/base.css",
			"css/styles.css",
			"css/home.css",
		]
	}
};

if (typeof exports !== 'undefined') {
	exports.deps = deps;
}

