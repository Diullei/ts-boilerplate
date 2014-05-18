/// <reference path="../../typings/tsd.d.ts" />

describe('A suite', () => {
    it('contains spec with an expectation', () => {
        expect(true).toBe(true);
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
