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
var ClienteModel = require("./Cliente");
var ProxyRest = require("./../api/proxyRest");
var Page = require("./../pagination/PageModel");
var moment = require("moment");
moment.locale('es');
var ClientesModel = /** @class */ (function () {
    function ClientesModel() {
        var self = this;
        this.pageSize = 20;
        this.fechaParsed = ko.observable();
        this.pageNumber = ko.observable(1);
        this.totalPages = ko.observable();
        this.lastPage = ko.observable(false);
        this.firstPage = ko.observable(true);
        this.showPagination = ko.observable(false);
        this.clientes = ko.observableArray();
        this.pages = ko.observableArray([]);
        this.proxy = new ProxyRest("/api/Clientes");
        self.getAll();
    }
    ClientesModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, resultados, myjson, i, pageNumber, isSelected, page, _i, _a, clientejson, cliente;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.proxy.get("", self.pageNumber(), self.pageSize)];
                    case 1:
                        resultados = _b.sent();
                        myjson = JSON.parse((JSON.parse(JSON.stringify(resultados))));
                        self.totalPages(myjson.totalPages);
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
                        self.clientes.removeAll();
                        for (_i = 0, _a = myjson.clientes; _i < _a.length; _i++) {
                            clientejson = _a[_i];
                            cliente = new ClienteModel();
                            cliente.id = clientejson.id;
                            cliente.folio = clientejson.folio;
                            cliente.contacto = clientejson.contacto;
                            cliente.empresa = clientejson.empresa;
                            cliente.telefono = clientejson.telefono;
                            cliente.email = clientejson.email;
                            cliente.fechaCreado = clientejson.fechaCreado;
                            cliente.domicilio = clientejson.domicilio;
                            self.clientes.push(cliente);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientesModel.prototype.dateFormatter = function (date) {
        return moment(date).format('l');
    };
    ClientesModel.prototype.selectedPage = function (page) {
        var self = this;
        self.pageNumber(page.pageNumber());
        page.pageNumber() === self.totalPages() ? self.lastPage(true) : self.lastPage(false);
        ;
        page.pageNumber() === 1 ? self.firstPage(true) : self.firstPage(false);
        self.getAll();
    };
    ClientesModel.prototype.next = function () {
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
    ClientesModel.prototype.previous = function () {
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
    return ClientesModel;
}());
module.exports = ClientesModel;
//# sourceMappingURL=ClientesModel.js.map