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
var UrlUtils = require("./../utils/UrlUtils");
var ProxyRest = require("./../api/proxyRest");
var ReciboItemModel = require("./ReciboItemModel");
var moment = require("moment");
moment.locale('es');
var ReciboVerModel = /** @class */ (function () {
    function ReciboVerModel() {
        var self = this;
        this.reciboIdUrlParam = UrlUtils.getParameterByName("id", window.location);
        this.proxy = new ProxyRest("/api/Recibos");
        this.folio = ko.observable();
        this.clienteName = ko.observable();
        this.proveedorName = ko.observable();
        this.fecha = ko.observable();
        this.items = ko.observableArray();
        this.total = ko.computed(function () {
            var sumaCostos = 0;
            for (var _i = 0, _a = self.items(); _i < _a.length; _i++) {
                var ri = _a[_i];
                sumaCostos += ri.costo();
            }
            return sumaCostos;
        }, self);
        this.getOne();
    }
    ReciboVerModel.prototype.getOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, reciboJson, _i, _a, item, itemModel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.proxy.get(self.reciboIdUrlParam)];
                    case 1:
                        response = _b.sent();
                        reciboJson = JSON.parse(JSON.parse(JSON.stringify(response)));
                        self.folio(reciboJson.folio);
                        self.fecha(reciboJson.fecha);
                        self.getClienteName(reciboJson.clienteId);
                        self.getProveedorName(reciboJson.proveedorId);
                        for (_i = 0, _a = reciboJson.items; _i < _a.length; _i++) {
                            item = _a[_i];
                            itemModel = new ReciboItemModel();
                            itemModel.reciboItemId = item.id;
                            itemModel.cantidad.value(item.cantidad);
                            itemModel.descripcion.value(item.descripcion);
                            itemModel.precio.value(item.precio);
                            itemModel.reciboId = item.reciboId;
                            itemModel.cotizacionId = item.cotizacionId;
                            self.items.push(itemModel);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReciboVerModel.prototype.getClienteName = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var self, clienteProxy, response, clienteJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        clienteProxy = new ProxyRest("/api/Clientes");
                        return [4 /*yield*/, clienteProxy.get(id)];
                    case 1:
                        response = _a.sent();
                        clienteJson = JSON.parse(JSON.parse(JSON.stringify(response)));
                        self.clienteName(clienteJson.empresa);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReciboVerModel.prototype.getProveedorName = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var self, proveedorProxy, response, proveedorJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        proveedorProxy = new ProxyRest("/api/Proveedores");
                        return [4 /*yield*/, proveedorProxy.get(id)];
                    case 1:
                        response = _a.sent();
                        proveedorJson = JSON.parse(JSON.parse(JSON.stringify(response)));
                        self.proveedorName(proveedorJson.empresa);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReciboVerModel.prototype.dateFormatter = function (date) {
        return moment(date).format('l');
    };
    return ReciboVerModel;
}());
module.exports = ReciboVerModel;
//# sourceMappingURL=ReciboVerModel.js.map