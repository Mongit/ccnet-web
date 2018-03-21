import * as interfaces from './../validators/validatorInterfaces';
import PromiseUtils = require("./../utils/PromiseUtils");
import equal = require("deep-equal");
import IFieldBase = require("./iFieldBase");


abstract class FieldBase<Ko extends KnockoutObservable<T> | KnockoutObservableArray<T>, T> implements IFieldBase<Ko, T>, interfaces.IValidatable {
    public validators: interfaces.IFieldValidator<T | T[]>[];
    public value: Ko;
    public errors: KnockoutObservableArray<string>;
    public hasChanged: KnockoutComputed<boolean>;
    public hasError: KnockoutComputed<boolean>;    
    public abstract resetHasChanged(): void;
    protected abstract getHasChanged(): boolean;
    protected useStrictForComparations: boolean;

    protected initialValue?: T | T[];

    constructor(validators: interfaces.IFieldValidator<T | T[]>[], useStrictForComparations: boolean, value?: T | T[]) {
        this.validators = validators;
        this.initialValue = value;        

        this.useStrictForComparations = useStrictForComparations;
        this.errors = ko.observableArray<string>([]);

        const self = this;        

        this.hasChanged = ko.pureComputed<boolean>(function (): boolean {
            return self.getHasChanged();
        }, self);
        this.hasError = ko.pureComputed<boolean>(function (): boolean {
            return self.errors().length > 0;
        }, self);
    }

    public async validate(): Promise<boolean> {
        const self = this;
        self.errors.removeAll();

        let isValid = true;

        for (let validator of self.validators) {
            let result = await validator.check(self.value());

            if (result.isValid === false) {
                self.errors.push(result.message);
                isValid = false;
            }
        }

        return PromiseUtils.toPromise(isValid);
    }
}

export = FieldBase;