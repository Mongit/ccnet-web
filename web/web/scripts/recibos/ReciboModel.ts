import ProxyRest = require("./../api/proxyRest");
import IReciboModel = require("./iReciboModel");
import UrlUtils = require("./../utils/UrlUtils");
import * as moment from 'moment';

moment.locale('es');

class ReciboModel {
    public folio: KnockoutObservable<string>;
    public fecha: KnockoutObservable<string>;
    
    public proxy: ProxyRest;
    public reciboIdUrlParam: string;
    
    constructor() {
        this.folio = ko.observable<string>("");
        this.fecha = ko.observable<string>("");
        
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

    public proveedorRemoteHandler(): void {
        alert("proveedorRemoteHandler");
    }

    public clienteRemoteHandler(): void {
        alert("clienteRemoteHandler");
    }
}

export = ReciboModel;