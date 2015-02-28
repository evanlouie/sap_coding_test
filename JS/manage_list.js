//
(function($){
  // `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
  Backbone.sync = function(method, model, success, error){
    success();
  }

  var Item = Backbone.Model.extend({
    defaults: {
      first_name: 'Marissa'
    }
  });

  var List = Backbone.Collection.extend({
    model: Item
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',
    events: {
      // 'click span.delete': 'remove'
      'click button.delete': 'remove'
    },
    //
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },
    //
    // render: function(){
    //   $(this.el).html('<span style="color:black;">'+this.model.get('first_name')+'</span> &nbsp; &nbsp; <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
    //   return this;
    // },
    render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('first_name')+'</span> &nbsp; &nbsp; <button class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">Delete</button>');
      return this;
    },
    //
    unrender: function(){
      $(this.el).remove();
    },
    //
    remove: function(){
      this.model.destroy();
    }
  });

  //
  var ListView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click button#add': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem');

      this.collection = new List();
      this.collection.bind('add', this.appendItem);

      this.counter = 0;
      this.render();
    },
    render: function(){
      var self = this;
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){
        self.appendItem(item);
      }, this);
    },
    addItem: function(){
      this.counter++;
      var item = new Item();
      item.set({
        first_name: item.get('first_name') + this.counter // modify item defaults
      });
      this.collection.add(item);
    },
    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    }
  });

  var listView = new ListView();
})(jQuery);
