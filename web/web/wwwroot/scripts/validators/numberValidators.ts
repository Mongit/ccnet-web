import * as interfaces from './validatorInterfaces';
import ValidatorBase = require("./validatorBase");

abstract class NumberValidatorBase extends ValidatorBase<number> {

    public abstract check(value?: number): Promise<interfaces.IValidationResult>;

    protected hasValue(value?: number): boolean {
        if (value === null || value === undefined || $.trim(value.toString()).length === 0) {
            return false;
        }

        return true;
    }    
}

class RequiredNumberValidator extends NumberValidatorBase {

    public check(value?: number): Promise<interfaces.IValidationResult> {
        const self = this;
        let isValid = self.hasValue(value);
        return self.toPromise(isValid, "Éste campo no puede estar vacío.");

    }
}

class FloatValidator extends NumberValidatorBase {

    public check(value?: number): Promise<interfaces.IValidationResult> {
        const self = this;
        let isValid = self.hasValue(value) === false || /^-?\d*(\.\d+)?$/.test(value.toString());
        return self.toPromise(isValid, "Éste campo debe ser númerico.");
    }
}


export {
    RequiredNumberValidator,
    FloatValidator
}