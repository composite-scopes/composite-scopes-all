function difference(list, without) {
    return list.filter(obj => !without.some(obj2 => obj === obj2));
}

function diff(newList, oldList) {
    var enteredItems = difference(newList, oldList);
    var updatedItems = difference(newList, enteredItems);
    var exitedItems = difference(oldList, newList);

    return [enteredItems, updatedItems, exitedItems];
}

class Notifier {
    constructor(eventType, selector, callback, useCapture) {
        this.eventType = eventType;
        this.selector = selector;
        this.callback = callback;
        this.useCapture = useCapture;

        this.selectedElements = [];

        this.installGlobalListener();

        this.update();
    }

    installGlobalListener() {
        var i = 0;
        this.globalListener = () => {
            console.log('Global Listener', ++i);
            this.update();
        };

        document.documentElement.addEventListener(this.eventType, this.globalListener, true);
    }

    update(newSelection = document.querySelectorAll(this.selector)) {
        let oldSelection = this.selectedElements;
        this.selectedElements = Array.from(newSelection);

        let [nju, upd, old] = diff(this.selectedElements, oldSelection);
        console.log(nju, upd, old);
        nju.forEach(item => item.addEventListener(this.eventType, this.callback, this.useCapture));
        old.forEach(item => item.removeEventListener(this.eventType, this.callback, this.useCapture));
    }

    uninstall() {
        document.documentElement.removeEventListener(this.eventType, this.globalListener, true);
        this.update([]);
    }
}

export function notify(...args) {
    return new Notifier(...args);
}
