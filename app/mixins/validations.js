var alias = Ember.computed.alias,
    isBlank = Ember.isBlank,
    set = Ember.set;

export default Ember.Mixin.create({
  errors: {
    password: ['not ok']
  },

  init: function() {
    this._super.apply(this, arguments);

    var validations = this.validations;

    for (var key in validations) {
      if (!validations.hasOwnProperty(key)) continue;

      var actionName = 'validate'+key.capitalize(),
          method = generateValidateFieldAction(key);

      this._actions[actionName] = method;
    }
  },

  validate: function(properties) {
    var self = this,
        validations = this.validations;

    if (isBlank(properties)) {
      properties = [];

      for (var propertyName in validations) {
        if (!validations.hasOwnProperty(propertyName)) continue;

        properties.push(propertyName);
      }
    }

    var fields = properties.map(function(propertyName) {
      return {
        name: propertyName,
        value: self.get(propertyName)
      }
    });

    return this.validator.validate(fields).then(function(entries) {
      entries.forEach(function(entry) {
        var state = entry.state,
            value = entry.reason;

        if (state === 'fulfilled') {
          set(self.errors, value.name, null);
          return;
        }

        set(self.errors, value.name, value.errors);
      });
    });
  }
});


function generateValidateFieldAction(property) {
  return function() {
    return this.validate([property]);
  }
}
