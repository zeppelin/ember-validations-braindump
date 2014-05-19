var attr = DS.attr;

var Person = DS.Model.extend({
  firstName: attr('string'),
  age: attr('number'),
  profile: attr('string')
});

Person.reopenClass({
  FIXTURES: [{
    id: 1,
    firstName: 'Jani',
    age: 80,
    profile: 'nincs profilom'
  }]
});

export default Person;
