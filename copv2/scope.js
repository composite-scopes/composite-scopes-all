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

class EventEmitter {
    constructor() {
        this._eventHandlers = new Map();
    }

    getHandlers(event) {
        if(!this._eventHandlers.has(event)) {
            this._eventHandlers.set(event, new Set());
        }

        return this._eventHandlers.get(event);
    }

    on(event, callback) {
        this.getHandlers(event).add(callback);
    }

    off(event, callback) {
        this.getHandlers(event).delete(callback);
    }

    emit(event, ...args) {
        this.getHandlers(event).forEach(callback => callback(...args));
    }
}

// TODO: rename to PartialBehavior
export class Partial {
    constructor() {
        this._isActive = false;
        this._activatedItems = new Set();

        // TODO: use a dedicated event listener library
        this._eventEmitter = new EventEmitter();
    }
    isActive() { return this._isActive; }
    isActiveFor(obj) {
        return this._activatedItems.has(obj);
    }

    // Activation of the partial behavior
    // TODO: these methods are candidates for around advices
    activate() {
        if(!this.isActive()) {
            this._eventEmitter.emit('beforeActivation');

            this._isActive = true;
            this.__activate__();

            this._eventEmitter.emit('afterActivation');
        }

        return this;
    }
    deactivate() {
        if(this.isActive()) {
            this._eventEmitter.emit('beforeDeactivation');

            this._isActive = false;
            this.__deactivate__();

            this._eventEmitter.emit('afterDeactivation');
        }

        return this;
    }

    activateFor(obj) {
        if(!this.isActiveFor(obj)) {
            this._eventEmitter.emit('beforeActivationFor', obj);

            this._activatedItems.add(obj);
            this.__activateFor__(obj);

            this._eventEmitter.emit('afterActivationFor', obj);
        }

        return this;
    }
    deactivateFor(obj) {
        if(this.isActiveFor(obj)) {
            this._eventEmitter.emit('beforeDeactivationFor', obj);

            this._activatedItems.delete(obj);
            this.__deactivateFor__(obj);

            this._eventEmitter.emit('afterDeactivationFor', obj);
        }

        return this;
    }

    __activate__() {}
    __deactivate__() {}
    __activateFor__() {}
    __deactivateFor__() {}

    // Activation Hooks
    on(event, callback) {
        this._eventEmitter.on(event, callback);

        return this;
    }
    off(event, callback) {
        this._eventEmitter.off(event, callback);

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
