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
var Field = require("./../field/field");
var FieldBase = require("./../field/fieldBase");
var FieldArray = require("./../field/FieldArray");
var ValidatableValidator = require("./../validators/ValidatableValidator");
var KoForm = /** @class */ (function (_super) {
    __extends(KoForm, _super);
    function KoForm(validators) {
        if (validators === void 0) { validators = [new ValidatableValidator("Encontramos un error en alguno de sus campos.")]; }
        var _this = _super.call(this, validators, true, []) || this;
        _this.value = ko.observableArray();
        return _this;
    }
    KoForm.prototype.resetHasChanged = function () {
        var self = this;
        for (var _i = 0, _a = self.value(); _i < _a.length; _i++) {
            var field = _a[_i];
            field.resetHasChanged();
        }
    };
    KoForm.prototype.getHasChanged = function () {
        var self = this;
        for (var _i = 0, _a = self.value(); _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.hasChanged()) {
                return true;
            }
        }
        return false;
    };
    KoForm.prototype.addField = function (validators, useStrictForComparations, value) {
        if (useStrictForComparations === void 0) { useStrictForComparations = true; }
        var self = this;
        var field = new Field(validators, useStrictForComparations, value);
        self.value.push(field);
        return field;
    };
    KoForm.prototype.addFieldArray = function (validators, useStrictForComparations, value) {
        if (useStrictForComparations === void 0) { useStrictForComparations = true; }
        var self = this;
        var field = new FieldArray(validators, useStrictForComparations, value);
        self.value.push(field);
        return field;
    };
    return KoForm;
}(FieldBase));
module.exports = KoForm;
//# sourceMappingURL=KoForm.js.map