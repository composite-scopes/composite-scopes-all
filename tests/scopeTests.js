'use strict';

import { Scope } from '../copv2/scope.js';

class TestPartial {
    constructor() {}
    
    activate() {}
    deactivate() {}
    activateFor() {}
    deactivateFor() {}
}

class SpyPartial {
    constructor() {
        this.activate = sinon.spy();
        this.deactivate = sinon.spy();
        this.activateFor = sinon.spy();
        this.deactivateFor = sinon.spy();
    }
}

function getSpyOnActivate(partial) {
    return partial.activate = sinon.spy();
}

describe('Scope', function() {
    describe('Basic Functionality', function() {
        var testLayer;

        beforeEach(() => {
            testLayer = new Scope();
        });

        it('should delegate a basic activation', () => {
            var partial = new SpyPartial();

            testLayer
                .add(partial)
                .activate();

            expect(partial.activate.calledOnce).to.be.true;

            testLayer.deactivate();
            expect(partial.deactivate.calledOnce).to.be.true;
        });

        it('does not activate an activated scope again', () => {
            var partial = new SpyPartial();

            testLayer
                .add(partial)
                .activate();

            expect(partial.activate.calledOnce).to.be.true;

            testLayer.activate();
            expect(partial.activate.calledOnce).to.be.true;
        });

        it('does not activate an activated scope again', () => {
            var partial = new SpyPartial();

            testLayer
                .add(partial)
                .activate()
                .deactivate()
                .deactivate();

            expect(partial.deactivate.calledOnce).to.be.true;
        });

        it('ensures that partials have a set semantic', () => {
            var partial = new SpyPartial();

            testLayer
                .add(partial)
                .add(partial)
                .activate();

            expect(partial.activate.calledOnce).to.be.true;
        });

        // TODO: What about edge cases like adding an existing element or removing a non-existing one?
        it('manage contained objects', () => {
            var partial1 = {},
                partial2 = {},
                partial3 = {};

            testLayer
                .add(partial1)
                .add(partial2);

            expect(testLayer.contains(partial1)).to.be.true;
            expect(testLayer.contains(partial2)).to.be.true;
            expect(testLayer.contains(partial3)).not.to.be.true;

            testLayer.remove(partial2);

            expect(testLayer.contains(partial1)).to.be.true;
            expect(testLayer.contains(partial2)).not.to.be.true;
            expect(testLayer.contains(partial3)).not.to.be.true;
        });

        it('should support nested scopes', () => {
            var partial = new TestPartial();
            var spy = getSpyOnActivate(partial);

            testLayer
                .add(new Scope()
                    .add(partial))
                .activate();

            assert(spy.called)
        });

        it('should support iterating over added _partials', () => {
            var partial1 = new TestPartial(),
                partial2 = new TestPartial(),
                partial3 = new TestPartial();
            var spy = sinon.spy();

            testLayer
                .add(partial1)
                .add(partial2)
                .add(partial3);

            for(let partial of testLayer) {
                spy(partial);
            }

            assert(spy.calledWith(partial1));
            assert(spy.calledWith(partial2));
            assert(spy.calledWith(partial3));
        });

        it('allows simple reflection via isActive', () => {
            expect(testLayer.isActive()).not.to.be.true;
            testLayer.activate();
            expect(testLayer.isActive()).to.be.true;
            testLayer.deactivate();
            expect(testLayer.isActive()).not.to.be.true;
        });

        describe('Instance-specific (de-)activation', function() {
            var scope;

            beforeEach(() => {
                scope = new Scope();
            });

            it('should delegate a basic activation', () => {
                var partial = new SpyPartial(),
                    obj = {};

                scope
                    .add(partial)
                    .activateFor(obj);

                expect(partial.activateFor.withArgs(obj).calledOnce).to.be.true;
            });

            it('consequtive (de-)activations are no-ops', () => {
                var partial = new SpyPartial(),
                    obj = {};

                scope
                    .add(partial)
                    .activateFor(obj)
                    .activateFor(obj);

                expect(partial.activateFor.withArgs(obj).calledOnce).to.be.true;

                scope
                    .deactivateFor(obj)
                    .deactivateFor(obj);

                expect(partial.deactivateFor.withArgs(obj).calledOnce).to.be.true;
            });

            it('should support nested scopes', () => {
                var partial = new SpyPartial(),
                    obj = {};

                scope
                    .add(new Scope()
                        .add(partial))
                    .activateFor(obj);

                expect(partial.activateFor.withArgs(obj).calledOnce).to.be.true;
            });

            it('allows simple reflection via isActiveFor', () => {
                let obj = {}, obj2 = {};

                expect(scope.isActiveFor(obj)).to.be.false;
                expect(scope.isActiveFor(obj2)).to.be.false;

                scope.activateFor(obj);
                expect(scope.isActiveFor(obj)).to.be.true;
                expect(scope.isActiveFor(obj2)).to.be.false;

                scope.activateFor(obj2);
                expect(scope.isActiveFor(obj)).to.be.true;
                expect(scope.isActiveFor(obj2)).to.be.true;

                scope.deactivateFor(obj);
                expect(scope.isActiveFor(obj)).to.be.false;
                expect(scope.isActiveFor(obj2)).to.be.true;
            });
        });
    });

    describe('Activation Hooks', function() {
        it('should notify on basic activation', () => {
            var callback = sinon.spy();

            new Scope()
                .on('beforeActivation', callback)
                .activate();

            assert(callback.calledOnce);
        });

        it('activating an already activated scope should not trigger an additional notification', () => {
            var callback = sinon.spy();

            new Scope()
                .on('beforeActivation', callback)
                .activate()
                .activate();

            assert(callback.calledOnce);
        });

        it('should call before hooks, _partials, then after hooks in that order', () => {
            var beforeCallback = sinon.spy();
            var partial = new TestPartial();
            var partialActivated = getSpyOnActivate(partial);
            var afterCallback = sinon.spy();

            var layer = new Scope()
                .on('beforeActivation', beforeCallback)
                .add(partial)
                .on('afterActivation', afterCallback)
                .activate();

            assert(beforeCallback.called);
            assert(partialActivated.called);
            assert(afterCallback.called);
            assert(beforeCallback.calledBefore(partialActivated));
            assert(partialActivated.calledBefore(afterCallback));

            var beforeDeactivationCallback = sinon.spy();
            var partialDeactivated = partial.deactivate = sinon.spy();
            var afterDeactivationCallback = sinon.spy();

            layer
                .on('beforeDeactivation', beforeDeactivationCallback)
                .on('afterDeactivation', afterDeactivationCallback)
                .deactivate();

            assert(beforeDeactivationCallback.called);
            assert(partialDeactivated.called);
            assert(afterDeactivationCallback.called);
            assert(beforeDeactivationCallback.calledBefore(partialDeactivated));
            assert(partialDeactivated.calledBefore(afterDeactivationCallback));
        });

        it('should allow to detach existing hooks', () => {
            var layer = new Scope();
            var callback = function() {
                layer.off('beforeActivation', spy)
            };
            var spy = sinon.spy(callback);

            layer
                .on('beforeActivation', spy)
                .activate();

            assert(spy.calledOnce);

            layer
                .deactivate()
                .activate();

            // callback should not be called again
            assert(spy.calledOnce);
        });

        describe('Instance-specific notifications', function() {
            it('should notify on basic activation', () => {
                let obj = {},
                    callback = sinon.spy();

                new Scope()
                    .on('beforeActivationFor', callback)
                    .activateFor(obj);

                expect(callback.withArgs(obj).calledOnce).to.be.true;
            });

            it('should call before hooks, _partials, then after hooks in that order', () => {
                let obj = {};
                var beforeCallback = sinon.spy();
                var partial = new SpyPartial();
                var afterCallback = sinon.spy();

                var layer = new Scope()
                    .on('beforeActivationFor', beforeCallback)
                    .add(partial)
                    .on('afterActivationFor', afterCallback)
                    .activateFor(obj);

                expect(beforeCallback.withArgs(obj).calledOnce).to.be.true;
                expect(partial.activateFor.withArgs(obj).calledOnce).to.be.true;
                expect(afterCallback.withArgs(obj).calledOnce).to.be.true;
                assert(beforeCallback.withArgs(obj).calledBefore(partial.activateFor.withArgs(obj)));
                assert(partial.activateFor.withArgs(obj).calledBefore(afterCallback.withArgs(obj)));

                var beforeDeactivationCallback = sinon.spy();
                var afterDeactivationCallback = sinon.spy();

                layer
                    .on('beforeDeactivationFor', beforeDeactivationCallback)
                    .on('afterDeactivationFor', afterDeactivationCallback)
                    .deactivateFor(obj);

                expect(beforeDeactivationCallback.withArgs(obj).calledOnce).to.be.true;
                expect(partial.deactivateFor.withArgs(obj).calledOnce).to.be.true;
                expect(afterDeactivationCallback.withArgs(obj).calledOnce).to.be.true;
                assert(beforeDeactivationCallback.calledBefore(partial.deactivateFor));
                assert(partial.deactivateFor.calledBefore(afterDeactivationCallback));
            });
        });
    });
});
