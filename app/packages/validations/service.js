import { PresenceValidator, LengthValidator } from './validators';

var RSVP = Ember.RSVP;

export default Ember.Object.extend({
  /*

  Example properties are:

  {
    propertyName: 'firstName',
    propertyValue: 'value of firstName',
    validations: {
      presence: true,
      length: { minimum: 5 }
    }
  }
  */
  validate: function(properties) {
    var promises;

    promises = properties.map(function(property) {
      var propertyName, validatorPromises;

      propertyName = property.propertyName;
      validatorPromises = promisesForValidators(property);

      return promiseForField(property, validatorPromises);
    });

    return RSVP.allSettled(promises, 'Validator: validate properties');
  }
});


function promisesForValidators(property) {
  var propertyName = property.propertyName,
      propertyValue = property.propertyValue,
      validations = Ember.keys(property.validations);

  return validations.map(function(validationType) {
    var validationOptions = property.validations[validationType];

    console.log('Running ' + validationType + ' validation on ' + propertyName + ' with options: ' + validationOptions);

    if (validationType === 'presence') {
      return PresenceValidator.create().call(propertyValue);
    }
    return RSVP.reject('lekoplek, gecc: ' + validationType, 'Validator: running validator: ' + validationType + ' on ' + propertyName);
    // return RSVP.resolve();
    // lookup validator, `return validator.validate()` instead of the above, which returns a promise
  });
}

function promiseForField(property, validatorPromises) {
  var propertyName = property.propertyName;

  return new RSVP.Promise(function(resolve, reject) {
    RSVP.allSettled(validatorPromises, 'Validator: waiting for validators to finish for property: ' + propertyName).then(function(validatorResults) {
      var errors = errorsFromValidationResults(validatorResults);

      var retValue = {
        propertyName: propertyName
      };

      if (Ember.isBlank(errors)) {
        resolve(retValue);
      } else {
        retValue.errors = errors;
        reject(retValue);
      }
    });
  }, 'Validator: validate property: ' + propertyName);
}

function errorsFromValidationResults(results) {
  return results.filter(function(entry) {
    if (entry.state === 'rejected') {
      return true;
    }
  }).map(function(entry) {
    return entry.reason;
  });
}
