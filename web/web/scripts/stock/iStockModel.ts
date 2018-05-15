interface IStockModel {
    id: string;
    productoId: string;
    cantidad: number;
    precio: number;
    fecha: Date;
    proveedorId: string;
    reciboId: string;
}

export = IStockModel;