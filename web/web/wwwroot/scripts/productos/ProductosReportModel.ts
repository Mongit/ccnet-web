import Page = require("./../pagination/PageModel");
import ProxyRest = require("./../api/proxyRest");
import iProductoReportModel = require("./IProductoReportModel");

class ProductosReportModel {
    public pageSize: number;

    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;
    public lastPage: KnockoutObservable<boolean>;
    public firstPage: KnockoutObservable<boolean>;
    public showPagination: KnockoutObservable<boolean>;

    public pages: KnockoutObservableArray<Page>;
    public productos: KnockoutObservableArray<iProductoReportModel>;

    public proxy: ProxyRest;

    constructor() {
        this.pageSize = 20;

        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>();
        this.lastPage = ko.observable<boolean>(false);
        this.firstPage = ko.observable<boolean>(true);
        this.showPagination = ko.observable<boolean>(false);

        this.pages = ko.observableArray<Page>([]);
        this.productos = ko.observableArray<iProductoReportModel>();

        this.proxy = new ProxyRest("/api/Productos/Get/Report");

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let response = await self.proxy.get("", self.pageNumber(), self.pageSize);
        let productosjson = JSON.parse((JSON.parse(JSON.stringify(response))));

        self.totalPages(productosjson.totalPages);
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

        self.productos.removeAll();
        for (let productojson of productosjson.productos) {
            self.productos.push(self.getModel(productojson));
        }
    }

    public getModel(producto: iProductoReportModel): iProductoReportModel {
        return {
            id: producto.id,
            nombre: producto.nombre,
            folio: producto.folio,
            color: producto.color,
            cantidad: producto.cantidad,
            unidad: producto.unidad,
            proveedor: producto.proveedor
        };
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
}

export = ProductosReportModel;