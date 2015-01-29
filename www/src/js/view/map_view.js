app.view.Map = Backbone.View.extend({
    
    initialize: function() {
    	Map.initialize();
        Map.addLayer(1);
        Map.addLayer(2);
        Map.getMap().on("click",function(e){
            $.fancybox($("#container_feature_info"), {
                'width':"auto",
                "height": "auto",
                'autoSize':true,
                'closeBtn' : true,
                'scrolling'   : 'yes',
                tpl: {
                    closeBtn: '<a title="Close" class="fancybox-item fancybox-close myCloseRound" href="javascript:;"><img src="/img/fancybox_close.svg"></a>'
                },
            });
            
            Map.featureInfo(e);
            
        });
    },
    
    events:{},
    
    onClose: function(){
        // Remove events on close
        this.stopListening();
    },
    
    render: function() {
    	
        return this;
    },    
});
	