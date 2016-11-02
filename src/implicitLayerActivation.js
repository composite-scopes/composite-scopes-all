
import trigger from 'aexpr-trigger';

export default function activeWhile(layer, aexpr) {
    trigger(aexpr)
        .onBecomeTrue(() => layer.activate())
        .onBecomeFalse(() => layer.deactivate());
}