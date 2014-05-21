var RSVP = Ember.RSVP;

export default Ember.Object.extend({
  /*

  Example fields are:

  {
    propertyName: 'firstName',
    propertyValue: 'value of firstName',
    validations: {
      presence: true,
      length: { minimum: 5 }
    }
  }
  */
  validate: function(fields) {
    var promises = fields.map(function(field) {
      for (var validation_type in field.validations) {
        var validation_options = field.validations[validation_type],
            propertyName = field.propertyName;

        console.log('Running ' + validation_type + ' validation on ' + propertyName + ' with options: ' + validation_options);
      }

      return new RSVP.reject({
        name: field.propertyName,
        errors: [
          'egy error',
          'megegy error'
        ]
      });
    });

    return RSVP.allSettled(promises);
  }
});
