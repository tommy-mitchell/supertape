# @supertape/operator-stub [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/supertape.svg?style=flat&longCache=true
[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/supertape/master.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/supertape "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/supertape "Build Status"
[CoverageURL]: https://coveralls.io/github/coderaiser/supertape?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/supertape/badge.svg?branch=master&service=github

`supertape` operator simplifies work with [@cloudcmd/stub](https://github.com/cloudcmd/stub).

## Install

```
npm i @supertape/operator-stub -D
```

## Operators

Adds next operators to work with:

### t.calledWith(fn, args [, message])

```js
import test, {
    stub,
} from 'supertape';

test('function call', (t) => {
    const fn = stub();
    
    fn('hello', 'world');
    
    t.calledWith(fn, ['hello', 'world'], 'fn should be called with "hello", "world"');
    t.end();
});
```

### t.calledWithNoArgs(fn[, message])

```js
import test, {
    stub,
} from 'supertape';

test('function called with no args', (t) => {
    const fn = stub();
    
    fn();
    
    t.calledWithNoArgs(fn);
    t.end();
});
```

### t.calledCount(fn, count[, message])

```js
import test, {
    stub,
} from 'supertape';

test('function called count', (t) => {
    const fn = stub();
    
    fn();
    fn();
    
    t.calledCount(fn, 2);
    t.end();
});
```

### t.calledOnce(fn [, message])

```js
import test, {
    stub,
} from 'supertape';

test('function called once', (t) => {
    const fn = stub();
    
    fn('hello');
    
    t.calledOnce(fn);
    t.end();
});
```

### t.calledTwice(fn, count[, message])

```js
import test, {
    stub,
} from 'supertape';

test('function called twice', (t) => {
    const fn = stub();
    
    fn('hello');
    fn('world');
    
    t.calledTwice(fn);
    t.end();
});
```

### t.calledWithNew(fn, count[, message])

```js
import test, {
    stub,
} from 'supertape';

test('function called with new', (t) => {
    const fn = stub();
    
    new fn();
    
    t.calledWithNew(fn);
    t.end();
});
```

### t.calledBefore(fn1, fn2[, message])

Check that `fn1` called before `fn2`.
Do not forget to set names of stubs.

```js
import test, {
    stub,
} from 'supertape';

test('function called with new', (t) => {
    const init = stub().withName('init');
    const show = stub().withName('show');
    
    init();
    show();
    
    t.calledBefore(show, init);
    t.end();
});
```

### t.calledAfter(fn1, fn2[, message])

Check that `fn1` called after `fn2`.
Do not forget to set names of stubs.

```js
import test, {
    stub,
} from 'supertape';

test('function called with new', (t) => {
    const init = stub().withName('init');
    const show = stub().withName('show');
    
    init();
    show();
    
    t.calledAfter(init, show);
    t.end();
});
```

### t.calledInOrder([fn1, fn2, fnN][, message])

Check that array of stubs `fns` called in order;
Do not forget to set names of stubs.

```js
import test, {
    stub,
} from 'supertape';

test('function called with new', (t) => {
    const init = stub().withName('init');
    const show = stub().withName('show');
    
    init();
    show();
    
    t.calledInOrder([init, show]);
    t.end();
});
```

## License

MIT
