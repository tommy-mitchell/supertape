import test, {
    test as superTest,
    Test,
    stub,
    Stub,
} from '../lib/supertape.js';

// THROWS Expected 2 arguments, but got 0
test();

test('hello', (t: Test) => {
    // THROWS Property 'abc' does not exist on type 'Test'
    t.abc();
    t.end();
});

superTest('hello', (t: Test) => {
    t.equal(1, 2);
    t.end();
});

test('stub should be a function', (t) => {
    const fn: Stub = stub();
    fn();
    
    t.calledWithNoArgs(fn);
    t.end();
});

test.only('hello', (t: Test) => {
    t.end();
});

test.skip('hello', (t: Test) => {
    t.end();
});

