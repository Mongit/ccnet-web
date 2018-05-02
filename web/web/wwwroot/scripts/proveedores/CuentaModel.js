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
var KoForm = require("./../form/KoForm");
var ProxyRest = require("./../api/proxyRest");
var UrlUtils = require("./../utils/UrlUtils");
var stringValidators = require("./../validators/stringValidators");
var CuentaModel = /** @class */ (function (_super) {
    __extends(CuentaModel, _super);
    function CuentaModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.banco = self.addField([new stringValidators.RequiredStringValidator()]);
        _this.titular = self.addField([new stringValidators.RequiredStringValidator()]);
        _this.clabe = self.addField([]);
        _this.noCuenta = self.addField([]);
        _this.proxy = new ProxyRest("/api/Cuentas");
        _this.proveedorId = UrlUtils.getParameterByName("provId", window.location);
        _this.cuentaIdUrlParam = UrlUtils.getParameterByName("id", window.location);
        _this.currentTemplate = ko.observable("nuevo");
        self.cuentaIdUrlParam ? self.editarTemplate() : self.currentTemplate('nuevo');
        return _this;
    }
    CuentaModel.prototype.editarTemplate = function () {
        var self = this;
        self.getOne();
        self.currentTemplate("editar");
    };
    CuentaModel.prototype.save = function () {
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
                        alert("Cuenta guardada exitosamente.");
                        window.location.href = "Cuentas?id=" + self.proveedorId;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CuentaModel.prototype.getModel = function () {
        var self = this;
        return {
            id: self.cuentaIdUrlParam ? self.cuentaIdUrlParam : "00000000-0000-0000-0000-000000000000",
            proveedorId: self.proveedorId,
            banco: self.banco.value(),
            titular: self.titular.value(),
            clabe: self.clabe.value(),
            noCuenta: self.noCuenta.value()
        };
    };
    CuentaModel.prototype.getOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, cuentaJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.proxy.get(self.cuentaIdUrlParam)];
                    case 1:
                        response = _a.sent();
                        cuentaJson = JSON.parse(JSON.parse(JSON.stringify(response)));
                        self.proveedorId = cuentaJson.proveedorId;
                        self.banco.value(cuentaJson.banco);
                        self.titular.value(cuentaJson.titular);
                        self.clabe.value(cuentaJson.clabe);
                        self.noCuenta.value(cuentaJson.noCuenta);
                        return [2 /*return*/];
                }
            });
        });
    };
    CuentaModel.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, model, cuentaUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.validate()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        model = self.getModel();
                        return [4 /*yield*/, self.proxy.put(self.cuentaIdUrlParam, model)];
                    case 2:
                        cuentaUpdated = _a.sent();
                        alert(JSON.stringify(cuentaUpdated));
                        window.location.href = "Cuentas?id=" + self.proveedorId;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CuentaModel;
}(KoForm));
module.exports = CuentaModel;
//# sourceMappingURL=CuentaModel.js.map