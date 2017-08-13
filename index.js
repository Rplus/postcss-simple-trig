const postcss = require('postcss');
const optionsDefault = {
  precision: 5
};
const trigPattern = /\b(sin|cos|tan)\((.+?)\)/g;
const toRadians = (angle) => angle * (Math.PI / 180);

module.exports = postcss.plugin('postcss-simple-trig', (opts) => {
  opts = Object.assign({}, optionsDefault, opts);

  let eavlMath = (...args) => {
    let radians = args[2];
    if (radians.endsWith('deg')) {
      radians = toRadians(radians.replace('deg', ''));
    } else if (radians.endsWith('PI')) {
      radians = `${radians.replace('PI', '') * Math.PI}`;
    }
    try {
      return +(Math[args[1]](radians).toFixed(opts.precision));
    } catch (e) {
      return args[0];
    }
  };

  return (root) => {
    root.walkDecls((decl) => {
      if (!trigPattern.test(decl.value)) {
        return;
      }
      decl.value = decl.value.replace(trigPattern, eavlMath);
    });
  };
});
