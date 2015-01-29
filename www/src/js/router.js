var app = app || {};

app.router = Backbone.Router.extend({
    
    langRoutes : {
        "_link home" : {"es": "inicio" },
        "_link staff": {"es": "personal"},
        "_link publications": {"es": "publicaciones"},
        "_link map": {"es": "appe"},
    },

    /* define the route and function maps for this router */
    routes: {
            "" : "home",
            "home" : "home",
            "staff": "staff",
            "publications": "publications",
            "map": "map",

            "notfound" : "notfound",
            "faq" : "faq",
            "error" : "error",
            
            /* Sample usage: http://example.com/#about */
            "*other"    : "defaultRoute"
            /* This is a default route that also uses a *splat. Consider the
            default route a wildcard for URLs that are either not matched or where
            the user has incorrectly typed in a route path manually */
        
    },

    initialize: function(options) {
        this.route(this.langRoutes["_link home"][app.lang], "home");
        this.route(this.langRoutes["_link staff"][app.lang], "staff");
        this.route(this.langRoutes["_link publications"][app.lang], "publications");
        this.route(this.langRoutes["_link map"][app.lang], "map");
    },
    
    home: function(){
        app.showView(new app.view.Home());
        $("#map").hide();
        app.events.trigger('menu','home');
    },

    staff: function(){
        app.showView(new app.view.Staff());
        $("#map").hide();
        app.events.trigger('menu','staff');
    },

    publications: function(){
        app.showView(new app.view.Publications());
        $("#map").hide();
        app.events.trigger('menu','publications');
    },

    map: function(){
        app.showView(new app.view.Map());
        $("#map").show();
        if(Map.getMap() != null){
            Map.getMap().invalidateSize("true");
        }
        app.events.trigger('menu','map');
    },

    defaultRoute: function(){
        app.showView(new app.view.NotFound());
    },

    notfound: function(){
        app.showView(new app.view.NotFound());
    },

    error: function(){
        app.showView(new app.view.Error());
    }
    
});