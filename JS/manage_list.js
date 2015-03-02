//
(function($){
  // `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
  Backbone.sync = function(method, model, success, error){
    success();
  }

  var Item = Backbone.Model.extend({
    defaults: {
      first_name: ''
    },
    validate: function( attributes) {
      if (!attributes.first_name) {
        return 'Please fill in name';
      }
    },
    initialize: function() {
      var name = prompt("Please insert your first name")
      // null check
      if (name) {
        // first name only check
        if (!$('#multi_first_name').prop('checked')) {
          while (name && name.trim().split(' ').length > 1) name = prompt("Insert ONLY your first name");
        }
        if (name) this.set('first_name', name.trim());
      }
    }
  });

  var List = Backbone.Collection.extend({
    model: Item
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click button.delete': 'remove'
    },
    //
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },
    //
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
      $(this.el).append("<button id='add'>Add list item</button><input type='checkbox' id='multi_first_name' name='multi_first_name' value='multi_first_name' /> Allow multiple first names");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){
        self.appendItem(item);
      }, this);
    },
    addItem: function(){
      var item = new Item();
      if (item.get('first_name')) {
        this.counter++;
        item.set({
          first_name: item.get('first_name') + this.counter // modify item defaults
        });
        this.collection.add(item);
      }
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
