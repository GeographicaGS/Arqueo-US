Map = {
	
	layerIndicador:null,
	iniLat: 40.5513449746,
	iniLng: -3.48050641189,	
	iniZoom: 6,
	__map:null,
	__layersIndicador:[],
	__layersMapBase:[],
	markers: [],
	
	initialize: function(){
//			// center the map
			var startingCenter = new L.LatLng(this.iniLat, this.iniLng);		
			
//			//create the left map's leaflet instance
			this.__map = new L.Map('map', {
				  center: startingCenter,
				  zoom: this.iniZoom,
				  fadeAnimation: false,
				  zoomControl: false,
				  attributionControl: true
			});
			
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.__map);

			// add zoom control to map left
			var zoomControl = new L.Control.Zoom({
				position : 'bottomright'
			});		
		
			zoomControl.addTo(this.__map);
	},

	getMap: function() {
		return this.__map;
	},

	loadDepositPoints: function() {
		var that = this;
        $.ajax({
            url : '/api/deposit',
            type: 'GET',
            success: function(data) {
                
                function onEachFeature(feature, layer) {
                    // bind a popup with history's basic info
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(feature.properties.name+'');
                    }
                }

                that.depositGeoJson = data.result;
                that.depositLayer = L.geoJson(that.depositGeoJson, {
                    pointToLayer: function (feature, latlng) {
                        var marker = L.marker(latlng);
                        that.markers[feature.properties.id] = marker;
                        return marker;
                    },
                    onEachFeature: onEachFeature
                });
                that.depositLayer.addTo(Map.__map);
            }
        });
	}
}
