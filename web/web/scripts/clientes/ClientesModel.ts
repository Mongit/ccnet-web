import ClienteModel = require("./Cliente");
import ProxyRest = require("./../api/proxyRest");
import * as moment from 'moment';

moment.locale('es');

class ClientesModel {
    public pageSize: number; 

    public fechaParsed: KnockoutObservable<string>;
    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;

    public clientes: KnockoutObservableArray<ClienteModel>;

    public proxy: ProxyRest;

    constructor() {
        const self = this;

        this.pageSize = 20;

        this.fechaParsed = ko.observable<string>();
        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>(1);

        this.clientes = ko.observableArray<ClienteModel>();

        this.proxy = new ProxyRest("/api/Clientes");

        self.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let resultados = await self.proxy.get("", self.pageNumber(), self.pageSize);
        let myjson = JSON.parse((JSON.parse(JSON.stringify(resultados))));
        self.totalPages = myjson.totalPages;

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
}

export = ClientesModel;