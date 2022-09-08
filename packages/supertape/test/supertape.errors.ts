import test from '../lib/supertape.js';

// THROWS Expected 2-3 arguments, but got 0.
test();

// THROWS Expected 2-3 arguments, but got 0.
test.test();

// THROWS Expected 2-3 arguments, but got 0.
test.skip();

// THROWS Expected 2-3 arguments, but got 0.
test.only();

test('negative: non-existent built-in operator', (t) => {
    // THROWS Property 'abc' does not exist on type 'Test'.
    t.abc();
    t.end();
});

// THROWS Type '"non-existent"' is not assignable to type 'BuiltInFormatter | undefined'.
test('negative: non-existent formatter', () => {}, {format: 'non-existent'});

test('hello', (t) => {
    t.end();
// THROWS Argument of type '{ checkUnknown: boolean; }' is not assignable to parameter of type 'TestOptions'.
}, {checkUnknown: true});

// THROWS Expected 1 arguments, but got 0.
test.extend();

const badExtendedTest = test.extend({
    // THROWS Type 'string' is not assignable to type '(t: Operators) => (...args: any[]) => OperatorResult<unknown, unknown> | FailResult<Error>'.
    hello: 'world',

    // THROWS Property 'comment' does not exist on type 'Operators'.
    noComment: (t) => (message: string) => t.comment(message),

    // THROWS Type '{}' is not assignable to type 'OperatorResult<unknown, unknown> | FailResult<Error>'.
    badResult: () => () => ({}),

    // THROWS Type '{ is: true; result: any; }' is not assignable to type 'OperatorResult<unknown, unknown> | FailResult<Error>'.
    incompleteResult: () => (result) => ({
        is: true,
        result,
        // missing message
    }),
});

// THROWS Expected 2-3 arguments, but got 0.
badExtendedTest();

const goodExtendedTest = test.extend({
    superFail: ({fail}) => (message: string) => fail(message),
});

goodExtendedTest('negative: incorrect usage of extension operator', (t) => {
    // THROWS Expected 1 arguments, but got 0.
    t.superFail();
    // THROWS Argument of type 'number' is not assignable to parameter of type 'string'.
    t.superFail(1);
    t.end();
}, {checkAssertionsCount: false});

goodExtendedTest('negative: non-existent extension operator', (t) => {
    // THROWS Property 'nonExistent' does not exist
    t.nonExistent();
    t.end();
});

