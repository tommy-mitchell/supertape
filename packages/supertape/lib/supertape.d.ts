import {OperatorStub} from '@supertape/operator-stub';

import {
    stub,
    Stub,
} from '@cloudcmd/stub';

type OperatorResult<R = unknown, E = unknown> = {
    is: boolean;
    message: string;
    output?: string;
    result?: R;
    expected?: E;
};

type EmptyOutput = {
    output: '';
};

/** The result of the `t.equal()` operators. */
type EqualResult<R, E> = Required<Result<R, E>>;

/** The result of the `t.pass()` operator. */
type PassResult = Pick<Result, 'message'> & EmptyOutput & {is: true};

/** The result of the `t.fail()` operator. */
type FailResult<M = Error> = EmptyOutput & {
    is: false;
    stack: Error['stack'];
    message: M;
    at: string;
};

/** The result of the `t.ok()` operators. */
type OkResult<R, E> = Omit<Required<Result<R, E>>, 'output'>;

/** The result of the `t.match()` operators. */
type MatchResult = Omit<Required<Result<string, string | RegExp>>, 'output'>;

/** Built-in internal assertions available in extension operators. */
type Operators = OperatorStub & {
    /**
     * Asserts that `result` and `expected` are strictly equal.
     *
     * @note uses `Object.is()`
     *
     * @param result The resulting value to be tested.
     * @param expected The value to be tested against.
     * @param message An optional description of the assertion.
     */
    equal: <R, E>(result: R, expected: E, message?: string) => EqualResult<R, E>;
    
    /**
     * Asserts that `result` and `expected` are not strictly equal.
     *
     * @note uses `!Object.is()`
     *
     * @param result The resulting value to be tested.
     * @param expected The value to be tested against.
     * @param message An optional description of the assertion.
     */
    notEqual: <R, E>(result: R, expected: E, message?: string) => EqualResult<R, E>;
    
    /**
     * Asserts that `result` and `expected` are loosely equal, with the same
     * structure and nested values.
     *
     * @note uses node's `deepEqual()` algorithm with strict comparisons
     * (`===`) on leaf nodes
     *
     * @param result The resulting value to be tested.
     * @param expected The value to be tested against.
     * @param message An optional description of the assertion.
     */
    deepEqual: <R, E>(result: R, expected: E, message?: string) => EqualResult<R, E>;
    
    /**
     * Asserts that `result` and `expected` are not loosely equal, with different
     * structure and/or nested values.
     *
     * @note uses node's `deepEqual()` algorithm with strict comparisons
     * (`===`) on leaf nodes
     *
     * @param result The resulting value to be tested.
     * @param expected The value to be tested against.
     * @param message An optional description of the assertion.
     */
    notDeepEqual: <R, E>(result: R, expected: E, message?: string) => EqualResult<R, E>;
    
    /**
     * Asserts that `result` is truthy.
     *
     * @param result The resulting value to be tested.
     * @param message An optional description of the assertion.
     */
    ok: <R>(result: boolean | R, message?: string) => OkResult<R, true>;
    
    /**
     * Asserts that `result` is falsy.
     *
     * @param result The resulting value to be tested.
     * @param message An optional description of the assertion.
     */
    notOk: <R>(result: boolean | R, message?: string) => OkResult<R | string, false>;
    
    /**
     * Generates a passing assertion.
     *
     * @param message A description of the assertion.
     */
    pass: (message: string) => PassResult;
    
    /**
     * Generates a failing assertion.
     *
     * @param message A description of the assertion.
     */
    fail: (message: string) => FailResult<string>;
    
    /**
     * Asserts that `result` matches the regex `pattern`.
     *
     * @note if `pattern` is not a valid regex, the assertion fails.
     *
     * @param result The resulting value to be tested.
     * @param pattern A regex to be tested against.
     * @param message An optional description of the assertion.
     */
    match: (result: string, pattern: string | RegExp, message?: string) => MatchResult | FailResult;
    
    /**
     * Asserts that `result` does not match the regex `pattern`.
     *
     * @note if `pattern` is not a valid regex, the assertion always fails.
     *
     * @param result The resulting value to be tested.
     * @param pattern A regex to be tested against.
     * @param message An optional description of the assertion.
     */
    notMatch: (result: string, pattern: string | RegExp, message?: string) => MatchResult;
    
    /**
     * Declares the end of a test explicitly. `t.end()` must be
     * called once (and only once) per test, and no further
     * assertions are allowed.
     */
    end: () => void;
};

type CommentOperator = {
    /**
     * Prints a message without breaking the `tap` output.
     *
     * @param message The message to be printed.
     */
    comment: (message: string) => void;
};

/** Built-in assertions available in tests. */
type Test = CommentOperator & {
    [operator in keyof Operators]: (...args: Parameters<Operators[operator]>) => void;
};

type CustomOperators = {
    [operatorName: string]: (t: Operators) => (...args: any[]) => OperatorResult | FailResult;
};

/** Regular `TAP` output. @see https://www.npmjs.com/package/@supertape/formatter-tap */
type FormatterTap = 'tap';

/** Outputs only failed tests. @see https://www.npmjs.com/package/@supertape/formatter-fail */
type FormatterFail = 'fail';

/** Outputs with a progress bar. @see https://www.npmjs.com/package/@supertape/formatter-progress-bar */
type FormatterProgressBar = 'progress-bar';

/** JSON output. @see https://www.npmjs.com/package/@supertape/formatter-json-lines */
type FormatterJSONLines = 'json-lines';

/** Minimal output. @see https://www.npmjs.com/package/@supertape/formatter-short */
type FormatterShort = 'short';

/** Built-in `tap` formatters for test outputs. */
type BuiltInFormatter = FormatterTap
    | FormatterFail
    | FormatterProgressBar
    | FormatterJSONLines
    | FormatterShort;

/** Options available per test. */
type TestOptions = {
    /**
     * Whether or not to skip this test.
     * @default false
     */
    skip?: boolean;
    
    /**
     * Whether or not to mark this test as the only one run by the process.
     * @default false
     */
    only?: boolean;
    
    /**
     * Custom extension operators to use in this test.
     * @default {}
     */
    extensions?: CustomOperators;
    
    /**
     * Whether or not to not report test results.
     * @default false
     */
    quiet?: boolean;
    
    /**
     * Which output format to use for the test results.
     * @default 'tap'
     * @note When using the CLI, the default is `progress-bar`.
     */
    format?: BuiltInFormatter;
    
    /**
     * Whether or not to run this test.
     * @default true
     */
    run?: boolean;
    
    /**
     * Whether or not to check test messages for duplicates.
     * By default, Supertape expects each message to be unique.
     * @default true
     */
    checkDuplicates?: boolean;
    
    /**
     * Whether or not to check the number of assertions per
     * test. By default, Supertape expects each test to have
     * only one assertion.
     * @default true
     */
    checkAssertionsCount?: boolean;
    
    /**
     * Whether or not to check that test messages are scoped
     * (i.e. in the form `'scope: message'`). By default,
     * Supertape expects each test to be scoped.
     * @default true
     */
    checkScopes?: boolean;
};

declare function test(message: string, fn: (t: Test) => void, options?: TestOptions): void;
declare namespace test {
    export var only: typeof test;
    export var skip: typeof test;
}

export default test;

declare function extend(extensions: CustomOperators): typeof test;

export {
    test,
    Test,
    stub,
    Stub,
    extend,
};

