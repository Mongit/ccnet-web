﻿interface IPresupuestoItemModel {
    id: string;
    cantidad: number;
    descripcion: string;
    precio: number;
    presupuestoId: string;
}

export = IPresupuestoItemModel;