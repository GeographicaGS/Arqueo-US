Map = {
	
	layerIndicador:null,
	iniLat: 40.5513449746,
	iniLng: -3.48050641189,	
	iniZoom: 6,
	__map:null,
	__layersIndicador:[],
	__layersMapBase:[],
	markers: [],
	layers:[],
	
	initialize: function(){
//			// center the map
			var startingCenter = new L.LatLng(this.iniLat, this.iniLng);		
			
//			//create the left map's leaflet instance
			if(!this.__map){
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
			}
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
	},

	addLayer: function(id) {
		var layer = this.searchLayer(id);
		if(layer != null){
			var gSLayerWMS = new GSLayerWMS(layer.id, layer.title_es, layer.wmsServer, layer.wmsLayName, 1000);
			var z_index = 0;
			if(this.layers.length > 0){
				z_index =  this.layers[this.layers.length - 1].z_index + 1;
			}
			gSLayerWMS.setVisibility(true, z_index, Map.getMap()._zoom);
			this.layers.unshift(gSLayerWMS);
		}
	},

	searchLayer: function(id) {
		var result = null;
		app.topics.forEach(function(topic) {
			topic.layers.forEach(function(layer) {
			    if (layer.id == id){
			    	return result = layer;
			    }
			});
		});
		return result;
	},

	featureInfo : function(e,id){

		$("#container_feature_info").html("<div class='loading'>Loading</div>").show();
		if(!id){
			id = 0;
		}
		
		var map = this.getMap();
		var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
		    
		var BBOX = map.getBounds().toBBoxString();
		var WIDTH = map.getSize().x;
		var HEIGHT = map.getSize().y;
		var X = map.layerPointToContainerPoint(e.layerPoint).x;
		var Y = map.layerPointToContainerPoint(e.layerPoint).y;
		    
		var layers = null;   
		var server = null;
		var requestIdx = null;
		
		for (var i=id;i<this.layers.length;i++){
			var l = this.layers[i];
			if (l.visible && l.layer.options.opacity>0){
				server = l.url;
				layers = l.name;
				requestIdx = i;
				break;
			}
		}
		
		if (layers==null || server==null || requestIdx==null)
		{
			$("#container_feature_info").html("No hay información sobre este punto");
			
			return;
		}
		
		var request = server + 'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=' +layers+'&QUERY_LAYERS='+layers+'&STYLES=&BBOX='+BBOX+'&FEATURE_COUNT=5&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&FORMAT=image%2Fpng&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A4326&X='+X+'&Y='+Y;
		request = request.replace("wmts","wms");
	    
		var obj = this;
	    $.ajax({
			url : "/api/proxy",
			data: { "url": request},	       
			type: "POST",			
	        success: function(data) {
	        	//console.log(data);
	        	try {
		        	if (!data || data.indexOf("LayerNotQueryable")!=-1){
		        		obj.featureInfo(e,requestIdx+1);
		        	}
		        	else{
		        		if($.trim($($.parseXML(data)).find("body").html()).length != 0){
		        			$("#container_feature_info").html(data);
		        		}else{
		        			if((i+1) < Map.layers.length){
		        				obj.featureInfo(e, i+1);
		        			}else{
		        				$("#container_feature_info").html("No hay información sobre este punto");
		        			}
		        		}
		        	}
	        	}catch (ex){
	        		if((i+1) < Map.layers.length){
        				obj.featureInfo(e, i+1);
        			}else{
        				$("#container_feature_info").html("No hay información sobre este punto");
        			}
	        	}
	        	$.fancybox.update();
	        },
	        error: function(){	        	
	        	obj.featureInfo(e,requestIdx+1);
	        }
	    });
		
	},
}
