const events = [
    'beforeActivation',
    'afterActivation',
    'beforeDeactivation',
    'afterDeactivation',

    'beforeActivationFor',
    'afterActivationFor',
    'beforeDeactivationFor',
    'afterDeactivationFor'
];

// TODO: rename to PartialBehavior
export class Partial {
    constructor() {
        this._isActive = false;
        this._activatedItems = new Set();

        // TODO: use a dedicated event listener library
        this._eventCallbacks = new Map();
        for(let eventName of events) {
            this._eventCallbacks.set(eventName, new Set());
        }
    }
    isActive() { return this._isActive; }
    isActiveFor(obj) {
        return this._activatedItems.has(obj);
    }

    // Activation of the partial behavior
    // TODO: these methods are candidates for around advices
    activate() {
        if(!this.isActive()) {
            this._eventCallbacks.get('beforeActivation').forEach(callback => callback());

            this._isActive = true;
            this.__activate__();

            this._eventCallbacks.get('afterActivation').forEach(callback => callback());
        }

        return this;
    }
    deactivate() {
        if(this.isActive()) {
            this._eventCallbacks.get('beforeDeactivation').forEach(callback => callback());

            this._isActive = false;
            this.__deactivate__();

            this._eventCallbacks.get('afterDeactivation').forEach(callback => callback());
        }

        return this;
    }

    activateFor(obj) {
        if(!this.isActiveFor(obj)) {
            this._eventCallbacks.get('beforeActivationFor').forEach(callback => callback(obj));

            this._activatedItems.add(obj);
            this.__activateFor__(obj);

            this._eventCallbacks.get('afterActivationFor').forEach(callback => callback(obj));
        }

        return this;
    }
    deactivateFor(obj) {
        if(this.isActiveFor(obj)) {
            this._eventCallbacks.get('beforeDeactivationFor').forEach(callback => callback(obj));

            this._activatedItems.delete(obj);
            this.__deactivateFor__(obj);

            this._eventCallbacks.get('afterDeactivationFor').forEach(callback => callback(obj));
        }

        return this;
    }

    __activate__() {}
    __deactivate__() {}
    __activateFor__() {}
    __deactivateFor__() {}

    // Activation Hooks
    on(event, callback) {
        var callbacks = this._eventCallbacks.get(event);
        callbacks.add(callback);

        return this;
    }
    off(event, callback) {
        var callbacks = this._eventCallbacks.get(event);
        callbacks.delete(callback);

        return this;
    }
}

export class Scope extends Partial {
    constructor() {
        super();

        this._partials = new Set();
    }

    // Managing composites
    add(partial) {
        this._partials.add(partial);

        if(this.isActive()) {
            partial.activate();
        }
        this._activatedItems.forEach(activatedItem => partial.activateFor(activatedItem));

        return this;
    }
    remove(partial) {
        this._partials.delete(partial);

        if(this.isActive()) {
            partial.deactivate();
        }
        this._activatedItems.forEach(activatedItem => partial.deactivateFor(activatedItem));

        return this;
    }
    contains(partial) {
        return this._partials.has(partial);
    }
    [Symbol.iterator]() {
        return this._partials.values()
    }

    __activate__() {
        super.__activate__();

        this._partials.forEach(partial => partial.activate());
    }
    __deactivate__() {
        super.__deactivate__();

        this._partials.forEach(partial => partial.deactivate());
    }
    __activateFor__(obj) {
        super.__activateFor__(obj);

        this._partials.forEach(partial => partial.activateFor(obj));
    }
    __deactivateFor__(obj) {
        super.__deactivateFor__(obj);

        this._partials.forEach(partial => partial.deactivateFor(obj));
    }
}
