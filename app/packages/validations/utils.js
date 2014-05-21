function keysToArray(object) {
  var array = [];

  for (var propertyName in object) {
    if (!object.hasOwnProperty(propertyName)) continue;
    array.push(propertyName);
  }

  return array;
}

export {
  keysToArray
};
