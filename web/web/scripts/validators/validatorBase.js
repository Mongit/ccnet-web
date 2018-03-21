"use strict";
var PromiseUtils = require("./../utils/PromiseUtils");
var ValidatorBase = /** @class */ (function () {
    function ValidatorBase() {
    }
    ValidatorBase.prototype.toPromise = function (isValid, message) {
        if (message === void 0) { message = ""; }
        var result = {
            isValid: isValid,
            message: isValid ? "" : message
        };
        return PromiseUtils.toPromise(result);
    };
    return ValidatorBase;
}());
module.exports = ValidatorBase;
//# sourceMappingURL=validatorBase.js.map