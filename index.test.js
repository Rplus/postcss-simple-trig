const postcss = require('postcss');

const plugin = require('./');

function run(input, output, opts) {
  return postcss([plugin(opts)]).process(input).then(result => {
    expect(result.css).toEqual(output);
    expect(result.warnings().length).toBe(0);
  });
}

it('sin(aaa)', () => {
  return run(
    'a{ --c: sin(aaa) }',
    'a{ --c: sin(aaa) }',
    {}
  );
});

it('color: red', () => {
  return run(
    'a{ color: red }',
    'a{ color: red }',
    {}
  );
});

it('ssin(30deg)', () => {
  return run(
    'a{ --c: ssin(30deg) }',
    'a{ --c: ssin(30deg) }',
    {}
  );
});

it('sinh(30deg)', () => {
  return run(
    'a{ --c: sinh(30deg) }',
    'a{ --c: sinh(30deg) }',
    {}
  );
});

it('sin(30deg)', () => {
  return run(
    'a{ --c: sin(30deg) }',
    'a{ --c: 0.5 }',
    {}
  );
});

it('sin(45deg)', () => {
  return run(
    'a{ --c: sin(45deg) }',
    'a{ --c: 0.70711 }',
    {}
  );
});

it('sin(60deg)', () => {
  return run(
    'a{ --c: sin(60deg) }',
    'a{ --c: 0.86603 }',
    {}
  );
});

it('2-precision : sin(60deg)', () => {
  return run(
    'a{ --c: sin(60deg) }',
    'a{ --c: 0.87 }',
    { precision: 2 }
  );
});

it('cos(60deg)', () => {
  return run(
    'a{ --c: cos(60deg) }',
    'a{ --c: 0.5 }',
    {}
  );
});

it('tan(45deg)', () => {
  return run(
    'a{ --c: tan(45deg) }',
    'a{ --c: 1 }',
    {}
  );
});

it('sin(1PI)', () => {
  return run(
    'a{ --c: sin(1PI) }',
    'a{ --c: 0 }',
    {}
  );
});

it('cos(1PI)', () => {
  return run(
    'a{ --c: cos(1PI) }',
    'a{ --c: -1 }',
    {}
  );
});

it('tan(1PI)', () => {
  return run(
    'a{ --c: tan(1PI) }',
    'a{ --c: 0 }',
    {}
  );
});

it('cos(1PI)', () => {
  return run(
    'a{ --c: cos(1PI) }',
    'a{ --c: -1 }',
    {}
  );
});

it('calc(sin(30deg) + cos(60deg))', () => {
  return run(
    'a{ --c: calc(sin(30deg) + cos(60deg)) }',
    'a{ --c: calc(0.5 + 0.5) }',
    {}
  );
});

it('transform: translateX(sin(30deg))', () => {
  return run(
    'a{ transform: translateX(sin(30deg)) }',
    'a{ transform: translateX(0.5) }',
    {}
  );
});

it('padding: calc(cos(60deg) * 1em)', () => {
  return run(
    'a{ padding: calc(cos(60deg) * 1em) }',
    'a{ padding: calc(0.5 * 1em) }',
    {}
  );
});

it('2 props', () => {
  return run(
    'a{ padding: calc(cos(60deg) * 1em); transform: translateX(sin(30deg)); }',
    'a{ padding: calc(0.5 * 1em); transform: translateX(0.5); }',
    {}
  );
});

it('2 selectors', () => {
  return run(
    'a{ foo: calc(cos(60deg) * 1em);} .b{ transform: translateX(sin(30deg)); }',
    'a{ foo: calc(0.5 * 1em);} .b{ transform: translateX(0.5); }',
    {}
  );
});
