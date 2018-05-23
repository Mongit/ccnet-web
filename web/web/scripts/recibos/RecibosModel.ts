import Page = require("./../pagination/PageModel");
import ProxyRest = require("./../api/proxyRest");
import IReciboReportModel = require("./iReciboReportModel");
import IReciboModel = require("./iReciboModel");
import ConfirmModal = require("./../modals/confirmModal");
import BindedModal = require("./../modals/BindedModal");
import Size = require("./../utils/Size");
import * as moment from 'moment';

moment.locale('es');

class RecibosModel {
    public pageSize: number;

    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;
    public lastPage: KnockoutObservable<boolean>;
    public firstPage: KnockoutObservable<boolean>;
    public showPagination: KnockoutObservable<boolean>;

    public pages: KnockoutObservableArray<Page>;
    public recibos: KnockoutObservableArray<IReciboReportModel>;

    public proxy: ProxyRest;

    constructor() {
        this.pageSize = 20;

        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>();
        this.lastPage = ko.observable<boolean>(false);
        this.firstPage = ko.observable<boolean>(true);
        this.showPagination = ko.observable<boolean>(false);

        this.pages = ko.observableArray<Page>([]);
        this.recibos = ko.observableArray<IReciboReportModel>();

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
            self.recibos.push({
                id: recibo.id,
                folio: recibo.folio,
                clienteId: recibo.clienteId,
                proveedorId: recibo.proveedorId,
                fecha: recibo.fecha,
                clienteName: recibo.clienteName,
                proveedorName: recibo.proveedorName
            });
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

    public async save(): Promise<void> {
        let self = this;
        let model = {
            id: "00000000-0000-0000-0000-000000000000",
            folio: 0,
            clienteId: "00000000-0000-0000-0000-000000000000",
            proveedorId: "00000000-0000-0000-0000-000000000000",
            fecha: new Date(),
            items: []
        };
        let reciboId = await self.proxy.post<IReciboModel>(model);
        window.location.href = "Recibo?id=" + JSON.parse(JSON.parse(JSON.stringify(reciboId)));
    }

    public remove(recibo): void {
        const self = this;
        let modalModel = new ConfirmModal("¿Está seguro de borrar éste Recibo?");

        let dialog = new BindedModal({
            model: modalModel,
            size: Size.medium,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: async function (e: JQuery.Event<HTMLElement, null>): Promise<void> {
                if (modalModel.result() === true) {
                    self.recibos.remove(recibo);
                    let deleted = await self.proxy.delete<IReciboModel>(recibo.id);
                }
            }
        });
    }
}

export = RecibosModel;