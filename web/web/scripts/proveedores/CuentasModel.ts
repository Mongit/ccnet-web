import iCuentaModel = require("./ICuentaModel");
import ProxyRest = require("./../api/proxyRest");
import UrlUtils = require("./../utils/UrlUtils");

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
        let response = await self.proxy.get("", null, null);
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
}

export = CuentasModel;