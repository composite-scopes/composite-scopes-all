'use strict';

import { Scope, Partial } from '../copv2/scope.js';

class SpyPartial extends Partial {
    constructor() {
        super();

        this.activate = sinon.spy(this.activate);
        this.deactivate = sinon.spy(this.deactivate);
        this.activateFor = sinon.spy(this.activateFor);
        this.deactivateFor = sinon.spy(this.deactivateFor);
    }
}

describe('Composite Scopes', () => {
    describe('Basic Functionality', () => {
        let scope;

        beforeEach(() => {
            scope = new Scope();
        });

        it('should delegate a basic activation', () => {
            let partial = new SpyPartial();

            scope
                .add(partial)
                .activate();

            expect(partial.activate.calledOnce).to.be.true;

            scope.deactivate();
            expect(partial.deactivate.calledOnce).to.be.true;
        });

        it('does not activate an activated scope again', () => {
            let partial = new SpyPartial();

            scope
                .add(partial)
                .activate();

            expect(partial.activate.calledOnce).to.be.true;

            scope.activate();
            expect(partial.activate.calledOnce).to.be.true;
        });

        it('does not activate an activated scope again', () => {
            let partial = new SpyPartial();

            scope
                .add(partial)
                .activate()
                .deactivate()
                .deactivate();

            expect(partial.deactivate.calledOnce).to.be.true;
        });

        it('ensures that partials have a set semantic', () => {
            let partial = new SpyPartial();

            scope
                .add(partial)
                .add(partial)
                .activate();

            expect(partial.activate.calledOnce).to.be.true;
        });

        // TODO: What about edge cases like adding an existing partial or removing a non-existing one?
        it('manage contained objects', () => {
            let partial1 = {},
                partial2 = {},
                partial3 = {};

            scope
                .add(partial1)
                .add(partial2);

            expect(scope.contains(partial1)).to.be.true;
            expect(scope.contains(partial2)).to.be.true;
            expect(scope.contains(partial3)).not.to.be.true;

            scope.remove(partial2);

            expect(scope.contains(partial1)).to.be.true;
            expect(scope.contains(partial2)).not.to.be.true;
            expect(scope.contains(partial3)).not.to.be.true;
        });

        it('adding to an already active scope should activate the partial', () => {
            let partial = new SpyPartial();

            scope
                .activate()
                .add(partial);

            assert(partial.activate.calledOnce);
        });

        it('removing while being active causes the partial to be deactivated', () => {
            let partial = new SpyPartial();

            scope
                .add(partial)
                .activate()
                .remove(partial);

            assert(partial.deactivate.calledOnce);
        });

        it('should support nested scopes', () => {
            let partial = new SpyPartial();

            scope
                .add((new Scope())
                    .add(partial))
                .activate();

            assert(partial.activate.calledOnce);
        });

        it('should support iterating over added _partials', () => {
            let partial1 = new Partial(),
                partial2 = new Partial(),
                partial3 = new Partial(),
                spy = sinon.spy();

            scope
                .add(partial1)
                .add(partial2)
                .add(partial3);

            for(let partial of scope) {
                spy(partial);
            }

            assert(spy.calledWith(partial1));
            assert(spy.calledWith(partial2));
            assert(spy.calledWith(partial3));
        });

        it('allows simple reflection via isActive', () => {
            expect(scope.isActive()).not.to.be.true;
            scope.activate();
            expect(scope.isActive()).to.be.true;
            scope.deactivate();
            expect(scope.isActive()).not.to.be.true;
        });

        describe('Instance-specific (de-)activation', () => {

            it('should delegate a basic activation', () => {
                let partial = new SpyPartial(),
                    obj = {};

                scope
                    .add(partial)
                    .activateFor(obj);

                expect(partial.activateFor.withArgs(obj).calledOnce).to.be.true;
            });

            it('consequtive (de-)activations are no-ops', () => {
                let partial = new SpyPartial(),
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
                let partial = new SpyPartial(),
                    obj = {};

                scope
                    .add(new Scope()
                        .add(partial))
                    .activateFor(obj);

                expect(partial.activateFor.withArgs(obj).calledOnce).to.be.true;
            });

            it('adding a partial causes it to be activated for each activated item', () => {
                let partial = new SpyPartial(),
                    obj = {};

                scope
                    .activateFor(obj)
                    .add(partial);

                assert(partial.activateFor.withArgs(obj).calledOnce);
            });

            it('removing a partial of an active scope causes it to be deactivated for each activated item', () => {
                let partial = new SpyPartial(),
                    obj = {};

                scope
                    .add(partial)
                    .activateFor(obj)
                    .remove(partial);

                assert(partial.deactivateFor.withArgs(obj).calledOnce);
            });

            it('allows simple reflection via isActiveFor', () => {
                let obj = {},
                    obj2 = {};

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

    describe('Activation Hooks', () => {
        it('should notify on basic activation', () => {
            let callback = sinon.spy();

            new Scope()
                .on('beforeActivation', callback)
                .activate();

            assert(callback.calledOnce);
        });

        it('activating an already activated scope should not trigger an additional notification', () => {
            let callback = sinon.spy();

            new Scope()
                .on('beforeActivation', callback)
                .activate()
                .activate();

            assert(callback.calledOnce);
        });

        it('should call before hooks, _partials, then after hooks in that order', () => {
            let beforeCallback = sinon.spy(),
                partial = new SpyPartial(),
                afterCallback = sinon.spy();

            let layer = new Scope()
                .on('beforeActivation', beforeCallback)
                .add(partial)
                .on('afterActivation', afterCallback)
                .activate();

            assert(beforeCallback.called);
            assert(partial.activate.called);
            assert(afterCallback.called);
            assert(beforeCallback.calledBefore(partial.activate));
            assert(partial.activate.calledBefore(afterCallback));

            let beforeDeactivationCallback = sinon.spy(),
                afterDeactivationCallback = sinon.spy();

            layer
                .on('beforeDeactivation', beforeDeactivationCallback)
                .on('afterDeactivation', afterDeactivationCallback)
                .deactivate();

            assert(beforeDeactivationCallback.called);
            assert(partial.deactivate.called);
            assert(afterDeactivationCallback.called);
            assert(beforeDeactivationCallback.calledBefore(partial.deactivate));
            assert(partial.deactivate.calledBefore(afterDeactivationCallback));
        });

        it('should allow to detach existing hooks', () => {
            function callback() {
                scope.off('beforeActivation', spy)
            }

            let scope = new Scope(),
                spy = sinon.spy(callback);

            scope
                .on('beforeActivation', spy)
                .activate();

            assert(spy.calledOnce);

            scope
                .deactivate()
                .activate();

            // callback should not be called again
            assert(spy.calledOnce);
        });

        describe('Instance-specific notifications', () => {
            it('should notify on basic activation', () => {
                let obj = {},
                    callback = sinon.spy();

                new Scope()
                    .on('beforeActivationFor', callback)
                    .activateFor(obj);

                expect(callback.withArgs(obj).calledOnce).to.be.true;
            });

            it('should call before hooks, _partials, then after hooks in that order', () => {
                let obj = {},
                    beforeCallback = sinon.spy(),
                    partial = new SpyPartial(),
                    afterCallback = sinon.spy();

                let layer = new Scope()
                    .on('beforeActivationFor', beforeCallback)
                    .add(partial)
                    .on('afterActivationFor', afterCallback)
                    .activateFor(obj);

                expect(beforeCallback.withArgs(obj).calledOnce).to.be.true;
                expect(partial.activateFor.withArgs(obj).calledOnce).to.be.true;
                expect(afterCallback.withArgs(obj).calledOnce).to.be.true;
                assert(beforeCallback.withArgs(obj).calledBefore(partial.activateFor.withArgs(obj)));
                assert(partial.activateFor.withArgs(obj).calledBefore(afterCallback.withArgs(obj)));

                let beforeDeactivationCallback = sinon.spy(),
                    afterDeactivationCallback = sinon.spy();

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
