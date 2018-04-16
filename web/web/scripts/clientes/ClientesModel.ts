import ClienteModel = require("./Cliente");
import ProxyRest = require("./../api/proxyRest");
import * as moment from 'moment';

moment.locale('es');

class Page {
    public pageNumber: KnockoutObservable<number>;
    public isSelected: KnockoutObservable<boolean>;
    constructor(isSelected: boolean, pageNumber: number) {
        this.isSelected = ko.observable<boolean>(isSelected);
        this.pageNumber = ko.observable<number>(pageNumber);
    }
}

class ClientesModel {
    public pageSize: number;

    public fechaParsed: KnockoutObservable<string>;
    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;
    public lastPage: KnockoutObservable<boolean>;
    public firstPage: KnockoutObservable<boolean>;

    public pages: KnockoutObservableArray<Page>;
    public clientes: KnockoutObservableArray<ClienteModel>;

    public proxy: ProxyRest;

    constructor() {
        const self = this;

        this.pageSize = 1;

        this.fechaParsed = ko.observable<string>();
        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>();
        this.lastPage = ko.observable<boolean>(false);
        this.firstPage = ko.observable<boolean>(true);

        this.clientes = ko.observableArray<ClienteModel>();
        this.pages = ko.observableArray<Page>([]);

        this.proxy = new ProxyRest("/api/Clientes");

        self.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let resultados = await self.proxy.get("", self.pageNumber(), self.pageSize);
        let myjson = JSON.parse((JSON.parse(JSON.stringify(resultados))));
        self.totalPages(myjson.totalPages);
        
        self.pages.removeAll();
        for (let i = 0; i < self.totalPages(); i++) {
            let pageNumber = i + 1;
            let isSelected = self.pageNumber() === pageNumber;
            let page = new Page(isSelected, pageNumber);
            self.pages.push(page);
        }

        self.clientes.removeAll();
        for (let clientejson of myjson.clientes) {
            let cliente = new ClienteModel();
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
    }

    public dateFormatter(date): string {
        return moment(date).format('l');
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

export = ClientesModel;