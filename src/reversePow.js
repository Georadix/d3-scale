import {linearish} from "./linear.js";
import {copy, identity, transformer} from "./continuous.js";
import {initRange} from "./init.js";

function transformPow(base) {
  return function(x) {
    return x < 0 ? -Math.pow(base, -x) : Math.pow(base, x);
  };
}

function powish(transform) {
  var scale = transform(identity, identity),
      base = 1;

  function rescale() {
    return transform(transformPow(base), transformPow(1 / base));
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  return linearish(scale);
}

export default function pow() {
  var scale = powish(transformer());

  scale.copy = function() {
    return copy(scale, pow()).base(scale.base());
  };

  initRange.apply(scale, arguments);

  return scale;
}

