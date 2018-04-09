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
    public presupuestoItems: KnockoutObservableArray<PresupuestoItemModel>;

    constructor() {
        super();
        const self = this;

        this.cotId = UrlUtils.getParameterByName("cotId", window.location);

        this.proxy = new ProxyRest("/api/Presupuestos");

        this.presupuestos = self.addFieldArray<PresupuestoModel>([new ValidatableValidator<IFieldBase<any, any>>("Encontramos un error en alguno de sus campos.")]);
        this.presupuestoItems = ko.observableArray<PresupuestoItemModel>();

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let presupuestosFromServer = await self.proxy.get(self.cotId);
        let presupuestosParsed = JSON.parse((JSON.parse(JSON.stringify(presupuestosFromServer))));

        for (let presupuesto of presupuestosParsed) {
            let presupuestomodel = new PresupuestoModel();

            for (let item of presupuesto.items) {
                self.presupuestoItems.push(self.getModelFromTo(new PresupuestoItemModel(), item));
            }

            presupuestomodel.cantidad = presupuesto.cantidad;
            presupuestomodel.descripcion = presupuesto.descripcion;
            presupuestomodel.porcentajeGastos = presupuesto.porcentajeGastos;
            presupuestomodel.porcentajeGanancia = presupuesto.porcentajeGanancia;
            presupuestomodel.porcentajeIva = presupuesto.porcentajeIVA;
            presupuestomodel.cotizacionId = presupuesto.cotizacionId;
            presupuestomodel.items = self.presupuestoItems;
            
            self.presupuestos.value.push(presupuestomodel); 
        }
    }
    
    public getModelFromTo(newitem, item): PresupuestoItemModel {
        newitem.cantidad = item.cantidad;
        newitem.descripcion = item.descripcion;
        newitem.precio = item.precio;
        newitem.presupuestoId = item.presupuestoId;

        return newitem;
    }
}

export = PresupuetosModel;