import Page = require("./../pagination/PageModel");
import ProxyRest = require("./../api/proxyRest");
import IReciboModel = require("./iReciboModel");
import * as moment from 'moment';

moment.locale('es');

class RecibosModel {
    public pageSize: number;

    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;
    public lastPage: KnockoutObservable<boolean>;
    public firstPage: KnockoutObservable<boolean>;
    public showPagination: KnockoutObservable<boolean>;
    public name: KnockoutObservable<string>;
    public proveedorName: KnockoutObservable<string>;

    public pages: KnockoutObservableArray<Page>;
    public recibos: KnockoutObservableArray<IReciboModel>;

    public proxy: ProxyRest;

    constructor() {
        this.pageSize = 20;

        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>();
        this.lastPage = ko.observable<boolean>(false);
        this.firstPage = ko.observable<boolean>(true);
        this.showPagination = ko.observable<boolean>(false);
        this.name = ko.observable<string>();
        this.proveedorName = ko.observable<string>();

        this.pages = ko.observableArray<Page>([]);
        this.recibos = ko.observableArray<IReciboModel>();

        this.proxy = new ProxyRest("/api/Recibos");

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let response = await self.proxy.get("", self.pageNumber(), self.pageSize);
        let recibosjson = JSON.parse((JSON.parse(JSON.stringify(response))));

        self.totalPages(recibosjson.totalPages);
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

        self.recibos.removeAll();
        for (let recibo of recibosjson.recibos) {
            self.recibos.push(self.getModel(recibo));
        }
    }

    public getModel(recibo: IReciboModel): IReciboModel {
        return {
            id: recibo.id,
            folio: recibo.folio,
            clienteId: recibo.clienteId,
            proveedorId: recibo.proveedorId,
            fecha: recibo.fecha
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

    public dateFormatter(date): string {
        return moment(date).format('ll');
    }

    public async getObjectName(id: string, proxy: ProxyRest): Promise<string> {
        let response = await proxy.get(id, null, null);
        let responseJson = JSON.parse((JSON.parse(JSON.stringify(response))));
        return responseJson.empresa;
    }

    public getClienteName(id: string): string {
        if (id === "00000000-0000-0000-0000-000000000000") {
            return "";
        }
        else {
            const self = this;
            let clienteProxy = new ProxyRest("/api/Clientes");
            this.getObjectName(id, clienteProxy).then(function (res) {
                self.name(res);
            });
            return self.name();
        }
    }

    public getProveedorName(id: string): string {
        if (id === "00000000-0000-0000-0000-000000000000") {
            return "";
        }
        else {
            const self = this;
            let proveedorProxy = new ProxyRest("/api/Proveedores");
            this.getObjectName(id, proveedorProxy).then(function (res) {
                self.proveedorName(res);
            });
            return self.proveedorName();
        }
    }

    public async save(): Promise<void> {
        let self = this;
        let model = self.getModel({
            id: undefined,
            folio: undefined,
            clienteId: undefined,
            proveedorId: undefined,
            fecha: new Date()
        });
        let reciboId = await self.proxy.post<IReciboModel>(model);
        window.location.href = "Recibo?id=" + JSON.parse(JSON.parse(JSON.stringify(reciboId)));
    }
}

export = RecibosModel;