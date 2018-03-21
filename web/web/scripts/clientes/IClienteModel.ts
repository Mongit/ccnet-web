interface INuevoClienteModel {
    id: string;
    folio: number;
    contacto: string;
    empresa: string;
    telefono: string;
    email: string;
    fechaCreado: Date;
    domicilio: string;
}

export = INuevoClienteModel;