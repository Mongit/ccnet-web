import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import ProxyRest = require("./../api/proxyRest");
import IProveedorModel = require("./IProveedorModel");
import UrlUtils = require("./../utils/UrlUtils");
import * as stringValidators from './../validators/stringValidators';

class NuevoProveedorModel extends KoForm {
    public empresa: IField<string>;
    public contacto: IField<string>;
    public domicilio: IField<string>;
    public telefono: IField<string>;
    public email: IField<string>;
    public horarioAtencion: IField<string>;
    
    public proxy: ProxyRest;
    public proveedorIdUrlParam: string;

    public currentTemplate: KnockoutObservable<string>;

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
        this.proveedorIdUrlParam = UrlUtils.getParameterByName("id", window.location);

        this.currentTemplate = ko.observable<string>("nuevo");
        self.proveedorIdUrlParam ? self.editarTemplate() : self.currentTemplate('nuevo');
    }

    public editarTemplate(): void {
        const self = this;
        self.getOne();
        self.currentTemplate("editar");
    }

    public getModel(): IProveedorModel {
        const self = this;

        return {
            id: self.proveedorIdUrlParam ? self.proveedorIdUrlParam : "00000000-0000-0000-0000-000000000000",
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

    public async getOne(): Promise<void> {
        const self = this;

        let response = await self.proxy.get<IProveedorModel>(self.proveedorIdUrlParam);
        let proveedorJson = JSON.parse(JSON.parse(JSON.stringify(response)));
        
        self.empresa.value(proveedorJson.empresa);
        self.contacto.value(proveedorJson.contacto);
        self.domicilio.value(proveedorJson.domicilio);
        self.telefono.value(proveedorJson.telefono);
        self.email.value(proveedorJson.email);
        self.horarioAtencion.value(proveedorJson.horarioAtencion);
    }

    public async update(): Promise<void> {
        const self = this;
        if (await self.validate()) {
            let model = self.getModel();
            let proveedorUpdated = await self.proxy.put<IProveedorModel>(self.proveedorIdUrlParam, model);
            alert(JSON.stringify(proveedorUpdated));
            window.location.href = "Proveedores";
        }
    }
}

export = NuevoProveedorModel;