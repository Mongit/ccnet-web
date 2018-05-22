import ProxyRest = require("./../api/proxyRest");
import UrlUtils = require("./../utils/UrlUtils");
import IFieldArray = require("./../field/iFieldArray");
import KoForm = require("./../form/KoForm");
import ValidatableValidator = require("./../validators/ValidatableValidator");
import IFieldBase = require("./../field/iFieldBase");
import PresupuestoModel = require("./PresupuestoModel");
import PresupuestoItemModel = require("./PresupuestoItemModel");
import IPresupuestoModel = require("./iPresupuestoModel");
import IPresupuestoItemModel = require("./PresupuestoItemModel");
import ICotizacionesModel = require("./CotizacionesModel");
import ConfirmModal = require("./../modals/confirmModal");
import BindedModal = require("./../modals/BindedModal");
import Size = require("./../utils/Size");
import * as moment from 'moment';

moment.locale('es');

class PresupuetosModel extends KoForm {
    public cotId: string;
    public cteId: string;
    
    public proxy: ProxyRest;

    public presupuestos: IFieldArray<PresupuestoModel>;

    public empresa: KnockoutObservable<string>;
    public domicilio: KnockoutObservable<string>;
    public contacto: KnockoutObservable<string>;
    public fechaCreado: KnockoutObservable<string>;
    public fechaFuturo: KnockoutObservable<string>;
    public currentTemplate: KnockoutObservable<string>;

    public subtotalPresupuestos: KnockoutComputed<number>;
    public ivaPresupuestos: KnockoutObservable<number>;
    public totalPresupuestos: KnockoutComputed<number>;
    
    constructor() {
        super();
        const self = this;

        this.cotId = UrlUtils.getParameterByName("cotId", window.location);
        this.cteId = UrlUtils.getParameterByName("cteId", window.location);

        this.proxy = new ProxyRest("/api/Presupuestos");

        this.presupuestos = self.addFieldArray<PresupuestoModel>([new ValidatableValidator<IFieldBase<any, any>>("Encontramos un error en alguno de sus campos.")]);
        
        this.empresa = ko.observable<string>("");
        this.domicilio = ko.observable<string>("");
        this.contacto = ko.observable<string>("");
        this.fechaCreado = ko.observable<string>("");
        this.fechaFuturo = ko.observable<string>("");
        this.currentTemplate = ko.observable<string>("editarPresupuestos");

        this.subtotalPresupuestos = ko.computed<number>(function (): number {
            let suma = 0;
            for (let presupuesto of self.presupuestos.value()) {
                suma = suma + presupuesto.subtotal();
            }
            return suma;
        }, self);
        this.ivaPresupuestos = ko.computed<number>(function (): number {
            let suma = 0;
            for (let presupuesto of self.presupuestos.value()) {
                suma = suma + presupuesto.iva();
            }
            return suma;
        }, self);
        this.totalPresupuestos = ko.computed<number>(function (): number {
            return self.subtotalPresupuestos() + self.ivaPresupuestos();
        }, self);

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let presupuestosFromServer = await self.proxy.get(self.cotId);
        let presupuestosParsed = JSON.parse((JSON.parse(JSON.stringify(presupuestosFromServer))));

        for (let presupuesto of presupuestosParsed) {
            let presupuestomodel = new PresupuestoModel();
            
            for (let item of presupuesto.items) {
                presupuestomodel.items.push(self.getModelFromTo(new PresupuestoItemModel(), item));
            }

            presupuestomodel.presupuestoId = presupuesto.id;
            presupuestomodel.cantidad.value(presupuesto.cantidad);
            presupuestomodel.descripcion.value(presupuesto.descripcion);
            presupuestomodel.porcentajeGastos.value(presupuesto.porcentajeGastos);
            presupuestomodel.porcentajeGanancia.value(presupuesto.porcentajeGanancia);
            presupuestomodel.porcentajeIva.value(presupuesto.porcentajeIVA);
            presupuestomodel.cotizacionId = presupuesto.cotizacionId;
            
            self.presupuestos.value.push(presupuestomodel); 
        }
    }
    
    public getModelFromTo(newitem, item): PresupuestoItemModel {
        newitem.itemId = item.id;
        newitem.cantidad.value(item.cantidad);
        newitem.descripcion.value(item.descripcion);
        newitem.precio.value(item.precio);
        newitem.presupuestoId = item.presupuestoId;

        return newitem;
    }

    public addPresupuesto(): void {
        const self = this;
        $("div.collapse").removeClass("show");
        let presupuesto = new PresupuestoModel()
        self.presupuestos.value.push(presupuesto);
    }

    public verTemplate(): void {
        this.getCotizacion();
        this.currentTemplate('verPresupuestos');
    }

    public editarTemplate(): void {
        this.currentTemplate('editarPresupuestos');
    }

    public async getCotizacion(): Promise<void> {

        await this.getCliente();

        const self = this;
        let proxyCotizaciones = new ProxyRest("/api/Cotizaciones");
        let cotizacion = await proxyCotizaciones.get<ICotizacionesModel>(self.cotId);
        let cotizacionJson = JSON.parse((JSON.parse(JSON.stringify(cotizacion))));

        self.fechaCreado(moment(cotizacionJson.fecha).format('LL'));
        self.fechaFuturo(moment(cotizacionJson.fecha).add(15, 'days').format('LL'));
    }

    public async getCliente(): Promise<void> {
        const self = this;
        let proxyCliente = new ProxyRest("/api/Clientes");
        let cliente = await proxyCliente.get(self.cteId);
        let clienteJson = JSON.parse((JSON.parse(JSON.stringify(cliente))));

        self.empresa(clienteJson.empresa);
        self.domicilio(clienteJson.domicilio);
        self.contacto(clienteJson.contacto);
    }

    public print(): void {
        let self = this;
        let data = $("#printableArea").html();
        let myWindow = window.open('', 'ConfeccionesColombia', 'height=600,width=800,scrollbars=yes');
        myWindow.document.write('<!DOCTYPE html>');
        myWindow.document.write('<html><head>');
        myWindow.document.write('<head>');
        myWindow.document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
        myWindow.document.write('<title>Confecciones Colombia</title>');
        myWindow.document.write('<link href="/css/bootstrap.print.min.css" rel="stylesheet" type="text/css"/>');
        myWindow.document.write('</head><body>');
        myWindow.document.write(data);
        myWindow.document.write('</body></html>');
        myWindow.document.close();
        myWindow.print();
    }

    public async update(presupuesto: PresupuestoModel): Promise<void> {
        const self = this;
        if (await presupuesto.validate()) {
            if (!presupuesto.presupuestoId) {
                presupuesto.guardar();
            }
            else {
                let model = presupuesto.getModel();
                let serverModel = await self.proxy.put<IPresupuestoModel>(presupuesto.presupuestoId, model);
                alert("cotizacion" + JSON.stringify(serverModel));
            }
        }
    }

    public removePresupuesto(presupuesto: PresupuestoModel): void {
        const self = this;
        let modalModel = new ConfirmModal("¿Está seguro de borrar ésta Cotización?");

        let dialog = new BindedModal({
            model: modalModel,
            size: Size.medium,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: async function (e: JQuery.Event<HTMLElement, null>): Promise<void> {

                if (modalModel.result() === true) {
                    if (!presupuesto.presupuestoId) {
                        self.presupuestos.value.remove(presupuesto);
                    }
                    else {
                        self.presupuestos.value.remove(presupuesto);
                        await self.proxy.delete<PresupuestoModel>(presupuesto.presupuestoId);
                        alert("Cotizacion eliminada con éxito.")
                    }
                }

            }
        });
    }
}

export = PresupuetosModel;