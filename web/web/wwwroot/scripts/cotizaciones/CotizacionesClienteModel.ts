import CotizacionesModel = require("./CotizacionesModel");
import ProxyRest = require("./../api/proxyRest");
import UrlUtils = require("./../utils/UrlUtils");
import ConfirmModal = require("./../modals/confirmModal");
import BindedModal = require("./../modals/BindedModal");
import Size = require("./../utils/Size");
import * as moment from 'moment';

moment.locale('es');

class CotizacionesClienteModel {
    public pageSize: number;

    public folio: KnockoutObservable<number>;
    public contacto: KnockoutObservable<string>;
    public fechaParsed: KnockoutObservable<string>;
    public pageNumber: KnockoutObservable<number>;
    public totalPages: KnockoutObservable<number>;

    public cotizacionesArray: KnockoutObservableArray<CotizacionesModel>;

    public proxy: ProxyRest;

    public clienteIdUrlParam: string;

    constructor() {
        this.pageSize = 20;
        
        this.folio = ko.observable<number>();
        this.contacto = ko.observable<string>();
        this.fechaParsed = ko.observable<string>();
        this.pageNumber = ko.observable<number>(1);
        this.totalPages = ko.observable<number>();

        this.cotizacionesArray = ko.observableArray<CotizacionesModel>();

        this.proxy = new ProxyRest("/api/Cotizaciones");
        this.clienteIdUrlParam = UrlUtils.getParameterByName('id', window.location);

        this.getCotizaciones();
    }

    public async getCotizaciones(): Promise<void> {

        this.getCliente();

        const self = this;
        let cotizaciones = await self.proxy.get(self.clienteIdUrlParam, self.pageNumber(), self.pageSize);
        let cotizacionesJson = JSON.parse((JSON.parse(JSON.stringify(cotizaciones))));
        self.totalPages(cotizacionesJson.totalPages);

        self.cotizacionesArray.removeAll();
        for (let cotizacionjson of cotizacionesJson.cotizaciones) {
            let cotizacion = new CotizacionesModel();
            cotizacion.id = cotizacionjson.id;
            cotizacion.folio = cotizacionjson.folio;
            cotizacion.clienteId = cotizacionjson.clienteId;
            cotizacion.fecha = cotizacionjson.fecha;
            self.cotizacionesArray.push(cotizacion);
        }
    }

    public async getCliente() {
        const self = this;
        let proxyCliente = new ProxyRest("/api/Clientes");
        let cliente = await proxyCliente.get(self.clienteIdUrlParam, null, null);
        let clienteJson = JSON.parse((JSON.parse(JSON.stringify(cliente))));

        self.contacto(clienteJson.contacto);
        self.folio(clienteJson.folio);
    }

    public dateFormatter(date): string {
        return moment(date).format('LLLL');
    }

    public getModel(): CotizacionesModel {
        const self = this;
        let model = new CotizacionesModel();
        model.id = undefined;
        model.folio = undefined;
        model.clienteId = self.clienteIdUrlParam;
        model.fecha = new Date();

        return model;
    }

    public async save(): Promise<void> {
        let self = this;

        let model = self.getModel();
        let cotizacionId = await self.proxy.post<CotizacionesModel>(model);
        window.location.href = "Cotizaciones?cotId=" + JSON.parse(JSON.parse(JSON.stringify(cotizacionId))) + "&cteId=" + self.clienteIdUrlParam;
    }

    public remove(cotizacion): void {
        let self = this;
        let modalModel = new ConfirmModal("¿Está seguro de borrar ésta Cotización junto con sus elementos?");

        let dialog = new BindedModal({
            model: modalModel,
            size: Size.medium,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: async function (e: JQuery.Event<HTMLElement, null>): Promise<void> {
                if (modalModel.result() === true) {
                    self.cotizacionesArray.remove(cotizacion);
                    let deleted = await self.proxy.delete<CotizacionesModel>(cotizacion.id);
                }
            }
        });
    }
}

export = CotizacionesClienteModel;