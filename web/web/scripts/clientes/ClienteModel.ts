import IField = require("./../field/iField");
import KoForm = require("./../form/KoForm");
import IClienteModel = require("./IClienteModel");
import ProxyRest = require("./../api/proxyRest");
import * as validators from './../validators/stringValidators';


class ClienteModel extends KoForm {
    public contacto: IField<string>;
    public empresa: IField<string>;
    public telefono: IField<string>;
    public email: IField<string>;
    public datosFacturacionId: string;
    public fechaCreado: Date;
    public domicilio: IField<string>;

    public proxy: ProxyRest;

    constructor() {
        super();

        const self = this;
        this.contacto = self.addField<string>([new validators.RequiredStringValidator()]);
        this.empresa = self.addField<string>([new validators.RequiredStringValidator()]);
        this.telefono = self.addField<string>([]);
        this.email = self.addField<string>([]);
        this.domicilio = self.addField<string>([new validators.RequiredStringValidator()]);
        this.fechaCreado = new Date();
        
        this.proxy = new ProxyRest("/server/api/Clientes");
    }

    public getModel(): IClienteModel {
        const self = this;

        return {
            id: "",
            folio: 0,
            contacto: self.contacto.value(),
            empresa: self.empresa.value(),
            telefono: self.telefono.value(),
            email: self.email.value(),
            fechaCreado: self.fechaCreado,
            domicilio: self.domicilio.value()
        };
    }

    public async guardar(): Promise<void> {
        const self = this;
        if (await self.validate()) {
            let model = self.getModel();
            let serverModel = await self.proxy.post<IClienteModel>(model);
            alert(JSON.stringify(serverModel));
        }
    }
}

export = ClienteModel;