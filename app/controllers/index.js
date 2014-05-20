var Validations = Ember.Validations.Mixin;

export default Ember.ObjectController.extend(Validations, {
  validations: {
    // PROPOSAL
    firstName: {
      presence: true,
      length: {
        minimum: 5,
        if: function(object, property) {
          return object.validate('firstName.presence').then(function() {
            return object.validate('firstName.lofaszValidator');
          });
        }
      }
    },
    age: {
      numericality: true,
      presence: true
    },
    profile: true
  },

  // errors: function() {
  //   return this.get('validationErrors') || this.get('model.errors');
  // }.property('model.errors', 'validationErrors'),

  // actions: {
  //   validate: function() {
  //     // this.validate().then(function(yay) {
  //     //   // console.log('niggaz', yay);
  //     // }, function(nay) {
  //     //   // console.log('fekaz', nay);
  //     // });
  //   }
  // }
});
