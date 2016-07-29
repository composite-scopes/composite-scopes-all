'use strict';

import mixin from '../src/mixin.js';
import {layer, proceed, withLayers} from 'contextjs';

describe('Mixin Adapter', () => {

    describe('ContextJS', () => {

        it('beGlobal', () => {
            let obj = {
                value: 17,
                getValue: function() {
                    return this.value;
                }
            };

            var l = layer('foo')
                .refineObject(obj, {
                    getValue: function() {
                        return 42 + proceed();
                    }
                });

            expect(obj.getValue()).to.equal(17);

            l.beGlobal();

            expect(obj.getValue()).to.equal(42 + 17);
        });

        it('instance-specific layer activation', () => {
            let obj = {
                value: 17,
                getValue: function() {
                    return this.value;
                }
            };

            var l = layer('foo')
                .refineObject(obj, {
                    getValue: function() {
                        return 42 + proceed();
                    }
                });

            expect(obj.getValue()).to.equal(17);

            l.beGlobal();

            expect(obj.getValue()).to.equal(42 + 17);
        });
    });
});
