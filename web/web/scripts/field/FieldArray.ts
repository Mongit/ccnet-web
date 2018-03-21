import * as interfaces from './../validators/validatorInterfaces';
import PromiseUtils = require("./../utils/PromiseUtils");
import equal = require("deep-equal");
import IFieldArray = require("./iFieldArray");
import FieldBase = require("./../field/fieldBase");


class FieldArray<T> extends FieldBase<KnockoutObservableArray<T>, T> implements IFieldArray<T> {    
    public value: KnockoutObservableArray<T>;

    constructor(validators: interfaces.IFieldValidator<T[]>[], useStrictForComparations: boolean = true, value?: T[]) {
        super(validators, useStrictForComparations, value);        
        this.value = ko.observableArray<T>(value);

        // =========================================================================
        // "arrayChange": Please subscribe on the cosumer class.
        // =========================================================================        
        // const self = this;
        // this.value.subscribe(function (changes: KnockoutArrayChange<T>): void {
        //     //self.validate();
        // }, self, "arrayChange");
        // =========================================================================
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

export = FieldArray;