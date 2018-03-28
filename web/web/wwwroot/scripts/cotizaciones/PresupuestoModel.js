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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PresupuestoItemModel = require("./PresupuestoItemModel");
var Size = require("./../utils/Size");
var BindedModal = require("./../modals/BindedModal");
var ConfirmModal = require("./../modals/confirmModal");
var KoForm = require("./../form/KoForm");
var numberValidator = require("./../validators/numberValidators");
var stringValidator = require("./../validators/stringValidators");
var UrlUtils = require("./../utils/UrlUtils");
var ProxyRest = require("./../api/proxyRest");
var PresupuestoModel = /** @class */ (function (_super) {
    __extends(PresupuestoModel, _super);
    function PresupuestoModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.cotizacionId = UrlUtils.getParameterByName('cotId', window.location);
        _this.cantidad = self.addField([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);
        _this.descripcion = self.addField([new stringValidator.RequiredStringValidator()]);
        _this.porcentajeGastos = self.addField([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()], null, 5);
        _this.gasto = ko.observable(0);
        _this.porcentajeGanancia = self.addField([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()], null, 80);
        _this.ganancia = ko.observable(0);
        _this.porcentajeIva = self.addField([new numberValidator.FloatValidator, new numberValidator.RequiredNumberValidator()], null, 16);
        _this.iva = ko.observable(0);
        _this.presupuestosItem = ko.observableArray();
        _this.proxy = new ProxyRest("/api/Presupuestos");
        _this.subtotal = ko.computed(function () {
            var sumaCostos = 0;
            var subTotal = 0;
            for (var _i = 0, _a = self.presupuestosItem(); _i < _a.length; _i++) {
                var pi = _a[_i];
                sumaCostos += pi.costo();
            }
            subTotal = self.sumaPorcentajesCostos(sumaCostos);
            self.iva(self.obtenerPorcentaje(subTotal, self.porcentajeIva.value()));
            return subTotal;
        }, self);
        _this.total = ko.computed(function () {
            return self.subtotal() + self.iva();
        }, self);
        _this.temporal = ko.observable(new PresupuestoItemModel());
        _this.temporalHasFocus = ko.observable();
        return _this;
    }
    PresupuestoModel.prototype.getModel = function () {
        var self = this;
        var itemArray = new Array();
        for (var _i = 0, _a = self.presupuestosItem(); _i < _a.length; _i++) {
            var item = _a[_i];
            itemArray.push(item.getModel());
        }
        return {
            cantidad: self.cantidad.value(),
            descripcion: self.descripcion.value(),
            porcentajeGastos: self.porcentajeGastos.value(),
            porcentajeGanancia: self.porcentajeGanancia.value(),
            porcentajeIva: self.porcentajeIva.value(),
            cotizacionId: self.cotizacionId,
            presupuestosItem: itemArray
        };
    };
    PresupuestoModel.prototype.addPresupuestoItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, newPresupuesto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.temporal().validate()];
                    case 1:
                        if ((_a.sent()) === true) {
                            newPresupuesto = new PresupuestoItemModel();
                            newPresupuesto.cantidad.value(self.temporal().cantidad.value());
                            newPresupuesto.descripcion.value(self.temporal().descripcion.value());
                            newPresupuesto.precio.value(self.temporal().precio.value());
                            self.presupuestosItem.push(newPresupuesto);
                            self.temporal(new PresupuestoItemModel());
                            self.temporalHasFocus(true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PresupuestoModel.prototype.removePresupuestoItem = function (item) {
        var self = this;
        var modalModel = new ConfirmModal("¿Está seguro de borrar éste Material?");
        var dialog = new BindedModal({
            model: modalModel,
            size: Size.small,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: function (e) {
                if (modalModel.result() === true) {
                    self.presupuestosItem.remove(item);
                }
            }
        });
    };
    PresupuestoModel.prototype.obtenerPorcentaje = function (subtotal, porciento) {
        var porcentaje = 0;
        porcentaje = subtotal * (porciento / 100);
        return porcentaje;
    };
    PresupuestoModel.prototype.sumaPorcentajesCostos = function (sumaCostos) {
        var suma = 0;
        var gasto = 0;
        var ganancia = 0;
        gasto = this.obtenerPorcentaje(sumaCostos, this.porcentajeGastos.value());
        suma = sumaCostos + gasto;
        ganancia = this.obtenerPorcentaje(suma, this.porcentajeGanancia.value());
        suma += ganancia;
        this.gasto(gasto);
        this.ganancia(ganancia);
        return suma;
    };
    PresupuestoModel.prototype.guardar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, model, serverModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.validate()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        model = self.getModel();
                        return [4 /*yield*/, self.proxy.post(model)];
                    case 2:
                        serverModel = _a.sent();
                        alert("cotizacion" + JSON.stringify(serverModel));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PresupuestoModel;
}(KoForm));
module.exports = PresupuestoModel;
//# sourceMappingURL=PresupuestoModel.js.map