import ProxyRest = require("./../api/proxyRest");
import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import IProductoModel = require("./IProductoModel");
import * as stringValidators from './../validators/stringValidators';

class ProductoModel extends KoForm {
    public remoteValue: KnockoutObservable<string>;
    public proxy: ProxyRest;

    public nombre: IField<string>;
    public color: IField<string>;
    public unidad: IField<string>;

    public currentTemplate: KnockoutObservable<string>;

    constructor() {
        super();

        const self = this;
        this.nombre = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.color = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.unidad = self.addField<string>([new stringValidators.RequiredStringValidator()]);

        this.remoteValue = ko.observable();

        this.proxy = new ProxyRest("/api/Productos")
        this.currentTemplate = ko.observable<string>("nuevo");
    }

    public async remoteHandler(term: string, callback): Promise<void> {
        let proveedorProxy = new ProxyRest("/api/Proveedores/search/term");
        let response = await proveedorProxy.get(term, null, null);
        let proveedoresjson = JSON.parse((JSON.parse(JSON.stringify(response))));
        callback(proveedoresjson);
    }

    public async save(): Promise<void> {
        const self = this;
        if (await self.validate() && self.remoteValue()) {
            let model = self.getModel();
            let serverModel = await self.proxy.post<IProductoModel>(model);
            alert(serverModel);
            window.location.href = "Productos";
        } else {
            alert("Lo sentimos, ningun campo debe estar vacío.")
        }
    }

    public getModel(): IProductoModel {
        const self = this;

        return {
            id: "00000000-0000-0000-0000-000000000000",
            nombre: self.nombre.value(),
            color: self.color.value(),
            unidad: self.unidad.value(),
            proveedorId: self.remoteValue()
        };
    }

    public update(): void {
        alert("Hello Im update");
    }
}

export = ProductoModel;
