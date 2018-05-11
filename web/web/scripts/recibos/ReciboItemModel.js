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
var KoForm = require("./../form/KoForm");
var stringValidator = require("./../validators/stringValidators");
var numberValidator = require("./../validators/numberValidators");
var ReciboItemModel = /** @class */ (function (_super) {
    __extends(ReciboItemModel, _super);
    function ReciboItemModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.reciboItemId = "";
        _this.reciboId = "";
        _this.cotizacionId = "";
        _this.cantidad = self.addField([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);
        _this.descripcion = self.addField([new stringValidator.RequiredStringValidator()]);
        _this.precio = self.addField([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);
        _this.costo = ko.computed(function () {
            return self.cantidad.value() * self.precio.value();
        }, self);
        return _this;
    }
    ReciboItemModel.prototype.getModel = function () {
        var self = this;
        return {
            id: self.reciboItemId ? self.reciboItemId : "00000000-0000-0000-0000-000000000000",
            cantidad: self.cantidad.value(),
            descripcion: self.descripcion.value(),
            precio: self.precio.value(),
            reciboId: self.reciboId ? self.reciboId : "00000000-0000-0000-0000-000000000000",
            cotizacionId: self.cotizacionId ? self.cotizacionId : "00000000-0000-0000-0000-000000000000"
        };
    };
    return ReciboItemModel;
}(KoForm));
module.exports = ReciboItemModel;
//# sourceMappingURL=ReciboItemModel.js.map