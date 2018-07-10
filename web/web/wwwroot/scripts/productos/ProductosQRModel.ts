import ProxyRest = require("./../api/proxyRest");
import IProductoReportModel = require("./IProductoReportModel");
import QRCode = require("davidshimjs-qrcodejs");
import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import * as numberValidators from './../validators/numberValidators';

class ProductosQRModel extends KoForm{
    public proxy: ProxyRest;

    public productos: KnockoutObservableArray<IProductoReportModel>;

    public isPrinting: KnockoutObservable<boolean>;

    public desde: IField<number>;
    public hasta: IField<number>;

    constructor() {
        super();
        const self = this;

        this.proxy = new ProxyRest("/api/Productos/Get/Productos/Range");

        this.productos = ko.observableArray<IProductoReportModel>();

        this.isPrinting = ko.observable<boolean>(false);

        this.desde = self.addField<number>([new numberValidators.RequiredNumberValidator(), new numberValidators.FloatValidator()]);
        this.hasta = self.addField<number>([new numberValidators.RequiredNumberValidator(), new numberValidators.FloatValidator()]);
        
    }

    public async getAll(): Promise<void> {
        const self = this;
        if (self.desde.validate() && self.hasta.validate()) {
            let response = await self.proxy.get("", self.desde.value(), self.hasta.value());
            let productosjson = JSON.parse((JSON.parse(JSON.stringify(response))));
            self.productos.removeAll();

            if (typeof productosjson !== 'undefined' && productosjson.length > 0) {
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
            else {
                alert("Error: El rango de folios ingresado no existe.")
            }
        }
        else {
            alert("Lo sentimos, hubo un error con los datos.")
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
        self.isPrinting(true);
        let data = $("#printableArea").html();
        let myWindow = window.open('', 'ConfeccionesColombia', 'height=600,width=800,scrollbars=yes');
        myWindow.document.write('<!DOCTYPE html>');
        myWindow.document.write('<html><head>');
        myWindow.document.write('<head>');
        myWindow.document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
        myWindow.document.write('<title>Confecciones Colombia</title>');
        myWindow.document.write('<link href="/css/bootstrap.print.min.css" rel="stylesheet" type="text/css"/>');
        myWindow.document.write('</head><body>');
        myWindow.document.write(data);
        myWindow.document.write('</body></html>');
        myWindow.document.close();
        myWindow.print();
    }
}

export = ProductosQRModel;