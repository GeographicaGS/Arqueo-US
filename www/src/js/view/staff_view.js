app.view.Staff = Backbone.View.extend({
    _template : _.template( $('#staff_template').html() ),
    
    initialize: function() {
        this.render();
    },
    
    onClose: function(){
        // Remove events on close
        this.stopListening();
    },
    
    render: function() {
        this.$el.html(this._template());
        return this;
    }
});