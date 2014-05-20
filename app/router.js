var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('other');
  this.resource('apitest', { path: '/' });
});

export default Router;
