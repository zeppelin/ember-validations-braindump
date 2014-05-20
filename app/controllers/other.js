var OtherController = Ember.ObjectController.extend(Ember.Validation.ValidatorSupport, {
  errors: null,

  validator: Ember.Validation.map(function() {
     this.property("firstName").required().minLength(5);
     this.property("age").number().required();
     this.property("profile").required();
  }),

  runValidation: function() {
    var result = this.validate();
    console.log(result);
  }.observes('firstName', 'age', 'profile'),

  actions: {
    v: function() {
      console.log(this.validate().get('firstName.error'));
      // this.validate().then(function(yay) {
      //   // console.log('niggaz', yay);
      // }, function(nay) {
      //   // console.log('fekaz', nay);
      // });
    }
  }
});

export default OtherController;
