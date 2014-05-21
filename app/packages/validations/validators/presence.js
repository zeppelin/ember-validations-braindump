import BaseValidator from './base';

export default BaseValidator.extend({
  call: function(value) {
    if (Ember.isBlank(value)) {
      return Ember.RSVP.reject('is required');
    } else {
      return Ember.RSVP.resolve();
    }
  }
});
