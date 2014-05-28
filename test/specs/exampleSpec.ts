/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../src/scripts/_reference.ts" />

describe('Testing main module', () => {
    it('say: Hello world!', () => {
        expect(Main.greeter()).toEqual('Hello world!');
    });

    it('not say: Hi guys!', () => {
        expect(Main.greeter()).not.toEqual('Hi guys');
    });

    it('1 + 1 must be 2', () => {
        expect(Main.sum(1, 1)).toBe(2);
    });
});

describe('Testing main module 2', () => {
    it('1 + 3 must be 2', () => {
        expect(Main.sum(1, 1)).toBe(2);
    });
});

describe('SinonJs spy example', () => {
    it('test should call testFn function once time', () => {

        var spy = sinon.spy();

        var testFn = (fn: Function) => {
            return fn();
        };

        testFn(spy);

        expect(spy.calledOnce).toBeTruthy();
    });
});

describe('one tautology', ()  => {
    it('is a tautology', () => {
        expect(true).toBeTruthy();
    });

    describe('is awesome', () => {
        it('is awesome', () => {
            expect(1).toBe(1);
        });
    });
});

describe('simple tests', () => {
    it('increments', () => {
        var mike = 0;

        expect(mike++ === 0).toBeTruthy();
        expect(mike === 1).toBeTruthy();
    });

    it('increments (improved)', () => {
        var mike = 0;

        expect(mike++).toBe(0);
        expect(mike).toBe(1);
    });
});

describe('setUp/tearDown', () => {
    beforeEach(() => {
        // console.log('Before');
    });

    afterEach(() => {
        // console.log('After');
    });

    it('example', () => {
        // console.log('During');
    });

    describe('setUp/tearDown', () => {
        beforeEach(() => {
            // console.log('Before2');
        });

        afterEach(() => {
            // console.log('After2');
        });

        it('example', () => {
            // console.log('During Nested');
        });
    });
});

describe('async', () => {
    var semaphore = 2;

    beforeEach(done => {
        setTimeout(() => {
            expect(true).toBeTruthy();
            semaphore--;
        }, 500);

        setTimeout(() => {
            expect(true).toBeTruthy();
            semaphore--;

            done();
        }, 600);
    });

    it('multiple async', () => {
        // this won't run until the done callback is invoked from the beforeEach
        expect(semaphore).toBe(0);
    });
});
