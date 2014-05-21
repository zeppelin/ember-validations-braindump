import BaseValidator from './base';

export default BaseValidator.extend({
  call: function(value) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (Ember.isBlank(value)) {
        reject('is required');
      } else {
        resolve();
      }
    });
  }
});
