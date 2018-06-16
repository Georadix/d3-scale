import {linearish} from "./linear";

export default function diverging(interpolator) {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      clamp = false;

  function scale(x) {
    var t = 0.5 + ((x = +x) - x1) / (2 * (x < x1 ? x1 - x0 : x2 - x1));
    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], x2 = +_[2], scale) : [x0, x1, x2];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return diverging(interpolator).domain([x0, x1, x2]).clamp(clamp);
  };

  return linearish(scale);
}
