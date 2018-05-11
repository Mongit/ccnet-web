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
var stringValidator = require("./../validators/stringValidators");
var numberValidator = require("./../validators/numberValidators");
var ProxyRest = require("./../api/proxyRest");
var ReciboItemModel = /** @class */ (function (_super) {
    __extends(ReciboItemModel, _super);
    function ReciboItemModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.reciboItemId = "";
        _this.reciboId = "";
        _this.cotizacionId = "";
        _this.cantidad = self.addField([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);
        _this.descripcion = self.addField([new stringValidator.RequiredStringValidator()]);
        _this.precio = self.addField([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);
        _this.cotizacionRemoteValue = ko.observable();
        _this.costo = ko.computed(function () {
            return self.cantidad.value() * self.precio.value();
        }, self);
        return _this;
    }
    ReciboItemModel.prototype.getModel = function () {
        var self = this;
        return {
            id: self.reciboItemId ? self.reciboItemId : "00000000-0000-0000-0000-000000000000",
            cantidad: self.cantidad.value(),
            descripcion: self.descripcion.value(),
            precio: self.precio.value(),
            reciboId: self.reciboId ? self.reciboId : "00000000-0000-0000-0000-000000000000",
            cotizacionId: self.cotizacionId ? self.cotizacionId : "00000000-0000-0000-0000-000000000000"
        };
    };
    ReciboItemModel.prototype.cotizacionRemoteHandler = function (term, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var cotizacionProxy, response, cotizacionjson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cotizacionProxy = new ProxyRest("/api/Cotizaciones/search/term");
                        return [4 /*yield*/, cotizacionProxy.get(term, null, null)];
                    case 1:
                        response = _a.sent();
                        cotizacionjson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        callback(cotizacionjson);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReciboItemModel;
}(KoForm));
module.exports = ReciboItemModel;
//# sourceMappingURL=ReciboItemModel.js.map