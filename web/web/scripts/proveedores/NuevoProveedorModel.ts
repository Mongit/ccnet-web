import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import ProxyRest = require("./../api/proxyRest");
import IProveedorModel = require("./IProveedorModel");
import * as stringValidators from './../validators/stringValidators';

class NuevoProveedorModel extends KoForm {
    public empresa: IField<string>;
    public contacto: IField<string>;
    public domicilio: IField<string>;
    public telefono: IField<string>;
    public email: IField<string>;
    public horarioAtencion: IField<string>;

    public proxy: ProxyRest;

    constructor() {
        super();

        const self = this;
        this.empresa = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.contacto = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.domicilio = self.addField<string>([]);
        this.telefono = self.addField<string>([]);
        this.email = self.addField<string>([]);
        this.horarioAtencion = self.addField<string>([]);
        
        this.proxy = new ProxyRest("/api/Proveedores");
    }

    public getModel(): IProveedorModel {
        const self = this;

        return {
            id: "",
            empresa: self.empresa.value(),
            contacto: self.contacto.value(),
            domicilio: self.domicilio.value(),
            telefono: self.telefono.value(),
            email: self.email.value(),
            horarioAtencion: self.horarioAtencion.value()
        };
    }

    public async save(): Promise<void> {
        const self = this;
        if (await self.validate()) {
            let model = self.getModel();
            let serverModel = await self.proxy.post<IProveedorModel>(model);
            alert("Proveedor guardado exitosamente.");
            window.location.href = "Proveedores";
        }
    }
}

export = NuevoProveedorModel;