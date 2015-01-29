app.topics = [
	{
		title_es: "Yacimientos",
		layers: [
			{
				id:1,
				title_es: "Puntos yacimientos",
				wmsServer:"http://dev.arqueo.geographica.gs/geoserver/arqueo/wms?",
	            wmsLayName:"yacimiento_point_view",
	            geoNetWk:"http://dev.arqueo.geographica.gs/geonetwork/srv/spa/search?hl=spa#|2486d745-996a-42df-a849-60c0f746dd64",
	            files:["fichero1"],
	            desc_es:"Puntos donde se encuentran los yacimientos.",
	            dataSource:"None",
	        },
	        {
	        	id:2,
				title_es: "Polígonos yacimientos",
				wmsServer:"http://dev.arqueo.geographica.gs/geoserver/arqueo/wms?",
	            wmsLayName:"yacimiento_polygon_view",
	            geoNetWk:"http://dev.arqueo.geographica.gs/geonetwork/srv/spa/search?hl=spa#|2486d745-996a-42df-a849-60c0f746dd64",
	            files:["fichero1"],
	            desc_es:"Polígonos donde se encuentran los yacimientos.",
	            dataSource:"None",
	        }
		]
	}
];