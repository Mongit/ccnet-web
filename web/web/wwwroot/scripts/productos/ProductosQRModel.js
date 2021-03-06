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
var QRCode = require("davidshimjs-qrcodejs");
var KoForm = require("./../form/KoForm");
var numberValidators = require("./../validators/numberValidators");
var ProductosQRModel = /** @class */ (function (_super) {
    __extends(ProductosQRModel, _super);
    function ProductosQRModel() {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.proxy = new ProxyRest("/api/Productos/Get/Productos/Range");
        _this.productos = ko.observableArray();
        _this.isPrinting = ko.observable(false);
        _this.desde = self.addField([new numberValidators.RequiredNumberValidator(), new numberValidators.FloatValidator()]);
        _this.hasta = self.addField([new numberValidators.RequiredNumberValidator(), new numberValidators.FloatValidator()]);
        return _this;
    }
    ProductosQRModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, productosjson, _i, productosjson_1, productojson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!(self.desde.validate() && self.hasta.validate())) return [3 /*break*/, 2];
                        return [4 /*yield*/, self.proxy.get("", self.desde.value(), self.hasta.value())];
                    case 1:
                        response = _a.sent();
                        productosjson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        self.productos.removeAll();
                        if (typeof productosjson !== 'undefined' && productosjson.length > 0) {
                            for (_i = 0, productosjson_1 = productosjson; _i < productosjson_1.length; _i++) {
                                productojson = productosjson_1[_i];
                                self.productos.push({
                                    id: productojson.id,
                                    nombre: productojson.nombre,
                                    folio: productojson.folio,
                                    color: productojson.color,
                                    cantidad: productojson.cantidad,
                                    unidad: productojson.unidad,
                                    proveedor: productojson.proveedor
                                });
                            }
                        }
                        else {
                            alert("Error: El rango de folios ingresado no existe.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        alert("Lo sentimos, hubo un error con los datos.");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductosQRModel.prototype.getQR = function (arrDOMelements, producto) {
        var self = this;
        var qrCode = new QRCode(document.getElementById(producto.folio.toString()), {
            text: "Producto",
            width: 100,
            height: 100,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        var code = "[" + producto.folio + "] " + producto.nombre + " \n" + producto.color
            + "\n\nhttps://ccnet-web.azurewebsites.net/Productos/Producto?id=" + producto.id;
        qrCode.clear();
        return qrCode.makeCode(code);
    };
    ProductosQRModel.prototype.print = function () {
        var self = this;
        self.isPrinting(true);
        var data = $("#printableArea").html();
        var myWindow = window.open('', 'ConfeccionesColombia', 'height=600,width=800,scrollbars=yes');
        myWindow.document.write('<!DOCTYPE html>');
        myWindow.document.write('<html><head>');
        myWindow.document.write('<head>');
        myWindow.document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
        myWindow.document.write('<title>Confecciones Colombia</title>');
        myWindow.document.write('</head><body>');
        myWindow.document.write(data);
        myWindow.document.write('</body></html>');
        myWindow.document.close();
        myWindow.print();
    };
    return ProductosQRModel;
}(KoForm));
module.exports = ProductosQRModel;
//# sourceMappingURL=ProductosQRModel.js.map