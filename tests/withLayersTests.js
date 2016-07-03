'use strict';

import { Scope } from '../copv2/scope.js';
import { withLayers, withoutLayers } from '../copv2/withLayers.js';

class TestPartial {
    constructor() {}
    
    activate() {}
    deactivate() {}
    activateFor() {}
    deactivateFor() {}
}

function getSpyOnActivate(partial) {
    return partial.activate = sinon.spy();
}

describe('withLayers', function() {
    it('should allow basic control flow-based scoping', () => {
        var l1 = new Scope(),
            l2 = new Scope(),
            spy = sinon.spy();

        var value = withLayers([l1, l2], () => {
            expect(l1.isActive()).to.be.true;
            expect(l2.isActive()).to.be.true;
            spy();
            return 42;
        });

        expect(l1.isActive()).not.to.be.true;
        expect(l2.isActive()).not.to.be.true;
        assert(spy.called);
        expect(value).to.equal(42);
    });

    xit('should support nested activation', () => {
        var l1 = new Scope(),
            l2 = new Scope(),
            spy = sinon.spy();

        withLayers([l1, l2], () => {
            expect(l1.isActive()).to.be.true;
            expect(l2.isActive()).to.be.true;
            withoutLayers([l2], () => {
                expect(l1.isActive()).to.be.true;
                expect(l2.isActive()).to.be.false;
                spy();
            });
            expect(l1.isActive()).to.be.true;
            expect(l2.isActive()).to.be.true;
        });

        expect(l1.isActive()).to.be.false;
        expect(l2.isActive()).to.be.false;
        assert(spy.calledOnce);
    });
    
    xit('should support nested withLayers', () => {
        var l1 = new Scope(),
            l2 = new Scope(),
            spy = sinon.spy();

        withLayers([l1], () => {
            expect(l1.isActive()).to.be.true;
            expect(l2.isActive()).to.be.false;

            withLayers([l2], () => {
                expect(l1.isActive()).to.be.true;
                expect(l2.isActive()).to.be.true;
                spy();
            });

            expect(l1.isActive()).to.be.true;
            expect(l2.isActive()).to.be.false;

            withLayers([l1, l2], () => {
                expect(l1.isActive()).to.be.true;
                expect(l2.isActive()).to.be.true;
                spy();
            });

            expect(l1.isActive()).to.be.true;
            expect(l2.isActive()).to.be.false;
            spy();
        });

        expect(l1.isActive()).to.be.false;
        expect(l2.isActive()).to.be.false;
        //assert(spy.calledThrice);
    });
});
