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
var KoForm = require("./../form/KoForm");
var moment = require("moment");
var numberValidators = require("./../validators/numberValidators");
moment.locale('es');
var StockModel = /** @class */ (function (_super) {
    __extends(StockModel, _super);
    function StockModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.fecha = new Date();
        _this.newWindow = true;
        _this.cantidad = self.addField([new numberValidators.FloatValidator(), new numberValidators.RequiredNumberValidator()]);
        _this.precio = self.addField([new numberValidators.FloatValidator(), new numberValidators.RequiredNumberValidator()]);
        _this.productoRemoteValue = ko.observable();
        _this.proveedorRemoteValue = ko.observable();
        _this.reciboRemoteValue = ko.observable();
        _this.productoHasError = ko.observable(false);
        _this.proveedorHasError = ko.observable(false);
        _this.reciboHasError = ko.observable(false);
        _this.display = ko.observable();
        _this.modificaStock = ko.observable(false);
        _this.modificaStockComputed = ko.computed(function () {
            if (self.modificaStock() === false) {
                self.proveedorRemoteValue("");
                self.reciboRemoteValue("");
            }
        }, self);
        _this.currentDisplay = ko.computed(function () {
            if (self.display() === "recibo") {
                self.proveedorRemoteValue("");
            }
            else {
                self.reciboRemoteValue("");
            }
            return self.display();
        }, self);
        _this.remoteValuesValid = ko.computed(function () {
            var prodValidation = self.isGUID(self.productoRemoteValue()) || self.newWindow ? true : false;
            var provValidation = self.isGUID(self.proveedorRemoteValue()) || self.isEmpty(self.proveedorRemoteValue()) ? true : false;
            var reciboValidation = self.isGUID(self.reciboRemoteValue()) || self.isEmpty(self.reciboRemoteValue()) ? true : false;
            self.newWindow = false;
            self.productoHasError(prodValidation === true ? false : true);
            self.proveedorHasError(provValidation === true ? false : true);
            self.reciboHasError(reciboValidation === true ? false : true);
            return prodValidation && provValidation && reciboValidation;
        }, self);
        _this.proxy = new ProxyRest("/api/Stocks");
        return _this;
    }
    StockModel.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, model, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.validate()];
                    case 1:
                        if (!((_a.sent()) && self.remoteValuesValid())) return [3 /*break*/, 3];
                        model = {
                            id: "00000000-0000-0000-0000-000000000000",
                            productoId: self.productoRemoteValue(),
                            cantidad: self.cantidad.value(),
                            precio: self.precio.value(),
                            fecha: self.fecha,
                            proveedorId: self.proveedorRemoteValue() ? self.proveedorRemoteValue() : "00000000-0000-0000-0000-000000000000",
                            reciboId: self.reciboRemoteValue() ? self.reciboRemoteValue() : "00000000-0000-0000-0000-000000000000"
                        };
                        return [4 /*yield*/, self.proxy.post(model)];
                    case 2:
                        response = _a.sent();
                        alert(response);
                        window.location.href = "StockList";
                        return [3 /*break*/, 4];
                    case 3:
                        self.productoHasError(self.isEmpty(self.productoRemoteValue()) ? true : false);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StockModel.prototype.dateFormatter = function (date) {
        return moment(date).format('ll');
    };
    StockModel.prototype.productoRemoteHandler = function (term, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var productoProxy, response, productos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productoProxy = new ProxyRest("/api/Productos/search/term");
                        return [4 /*yield*/, productoProxy.get(term, null, null)];
                    case 1:
                        response = _a.sent();
                        productos = JSON.parse((JSON.parse(JSON.stringify(response))));
                        callback(productos);
                        return [2 /*return*/];
                }
            });
        });
    };
    StockModel.prototype.proveedorRemoteHandler = function (term, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var proveedorProxy, response, proveedores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proveedorProxy = new ProxyRest("/api/Proveedores/search/term");
                        return [4 /*yield*/, proveedorProxy.get(term, null, null)];
                    case 1:
                        response = _a.sent();
                        proveedores = JSON.parse((JSON.parse(JSON.stringify(response))));
                        callback(proveedores);
                        return [2 /*return*/];
                }
            });
        });
    };
    StockModel.prototype.reciboRemoteHandler = function (term, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var reciboProxy, response, recibos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reciboProxy = new ProxyRest("/api/Recibos/search/term");
                        return [4 /*yield*/, reciboProxy.get(term, null, null)];
                    case 1:
                        response = _a.sent();
                        recibos = JSON.parse((JSON.parse(JSON.stringify(response))));
                        callback(recibos);
                        return [2 /*return*/];
                }
            });
        });
    };
    StockModel.prototype.isGUID = function (expression) {
        if (expression != null) {
            var guidRegExp = new RegExp('^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$');
            return guidRegExp.test(expression);
        }
        return false;
    };
    StockModel.prototype.isEmpty = function (expression) {
        if (expression === undefined || expression === null || $.trim(expression).length === 0
            || expression === null || expression === undefined) {
            return true;
        }
        return false;
    };
    return StockModel;
}(KoForm));
module.exports = StockModel;
//# sourceMappingURL=StockModel.js.map