import ProxyRest = require("./../api/proxyRest");
import UrlUtils = require("./../utils/UrlUtils");
import IPresupuestoModel = require("./iPresupuestoModel");
import IPresupuestoItemModel = require("./iPresupuestoItemModel");

class PresupuetosModel {
    public cotId: string;

    public proxy: ProxyRest;

    public presupuestos: KnockoutObservableArray<IPresupuestoModel>;

    constructor() {
        this.cotId = UrlUtils.getParameterByName("cotId", window.location);

        this.proxy = new ProxyRest("/api/Presupuestos");

        this.presupuestos = ko.observableArray<IPresupuestoModel>();

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let presupuestosFromServer = await self.proxy.get(self.cotId);
        let presupuestosParsed = JSON.parse((JSON.parse(JSON.stringify(presupuestosFromServer))));
        
        for (let presupuesto of presupuestosParsed) {

            //let itemArray = new Array<IPresupuestoItemModel>();
            //for (let item of presupuesto.items) {
            //    itemArray.push({
            //        cantidad: item.cantidad,
            //        descripcion: item.descripcion,
            //        precio: item.precio,
            //        presupuestoId: item.presupuestoId
            //    });
            //}

            let itemmodel;
            for (let item of presupuesto.items) {
                itemmodel = {
                    cantidad: item.cantidad,
                    descripcion: item.descripcion,
                    precio: item.precio,
                    presupuestoId: item.presupuestoId
                };
            }

            //verificar por que solo imprime un presupuesto en html
            //error en items not defined

            self.presupuestos.push({
                cantidad: presupuesto.cantidad,
                descripcion: presupuesto.descripcion,
                porcentajeGastos: presupuesto.porcentajeGastos,
                porcentajeGanancia: presupuesto.porcentajeGanancia,
                porcentajeIva: presupuesto.porcentajeIVA,
                cotizacionId: presupuesto.cotizacionId,
                presupuestosItem: itemmodel
            });

            alert(presupuesto);
        }
    }
}

export = PresupuetosModel;