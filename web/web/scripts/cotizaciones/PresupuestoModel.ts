import PresupuestoItemModel = require("./PresupuestoItemModel");
import IBindedModelInfo = require("./../modals/IBindedModalInfo");
import Size = require("./../utils/Size");
import BindedModal = require("./../modals/BindedModal");
import ConfirmModal = require("./../modals/confirmModal");
import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import numberValidator = require("./../validators/numberValidators");
import stringValidator = require("./../validators/stringValidators");
import IPresupuestoModel = require("./iPresupuestoModel");
import IPresupuestoItemModel = require("./iPresupuestoItemModel");
import UrlUtils = require("./../utils/UrlUtils");
import ProxyRest = require("./../api/proxyRest");

class PresupuestoModel extends KoForm {
    public cotizacionId: string;
    public presupuestoId: string;

    public cantidad: IField<number>;
    public descripcion: IField<string>;
    public porcentajeGastos: IField<number>;
    public gasto: KnockoutObservable<number>;
    public porcentajeGanancia: IField<number>;
    public ganancia: KnockoutObservable<number>;
    public porcentajeIva: IField<number>;
    public iva: KnockoutObservable<number>;
    public temporalHasFocus: KnockoutObservable<boolean>;
    public temporal: KnockoutObservable<PresupuestoItemModel>;
    
    public items: KnockoutObservableArray<PresupuestoItemModel>;
    
    public subtotalModal: KnockoutComputed<number>;
    public subtotal: KnockoutComputed<number>;
    public total: KnockoutComputed<number>;

    public proxy: ProxyRest;

    constructor() {
        super();
        const self = this;
        this.cotizacionId = UrlUtils.getParameterByName('cotId', window.location);
        this.presupuestoId = "";

        this.cantidad = self.addField<number>([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);
        this.descripcion = self.addField<string>([new stringValidator.RequiredStringValidator()]);
        this.porcentajeGastos = self.addField<number>([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()], null, 5);
        this.gasto = ko.observable<number>(0);
        this.porcentajeGanancia = self.addField<number>([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()], null, 80);
        this.ganancia = ko.observable<number>(0);
        this.porcentajeIva = self.addField<number>([new numberValidator.FloatValidator, new numberValidator.RequiredNumberValidator()], null, 16);
        this.iva = ko.observable<number>(0);

        this.items = ko.observableArray<PresupuestoItemModel>();

        this.proxy = new ProxyRest("/api/Presupuestos");

        this.subtotal = ko.computed<number>(function (): number {

            let sumaCostos: number = 0;
            let subTotal: number = 0;
            for (let pi of self.items()) {
                sumaCostos += pi.costo();
            }

            subTotal = self.sumaPorcentajesCostos(sumaCostos);
            self.iva(self.obtenerPorcentaje(subTotal, self.porcentajeIva.value()));

            return subTotal;
        }, self);
        this.total = ko.computed<number>(function (): number {
            return self.subtotal() + self.iva();
        }, self);

        this.temporal = ko.observable<PresupuestoItemModel>(new PresupuestoItemModel());
        this.temporalHasFocus = ko.observable<boolean>();
    }

    public getModel(): IPresupuestoModel {
        const self = this;

        let itemArray = new Array<IPresupuestoItemModel>();
        for (let item of self.items()) {
            itemArray.push(item.getModel());
        }

        return {
            id: self.presupuestoId ? self.presupuestoId : "00000000-0000-0000-0000-000000000000",
            cantidad: self.cantidad.value(),
            descripcion: self.descripcion.value(),
            porcentajeGastos: self.porcentajeGastos.value(),
            porcentajeGanancia: self.porcentajeGanancia.value(),
            porcentajeIva: self.porcentajeIva.value(),
            cotizacionId: self.cotizacionId,
            items: itemArray
        };
    }    

    public async addPresupuestoItem(): Promise<void> {
        const self = this;

        if (await self.temporal().validate() === true) {
            let newPresupuesto = new PresupuestoItemModel();
            newPresupuesto.cantidad.value(self.temporal().cantidad.value());
            newPresupuesto.descripcion.value(self.temporal().descripcion.value());
            newPresupuesto.precio.value(self.temporal().precio.value());

            self.items.push(newPresupuesto);

            self.temporal(new PresupuestoItemModel());
            self.temporalHasFocus(true);
        }        
    }

    public removePresupuestoItem(item: PresupuestoItemModel): void {
        const self = this;
        let modalModel = new ConfirmModal("¿Está seguro de borrar éste Material?");

        let dialog = new BindedModal({
            model: modalModel,
            size: Size.small,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: function (e: JQuery.Event<HTMLElement, null>): void {
                if (modalModel.result() === true) {
                    self.items.remove(item);
                }
            }
        });        
    }

    public obtenerPorcentaje(subtotal: number, porciento: number): number {
        let porcentaje: number = 0;
        porcentaje = subtotal * (porciento / 100);
        return porcentaje;
    }

    public sumaPorcentajesCostos(sumaCostos: number): number {
        let suma: number = 0;
        let gasto: number = 0;
        let ganancia: number = 0;

        gasto = this.obtenerPorcentaje(sumaCostos, this.porcentajeGastos.value());
        suma = sumaCostos + gasto;

        ganancia = this.obtenerPorcentaje(suma, this.porcentajeGanancia.value());
        suma += ganancia;

        this.gasto(gasto);
        this.ganancia(ganancia);

        return suma;
    }
    

    public async guardar(): Promise<void> {
        const self = this;
        if (await self.validate()) {
            let model = self.getModel();
            let serverModel = await self.proxy.post<IPresupuestoModel>(model);
            alert("Cotización guardada exitosamente.");
        }
    }
}

export = PresupuestoModel;