import IStockModel = require("./iStockModel");
import ProxyRest = require("./../api/proxyRest");
import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import * as moment from 'moment';
import * as numberValidators from './../validators/numberValidators';
import { FloatValidator } from "./../validators/numberValidators";

moment.locale('es');

class StockModel extends KoForm {
    public fecha: Date;

    public cantidad: IField<number>;
    public precio: IField<number>;

    public productoRemoteValue: KnockoutObservable<string>;
    public proveedorRemoteValue: KnockoutObservable<string>;
    public reciboRemoteValue: KnockoutObservable<string>;

    public proxy: ProxyRest;

    constructor() {
        super();
        const self = this;

        this.fecha = new Date();

        this.cantidad = self.addField<number>([new numberValidators.FloatValidator(), new numberValidators.RequiredNumberValidator()]);
        this.precio = self.addField<number>([new numberValidators.FloatValidator(), new numberValidators.RequiredNumberValidator()]);

        this.productoRemoteValue = ko.observable<string>();
        this.proveedorRemoteValue = ko.observable<string>();
        this.reciboRemoteValue = ko.observable<string>();

        this.proxy = new ProxyRest("/api/Stocks");
    }

    public async save(): Promise<void> {
        const self = this;
        if (await self.validate() && self.productoRemoteValue()) {
            let model: IStockModel = {
                id: "00000000-0000-0000-0000-000000000000",
                productoId: self.productoRemoteValue(),
                cantidad: self.cantidad.value(),
                precio: self.precio.value(),
                fecha: self.fecha,
                proveedorId: self.proveedorRemoteValue() ? self.proveedorRemoteValue() : "00000000-0000-0000-0000-000000000000",
                reciboId: self.reciboRemoteValue() ? self.reciboRemoteValue() : "00000000-0000-0000-0000-000000000000"
            };
            let response = await self.proxy.post<IStockModel>(model);
            alert(response);
            window.location.href = "StockList";
        }
        else {
            alert("Lo sentimos, revise que los campos requeridos (*) no esten vacíos.")
        }
    }

    public dateFormatter(date): string {
        return moment(date).format('ll');
    }

    public async productoRemoteHandler(term: string, callback): Promise<void> {
        let productoProxy = new ProxyRest("/api/Productos/search/term");
        let response = await productoProxy.get(term, null, null);
        let productos = JSON.parse((JSON.parse(JSON.stringify(response))));
        callback(productos);
    }

    public async proveedorRemoteHandler(term: string, callback): Promise<void> {
        let proveedorProxy = new ProxyRest("/api/Proveedores/search/term");
        let response = await proveedorProxy.get(term, null, null);
        let proveedores = JSON.parse((JSON.parse(JSON.stringify(response))));
        callback(proveedores);
    }

    public async reciboRemoteHandler(term: string, callback): Promise<void> {
        let reciboProxy = new ProxyRest("/api/Recibos/search/term");
        let response = await reciboProxy.get(term, null, null);
        let recibos = JSON.parse((JSON.parse(JSON.stringify(response))));
        callback(recibos);
    }
}

export = StockModel;