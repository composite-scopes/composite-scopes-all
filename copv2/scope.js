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

export class Layer {
    constructor() {
        this.activatedItems = new Set();

        this._isActive = false;
        // TODO: give _partials a set semantic
        this._partials = [];

        // TODO: use a dedicated event listener library
        this._eventCallbacks = new Map();
        for(let eventName of events) {
            this._eventCallbacks.set(eventName, new Set());
        }
    }

    // Managing composites
    add(partial) {
        // TODO: test for adding a partial multiple times; this should still only cause 1 activation
        this._partials.push(partial);

        return this;
    }
    remove(partial) {
        var i = this._partials.indexOf(partial);
        if(i >= 0) {
            this._partials.splice(i, 1);
        }
        return this;
    }
    contains(partial) {
        return this._partials.includes(partial);
    }
    [Symbol.iterator]() {
        return this._partials.values()
    }

    // Scope Activation
    activate() {
        if(!this.isActive()) {
            this._eventCallbacks.get('beforeActivation').forEach(callback => callback());

            this._isActive = true;
            this._partials.forEach(partial => partial.activate());

            this._eventCallbacks.get('afterActivation').forEach(callback => callback());
        }

        return this;
    }
    deactivate() {
        if(this.isActive()) {
            this._eventCallbacks.get('beforeDeactivation').forEach(callback => callback());

            this._isActive = false;
            this._partials.forEach(partial => partial.deactivate());

            this._eventCallbacks.get('afterDeactivation').forEach(callback => callback());
        }

        return this;
    }
    isActive() { return this._isActive; }

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

    activateFor(obj) {
        if(!this.isActiveFor(obj)) {
            this._eventCallbacks.get('beforeActivationFor').forEach(callback => callback(obj));

            this.activatedItems.add(obj);
            this._partials.forEach(partial => partial.activateFor(obj));

            this._eventCallbacks.get('afterActivationFor').forEach(callback => callback(obj));
        }

        return this;
    }

    deactivateFor(obj) {
        if(this.isActiveFor(obj)) {
            this._eventCallbacks.get('beforeDeactivationFor').forEach(callback => callback(obj));

            this.activatedItems.delete(obj);
            this._partials.forEach(partial => partial.deactivateFor(obj));

            this._eventCallbacks.get('afterDeactivationFor').forEach(callback => callback(obj));
        }

        return this;
    }
    isActiveFor(obj) {
        return this.activatedItems.has(obj);
    }
}
