const toDegrees = angle => angle * (180 / Math.PI);
const toRadians = angle => angle * (Math.PI / 180);
let isTri = str => {
  return /^(sin|cos|tan)\(.+?\)/.test(str);
};

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-simple-trig', (opts) => {
  opts = opts || {};

  // Work with options here

  return (root, result) => {
    // Transform CSS AST here
    root.walkDecls(decl => {
      // Transform each property declaration here
      // decl.prop = decl.prop.split('').reverse().join('');
      if (!isTri(decl.value)) {
        return;
      }
    });
  };
});

// export default postcss.plugin('postcss-reverse-props', (options = {}) => {
//   // Work with options here
//   return root => {
//     // Transform each rule here
//     root.walkDecls(decl => {
//       // Transform each property declaration here
//       // decl.prop = decl.prop.split('').reverse().join('');
//       if (!isTri(decl.value)) {
//         return;
//       };
//     });
//   };
// });
