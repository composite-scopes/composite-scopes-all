const events = [
    'beforeActivation',
    'afterActivation',
    'beforeDeactivation',
    'afterDeactivation'
];

export class Layer {
    constructor() {
        this._isActive = false;
        this.partials = [];

        this._eventCallbacks = new Map();
        for(let eventName of events) {
            this._eventCallbacks.set(eventName, new Set());
        }
    }

    // Managing composites
    add(partial) {
        this.partials.push(partial);

        return this;
    }
    remove(partial) {
        var i = this.partials.indexOf(partial);
        if(i >= 0) {
            this.partials.splice(i, 1);
        }
        return this;
    }
    contains(partial) {
        return this.partials.includes(partial);
    }
    [Symbol.iterator]() {
        return this.partials.values()
    }

    // Scope Activation
    activate() {
        this._eventCallbacks.get('beforeActivation').forEach(callback => callback());

        this._isActive = true;
        this.partials.forEach(partial => partial.activate());

        this._eventCallbacks.get('afterActivation').forEach(callback => callback());

        return this;
    }
    deactivate() {
        this._eventCallbacks.get('beforeDeactivation').forEach(callback => callback());

        this._isActive = false;
        this.partials.forEach(partial => partial.deactivate());

        this._eventCallbacks.get('afterDeactivation').forEach(callback => callback());

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

    // TODO: Instance-based activation
    activateFor() {}
    deactivateFor() {}
    isActiveFor() {}
}
