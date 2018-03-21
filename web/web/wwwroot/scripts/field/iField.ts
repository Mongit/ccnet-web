
import * as interfaces from './../validators/validatorInterfaces';

interface IField<T> {
    value: KnockoutObservable<T>;
    validators: interfaces.IFieldValidator<T>[];
    errors: KnockoutObservableArray<string>;
    hasChanged: KnockoutComputed<boolean>;
    hasError: KnockoutComputed<boolean>;
    validate(): Promise<boolean>;
    resetHasChanged(): void;
}

export = IField;