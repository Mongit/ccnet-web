import Page = require("./../pagination/PageModel");
import ProxyRest = require("./../api/proxyRest");
import iProveedorModel = require("./IProveedorModel");
import ConfirmModal = require("./../modals/confirmModal");
import BindedModal = require("./../modals/BindedModal");
import Size = require("./../utils/Size");

class ProveedoresModel {
    public pageSize: number;
    
    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;
    public lastPage: KnockoutObservable<boolean>;
    public firstPage: KnockoutObservable<boolean>;
    public showPagination: KnockoutObservable<boolean>;

    public pages: KnockoutObservableArray<Page>;
    public proveedores: KnockoutObservableArray<iProveedorModel>;

    public proxy: ProxyRest;

    constructor() {
        this.pageSize = 20;

        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>();
        this.lastPage = ko.observable<boolean>(false);
        this.firstPage = ko.observable<boolean>(true);
        this.showPagination = ko.observable<boolean>(false);

        this.pages = ko.observableArray<Page>([]);
        this.proveedores = ko.observableArray<iProveedorModel>();
        
        this.proxy = new ProxyRest("/api/Proveedores");

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let response = await self.proxy.get("", self.pageNumber(), self.pageSize);
        let proveedoresjson = JSON.parse((JSON.parse(JSON.stringify(response))));
        self.totalPages(proveedoresjson.totalPages);

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

        self.proveedores.removeAll();
        for (let proveedorjson of proveedoresjson.proveedores) {
            self.proveedores.push(self.getModel(proveedorjson));
        }
    }

    public getModel(proveedor): iProveedorModel {
        return {
            id: proveedor.id,
            empresa: proveedor.empresa,
            contacto: proveedor.contacto,
            domicilio: proveedor.domicilio,
            telefono: proveedor.telefono,
            email: proveedor.email,
            horarioAtencion: proveedor.horarioAtencion
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

    public delete(proveedor: iProveedorModel): void {
        const self = this;
        let modalModel = new ConfirmModal("¿Está seguro de borrar éste proveedor?");

        let dialog = new BindedModal({
            model: modalModel,
            size: Size.medium,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: async function (e: JQuery.Event<HTMLElement, null>): Promise<void> {

                if (modalModel.result() === true) {
                    self.proveedores.remove(proveedor);
                    let deleted = await self.proxy.delete<iProveedorModel>(proveedor.id);
                    alert(deleted);
                }

            }
        });
    }
}

export = ProveedoresModel;