// TODO: an adapter to ContextJS 2.0
import { Partial } from './copv2/scope.js';
import * as cop from "contextjs";

export {proceed} from "contextjs";

export class Mixin extends Partial {
    constructor() {
        super();

        this._layer = new cop.Layer();
    }

    refineClass(...args) {
        this._layer.refineClass(...args);

        return this;
    }
    refineObject(...args) {
        this._layer.refineObject(...args);

        return this;
    }
    refineActivatedInstances() {
        throw new Error('not yet implemented');
    }

    __activate__() {
        super.__activate__();

        this._layer.beGlobal();
    }
    __deactivate__() {
        super.__deactivate__();

        this._layer.beNotGlobal();
    }
    __activateFor__(obj) {
        super.__activateFor__(obj);
    }
    __deactivateFor__(obj) {
        super.__deactivateFor__(obj);
    }
}

export default function mixin(...args) {
    return new Mixin(...args);
}

// proceed alternative
//import {proceed as copProceed} from "contextjs";
// export function proceed(...args) {
//     return copProceed(...args);
// }
