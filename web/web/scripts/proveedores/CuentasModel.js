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
var ConfirmModal = require("./../modals/confirmModal");
var BindedModal = require("./../modals/BindedModal");
var Size = require("./../utils/Size");
var CuentasModel = /** @class */ (function () {
    function CuentasModel() {
        this.cuentas = ko.observableArray();
        this.proxy = new ProxyRest("/api/Cuentas");
        this.proveedorIdUrlParam = UrlUtils.getParameterByName("id", window.location);
        this.getAll();
    }
    CuentasModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, cuentasjson, _i, cuentasjson_1, cuenta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.proxy.get(self.proveedorIdUrlParam, 1, 20)];
                    case 1:
                        response = _a.sent();
                        cuentasjson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        self.cuentas.removeAll();
                        for (_i = 0, cuentasjson_1 = cuentasjson; _i < cuentasjson_1.length; _i++) {
                            cuenta = cuentasjson_1[_i];
                            self.cuentas.push(self.getModel(cuenta));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CuentasModel.prototype.getModel = function (cuenta) {
        return {
            id: cuenta.id,
            proveedorId: cuenta.proveedorId,
            banco: cuenta.banco,
            titular: cuenta.titular,
            clabe: cuenta.clabe,
            noCuenta: cuenta.noCuenta
        };
    };
    CuentasModel.prototype.delete = function (cuenta) {
        var self = this;
        var modalModel = new ConfirmModal("¿Está seguro de borrar ésta cuenta?");
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
                                self.cuentas.remove(cuenta);
                                return [4 /*yield*/, self.proxy.delete(cuenta.id)];
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
    return CuentasModel;
}());
module.exports = CuentasModel;
//# sourceMappingURL=CuentasModel.js.map