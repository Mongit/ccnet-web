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
var ProxyRest = require("./../api/proxyRest");
var UrlUtils = require("./../utils/UrlUtils");
var ReciboItemModel = require("./ReciboItemModel");
var BindedModal = require("./../modals/BindedModal");
var Size = require("./../utils/Size");
var ConfirmModal = require("./../modals/confirmModal");
var moment = require("moment");
moment.locale('es');
var ReciboModel = /** @class */ (function () {
    function ReciboModel() {
        var self = this;
        this.folio = ko.observable();
        this.fecha = ko.observable();
        this.clienteRemoteValue = ko.observable();
        this.proveedorRemoteValue = ko.observable();
        this.temporalItem = ko.observable(new ReciboItemModel());
        this.temporalItemHasFocus = ko.observable();
        this.reciboItems = ko.observableArray();
        this.proxy = new ProxyRest("/api/Recibos");
        this.reciboIdUrlParam = UrlUtils.getParameterByName("id", window.location);
        this.getOne();
        this.total = ko.computed(function () {
            var sumaCostos = 0;
            for (var _i = 0, _a = self.reciboItems(); _i < _a.length; _i++) {
                var ri = _a[_i];
                sumaCostos += ri.costo();
            }
            return sumaCostos;
        }, self);
    }
    ReciboModel.prototype.getOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, reciboJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.proxy.get(self.reciboIdUrlParam)];
                    case 1:
                        response = _a.sent();
                        reciboJson = JSON.parse(JSON.parse(JSON.stringify(response)));
                        self.folio(reciboJson.folio);
                        self.fecha(reciboJson.fecha);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReciboModel.prototype.clienteRemoteHandler = function (term, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var clienteProxy, response, clientesjson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clienteProxy = new ProxyRest("/api/Clientes/search/term");
                        return [4 /*yield*/, clienteProxy.get(term, null, null)];
                    case 1:
                        response = _a.sent();
                        clientesjson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        callback(clientesjson);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReciboModel.prototype.proveedorRemoteHandler = function (term, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var proveedorProxy, response, proveedoresjson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proveedorProxy = new ProxyRest("/api/Proveedores/search/term");
                        return [4 /*yield*/, proveedorProxy.get(term, null, null)];
                    case 1:
                        response = _a.sent();
                        proveedoresjson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        callback(proveedoresjson);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReciboModel.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, model, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        model = self.getModel();
                        return [4 /*yield*/, self.proxy.put(self.reciboIdUrlParam, model)];
                    case 1:
                        response = _a.sent();
                        alert(response);
                        window.location.href = "Recibos";
                        return [2 /*return*/];
                }
            });
        });
    };
    ReciboModel.prototype.getModel = function () {
        var self = this;
        return {
            id: self.reciboIdUrlParam,
            folio: self.folio(),
            clienteId: self.clienteRemoteValue(),
            proveedorId: self.proveedorRemoteValue(),
            fecha: self.fecha()
        };
    };
    ReciboModel.prototype.dateFormatter = function (date) {
        return moment(date).format('l');
    };
    ReciboModel.prototype.addReciboItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, newItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.temporalItem().validate()];
                    case 1:
                        if ((_a.sent()) === true) {
                            newItem = new ReciboItemModel();
                            newItem.cantidad.value(self.temporalItem().cantidad.value());
                            newItem.descripcion.value(self.temporalItem().descripcion.value());
                            newItem.precio.value(self.temporalItem().precio.value());
                            newItem.reciboId = self.reciboIdUrlParam;
                            newItem.cotizacionId = self.temporalItem().cotizacionRemoteValue();
                            self.reciboItems.push(newItem);
                            self.temporalItem(new ReciboItemModel());
                            self.temporalItemHasFocus(true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReciboModel.prototype.removeReciboItem = function (item) {
        var self = this;
        var modalModel = new ConfirmModal("¿Está seguro de borrar éste item?");
        var dialog = new BindedModal({
            model: modalModel,
            size: Size.small,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: function (e) {
                if (modalModel.result() === true) {
                    self.reciboItems.remove(item);
                }
            }
        });
    };
    return ReciboModel;
}());
module.exports = ReciboModel;
//# sourceMappingURL=ReciboModel.js.map