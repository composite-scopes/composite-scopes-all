
class Case {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    applicable() {
        return this.from.every(layer => layer.isActive())
    }

    applyTransition() {
        this.from.forEach(requiredLayer => requiredLayer.deactivate());
        this.to.forEach(resultingLayer => resultingLayer.activate());
    }
}
class EventCapture {
    constructor(eventName, condition = () => true) {
        this.cases = [];

        document.documentElement.addEventListener('click', event => {
            // check whether the given condition is fulfilled
            if(!condition(event)) {
                return;
            }

            // semantics: Execute the first transitions that's requirement are fulfilled (i.e. the specified layers are active)
            var matchingCase = this.cases.find(c => c.applicable());

            if(matchingCase) {
                matchingCase.applyTransition();
            }
        }, true);
    }

    transition(from, to) {
        this.cases.push(new Case(from, to));

        return this;
    }
    
    uninstall() {
        return this;
    }
}

export default function onEvent(...args) {
    return new EventCapture(...args);
}
