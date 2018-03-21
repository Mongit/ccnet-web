import IPresupuestoModel = require("./iPresupuestoModel");

interface ICotizacionModel {
    contacto: string;
    empresa: string;
    domicilio: string;
    fechaCreado: Date;
    presupuestos: IPresupuestoModel[];
}

export = ICotizacionModel;