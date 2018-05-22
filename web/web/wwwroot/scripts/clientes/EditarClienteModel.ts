import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import ProxyRest = require("./../api/proxyRest");
import IClienteModel = require("./IClienteModel");
import UrlUtils = require("./../utils/UrlUtils");
import validators = require("./../validators/stringValidators");

class EditarClienteModel extends KoForm {
    public contacto: IField<string>;
    public empresa: IField<string>;
    public telefono: IField<string>;
    public email: IField<string>;
    public datosFacturacionId: string;
    public fechaCreado: Date;
    public domicilio: IField<string>;

    public proxy: ProxyRest;

    public clienteIdUrlParam: string;
    public folio: number;

    constructor() {
        super();

        const self = this;
        this.contacto = self.addField<string>([new validators.RequiredStringValidator()]);
        this.empresa = self.addField<string>([new validators.RequiredStringValidator()]);
        this.telefono = self.addField<string>([]);
        this.email = self.addField<string>([]);
        this.domicilio = self.addField<string>([new validators.RequiredStringValidator()]);
        this.fechaCreado = new Date();

        this.proxy = new ProxyRest("/api/Clientes");

        this.clienteIdUrlParam = UrlUtils.getParameterByName("id", window.location);
        this.folio = 0;

        this.getCliente();
    }

    public async getCliente(): Promise<void> {
        const self = this;

        let cliente = await self.proxy.get<IClienteModel>(self.clienteIdUrlParam);
        let clienteJson = JSON.parse(JSON.parse(JSON.stringify(cliente)));

        self.folio = clienteJson.folio;
        self.contacto.value(clienteJson.contacto);
        self.empresa.value(clienteJson.empresa);
        self.telefono.value(clienteJson.telefono);
        self.email.value(clienteJson.email);
        self.domicilio.value(clienteJson.domicilio);
    }

    public getModel(): IClienteModel {
        const self = this;

        return {
            id: self.clienteIdUrlParam,
            folio: self.folio,
            contacto: self.contacto.value(),
            empresa: self.empresa.value(),
            telefono: self.telefono.value(),
            email: self.email.value(),
            fechaCreado: self.fechaCreado,
            domicilio: self.domicilio.value()
        };
    }

    public async modificar(): Promise<void> {
        const self = this;
        if (await self.validate()) {
            let model = self.getModel();
            let clienteModificado = await self.proxy.put<IClienteModel>(self.clienteIdUrlParam, model);
            alert(JSON.stringify(clienteModificado));
            window.location.href = "Clientes";
        }
    }
}

export = EditarClienteModel;