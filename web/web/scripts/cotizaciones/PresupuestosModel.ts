import ProxyRest = require("./../api/proxyRest");
import UrlUtils = require("./../utils/UrlUtils");
import IFieldArray = require("./../field/iFieldArray");
import KoForm = require("./../form/KoForm");
import ValidatableValidator = require("./../validators/ValidatableValidator");
import IFieldBase = require("./../field/iFieldBase");
import PresupuestoModel = require("./PresupuestoModel");
import PresupuestoItemModel = require("./PresupuestoItemModel");

class PresupuetosModel extends KoForm {
    public cotId: string;

    public proxy: ProxyRest;

    public presupuestos: IFieldArray<PresupuestoModel>;
    //public presupuestoItems: KnockoutObservableArray<PresupuestoItemModel>;

    public gastos: KnockoutObservable<number>;
    public ganancias: KnockoutObservable<number>;
    public iva: KnockoutObservable<number>;

    public subtotal: KnockoutComputed<number>;
    public subtotalItems: KnockoutComputed<number>;
    public total: KnockoutComputed<number>;
    
    constructor() {
        super();
        const self = this;

        this.cotId = UrlUtils.getParameterByName("cotId", window.location);

        this.proxy = new ProxyRest("/api/Presupuestos");

        this.presupuestos = self.addFieldArray<PresupuestoModel>([new ValidatableValidator<IFieldBase<any, any>>("Encontramos un error en alguno de sus campos.")]);
        //this.presupuestoItems = ko.observableArray<PresupuestoItemModel>();

        this.gastos = ko.observable<number>(0);
        this.ganancias = ko.observable<number>(0);
        this.iva = ko.observable<number>(0);

        this.subtotal = ko.computed<number>(function (): number {
            let suma = 0;
            for (let presupuesto of self.presupuestos.value()) {
                suma = suma + presupuesto.subtotal();
            }
            return suma;
        }, self);
        this.subtotalItems = ko.computed<number>(function (): number {
            let suma = 0;
            for (let presupuesto of self.presupuestos.value()) {
                for (let item of presupuesto.items()) {
                    suma = suma + item.costo();
                }
            }
            return suma;
        }, self);
        this.total = ko.computed<number>(function (): number {
            return 1;
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
        newitem.cantidad.value(item.cantidad);
        newitem.descripcion.value(item.descripcion);
        newitem.precio.value(item.precio);
        newitem.presupuestoId = item.presupuestoId;

        return newitem;
    }
}

export = PresupuetosModel;