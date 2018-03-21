import IModalModel = require("./iModalModel");

class ConfirmModel implements IModalModel {
    
    public message: KnockoutObservable<string>;
    public result: KnockoutObservable<boolean>;
    public dialog: JQuery;

    constructor(message: string) {
        this.message = ko.observable<string>(message);
        this.result = ko.observable<boolean>(false);
    }

    public setToTrue(): void {
        const self = this;
        self.result(true);
        self.dialog.modal('hide');
    }

    public setModal(modal: JQuery): void {
        const self = this;
        this.dialog = modal;
    }

}

export = ConfirmModel;