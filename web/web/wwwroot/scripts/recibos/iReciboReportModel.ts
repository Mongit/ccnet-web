interface IReciboReportModel {
    id: string;
    folio: number;
    clienteId: string;
    proveedorId: string;
    fecha: Date;
    clienteName: string;
    proveedorName: string;
}

export = IReciboReportModel;