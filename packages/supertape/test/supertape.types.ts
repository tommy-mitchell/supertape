import test from '../lib/supertape';

test('positive: test()', (t) => {
    t.pass('from test()');
    t.end();
});

test.test('positive: test.test()', (t) => {
    t.pass('from test.test()');
    t.end();
});

test.skip('positive: test.skip()', (t) => {
    t.pass('from test.skip()');
    t.end();
});

test.only('positive: test.only()', (t) => {
    t.pass('from test.only()');
    t.end();
});

test('postiive: test.stub() should be a function', (t) => {
    const fn = test.stub();
    fn();
    
    t.calledWithNoArgs(fn);
    t.end();
});

const extendedTest = test.extend({
    superFail: ({fail}) => (message: string) => fail(message),
});

extendedTest('positive: extension operator', (t) => {
    t.superFail('hello, world!');
    t.end();
});

