import IField = require("./../field/iField");
import KoForm = require("./../form/KoForm");
import stringValidator = require("./../validators/stringValidators");
import numberValidator = require("./../validators/numberValidators");
import IPresupuestoItemModel = require("./iPresupuestoItemModel");

class PresupuestoItemModel extends KoForm {
    public cantidad: IField<number>;
    public descripcion: IField<string>;
    public precio: IField<number>;
    public presupuestoId: string;

    public costo: KnockoutComputed<number>;

    constructor() {
        super();
        const self = this;
        this.cantidad = self.addField<number>([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);
        this.descripcion = self.addField<string>([new stringValidator.RequiredStringValidator()]);
        this.precio = self.addField<number>([new numberValidator.FloatValidator(), new numberValidator.RequiredNumberValidator()]);

        this.presupuestoId = "";

        this.costo = ko.computed<number>(function (): number {
            return self.cantidad.value() * self.precio.value();
        }, self);
    }

    public getModel(): IPresupuestoItemModel {
        const self = this;
        return {
            cantidad: self.cantidad.value(),
            descripcion: self.descripcion.value(),
            precio: self.precio.value(),
            presupuestoId: self.presupuestoId || "00000000-0000-0000-0000-000000000000"
        };
    }
}

export = PresupuestoItemModel;