'use strict';

import mixin, { proceed } from '../src/mixin.js';

describe('Mixin Adapter', () => {

    it('basic refineObject', () => {
        let obj = {
            value: 17,
            getValue: function() {
                return this.value;
            }
        };

        let dynamicMixin = mixin().refineObject(obj, {
            getValue: function() {
                return 42 + proceed();
            }
        });

        expect(obj.getValue()).to.equal(17);

        dynamicMixin.activate();

        expect(obj.getValue()).to.equal(42 + 17);

        dynamicMixin.deactivate();

        expect(obj.getValue()).to.equal(17);
    });

    it('overlapping mixins (refineObject)', () => {
        let obj1 = { getValue: () => 1 },
            obj2 = { getValue: () => 2 },
            obj3 = { getValue: () => 3 },
            mixin1 = mixin()
                .refineObject(obj1, { getValue: function() { return 10 + proceed(); }})
                .refineObject(obj2, { getValue: function() { return 10 + proceed(); }})
                .activate(),
            mixin2 = mixin()
                .refineObject(obj2, { getValue: function() { return 20 + proceed(); }})
                .refineObject(obj3, { getValue: function() { return 20 + proceed(); }})
                .activate();

        expect(obj1.getValue()).to.equal(1 + 10);
        expect(obj2.getValue()).to.equal(2 + 10 + 20);
        expect(obj3.getValue()).to.equal(3      + 20);

        mixin2.deactivate();

        expect(obj1.getValue()).to.equal(1 + 10);
        expect(obj2.getValue()).to.equal(2 + 10);
        expect(obj3.getValue()).to.equal(3);
    });

    it('refining static methods', () => {
        class ClassToRefine {
            static get value() {
                return 17;
            }
            static primitiveGetter() {
                return this.value;
            }
            static getValue() {
                return this.primitiveGetter();
            }
        }

        let dynamicMixin = mixin().refineObject(ClassToRefine, {
            getValue: function() {
                return 42 + proceed();
            }
        });

        expect(ClassToRefine.getValue()).to.equal(17);

        dynamicMixin.activate();

        expect(ClassToRefine.getValue()).to.equal(42 + 17);

        dynamicMixin.deactivate();

        expect(ClassToRefine.getValue()).to.equal(17);
    });

    it('refineClass', () => {
        class ClassToRefine {
            getValue() {
                return 17;
            }
        }

        let obj1 = new ClassToRefine(),
            obj2 = new ClassToRefine();

        let dynamicMixin = mixin().refineClass(ClassToRefine, {
            getValue: function() {
                return 42 + proceed();
            }
        });

        expect(obj1.getValue()).to.equal(17);
        expect(obj2.getValue()).to.equal(17);

        dynamicMixin.activate();

        expect(obj1.getValue()).to.equal(42 + 17);
        expect(obj2.getValue()).to.equal(42 + 17);

        dynamicMixin.deactivate();

        expect(obj1.getValue()).to.equal(17);
        expect(obj2.getValue()).to.equal(17);
    });

    it('instance-specific layer activation', () => {
        class ClassToRefine {
            getValue() {
                return 17;
            }
        }

        let obj1 = new ClassToRefine(),
            obj2 = new ClassToRefine(),
            instanceSpecificMixin = mixin().refineActiveInstances(ClassToRefine, {
                getValue: function() {
                    return 42 + proceed();
                }
            });

        expect(obj1.getValue()).to.equal(17);
        expect(obj2.getValue()).to.equal(17);

        instanceSpecificMixin.activateFor(obj1);

        expect(obj1.getValue()).to.equal(42 + 17);
        expect(obj2.getValue()).to.equal(17);

        instanceSpecificMixin.activateFor(obj2);

        expect(obj1.getValue()).to.equal(42 + 17);
        expect(obj2.getValue()).to.equal(42 + 17);

        instanceSpecificMixin.deactivateFor(obj1);

        expect(obj1.getValue()).to.equal(17);
        expect(obj2.getValue()).to.equal(42 + 17);
    });
});
