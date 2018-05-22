import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import ProxyRest = require("./../api/proxyRest");
import ICuentaModel = require("./ICuentaModel");
import UrlUtils = require("./../utils/UrlUtils");
import * as stringValidators from './../validators/stringValidators';

class CuentaModel extends KoForm {
    public banco: IField<string>;
    public titular: IField<string>;
    public clabe: IField<string>;
    public noCuenta: IField<string>;

    public proxy: ProxyRest;
    public cuentaIdUrlParam: string;

    public currentTemplate: KnockoutObservable<string>;
    public proveedorId: KnockoutObservable<string>;

    constructor() {
        super();

        const self = this;
        this.banco = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.titular = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.clabe = self.addField<string>([]);
        this.noCuenta = self.addField<string>([]);

        this.proxy = new ProxyRest("/api/Cuentas");
        this.cuentaIdUrlParam = UrlUtils.getParameterByName("id", window.location);

        this.currentTemplate = ko.observable<string>("nuevo");
        this.proveedorId = ko.observable<string>(UrlUtils.getParameterByName("provId", window.location));
        self.cuentaIdUrlParam ? self.editarTemplate() : self.currentTemplate('nuevo');
    }

    public editarTemplate(): void {
        const self = this;
        self.getOne();
        self.currentTemplate("editar");
    }

    public async save(): Promise<void> {
        const self = this;
        if (await self.validate()) {
            let model = self.getModel();
            let serverModel = await self.proxy.post<ICuentaModel>(model);
            alert("Cuenta guardada exitosamente.");
            window.location.href = "Cuentas?id=" + self.proveedorId();
        }
    }

    public getModel(): ICuentaModel {
        const self = this;

        return {
            id: self.cuentaIdUrlParam ? self.cuentaIdUrlParam : "00000000-0000-0000-0000-000000000000",
            proveedorId: self.proveedorId(),
            banco: self.banco.value(),
            titular: self.titular.value(),
            clabe: self.clabe.value(),
            noCuenta: self.noCuenta.value()
        };
    }

    public async getOne(): Promise<void> {
        const self = this;

        let response = await self.proxy.get<ICuentaModel>(self.cuentaIdUrlParam);
        let cuentaJson = JSON.parse(JSON.parse(JSON.stringify(response)));

        self.proveedorId(cuentaJson.proveedorId);
        self.banco.value(cuentaJson.banco);
        self.titular.value(cuentaJson.titular);
        self.clabe.value(cuentaJson.clabe);
        self.noCuenta.value(cuentaJson.noCuenta);
    }

    public async update(): Promise<void> {
        const self = this;
        if (await self.validate()) {
            let model = self.getModel();
            let cuentaUpdated = await self.proxy.put<ICuentaModel>(self.cuentaIdUrlParam, model);
            alert(JSON.stringify(cuentaUpdated));
            window.location.href = "Cuentas?id=" + self.proveedorId();
        }
    }
}

export = CuentaModel;