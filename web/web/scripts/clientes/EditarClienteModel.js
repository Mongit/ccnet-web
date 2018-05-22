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
var validators = require("./../validators/stringValidators");
var EditarClienteModel = /** @class */ (function (_super) {
    __extends(EditarClienteModel, _super);
    function EditarClienteModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.contacto = self.addField([new validators.RequiredStringValidator()]);
        _this.empresa = self.addField([new validators.RequiredStringValidator()]);
        _this.telefono = self.addField([]);
        _this.email = self.addField([]);
        _this.domicilio = self.addField([new validators.RequiredStringValidator()]);
        _this.fechaCreado = new Date();
        _this.proxy = new ProxyRest("/api/Clientes");
        _this.clienteIdUrlParam = UrlUtils.getParameterByName("id", window.location);
        _this.folio = 0;
        _this.getCliente();
        return _this;
    }
    EditarClienteModel.prototype.getCliente = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, cliente, clienteJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.proxy.get(self.clienteIdUrlParam)];
                    case 1:
                        cliente = _a.sent();
                        clienteJson = JSON.parse(JSON.parse(JSON.stringify(cliente)));
                        self.folio = clienteJson.folio;
                        self.contacto.value(clienteJson.contacto);
                        self.empresa.value(clienteJson.empresa);
                        self.telefono.value(clienteJson.telefono);
                        self.email.value(clienteJson.email);
                        self.domicilio.value(clienteJson.domicilio);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditarClienteModel.prototype.getModel = function () {
        var self = this;
        return {
            id: self.clienteIdUrlParam,
            folio: self.folio,
            contacto: self.contacto.value(),
            empresa: self.empresa.value(),
            telefono: self.telefono.value(),
            email: self.email.value(),
            fechaCreado: self.fechaCreado,
            domicilio: self.domicilio.value()
        };
    };
    EditarClienteModel.prototype.modificar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, model, clienteModificado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.validate()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        model = self.getModel();
                        return [4 /*yield*/, self.proxy.put(self.clienteIdUrlParam, model)];
                    case 2:
                        clienteModificado = _a.sent();
                        alert(JSON.stringify(clienteModificado));
                        window.location.href = "Clientes";
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EditarClienteModel;
}(KoForm));
module.exports = EditarClienteModel;
//# sourceMappingURL=EditarClienteModel.js.map