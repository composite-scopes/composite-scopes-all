import Stack from 'stack-es2015-modules';

const layerStack = new Stack();

function memorizeState(layers) {
    layerStack.push(layers.map(l => l.isActive()));
}

function restoreState(layers) {
    let previouslyActivated = layerStack.top();
    layerStack.pop();
    layers.forEach((l, i) => {
        if(previouslyActivated[i]) {
            if(!l.isActive()) {
                l.activate();
            }
        } else {
            if(l.isActive()) {
                l.deactivate();
            }
        }
    });
}

export function withLayers(layers, callback) {
    memorizeState(layers);
    try {
        layers.forEach(l => l.activate());
        return callback();
    }
    finally {
        restoreState(layers);
    }
}

export function withoutLayers(layers, callback) {
    memorizeState(layers);
    try {
        layers.forEach(l => l.deactivate());
        return callback();
    }
    finally {
        restoreState(layers);
    }
}

// TODO: withLayersFor and withoutLayersFor as instance specific activation variants
