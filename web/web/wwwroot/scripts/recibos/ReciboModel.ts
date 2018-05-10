import ProxyRest = require("./../api/proxyRest");
import IReciboModel = require("./iReciboModel");
import UrlUtils = require("./../utils/UrlUtils");
import * as moment from 'moment';

moment.locale('es');

class ReciboModel {
    public folio: KnockoutObservable<number>;
    public fecha: KnockoutObservable<Date>;
    public clienteRemoteValue: KnockoutObservable<string>;
    public proveedorRemoteValue: KnockoutObservable<string>;
    
    public proxy: ProxyRest;
    public reciboIdUrlParam: string;
    
    constructor() {
        this.folio = ko.observable<number>();
        this.fecha = ko.observable<Date>();
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
        self.fecha(reciboJson.fecha);
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

    public update(): void {
        const self = this;
        let model = self.getModel();
        let response = self.proxy.put(self.reciboIdUrlParam, model);
    }

    public getModel(): IReciboModel {
        const self = this;
        return {
            id: self.reciboIdUrlParam,
            folio: self.folio(),
            clienteId: self.clienteRemoteValue(),
            proveedorId: self.proveedorRemoteValue(),
            fecha: self.fecha()
        };
    }

    public dateFormatter(date): string {
        return moment(date).format('l');
    }
}

export = ReciboModel;