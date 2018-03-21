"use strict";
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
var CotizacionesModel = require("./CotizacionesModel");
var ProxyRest = require("./../api/proxyRest");
var UrlUtils = require("./../utils/UrlUtils");
var ConfirmModal = require("./../modals/confirmModal");
var BindedModal = require("./../modals/BindedModal");
var Size = require("./../utils/Size");
var moment = require("moment");
moment.locale('es');
var CotizacionesClienteModel = /** @class */ (function () {
    function CotizacionesClienteModel() {
        this.folio = ko.observable();
        this.contacto = ko.observable();
        this.fechaParsed = ko.observable();
        this.cotizacionesArray = ko.observableArray();
        this.proxy = new ProxyRest("/server/api/Cotizaciones");
        this.clienteIdUrlParam = UrlUtils.getParameterByName('id', window.location);
        this.getCotizaciones();
    }
    CotizacionesClienteModel.prototype.getCotizaciones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, cotizaciones, cotizacionesJson, i, cotizacion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.getCliente();
                        self = this;
                        return [4 /*yield*/, self.proxy.get(self.clienteIdUrlParam)];
                    case 1:
                        cotizaciones = _a.sent();
                        cotizacionesJson = JSON.parse((JSON.parse(JSON.stringify(cotizaciones))));
                        for (i = 0; i < cotizacionesJson.length; i++) {
                            cotizacion = new CotizacionesModel();
                            cotizacion.id = cotizacionesJson[i].id;
                            cotizacion.folio = cotizacionesJson[i].folio;
                            cotizacion.clienteId = cotizacionesJson[i].clienteId;
                            cotizacion.fecha = cotizacionesJson[i].fecha;
                            self.cotizacionesArray.push(cotizacion);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CotizacionesClienteModel.prototype.getCliente = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, proxyCliente, cliente, clienteJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        proxyCliente = new ProxyRest("/server/api/Clientes");
                        return [4 /*yield*/, proxyCliente.get(self.clienteIdUrlParam)];
                    case 1:
                        cliente = _a.sent();
                        clienteJson = JSON.parse((JSON.parse(JSON.stringify(cliente))));
                        self.contacto(clienteJson.contacto);
                        self.folio(clienteJson.folio);
                        return [2 /*return*/];
                }
            });
        });
    };
    CotizacionesClienteModel.prototype.dateFormatter = function (date) {
        return moment(date).format('LLLL');
    };
    CotizacionesClienteModel.prototype.getModel = function () {
        var self = this;
        var model = new CotizacionesModel();
        model.id = undefined;
        model.folio = undefined;
        model.clienteId = self.clienteIdUrlParam;
        model.fecha = new Date();
        return model;
    };
    CotizacionesClienteModel.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, model, cotizacionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        model = self.getModel();
                        return [4 /*yield*/, self.proxy.post(model)];
                    case 1:
                        cotizacionId = _a.sent();
                        window.location.href = "Cotizaciones?cotId=" + JSON.parse(JSON.parse(JSON.stringify(cotizacionId))) + "&cteId=" + self.clienteIdUrlParam;
                        return [2 /*return*/];
                }
            });
        });
    };
    CotizacionesClienteModel.prototype.remove = function (cotizacion) {
        var self = this;
        var modalModel = new ConfirmModal("¿Está seguro de borrar ésta Cotización junto con sus elementos?");
        var dialog = new BindedModal({
            model: modalModel,
            size: Size.medium,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var deleted;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(modalModel.result() === true)) return [3 /*break*/, 2];
                                self.cotizacionesArray.remove(cotizacion);
                                return [4 /*yield*/, self.proxy.delete(cotizacion.id)];
                            case 1:
                                deleted = _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            }
        });
    };
    return CotizacionesClienteModel;
}());
module.exports = CotizacionesClienteModel;
//# sourceMappingURL=CotizacionesClienteModel.js.map