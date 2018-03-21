import * as interfaces from './../validators/validatorInterfaces';
import IField = require("./../field/iField");
import Field = require("./../field/field");
import IFieldBase = require("./../field/iFieldBase");
import FieldBase = require("./../field/fieldBase");
import IFieldArray = require("./../field/iFieldArray");
import FieldArray = require("./../field/FieldArray");
import ValidatableValidator = require("./../validators/ValidatableValidator");

class KoForm extends FieldBase<KnockoutObservableArray<IFieldBase<any, any>>, IFieldBase<any, any>> {    
    
    public value: KnockoutObservableArray<IFieldBase<any, any>>;    
    
    constructor(validators: interfaces.IFieldValidator<IFieldBase<any, any>[]>[] = [new ValidatableValidator<IFieldBase<any, any>>("Encontramos un error en alguno de sus campos.")]) {
        super(validators, true, []);
        this.value = ko.observableArray<IFieldBase<any, any>>();
    }

    public resetHasChanged(): void {
        const self = this;
        for (let field of self.value()) {
            field.resetHasChanged();
        }
    }

    protected getHasChanged(): boolean {
        const self = this;
        for (let field of self.value()) {
            if (field.hasChanged()) {
                return true;
            }
        }

        return false;
    }

    public addField<T>(validators: interfaces.IFieldValidator<T>[], useStrictForComparations: boolean = true, value?: T): IField<T> {
        const self = this;

        let field: IField<T> = new Field<T>(validators, useStrictForComparations, value);

        self.value.push(field);

        return field;
    }

    public addFieldArray<T>(validators: interfaces.IFieldValidator<T[]>[], useStrictForComparations: boolean = true, value?: T[]): IFieldArray<T> {
        const self = this;                

        let field: IFieldArray<T> = new FieldArray<T>(validators, useStrictForComparations, value);

        self.value.push(field);

        return field;
    }
}

export = KoForm;