var ApitestRoute = Ember.Route.extend({
  model: function() {
    return {
      firstName: 'Jani',
      lastName: 'Papa',
      age: 48,
      favoriteTool: 'gumicsizma',
      email: 'jani@feriestsa.com',
      username: 'janipapa',
      password: null,
      passwordConfirmation: null
    }
  }
});

export default ApitestRoute;
