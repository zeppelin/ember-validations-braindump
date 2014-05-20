var RSVP = Ember.RSVP;

export default Ember.Object.extend({
  // fields are:
  //    { name: 'firstName', value: 'value of firstName' }
  validate: function(fields) {
    // TODO gyartani promise-okat
    var promises = fields.map(function(field) {
      return new RSVP.reject({
        name: field.name,
        errors: [
          'egy error',
          'megegy error'
        ]
      });
    });

    return RSVP.allSettled(promises);
  }
});
