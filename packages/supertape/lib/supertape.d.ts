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

type EqualResult<R, E> = Required<OperatorResult<R, E>>;

type PassResult = Pick<OperatorResult, 'message'> & EmptyOutput & {is: true};

type FailResult<M = Error> = EmptyOutput & {
    is: false;
    stack: Error['stack'];
    message: M;
    at: string;
};

type OkResult<R, E> = Omit<Required<OperatorResult<R, E>>, 'output'>;

type MatchResult = Omit<Required<OperatorResult<string, string | RegExp>>, 'output'>;

type Operators = OperatorStub & {
    equal: <R, E>(result: R, expected: E, message?: string) => EqualResult<R, E>;
    notEqual: <R, E>(result: R, expected: E, message?: string) => EqualResult<R, E>;
    deepEqual: <R, E>(result: R, expected: E, message?: string) => EqualResult<R, E>;
    notDeepEqual: <R, E>(result: R, expected: E, message?: string) => EqualResult<R, E>;
    ok: <R>(result: boolean | R, message?: string) => OkResult<R, true>;
    notOk: <R>(result: boolean | R, message?: string) => OkResult<R | string, false>;
    pass: (message?: string) => PassResult;
    fail: (message: string) => FailResult<string>;
    match: (result: string, pattern: string | RegExp, message?: string) => MatchResult | FailResult;
    notMatch: (result: string, pattern: string | RegExp, message?: string) => MatchResult;
    end: () => void;
};

type CommentOperator = {
    comment: (message: string) => void;
};

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

