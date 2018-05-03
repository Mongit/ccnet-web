import iCuentaModel = require("./ICuentaModel");
import ProxyRest = require("./../api/proxyRest");
import UrlUtils = require("./../utils/UrlUtils");
import ConfirmModal = require("./../modals/confirmModal");
import BindedModal = require("./../modals/BindedModal");
import Size = require("./../utils/Size");

class CuentasModel {
    public cuentas: KnockoutObservableArray<iCuentaModel>;

    public proxy: ProxyRest;
    public proveedorIdUrlParam: string;

    constructor() {
        this.cuentas = ko.observableArray<iCuentaModel>();

        this.proxy = new ProxyRest("/api/Cuentas");
        this.proveedorIdUrlParam = UrlUtils.getParameterByName("id", window.location);

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let response = await self.proxy.get(self.proveedorIdUrlParam, 1, 20);
        let cuentasjson = JSON.parse((JSON.parse(JSON.stringify(response))));
        
        self.cuentas.removeAll();
        for (let cuenta of cuentasjson) {
            self.cuentas.push(self.getModel(cuenta));
        }
    }

    public getModel(cuenta): iCuentaModel {
        return {
            id: cuenta.id,
            proveedorId: cuenta.proveedorId,
            banco: cuenta.banco,
            titular: cuenta.titular,
            clabe: cuenta.clabe,
            noCuenta: cuenta.noCuenta
        };
    }

    public delete(cuenta: iCuentaModel): void {
        const self = this;
        let modalModel = new ConfirmModal("¿Está seguro de borrar ésta cuenta?");

        let dialog = new BindedModal({
            model: modalModel,
            size: Size.medium,
            templateBody: "ConfirmDeleteModalBody",
            templateFooter: "ConfirmDeleteModalFooter",
            title: "¡Confirmación!",
            onClose: async function (e: JQuery.Event<HTMLElement, null>): Promise<void> {

                if (modalModel.result() === true) {
                    self.cuentas.remove(cuenta);
                    let deleted = await self.proxy.delete<iCuentaModel>(cuenta.id);
                    alert(deleted);
                }

            }
        });     
    }
}

export = CuentasModel;