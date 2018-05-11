import IReciboItemModel = require("./iReciboItemModel");

interface IReciboModel {
    id: string;
    folio: number;
    clienteId: string;
    proveedorId: string;
    fecha: Date;
    items: IReciboItemModel[];
}

export = IReciboModel;