class ClienteModel {
    public id: string;
    public folio: number;
    public contacto: string;
    public empresa: string;
    public telefono: string;
    public email: string;
    public fechaCreado: Date;
    public domicilio: string;

    constructor() {
    }
}

export = ClienteModel;