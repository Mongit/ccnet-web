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
var Page = require("./../pagination/PageModel");
var ProxyRest = require("./../api/proxyRest");
var moment = require("moment");
moment.locale('es');
var StockListModel = /** @class */ (function () {
    function StockListModel() {
        this.pageSize = 20;
        this.pageNumber = ko.observable(1);
        this.totalPages = ko.observable();
        this.lastPage = ko.observable(false);
        this.firstPage = ko.observable(true);
        this.showPagination = ko.observable(false);
        this.productoName = ko.observable();
        this.proveedorName = ko.observable();
        this.reciboFolio = ko.observable();
        this.pages = ko.observableArray([]);
        this.stockList = ko.observableArray();
        this.proxy = new ProxyRest("/api/Stocks");
        this.getAll();
    }
    StockListModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, stockJson, i, pageNumber, isSelected, page, _i, _a, stock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.proxy.get("", self.pageNumber(), self.pageSize)];
                    case 1:
                        response = _b.sent();
                        stockJson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        self.totalPages(stockJson.totalPages);
                        if (self.totalPages() > 1) {
                            self.showPagination(true);
                        }
                        self.pages.removeAll();
                        for (i = 0; i < self.totalPages(); i++) {
                            pageNumber = i + 1;
                            isSelected = self.pageNumber() === pageNumber;
                            page = new Page(isSelected, pageNumber);
                            self.pages.push(page);
                        }
                        self.stockList.removeAll();
                        _i = 0, _a = stockJson.stocks;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        stock = _a[_i];
                        return [4 /*yield*/, self.getProducto(stock.productoId)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, self.getProveedor(stock.proveedorId)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, self.getRecibo(stock.reciboId)];
                    case 5:
                        _b.sent();
                        self.stockList.push({
                            id: stock.id,
                            productoId: self.productoName(),
                            cantidad: stock.cantidad,
                            precio: stock.precio,
                            fecha: stock.fecha,
                            proveedorId: self.proveedorName(),
                            reciboId: self.reciboFolio()
                        });
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    StockListModel.prototype.getProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var self, productoProxy, response, productoJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!(id === "00000000-0000-0000-0000-000000000000")) return [3 /*break*/, 1];
                        self.productoName("");
                        return [3 /*break*/, 3];
                    case 1:
                        productoProxy = new ProxyRest("/api/Productos");
                        return [4 /*yield*/, productoProxy.get(id, null, null)];
                    case 2:
                        response = _a.sent();
                        productoJson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        self.productoName(productoJson.nombre);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StockListModel.prototype.getProveedor = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var self, proveedorProxy, response, proveedorJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!(id === "00000000-0000-0000-0000-000000000000")) return [3 /*break*/, 1];
                        self.proveedorName("");
                        return [3 /*break*/, 3];
                    case 1:
                        proveedorProxy = new ProxyRest("/api/Proveedores");
                        return [4 /*yield*/, proveedorProxy.get(id, null, null)];
                    case 2:
                        response = _a.sent();
                        proveedorJson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        self.proveedorName(proveedorJson.empresa);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StockListModel.prototype.getRecibo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var self, reciboProxy, response, reciboJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!(id === "00000000-0000-0000-0000-000000000000")) return [3 /*break*/, 1];
                        self.reciboFolio("");
                        return [3 /*break*/, 3];
                    case 1:
                        reciboProxy = new ProxyRest("/api/Recibos");
                        return [4 /*yield*/, reciboProxy.get(id, null, null)];
                    case 2:
                        response = _a.sent();
                        reciboJson = JSON.parse((JSON.parse(JSON.stringify(response))));
                        self.reciboFolio(reciboJson.folio);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StockListModel.prototype.selectedPage = function (page) {
        var self = this;
        self.pageNumber(page.pageNumber());
        page.pageNumber() === self.totalPages() ? self.lastPage(true) : self.lastPage(false);
        ;
        page.pageNumber() === 1 ? self.firstPage(true) : self.firstPage(false);
        self.getAll();
    };
    StockListModel.prototype.next = function () {
        var self = this;
        var arrPosition = self.pageNumber() - 1;
        var lastPage = self.pages()[arrPosition];
        lastPage.isSelected(false);
        var nextPage = self.pages()[arrPosition + 1];
        if (nextPage.pageNumber() <= self.totalPages()) {
            nextPage.isSelected(true);
            self.selectedPage(nextPage);
        }
    };
    StockListModel.prototype.previous = function () {
        var self = this;
        var arrPosition = self.pageNumber() - 1;
        var currentPage = self.pages()[arrPosition];
        currentPage.isSelected(false);
        var previousPage = self.pages()[arrPosition - 1];
        if (previousPage.pageNumber() > 0) {
            previousPage.isSelected(true);
            self.selectedPage(previousPage);
        }
    };
    StockListModel.prototype.dateFormatter = function (date) {
        return moment(date).format('ll');
    };
    return StockListModel;
}());
module.exports = StockListModel;
//# sourceMappingURL=StockListModel.js.map