import Page = require("./../pagination/PageModel");
import ProxyRest = require("./../api/proxyRest");
import IStockModel = require("./iStockModel");
import * as moment from 'moment';

moment.locale('es');

class StockListModel {
    public pageSize: number;

    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;
    public lastPage: KnockoutObservable<boolean>;
    public firstPage: KnockoutObservable<boolean>;
    public showPagination: KnockoutObservable<boolean>;
    public productoName: KnockoutObservable<string>;
    public proveedorName: KnockoutObservable<string>;
    public reciboFolio: KnockoutObservable<string>;

    public pages: KnockoutObservableArray<Page>;
    public stockList: KnockoutObservableArray<IStockModel>;

    public proxy: ProxyRest;

    constructor() {
        this.pageSize = 20;

        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>();
        this.lastPage = ko.observable<boolean>(false);
        this.firstPage = ko.observable<boolean>(true);
        this.showPagination = ko.observable<boolean>(false);
        this.productoName = ko.observable<string>();
        this.proveedorName = ko.observable<string>();
        this.reciboFolio = ko.observable<string>();

        this.pages = ko.observableArray<Page>([]);
        this.stockList = ko.observableArray<IStockModel>();

        this.proxy = new ProxyRest("/api/Stocks");

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let response = await self.proxy.get("", self.pageNumber(), self.pageSize);
        let stockJson = JSON.parse((JSON.parse(JSON.stringify(response))));

        self.totalPages(stockJson.totalPages);
        if (self.totalPages() > 1) {
            self.showPagination(true);
        }

        self.pages.removeAll();
        for (let i = 0; i < self.totalPages(); i++) {
            let pageNumber = i + 1;
            let isSelected = self.pageNumber() === pageNumber;
            let page = new Page(isSelected, pageNumber);
            self.pages.push(page);
        }

        self.stockList.removeAll();
        for (let stock of stockJson.stocks) {
            await self.getProducto(stock.productoId);
            await self.getProveedor(stock.proveedorId);
            await self.getRecibo(stock.reciboId);
            
            self.stockList.push({
                id: stock.id,
                productoId: self.productoName(),
                cantidad: stock.cantidad,
                precio: stock.precio,
                fecha: stock.fecha,
                proveedorId: self.proveedorName(),
                reciboId: self.reciboFolio()
            });
        }
    }

    public async getProducto(id: string): Promise<void> {
        const self = this;
        if (id === "00000000-0000-0000-0000-000000000000") {
            self.productoName("");
        }
        else {
            let productoProxy = new ProxyRest("/api/Productos");
            let response = await productoProxy.get(id, null, null);
            let productoJson = JSON.parse((JSON.parse(JSON.stringify(response))));

            self.productoName(productoJson.nombre);
        }
    }

    public async getProveedor(id: string): Promise<void> {
        const self = this;
        if (id === "00000000-0000-0000-0000-000000000000") {
            self.proveedorName("");
        }
        else {
            let proveedorProxy = new ProxyRest("/api/Proveedores");
            let response = await proveedorProxy.get(id, null, null);
            let proveedorJson = JSON.parse((JSON.parse(JSON.stringify(response))));

            self.proveedorName(proveedorJson.empresa);
        }
    }

    public async getRecibo(id: string): Promise<void> {
        const self = this;
        if (id === "00000000-0000-0000-0000-000000000000") {
            self.reciboFolio("");
        }
        else {
            let reciboProxy = new ProxyRest("/api/Recibos");
            let response = await reciboProxy.get(id, null, null);
            let reciboJson = JSON.parse((JSON.parse(JSON.stringify(response))));

            self.reciboFolio(reciboJson.folio);
        }
    }

    public selectedPage(page: Page): void {
        const self = this;
        self.pageNumber(page.pageNumber());

        page.pageNumber() === self.totalPages() ? self.lastPage(true) : self.lastPage(false);;
        page.pageNumber() === 1 ? self.firstPage(true) : self.firstPage(false);

        self.getAll();
    }

    public next(): void {
        const self = this;
        let arrPosition = self.pageNumber() - 1;
        let lastPage = self.pages()[arrPosition];
        lastPage.isSelected(false);

        let nextPage = self.pages()[arrPosition + 1];
        if (nextPage.pageNumber() <= self.totalPages()) {
            nextPage.isSelected(true);
            self.selectedPage(nextPage);
        }
    }

    public previous(): void {
        const self = this;
        let arrPosition = self.pageNumber() - 1;
        let currentPage = self.pages()[arrPosition];
        currentPage.isSelected(false);

        let previousPage = self.pages()[arrPosition - 1];
        if (previousPage.pageNumber() > 0) {
            previousPage.isSelected(true);
            self.selectedPage(previousPage);
        }
    }

    public dateFormatter(date): string {
        return moment(date).format('ll');
    }
}

export = StockListModel;