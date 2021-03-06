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
var PresupuestoModel = require("./PresupuestoModel");
var KoForm = require("./../form/KoForm");
var moment = require("moment");
var Size = require("./../utils/Size");
var BindedModal = require("./../modals/BindedModal");
var ConfirmModal = require("./../modals/confirmModal");
var ValidatableValidator = require("./../validators/ValidatableValidator");
var UrlUtils = require("./../utils/UrlUtils");
var ProxyRest = require("./../api/proxyRest");
moment.locale('es');
var CotizacionModel = /** @class */ (function (_super) {
    __extends(CotizacionModel, _super);
    function CotizacionModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.empresa = ko.observable("");
        _this.domicilio = ko.observable("");
        _this.contacto = ko.observable("");
        _this.fechaCreado = ko.observable("");
        _this.fechaFuturo = ko.observable("");
        _this.currentTemplate = ko.observable("editar");
        _this.idCotizacion = UrlUtils.getParameterByName('cotId', window.location);
        _this.cteId = UrlUtils.getParameterByName('cteId', window.location);
        ;
        _this.proxy = new ProxyRest("/api/Cotizaciones");
        _this.presupuestos = self.addFieldArray([new ValidatableValidator("Encontramos un error en alguno de sus campos.")]);
        _this.subtotalPresupuestos = ko.computed(function () {
            var suma = 0;
            for (var _i = 0, _a = self.presupuestos.value(); _i < _a.length; _i++) {
                var p = _a[_i];
                suma += p.subtotal();
            }
            return suma;
        }, self);
        _this.ivaPresupuestos = ko.computed(function () {
            var suma = 0;
            for (var _i = 0, _a = self.presupuestos.value(); _i < _a.length; _i++) {
                var p = _a[_i];
                suma += p.iva();
            }
            return suma;
        }, self);
        _this.totalPresupuestos = ko.computed(function () {
            return self.subtotalPresupuestos() + self.ivaPresupuestos();
        }, self);
        _this.editarTemplate();
        return _this;
    }
    CotizacionModel.prototype.editarTemplate = function () {
        this.currentTemplate('editar');
    };
    CotizacionModel.prototype.verTemplate = function () {
        this.getCotizacion();
        this.currentTemplate('ver');
    };
    CotizacionModel.prototype.getCotizacion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, cotizacion, cotizacionJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCliente()];
                    case 1:
                        _a.sent();
                        self = this;
                        return [4 /*yield*/, self.proxy.get(self.idCotizacion)];
                    case 2:
                        cotizacion = _a.sent();
                        cotizacionJson = JSON.parse((JSON.parse(JSON.stringify(cotizacion))));
                        self.fechaCreado(moment(cotizacionJson.fecha).format('LL'));
                        self.fechaFuturo(moment(cotizacionJson.fecha).add(15, 'days').format('LL'));
                        return [2 /*return*/];
                }
            });
        });
    };
    CotizacionModel.prototype.getCliente = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, proxyCliente, cliente, clienteJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        proxyCliente = new ProxyRest("/api/Clientes");
                        return [4 /*yield*/, proxyCliente.get(self.cteId)];
                    case 1:
                        cliente = _a.sent();
                        clienteJson = JSON.parse((JSON.parse(JSON.stringify(cliente))));
                        self.empresa(clienteJson.empresa);
                        self.domicilio(clienteJson.domicilio);
                        self.contacto(clienteJson.contacto);
                        return [2 /*return*/];
                }
            });
        });
    };
    CotizacionModel.prototype.addPresupuesto = function () {
        var self = this;
        $("div.collapse").removeClass("show");
        var presupuesto = new PresupuestoModel();
        self.presupuestos.value.push(presupuesto);
    };
    CotizacionModel.prototype.removePresupuesto = function (presupuesto) {
        var self = this;
        var modalModel = new ConfirmModal("¿Está seguro de borrar ésta Cotización?");
        var dialog = new BindedModal({
            model: modalModel,
            size: Size.medium,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: function (e) {
                if (modalModel.result() === true) {
                    self.presupuestos.value.remove(presupuesto);
                }
            }
        });
    };
    CotizacionModel.prototype.print = function () {
        var self = this;
        var data = $("#printableArea").html();
        var myWindow = window.open('', 'ConfeccionesColombia', 'height=600,width=800,scrollbars=yes');
        myWindow.document.write('<!DOCTYPE html>');
        myWindow.document.write('<html><head>');
        myWindow.document.write('<head>');
        myWindow.document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
        myWindow.document.write('<title>Confecciones Colombia</title>');
        myWindow.document.write('<link href="/css/bootstrap.print.min.css" rel="stylesheet" type="text/css"/>');
        myWindow.document.write('</head><body>');
        myWindow.document.write(data);
        myWindow.document.write('</body></html>');
        myWindow.document.close();
        myWindow.print();
    };
    return CotizacionModel;
}(KoForm));
module.exports = CotizacionModel;
//# sourceMappingURL=CotizacionModel.js.map