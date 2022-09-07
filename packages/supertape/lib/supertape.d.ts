import {OperatorStub} from '@supertape/operator-stub';

import {
    stub,
    Stub,
} from '@cloudcmd/stub';

type Result = {
    is: boolean,
    expected: unknown,
    actual: unknown,
    message: string,
    output: string,
};

type Operator = {
    [index: string]: (...args: any[]) => Result
};

type Test = Operator & OperatorStub & {
    equal: (result: unknown, expected: unknown, message?: string) => Result;
    notEqual: (result: unknown, expected: unknown, message?: string) => Result;
    deepEqual: (result: unknown, expected: unknown, message?: string) => Result;
    notDeepEqual: (result: unknown, expected: unknown, message?: string) => Result;
    fail: (message: string) => Result;
    pass: (message: string) => Result;
    ok: (result: boolean | unknown, message?: string) => Result;
    comment: (message: string) => Result;
    notOk: (result: boolean | unknown, message?: string) => Result;
    match: (result: string, pattern: string | RegExp, message?: string) => Result;
    notMatch: (result: string, pattern: string | RegExp, message?: string) => Result;
    end: () => void;
};

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
    extensions?: CustomOperator;
    
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
    format?: string;
    
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

type CustomOperator = {
    [index: string]: (operator: Operator) => (...args: any[]) => Result
};

declare function extend(customOperator: CustomOperator): typeof test;

export {
    test,
    Test,
    stub,
    Stub,
    extend,
};

