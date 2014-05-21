import ValidationsMixin from 'appkit/packages/validations/mixin';

var ApitestController = Ember.ObjectController.extend(ValidationsMixin, {
  validations: {
    firstName: {
      presence: true,
      length: { minimum: 5 }
    },
    // lastName: true,
    age: {
      numericality: true
    }
  },

  actions: {
    validate: function() {
      this.validate();
    }
  }
});

export default ApitestController;
