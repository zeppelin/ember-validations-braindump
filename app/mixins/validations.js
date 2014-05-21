import { keysToArray } from 'appkit/utils/object';

var isBlank = Ember.isBlank,
    get = Ember.get, set = Ember.set;

export default Ember.Mixin.create({
  errors: {
    password: ['not ok']
  },

  init: function() {
    this._super.apply(this, arguments);

    var validations = this.validations,
        actionName, action;

    for (var key in validations) {
      if (!validations.hasOwnProperty(key)) continue;

      actionName = 'validate'+key.capitalize();
      action = generateValidateFieldAction(key);

      this._actions[actionName] = action;
    }
  },

  validate: function(propertyNames) {
    var self = this,
        validations = this.validations,
        fields;

    // Collect all property names that are on the `validations` hash
    if (isBlank(propertyNames)) {
      propertyNames = keysToArray(validations);
    }

    // Turn them into a specific format, as we'll need to
    //    1. validate the property's value
    //    2. reference back to the property name
    fields = propertyNames.map(function(propertyName) {
      return {
        name: propertyName,
        value: get(self, propertyName)
      };
    });

    // Pass them to the validator's `validate` function, it returns a promise
    // which will always be resolved. See `RSVP.allSettled`.
    return this.validator.validate(fields).then(function(entries) {
      var errors = self.errors;

      entries.forEach(function(entry) {
        var state = entry.state,
            value = entry.reason,
            propertyName = value.name;

            // console.log(propertyName);

        // Clear the error for the property name if the entry is fulfilled
        if (state === 'fulfilled') {
          set(errors, propertyName, null);
          return;
        }

        // Set the error for that property name if not
        set(errors, propertyName, value.errors);
      });
    });
  }
});

/**
  Returns a function that validates the property passed when creating the function
*/
function generateValidateFieldAction(property) {
  return function() {
    return this.validate([property]);
  };
}
