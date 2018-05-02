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
    public proveedorIdUrlParam: string;

    public currentTemplate: KnockoutObservable<string>;

    constructor() {
        super();

        const self = this;
        this.banco = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.titular = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.clabe = self.addField<string>([]);
        this.noCuenta = self.addField<string>([]);
        
        this.proxy = new ProxyRest("/api/Cuentas");
        this.proveedorIdUrlParam = UrlUtils.getParameterByName("provId", window.location);

        this.currentTemplate = ko.observable<string>("nuevo");
    }

    public async save(): Promise<void> {
        const self = this;
        if (await self.validate()) {
            let model = self.getModel();
            let serverModel = await self.proxy.post<ICuentaModel>(model);
            alert("Cuenta guardada exitosamente.");
            window.location.href = "Cuentas";
        }
    }

    public getModel(): ICuentaModel {
        const self = this;

        return {
            id: "00000000-0000-0000-0000-000000000000",
            proveedorId: self.proveedorIdUrlParam,
            banco: self.banco.value(),
            titular: self.titular.value(),
            clabe: self.clabe.value(),
            noCuenta: self.noCuenta.value()
        };
    }
}

export = CuentaModel;