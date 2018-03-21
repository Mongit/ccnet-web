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
var NumberValidatorBase = /** @class */ (function (_super) {
    __extends(NumberValidatorBase, _super);
    function NumberValidatorBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberValidatorBase.prototype.hasValue = function (value) {
        if (value === null || value === undefined || $.trim(value.toString()).length === 0) {
            return false;
        }
        return true;
    };
    return NumberValidatorBase;
}(ValidatorBase));
var RequiredNumberValidator = /** @class */ (function (_super) {
    __extends(RequiredNumberValidator, _super);
    function RequiredNumberValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequiredNumberValidator.prototype.check = function (value) {
        var self = this;
        var isValid = self.hasValue(value);
        return self.toPromise(isValid, "Éste campo no puede estar vacío.");
    };
    return RequiredNumberValidator;
}(NumberValidatorBase));
exports.RequiredNumberValidator = RequiredNumberValidator;
var FloatValidator = /** @class */ (function (_super) {
    __extends(FloatValidator, _super);
    function FloatValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatValidator.prototype.check = function (value) {
        var self = this;
        var isValid = self.hasValue(value) === false || /^-?\d*(\.\d+)?$/.test(value.toString());
        return self.toPromise(isValid, "Éste campo debe ser númerico.");
    };
    return FloatValidator;
}(NumberValidatorBase));
exports.FloatValidator = FloatValidator;
//# sourceMappingURL=numberValidators.js.map