import ClienteModel = require("./Cliente");
import ProxyRest = require("./../api/proxyRest");
import * as moment from 'moment';

moment.locale('es');

class ClientesModel {
    public fechaParsed: KnockoutObservable<string>;

    public clientes: KnockoutObservableArray<ClienteModel>;

    public proxy: ProxyRest;

    constructor() {
        const self = this;

        this.fechaParsed = ko.observable<string>();

        this.clientes = ko.observableArray<ClienteModel>();

        this.proxy = new ProxyRest("/server/api/Clientes");

        self.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let resultados = await self.proxy.get();
        let myjson = JSON.parse((JSON.parse(JSON.stringify(resultados))));
        
        for (let i = 0; i < myjson.length; i++) {
            let cliente = new ClienteModel();
            cliente.id = myjson[i].id;
            cliente.folio = myjson[i].folio;
            cliente.contacto = myjson[i].contacto;
            cliente.empresa = myjson[i].empresa;
            cliente.telefono = myjson[i].telefono;
            cliente.email = myjson[i].email;
            cliente.fechaCreado = myjson[i].fechaCreado;
            cliente.domicilio = myjson[i].domicilio;
            self.clientes.push(cliente);
        }
    }

    public dateFormatter(date): string {
        return moment(date).format('l');
    }
}

export = ClientesModel;