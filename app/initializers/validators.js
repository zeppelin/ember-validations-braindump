import ValidatorService from 'appkit/services/validator';

export default {
  name: 'validators',

  initialize: function(container, application) {
    container.register('service:validator', ValidatorService);
    application.inject('controller', 'validator', 'service:validator');
  }
};
