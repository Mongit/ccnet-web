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
var ProxyRest = require("./../api/proxyRest");
var UrlUtils = require("./../utils/UrlUtils");
var KoForm = require("./../form/KoForm");
var ValidatableValidator = require("./../validators/ValidatableValidator");
var PresupuestoModel = require("./PresupuestoModel");
var PresupuestoItemModel = require("./PresupuestoItemModel");
var PresupuetosModel = /** @class */ (function (_super) {
    __extends(PresupuetosModel, _super);
    function PresupuetosModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.cotId = UrlUtils.getParameterByName("cotId", window.location);
        _this.proxy = new ProxyRest("/api/Presupuestos");
        _this.presupuestos = self.addFieldArray([new ValidatableValidator("Encontramos un error en alguno de sus campos.")]);
        //this.presupuestoItems = ko.observableArray<PresupuestoItemModel>();
        _this.gastos = ko.observable(0);
        _this.ganancias = ko.observable(0);
        _this.iva = ko.observable(0);
        _this.subtotal = ko.computed(function () {
            var suma = 0;
            for (var _i = 0, _a = self.presupuestos.value(); _i < _a.length; _i++) {
                var presupuesto = _a[_i];
                suma = suma + presupuesto.subtotal();
            }
            return suma;
        }, self);
        _this.subtotalItems = ko.computed(function () {
            var suma = 0;
            for (var _i = 0, _a = self.presupuestos.value(); _i < _a.length; _i++) {
                var presupuesto = _a[_i];
                for (var _b = 0, _c = presupuesto.items(); _b < _c.length; _b++) {
                    var item = _c[_b];
                    suma = suma + item.costo();
                }
            }
            return suma;
        }, self);
        _this.total = ko.computed(function () {
            return 1;
        }, self);
        _this.getAll();
        return _this;
    }
    PresupuetosModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, presupuestosFromServer, presupuestosParsed, _i, presupuestosParsed_1, presupuesto, presupuestomodel, _a, _b, item;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.proxy.get(self.cotId)];
                    case 1:
                        presupuestosFromServer = _c.sent();
                        presupuestosParsed = JSON.parse((JSON.parse(JSON.stringify(presupuestosFromServer))));
                        for (_i = 0, presupuestosParsed_1 = presupuestosParsed; _i < presupuestosParsed_1.length; _i++) {
                            presupuesto = presupuestosParsed_1[_i];
                            presupuestomodel = new PresupuestoModel();
                            for (_a = 0, _b = presupuesto.items; _a < _b.length; _a++) {
                                item = _b[_a];
                                presupuestomodel.items.push(self.getModelFromTo(new PresupuestoItemModel(), item));
                            }
                            presupuestomodel.cantidad.value(presupuesto.cantidad);
                            presupuestomodel.descripcion.value(presupuesto.descripcion);
                            presupuestomodel.porcentajeGastos.value(presupuesto.porcentajeGastos);
                            presupuestomodel.porcentajeGanancia.value(presupuesto.porcentajeGanancia);
                            presupuestomodel.porcentajeIva.value(presupuesto.porcentajeIVA);
                            presupuestomodel.cotizacionId = presupuesto.cotizacionId;
                            self.presupuestos.value.push(presupuestomodel);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PresupuetosModel.prototype.getModelFromTo = function (newitem, item) {
        newitem.cantidad.value(item.cantidad);
        newitem.descripcion.value(item.descripcion);
        newitem.precio.value(item.precio);
        newitem.presupuestoId = item.presupuestoId;
        return newitem;
    };
    return PresupuetosModel;
}(KoForm));
module.exports = PresupuetosModel;
//# sourceMappingURL=PresupuestosModel.js.map