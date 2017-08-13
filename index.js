const postcss = require('postcss');
const optionsDefault = {
  precision: 5
};
const trigPattern = /\b(sin|cos|tan)\((.+?)\)/g;

module.exports = postcss.plugin('postcss-simple-trig', (opts) => {
  opts = Object.assign({}, optionsDefault, opts);

  let eavlMath = (...args) => {
    let radians = 1 * args[2].replace(/(.+?)(deg|PI)/, (...r) => {
      return r[1] * Math.PI / (r[2] === 'deg' ? 180 : 1);
    });
    if (isNaN(radians)) {
      return args[0];
    }
    try {
      return Number(Math[args[1]](radians).toFixed( opts.precision));
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
