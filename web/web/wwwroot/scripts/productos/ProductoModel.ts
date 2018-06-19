import ProxyRest = require("./../api/proxyRest");
import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import IProductoModel = require("./IProductoModel");
import IProveedorModel = require("./../proveedores/IProveedorModel");
import UrlUtils = require("./../utils/UrlUtils");
import * as stringValidators from './../validators/stringValidators';

class ProductoModel extends KoForm {
    public remoteValue: KnockoutObservable<string>;
    public currentTemplate: KnockoutObservable<string>;
    public proveedorId: KnockoutObservable<string>;
    public folio: KnockoutObservable<number>;

    public proxy: ProxyRest;
    public productoIdUrlParam: string;
    public proveedorName: string;
    
    public nombre: IField<string>;
    public color: IField<string>;
    public unidad: IField<string>;
    
    constructor() {
        super();

        const self = this;
        this.nombre = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.color = self.addField<string>([new stringValidators.RequiredStringValidator()]);
        this.unidad = self.addField<string>([new stringValidators.RequiredStringValidator()]);

        this.folio = ko.observable<number>();
        this.remoteValue = ko.observable<string>();
        this.currentTemplate = ko.observable<string>("nuevo");
        this.proveedorId = ko.observable<string>();
        
        this.proxy = new ProxyRest("/api/Productos")
        this.productoIdUrlParam = UrlUtils.getParameterByName("id", window.location);

        self.productoIdUrlParam ? self.editarTemplate() : self.currentTemplate('nuevo');
    }

    public editarTemplate(): void {
        const self = this;
        self.getOne();
        self.currentTemplate("editar");
    }

    public async getOne(): Promise<void> {
        const self = this;

        let response = await self.proxy.get<IProductoModel>(self.productoIdUrlParam);
        let productoJson = JSON.parse(JSON.parse(JSON.stringify(response)));

        self.folio(productoJson.folio);
        self.nombre.value(productoJson.nombre);
        self.color.value(productoJson.color);
        self.unidad.value(productoJson.unidad);
        self.getProveedorName(productoJson.proveedorId);
    }

    public async getProveedorName(proveedorId: string): Promise<void> {
        const self = this;
        let proveedorProxy = new ProxyRest("/api/Proveedores")
        let response = await proveedorProxy.get<IProveedorModel>(proveedorId);
        let proveedorJson = JSON.parse(JSON.parse(JSON.stringify(response)));

        self.remoteValue(proveedorJson.empresa);
        self.proveedorName = proveedorJson.empresa;
        self.proveedorId(proveedorJson.id);
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
            id: self.productoIdUrlParam ? self.productoIdUrlParam : "00000000-0000-0000-0000-000000000000",
            folio: self.folio(),
            nombre: self.nombre.value(),
            color: self.color.value(),
            unidad: self.unidad.value(),
            proveedorId: self.remoteValue()
        };
    }

    public async update(): Promise<void> {
        const self = this;
        if (self.remoteValue() === self.proveedorName) {
            self.remoteValue(self.proveedorId());
        }
        if (await self.validate() && self.remoteValue()) {
            let model = self.getModel();
            let productoUpdated = await self.proxy.put<IProductoModel>(self.productoIdUrlParam, model);
            alert(productoUpdated);
            window.location.href = "Productos";
        }
    }
}

export = ProductoModel;
