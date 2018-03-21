import * as interfaces from './../validators/validatorInterfaces';
import PromiseUtils = require("./../utils/PromiseUtils");
import equal = require("deep-equal");
import IField = require("./iField");
import FieldBase = require("./fieldBase");


class Field<T> extends FieldBase<KnockoutObservable<T>, T> implements IField<T> {        
    public value: KnockoutObservable<T>;        

    constructor(validators: interfaces.IFieldValidator<T>[], useStrictForComparations: boolean = true, value?: T) {
        super(validators, useStrictForComparations, value);        
        
        this.value = ko.observable<T>(value);                

        const self = this;
        this.value.subscribe(function (newValue: T): void {
            self.validate();
        });        
    }

    protected getHasChanged(): boolean {
        const self = this;
        let areEqual = equal(self.initialValue, self.value(), { strict: self.useStrictForComparations });
        return areEqual === false;
    }

    public resetHasChanged(): void {
        const self = this;
        self.initialValue = self.value();
    }    
}

export = Field;