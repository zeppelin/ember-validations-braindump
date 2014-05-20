import ValidationsMixin from 'appkit/mixins/validations';

var ApitestController = Ember.ObjectController.extend(ValidationsMixin, {
  validations: {
    firstName: {
      presence: true,
      length: { minimum: 5 }
    },
    lastName: true,
    age: {
      numericality: true
    }
  },

  actions: {
    validate: function() {
      this.validate();
    }
  },

  validateAge: function() {
    this.validator.validate(['age']);
  }.observes('age')
});

export default ApitestController;
