"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidatorBase = require("./validatorBase");
var StringValidatorBase = /** @class */ (function (_super) {
    __extends(StringValidatorBase, _super);
    function StringValidatorBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringValidatorBase.prototype.hasValue = function (value) {
        if (value === null || value === undefined || $.trim(value).length === 0) {
            return false;
        }
        return true;
    };
    return StringValidatorBase;
}(ValidatorBase));
var StartsByRStringValidator = /** @class */ (function (_super) {
    __extends(StartsByRStringValidator, _super);
    function StartsByRStringValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartsByRStringValidator.prototype.check = function (value) {
        var self = this;
        var isValid = !self.hasValue(value) || value[0].toUpperCase() === "R";
        return self.toPromise(isValid, "Éste campo debe comenzar con la letra R.");
    };
    return StartsByRStringValidator;
}(StringValidatorBase));
exports.StartsByRStringValidator = StartsByRStringValidator;
var RequiredStringValidator = /** @class */ (function (_super) {
    __extends(RequiredStringValidator, _super);
    function RequiredStringValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequiredStringValidator.prototype.check = function (value) {
        var self = this;
        var isValid = self.hasValue(value);
        return self.toPromise(isValid, "Éste campo no puede estar vacío.");
    };
    return RequiredStringValidator;
}(StringValidatorBase));
exports.RequiredStringValidator = RequiredStringValidator;
//# sourceMappingURL=stringValidators.js.map