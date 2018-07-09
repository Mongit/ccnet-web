import ProxyRest = require("./../api/proxyRest");
import IProductoReportModel = require("./IProductoReportModel");
import QRCode = require("davidshimjs-qrcodejs");

class ProductosQRModel {
    public proxy: ProxyRest;

    public productos: KnockoutObservableArray<IProductoReportModel>;

    public desde: KnockoutObservable<number>;
    public hasta: KnockoutObservable<number>;
    
    constructor() {
        this.proxy = new ProxyRest("/api/Productos/Get/Productos/Range");

        this.productos = ko.observableArray<IProductoReportModel>();

        this.desde = ko.observable<number>();
        this.hasta = ko.observable<number>();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let response = await self.proxy.get("", self.desde(), self.hasta());
        let productosjson = JSON.parse((JSON.parse(JSON.stringify(response))));
        
        self.productos.removeAll();
        for (let productojson of productosjson) {
            self.productos.push({
                id: productojson.id,
                nombre: productojson.nombre,
                folio: productojson.folio,
                color: productojson.color,
                cantidad: productojson.cantidad,
                unidad: productojson.unidad,
                proveedor: productojson.proveedor
            });
        }
    }

    public getQR(arrDOMelements, producto: IProductoReportModel): QRCode {
        const self = this;
        let qrCode = new QRCode(document.getElementById(producto.folio.toString()), {
            text: "Producto",
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        let code = "Folio: " + producto.folio + "\nNombre: " + producto.nombre + " " + producto.color
            + "\nCantidad: " + producto.cantidad + " " + producto.unidad + "\nProvedor: " + producto.proveedor
            + "\nPagina: https://ccnet-web.azurewebsites.net/Productos/Producto?id=" + producto.id;
        qrCode.clear();
        return qrCode.makeCode(code);
    }
    
    public print(): void {
        const self = this;
        
    }
}

export = ProductosQRModel;