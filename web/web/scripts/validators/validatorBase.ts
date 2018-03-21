import * as interfaces from './validatorInterfaces';
import PromiseUtils = require("./../utils/PromiseUtils");

abstract class ValidatorBase<T> implements interfaces.IFieldValidator<T> {

    public abstract check(value?: T): Promise<interfaces.IValidationResult>;
    
    protected toPromise(isValid: boolean, message: string = ""): Promise<interfaces.IValidationResult> {
        let result: interfaces.IValidationResult = {
            isValid: isValid,
            message: isValid ? "" : message
        };

        return PromiseUtils.toPromise(result);
    }
}

export = ValidatorBase;