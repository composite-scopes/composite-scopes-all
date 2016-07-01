import Stack from 'stack-es2015-modules';

// TODO: support withoutLayers as well
export function withLayers(layers, callback) {
    let stack = new Stack();

    try {
        // TODO: we should remember the state of these scopes and revert to them after the function call;
        layers.forEach(l => l.activate());
        return callback();
    }
    finally {
        layers.forEach(l => l.deactivate());
    }
}

export function withoutLayers(layers, callback) {
    try {
        // TODO: we should remember the state of these scopes and revert to them after the function call;
        layers.forEach(l => l.deactivate());
        return callback();
    }
    finally {
        layers.forEach(l => l.activate());
    }
}
