import PresupuestoModel = require("./PresupuestoModel");
import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import IFieldBase = require("./../field/iFieldBase");
import IFieldArray = require("./../field/iFieldArray");
import ICotizacionModel = require("./iCotizacionModel");
import * as moment from 'moment';
import * as validators from './../validators/stringValidators';
import IBindedModelInfo = require("./../modals/IBindedModalInfo");
import Size = require("./../utils/Size");
import BindedModal = require("./../modals/BindedModal");
import ConfirmModal = require("./../modals/confirmModal");
import ValidatableValidator = require("./../validators/ValidatableValidator");
import UrlUtils = require("./../utils/UrlUtils");
import ProxyRest = require("./../api/proxyRest");

moment.locale('es');

class CotizacionModel extends KoForm {
    public empresa: KnockoutObservable<string>;
    public domicilio: KnockoutObservable<string>;
    public contacto: KnockoutObservable<string>;
    public fechaCreado: KnockoutObservable<string>;
    public fechaFuturo: KnockoutObservable<string>;
    public currentTemplate: KnockoutObservable<string>;

    public subtotalPresupuestos: KnockoutComputed<number>;
    public ivaPresupuestos: KnockoutComputed<number>;
    public totalPresupuestos: KnockoutComputed<number>;

    public idCotizacion: string;
    public idCliente: string;
    
    public proxy: ProxyRest;

    public presupuestos: IFieldArray<PresupuestoModel>;
    
    constructor() {
        super();
        
        const self = this;
        this.empresa = ko.observable<string>("");
        this.domicilio = ko.observable<string>("");
        this.contacto = ko.observable<string>("");
        this.fechaCreado = ko.observable<string>("");
        this.fechaFuturo = ko.observable<string>("");
        this.currentTemplate = ko.observable<string>("editar");

        this.idCotizacion = UrlUtils.getParameterByName('cotId', window.location);
        this.idCliente = UrlUtils.getParameterByName('cteId', window.location);;
        
        this.proxy = new ProxyRest("/api/Cotizaciones");
                
        this.presupuestos = self.addFieldArray<PresupuestoModel>([new ValidatableValidator<IFieldBase<any, any>>("Encontramos un error en alguno de sus campos.")]);    
        
        this.subtotalPresupuestos = ko.computed<number>(function (): number {
            let suma: number = 0;
            for (let p of self.presupuestos.value()) {
                suma += p.subtotal();
            }
            return suma;
        }, self);
        this.ivaPresupuestos = ko.computed<number>(function (): number {
            let suma: number = 0;
            for (let p of self.presupuestos.value()) {
                suma += p.iva();
            }
            return suma;
        }, self);
        this.totalPresupuestos = ko.computed<number>(function (): number {
            return self.subtotalPresupuestos() + self.ivaPresupuestos();
        }, self);

        this.editarTemplate();

    }

    public editarTemplate(): void {
        this.currentTemplate('editar');
    }

    public verTemplate(): void {
        this.getCotizacion();
        this.currentTemplate('ver');
    }

    public async getCotizacion(): Promise<void> {

        await this.getCliente();

        const self = this;
        let cotizaciones = await self.proxy.get(self.idCliente);
        let cotizacionesJson = JSON.parse((JSON.parse(JSON.stringify(cotizaciones))));
                
        for (let cotizacion of cotizacionesJson) {
            if (self.idCotizacion === cotizacion.id) {
                self.fechaCreado(moment(cotizacion.fecha).format('LL'));
                self.fechaFuturo(moment(cotizacion.fecha).add(15, 'days').format('LL'));
                break;
            }
        }
    }

    public async getCliente(): Promise<void> {
        const self = this;
        let proxyCliente = new ProxyRest("/api/Clientes");
        let cliente = await proxyCliente.get(self.idCliente);
        let clienteJson = JSON.parse((JSON.parse(JSON.stringify(cliente))));

        self.empresa(clienteJson.empresa);
        self.domicilio(clienteJson.domicilio);
        self.contacto(clienteJson.contacto);
    }

    public addPresupuesto(): void {
        const self = this;
        $("div.collapse").removeClass("show");
        let presupuesto = new PresupuestoModel()
        self.presupuestos.value.push(presupuesto);        
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
            onClose: function (e: JQuery.Event<HTMLElement, null>): void {

                if (modalModel.result() === true) {
                    self.presupuestos.value.remove(presupuesto);
                }

            }
        });         
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
}

export = CotizacionModel;