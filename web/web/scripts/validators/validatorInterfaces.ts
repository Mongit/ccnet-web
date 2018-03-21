
interface IValidatable {
    validate(): Promise<boolean>;
}

interface IValidationResult {
    isValid: boolean;
    message: string;
}

interface IFieldValidator<T> {
    check(value?: T): Promise<IValidationResult>;
}

export {
    IValidatable,
    IValidationResult,
    IFieldValidator
}