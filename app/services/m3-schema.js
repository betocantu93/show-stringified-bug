import DefaultSchema from "ember-m3/services/m3-schema";

const RefRegExp = /^ref:/;
const EDMRegExp = /^EDM:/;

let computeValue = function (key, value, modelName, schemaInterface) {
  if (Array.isArray(value)) {
    return null;
  }

  if (typeof value === "string" && RefRegExp.test(value)) {
    return schemaInterface.reference({
      id: value,
      type: null,
    });
  }

  if (typeof value === "string" && EDMRegExp.test(value)) {
    let [_, modelName, id] = value.split(':');
    return schemaInterface.reference({
      id,
      type: modelName,
    });
  }

  if (value !== null && typeof value === "object") {
    console.log('here')
    return schemaInterface.nested({
      id: key,
      type: value.type,
      attributes: value,
    });
  }

  return value;
};

export default class Schema extends DefaultSchema {
  includesModel(modelName) {
    return RefRegExp.test(modelName);
  }

  computeAttribute(key, value, modelName, schemaInterface) {
    console.log(key, value);
    if (Array.isArray(value)) {
      let nested = value.map((v) => {
        return computeValue(key, v, modelName, schemaInterface);
      });
      return schemaInterface.managedArray(nested);
    } else {
      return computeValue(key, value, modelName, schemaInterface);
    }
  }
}