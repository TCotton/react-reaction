export default function deepObjectFreeze(o) {

  if (Object.is(o, Object(o))) {

    Object.isFrozen(o) || Object.freeze(o);

    Object.getOwnPropertyNames(o).forEach((prop) => {

      Object.is(prop, 'constructor') || deepObjectFreeze(o[prop]);

    });

  }

  return o;
};
