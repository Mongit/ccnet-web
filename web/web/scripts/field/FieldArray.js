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
var equal = require("deep-equal");
var FieldBase = require("./../field/fieldBase");
var FieldArray = /** @class */ (function (_super) {
    __extends(FieldArray, _super);
    function FieldArray(validators, useStrictForComparations, value) {
        if (useStrictForComparations === void 0) { useStrictForComparations = true; }
        var _this = _super.call(this, validators, useStrictForComparations, value) || this;
        _this.value = ko.observableArray(value);
        return _this;
        // =========================================================================
        // "arrayChange": Please subscribe on the cosumer class.
        // =========================================================================        
        // const self = this;
        // this.value.subscribe(function (changes: KnockoutArrayChange<T>): void {
        //     //self.validate();
        // }, self, "arrayChange");
        // =========================================================================
    }
    FieldArray.prototype.getHasChanged = function () {
        var self = this;
        var areEqual = equal(self.initialValue, self.value(), { strict: self.useStrictForComparations });
        return areEqual === false;
    };
    FieldArray.prototype.resetHasChanged = function () {
        var self = this;
        self.initialValue = self.value();
    };
    return FieldArray;
}(FieldBase));
module.exports = FieldArray;
//# sourceMappingURL=FieldArray.js.map