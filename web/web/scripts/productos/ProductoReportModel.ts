import ProxyRest = require("./../api/proxyRest");
import iProductoReportModel = require("./IProductoReportModel");
import UrlUtils = require("./../utils/UrlUtils");

class ProductoReportModel {
    public proxy: ProxyRest;
    public productoId: string;

    public nombre: KnockoutObservable<string>;
    public folio: KnockoutObservable<number>;
    public color: KnockoutObservable<string>;
    public cantidad: KnockoutObservable<number>;
    public unidad: KnockoutObservable<string>;
    public proveedor: KnockoutObservable<string>;

    constructor() {
        this.proxy = new ProxyRest("/api/Productos/Get/One/Producto/Report/");
        this.productoId = UrlUtils.getParameterByName("id", window.location);

        this.nombre = ko.observable<string>();
        this.folio = ko.observable<number>();
        this.color = ko.observable<string>();
        this.cantidad = ko.observable<number>();
        this.unidad = ko.observable<string>();
        this.proveedor = ko.observable<string>();

        this.getOne();
    }

    public async getOne(): Promise<void> {
        const self = this;
        let response = await self.proxy.get(self.productoId);
        let productojson = JSON.parse((JSON.parse(JSON.stringify(response))));

        self.nombre(productojson.nombre);
        self.folio(productojson.folio);
        self.color(productojson.color);
        self.cantidad(productojson.cantidad);
        self.unidad(productojson.unidad);
        self.proveedor(productojson.proveedor);
    }
}

export = ProductoReportModel;