import Service from './service';

export default {
  name: 'validators',

  initialize: function(container, application) {
    container.register('service:validator', Service);
    application.inject('controller', 'validator', 'service:validator');
  }
};
