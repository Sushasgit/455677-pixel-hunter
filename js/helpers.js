export const deepClone = (object) => {
  let output;
  let v;
  let key;
  output = Array.isArray(object) ? [] : {};
  for (key in object) {
    if (object.hasOwnProperty(key)) {
      v = object[key];
      output[key] = (typeof v === `object`) ? deepClone(v) : v;
    }
  }
  return output;
};
