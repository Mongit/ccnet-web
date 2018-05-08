import Page = require("./../pagination/PageModel");
import ProxyRest = require("./../api/proxyRest");
import iProductoModel = require("./IProductoModel");
import ConfirmModal = require("./../modals/confirmModal");
import BindedModal = require("./../modals/BindedModal");
import Size = require("./../utils/Size");

class ProductosModel {
    public pageSize: number;

    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;
    public lastPage: KnockoutObservable<boolean>;
    public firstPage: KnockoutObservable<boolean>;
    public showPagination: KnockoutObservable<boolean>;

    public pages: KnockoutObservableArray<Page>;
    public productos: KnockoutObservableArray<iProductoModel>;

    public proxy: ProxyRest;

    constructor() {
        this.pageSize = 20;

        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>();
        this.lastPage = ko.observable<boolean>(false);
        this.firstPage = ko.observable<boolean>(true);
        this.showPagination = ko.observable<boolean>(false);

        this.pages = ko.observableArray<Page>([]);
        this.productos = ko.observableArray<iProductoModel>();

        this.proxy = new ProxyRest("/api/Productos");

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

    public getModel(producto: iProductoModel): iProductoModel {
        return {
            id: producto.id,
            nombre: producto.nombre,
            color: producto.color,
            unidad: producto.unidad,
            proveedorId: producto.proveedorId
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

    public delete(producto: iProductoModel): void {
        const self = this;
        let modalModel = new ConfirmModal("¿Está seguro de borrar éste producto?");

        let dialog = new BindedModal({
            model: modalModel,
            size: Size.medium,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: async function (e: JQuery.Event<HTMLElement, null>): Promise<void> {

                if (modalModel.result() === true) {
                    self.productos.remove(producto);
                    let deleted = await self.proxy.delete<iProductoModel>(producto.id);
                    alert(deleted);
                }

            }
        });
    }
}

export = ProductosModel;