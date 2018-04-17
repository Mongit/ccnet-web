class PageModel {
    public pageNumber: KnockoutObservable<number>;
    public isSelected: KnockoutObservable<boolean>;
    constructor(isSelected: boolean, pageNumber: number) {
        this.isSelected = ko.observable<boolean>(isSelected);
        this.pageNumber = ko.observable<number>(pageNumber);
    }
}

export = PageModel;