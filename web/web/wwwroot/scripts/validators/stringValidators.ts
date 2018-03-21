import * as interfaces from './validatorInterfaces';
import ValidatorBase = require("./validatorBase");

abstract class StringValidatorBase extends ValidatorBase<string> {

    public abstract check(value?: string): Promise<interfaces.IValidationResult>;

    protected hasValue(value?: string): boolean
    {
        if (value === null || value === undefined || $.trim(value).length === 0) {
            return false;
        }

        return true;
    }    
}

class StartsByRStringValidator extends StringValidatorBase {    

    public check(value?: string): Promise<interfaces.IValidationResult> {
        const self = this;
        let isValid = !self.hasValue(value) || value[0].toUpperCase() === "R";
        return self.toPromise(isValid, "Éste campo debe comenzar con la letra R.");
    }

}

class RequiredStringValidator extends StringValidatorBase {   

    public check(value?: string): Promise<interfaces.IValidationResult> {
        const self = this;
        let isValid = self.hasValue(value);
        return self.toPromise(isValid, "Éste campo no puede estar vacío.");
        
    }
}

export {
    StartsByRStringValidator,
    RequiredStringValidator
}