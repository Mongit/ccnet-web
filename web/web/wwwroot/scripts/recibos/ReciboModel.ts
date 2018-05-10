import ProxyRest = require("./../api/proxyRest");
import IReciboModel = require("./iReciboModel");
import UrlUtils = require("./../utils/UrlUtils");
import * as moment from 'moment';

moment.locale('es');

class ReciboModel {
    public folio: KnockoutObservable<string>;
    public fecha: KnockoutObservable<string>;
    public clienteRemoteValue: KnockoutObservable<string>;
    public proveedorRemoteValue: KnockoutObservable<string>;
    
    public proxy: ProxyRest;
    public reciboIdUrlParam: string;
    
    constructor() {
        this.folio = ko.observable<string>("");
        this.fecha = ko.observable<string>("");
        this.clienteRemoteValue = ko.observable<string>();
        this.proveedorRemoteValue = ko.observable<string>();
        
        this.proxy = new ProxyRest("/api/Recibos");
        this.reciboIdUrlParam = UrlUtils.getParameterByName("id", window.location);

        this.getOne();
    }

    public async getOne(): Promise<void> {
        const self = this;

        let response = await self.proxy.get<IReciboModel>(self.reciboIdUrlParam);
        let reciboJson = JSON.parse(JSON.parse(JSON.stringify(response)));

        self.folio(reciboJson.folio);
        self.fecha(moment(reciboJson.fecha).format('l'));
    }

    public save(): void {
        alert("save");
    }
    
    public async clienteRemoteHandler(term: string, callback): Promise<void> {
        let clienteProxy = new ProxyRest("/api/Clientes/search/term");
        let response = await clienteProxy.get(term, null, null);
        let clientesjson = JSON.parse((JSON.parse(JSON.stringify(response))));
        callback(clientesjson);
    }

    public async proveedorRemoteHandler(term: string, callback): Promise<void> {
        let proveedorProxy = new ProxyRest("/api/Proveedores/search/term");
        let response = await proveedorProxy.get(term, null, null);
        let proveedoresjson = JSON.parse((JSON.parse(JSON.stringify(response))));
        callback(proveedoresjson);
    }
}

export = ReciboModel;