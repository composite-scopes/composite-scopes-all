import { Partial } from './scope.js';
import * as cop from "contextjs/lib/Layers";

export { proceed } from "contextjs";

function applyLayerableObjectTraitTo(klass) {
    if(klass.prototype.activeLayers) { return; }

    // TODO: check why this can't simply be Object.assign(klass.prototype, cop.LayerableObjectTrait.prototype);
    // appearingly, transpiled prototype properties are not enumerable!
    [
        "activeLayers",
        "collectWithLayersIn",
        "collectWithoutLayersIn",
        "dynamicLayers",
        "structuralLayers",
        "globalLayers",
        "setWithLayers",
        "addWithLayer",
        "removeWithLayer",
        "addWithoutLayer",
        "removeWithoutLayer",
        "setWithoutLayers",
        "getWithLayers",
        "getWithoutLayer"
    ].forEach(property => {
        klass.prototype[property] = cop.LayerableObjectTrait.prototype[property];
    });
}

export class Mixin extends Partial {
    constructor() {
        super();

        this._layer = new cop.Layer();
        this._instanceSpecificLayer = new cop.Layer();
    }

    refineClass(...args) {
        this._layer.refineClass(...args);

        return this;
    }
    refineObject(...args) {
        this._layer.refineObject(...args);

        return this;
    }
    refineActiveInstances(klass, ...rest) {
        this._instanceSpecificLayer.refineClass(klass, ...rest);
        applyLayerableObjectTraitTo(klass);

        return this;
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

        obj.addWithLayer(this._instanceSpecificLayer);
    }
    __deactivateFor__(obj) {
        super.__deactivateFor__(obj);

        obj.removeWithLayer(this._instanceSpecificLayer);
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
