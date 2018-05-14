import UrlUtils = require("./../utils/UrlUtils");
import ProxyRest = require("./../api/proxyRest");
import IReciboModel = require("./iReciboModel");
import IClienteModel = require("./../clientes/IClienteModel");
import IProveedorModel = require("./../proveedores/IProveedorModel");
import ReciboItemModel = require("./ReciboItemModel");
import IReciboItemModel = require("./iReciboItemModel");
import * as moment from 'moment';

moment.locale('es');

class ReciboVerModel {
    public reciboIdUrlParam: string;
    public proxy: ProxyRest;

    public folio: KnockoutObservable<number>;
    public clienteName: KnockoutObservable<string>;
    public proveedorName: KnockoutObservable<string>;
    public fecha: KnockoutObservable<Date>;

    public items: KnockoutObservableArray<ReciboItemModel>;

    public total: KnockoutComputed<number>;
    
    constructor() {
        const self = this;
        this.reciboIdUrlParam = UrlUtils.getParameterByName("id", window.location);
        this.proxy = new ProxyRest("/api/Recibos");

        this.folio = ko.observable<number>();
        this.clienteName = ko.observable<string>();
        this.proveedorName = ko.observable<string>();
        this.fecha = ko.observable<Date>();

        this.items = ko.observableArray<ReciboItemModel>();

        this.total = ko.computed<number>(function(): number {

            let sumaCostos: number = 0;
            for (let ri of self.items()) {
                sumaCostos += ri.costo();
            }

            return sumaCostos;
        }, self);

        this.getOne();
    }

    public async getOne(): Promise<void> {
        const self = this;
        let response = await self.proxy.get<IReciboModel>(self.reciboIdUrlParam);
        let reciboJson = JSON.parse(JSON.parse(JSON.stringify(response)));

        self.folio(reciboJson.folio);
        self.fecha(reciboJson.fecha);
        self.getClienteName(reciboJson.clienteId);
        self.getProveedorName(reciboJson.proveedorId);
        
        for (let item of reciboJson.items) {
            let itemModel = new ReciboItemModel();
            itemModel.reciboItemId = item.id;
            itemModel.cantidad.value(item.cantidad);
            itemModel.descripcion.value(item.descripcion);
            itemModel.precio.value(item.precio);
            itemModel.reciboId = item.reciboId;
            itemModel.cotizacionId = item.cotizacionId

            self.items.push(itemModel);
        }
    }

    public async getClienteName(id: string): Promise<void> {
        const self = this;
        let clienteProxy = new ProxyRest("/api/Clientes");
        let response = await clienteProxy.get<IClienteModel>(id);
        let clienteJson = JSON.parse(JSON.parse(JSON.stringify(response)));

        self.clienteName(clienteJson.empresa);
    }

    public async getProveedorName(id: string): Promise<void> {
        const self = this;
        let proveedorProxy = new ProxyRest("/api/Proveedores");
        let response = await proveedorProxy.get<IProveedorModel>(id);
        let proveedorJson = JSON.parse(JSON.parse(JSON.stringify(response)));

        self.proveedorName(proveedorJson.empresa);
    }

    public dateFormatter(date): string {
        return moment(date).format('l');
    }
}

export = ReciboVerModel;