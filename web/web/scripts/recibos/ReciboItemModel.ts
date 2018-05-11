import KoForm = require("./../form/KoForm");
import IField = require("./../field/iField");
import stringValidator = require("./../validators/stringValidators");
import numberValidator = require("./../validators/numberValidators");
import IReciboItemModel = require("./iReciboItemModel");
import ICotizacionModel = require("./../cotizaciones/CotizacionesModel");
import ProxyRest = require("./../api/proxyRest");

class ReciboItemModel extends KoForm {
    public reciboItemId: string;
    public reciboId: string;
    public cotizacionId: string;

    public cantidad: IField<number>;
    public descripcion: IField<string>;
    public precio: IField<number>;

    public cotizacionRemoteValue: KnockoutObservable<string>;

    public costo: KnockoutComputed<number>;

    constructor() {
        super();

        const self = this;

        this.reciboItemId = "";
        this.reciboId = "";
        this.cotizacionId = "";

        this.cantidad = self.addField<number>([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);
        this.descripcion = self.addField<string>([new stringValidator.RequiredStringValidator()]);
        this.precio = self.addField<number>([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);

        this.cotizacionRemoteValue = ko.observable<string>();

        this.costo = ko.computed<number>(function (): number {
            return self.cantidad.value() * self.precio.value();
        }, self);
    }

    public getModel(): IReciboItemModel {
        const self = this;
        return {
            id: self.reciboItemId ? self.reciboItemId : "00000000-0000-0000-0000-000000000000",
            cantidad: self.cantidad.value(),
            descripcion: self.descripcion.value(),
            precio: self.precio.value(),
            reciboId: self.reciboId ? self.reciboId : "00000000-0000-0000-0000-000000000000",
            cotizacionId: self.cotizacionId ? self.cotizacionId : "00000000-0000-0000-0000-000000000000"
        };
    }

    public async cotizacionRemoteHandler(term: string, callback): Promise<void> {
        let cotizacionProxy = new ProxyRest("/api/Cotizaciones/search/term");
        let response = await cotizacionProxy.get<ICotizacionModel>(term, null, null);
        let cotizacionjson = JSON.parse((JSON.parse(JSON.stringify(response))));
        callback(cotizacionjson);
    }
}

export = ReciboItemModel;