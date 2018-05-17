import IStockModel = require("./iStockModel");
import ProxyRest = require("./../api/proxyRest");
import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import * as moment from 'moment';
import * as numberValidators from './../validators/numberValidators';

moment.locale('es');

class StockModel extends KoForm {
    public fecha: Date;
    public newWindow: boolean;

    public cantidad: IField<number>;
    public precio: IField<number>;

    public productoRemoteValue: KnockoutObservable<string>;
    public proveedorRemoteValue: KnockoutObservable<string>;
    public reciboRemoteValue: KnockoutObservable<string>;
    public productoHasError: KnockoutObservable<boolean>;
    public proveedorHasError: KnockoutObservable<boolean>;
    public reciboHasError: KnockoutObservable<boolean>;
    public display: KnockoutObservable<string>;
    public modificaStock: KnockoutObservable<boolean>;

    public remoteValuesValid: KnockoutComputed<boolean>;
    public currentDisplay: KnockoutComputed<string>;
    public modificaStockComputed: KnockoutComputed<void>;

    public proxy: ProxyRest;

    constructor() {
        super();
        const self = this;

        this.fecha = new Date();
        this.newWindow = true;

        this.cantidad = self.addField<number>([new numberValidators.FloatValidator(), new numberValidators.RequiredNumberValidator()]);
        this.precio = self.addField<number>([new numberValidators.FloatValidator(), new numberValidators.RequiredNumberValidator()]);

        this.productoRemoteValue = ko.observable<string>();
        this.proveedorRemoteValue = ko.observable<string>();
        this.reciboRemoteValue = ko.observable<string>();
        this.productoHasError = ko.observable<boolean>(false);
        this.proveedorHasError = ko.observable<boolean>(false);
        this.reciboHasError = ko.observable<boolean>(false);
        this.display = ko.observable<string>();
        this.modificaStock = ko.observable<boolean>(false);

        this.modificaStockComputed = ko.computed<void>(function (): void {
            if (self.modificaStock() === false) {
                self.proveedorRemoteValue("");
                self.reciboRemoteValue("");
            }
        }, self);
        this.currentDisplay = ko.computed<string>(function (): string {
            if (self.display() === "recibo") {
                self.proveedorRemoteValue("");
            }
            else {
                self.reciboRemoteValue("");
            }
            return self.display();
        }, self);
        this.remoteValuesValid = ko.computed<boolean>(function (): boolean {
            let prodValidation = self.isGUID(self.productoRemoteValue()) || self.newWindow ? true : false;
            let provValidation = self.isGUID(self.proveedorRemoteValue()) || self.isEmpty(self.proveedorRemoteValue()) ? true : false;
            let reciboValidation = self.isGUID(self.reciboRemoteValue()) || self.isEmpty(self.reciboRemoteValue()) ? true : false;

            self.newWindow = false;
            self.productoHasError(prodValidation === true ? false : true);
            self.proveedorHasError(provValidation === true ? false : true);
            self.reciboHasError(reciboValidation === true ? false : true);

            return prodValidation && provValidation && reciboValidation;
        }, self);
        
        this.proxy = new ProxyRest("/api/Stocks");
    }

    public async save(): Promise<void> {
        const self = this;
        if (await self.validate() && self.remoteValuesValid()) {
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
            self.productoHasError(self.isEmpty(self.productoRemoteValue()) ? true : false);
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

    public isGUID(expression: string): boolean {
        if (expression != null) {
            let guidRegExp = new RegExp('^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$');
            return guidRegExp.test(expression);
        }
        return false;
    }

    public isEmpty(expression: string): boolean {
        if (expression === undefined || expression === null || $.trim(expression).length === 0
            || expression === null || expression === undefined) {
            return true;
        }
        return false;
    }
}

export = StockModel;