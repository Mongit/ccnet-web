class KoBinder {
    constructor() {

    }

    public static bind<T>(view: JQuery, model: T): void {
        const domObj: HTMLElement = view.get()[0];
        ko.cleanNode(domObj);
        ko.applyBindings(model, domObj);
    }
}

export = KoBinder;