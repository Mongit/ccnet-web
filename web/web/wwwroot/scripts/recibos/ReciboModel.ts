import ProxyRest = require("./../api/proxyRest");
import IReciboModel = require("./iReciboModel");
import UrlUtils = require("./../utils/UrlUtils");
import IReciboItemModel = require("./iReciboItemModel");
import ReciboItemModel = require("./ReciboItemModel");
import BindedModal = require("./../modals/BindedModal");
import Size = require("./../utils/Size");
import ConfirmModal = require("./../modals/confirmModal");
import * as moment from 'moment';

moment.locale('es');

class ReciboModel {
    public folio: KnockoutObservable<number>;
    public fecha: KnockoutObservable<Date>;
    public clienteRemoteValue: KnockoutObservable<string>;
    public proveedorRemoteValue: KnockoutObservable<string>;
    public temporalItem: KnockoutObservable<ReciboItemModel>;
    public temporalItemHasFocus: KnockoutObservable<boolean>;
    public clienteHasError: KnockoutObservable<boolean>;
    public proveedorHasError: KnockoutObservable<boolean>;
    
    public reciboItems: KnockoutObservableArray<ReciboItemModel>;

    public total: KnockoutComputed<number>;
    public autocompleteFieldsValid: KnockoutComputed<boolean>

    public proxy: ProxyRest;
    public reciboIdUrlParam: string;
    
    constructor() {
        const self = this;

        this.folio = ko.observable<number>();
        this.fecha = ko.observable<Date>();
        this.clienteRemoteValue = ko.observable<string>();
        this.proveedorRemoteValue = ko.observable<string>();
        this.temporalItem = ko.observable<ReciboItemModel>(new ReciboItemModel());
        this.temporalItemHasFocus = ko.observable<boolean>();
        this.clienteHasError = ko.observable<boolean>(false);
        this.proveedorHasError = ko.observable<boolean>(false);
        
        this.reciboItems = ko.observableArray<ReciboItemModel>();

        this.proxy = new ProxyRest("/api/Recibos");
        this.reciboIdUrlParam = UrlUtils.getParameterByName("id", window.location);

        this.autocompleteFieldsValid = ko.computed<boolean>(function (): boolean {
            let cteValidation = self.isGUID(self.clienteRemoteValue()) || self.isEmpty(self.clienteRemoteValue()) ? true : false;
            let provValidation = self.isGUID(self.proveedorRemoteValue()) || self.isEmpty(self.proveedorRemoteValue()) ? true : false;
            
            self.clienteHasError(cteValidation === true ? false : true);
            self.proveedorHasError(provValidation === true ? false : true);
            
            return cteValidation && provValidation;
        }, self);

        this.getOne();

        this.total = ko.computed<number>(function (): number {

            let sumaCostos: number = 0;
            for (let ri of self.reciboItems()) {
                sumaCostos += ri.costo();
            }

            return sumaCostos;
        }, self);
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
    
    public async update(): Promise<void> {
        const self = this;
        if (self.autocompleteFieldsValid()) {
            let model = self.getModel();
            let response = await self.proxy.put<IReciboModel>(self.reciboIdUrlParam, model);
            alert(response);
            window.location.href = "Recibos";
        }
        else {
            alert("Por favor, revise que los campos esten llenados correctamente.");
        }
    }

    public getModel(): IReciboModel {
        const self = this;

        let itemArray = new Array<IReciboItemModel>();
        for (let item of self.reciboItems()) {
            itemArray.push(item.getModel());
        }

        return {
            id: self.reciboIdUrlParam,
            folio: self.folio(),
            clienteId: self.clienteRemoteValue(),
            proveedorId: self.proveedorRemoteValue(),
            fecha: self.fecha(),
            items: itemArray
        };
    }

    public dateFormatter(date): string {
        return moment(date).format('l');
    }

    public async addReciboItem(): Promise<void> {
        const self = this;

        if (await self.temporalItem().validate() === true) {
            let newItem = new ReciboItemModel();
            newItem.cantidad.value(self.temporalItem().cantidad.value());
            newItem.descripcion.value(self.temporalItem().descripcion.value());
            newItem.precio.value(self.temporalItem().precio.value());
            newItem.reciboId = self.reciboIdUrlParam;
            newItem.cotizacionId = self.temporalItem().cotizacionRemoteValue();

            self.reciboItems.push(newItem);

            self.temporalItem(new ReciboItemModel());
            self.temporalItemHasFocus(true);
        }
    }

    public removeReciboItem(item: ReciboItemModel): void {
        const self = this;
        let modalModel = new ConfirmModal("¿Está seguro de borrar éste item?");

        let dialog = new BindedModal({
            model: modalModel,
            size: Size.small,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: function (e: JQuery.Event<HTMLElement, null>): void {
                if (modalModel.result() === true) {
                    self.reciboItems.remove(item);
                }
            }
        });
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

export = ReciboModel;