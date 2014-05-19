# Ember Validations API Braindump

## Requrirements:

* Don't run validations automatically on init/change
* More granular API regarding individual field validations
    * Multiple fields at once?
* Handle remote errors
    * allSettled/hashSettled?
* Clear errors when I say so (or automatically)

## Questions:

* Manually push validation errors?


controller.validate(['firstName', 'lastName'])

controller.validate(['firstName.length', 'firstName.presence', 'lastName'])

OR

controller.validate({
  lastName: true,
  firstName: ['presence', 'length']
})

propertyName.errors[] // can't tell which message belongs to which validator
propert.propertyName.validator.message


---

```js
App.UserController.reopen({
  validations: {
    firstName: {
      autorun: false, /* TURNS OFF AUTORUN ON ALL VALIDATIONS ON firstName */
      presence: true,
      length: { minimum: 5 }
    },
    age: {
      numericality: true
    },
    profile: true
  }
});



App.UserController.reopen({
  validations: {
    firstName: {
      presence: { autorun: false }, /* TURNS OFF AUTORUN ON this presence validator */
      length: { minimum: 5 }
    },
    age: {
      numericality: true
    },
    profile: true
  }
});



App.UserController.reopen({
  validations: {
    autorun: false, /* TURNS OFF AUTORUN ON ALL VALIDATIONS ON all properties */
    firstName: {
      presence: true,
      length: { minimum: 5 }
    },
    age: {
      numericality: true
    },
    profile: true
  }
});
```


## Autorun settings:

* globally on all validations on all properties
* per property
* per validation on individual properties
