import IPresupuestoItemModel = require("./iPresupuestoItemModel");

interface IPresupuestoModel {
    cantidad: number;
    descripcion: string;
    porcentajeGastos: number;
    porcentajeGanancia: number;
    porcentajeIva: number;
    cotizacionId: string;
    items: IPresupuestoItemModel[];
}

export = IPresupuestoModel;