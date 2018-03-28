import ProxyRest = require("./../api/proxyRest");
import UrlUtils = require("./../utils/UrlUtils");

class PresupuetosModel {
    public cotId: string;

    public proxy: ProxyRest;

    constructor() {
        this.cotId = UrlUtils.getParameterByName("cotId", window.location);

        this.proxy = new ProxyRest("/api/Presupuestos");

        this.getAll();
    }

    public async getAll(): Promise<void> {
        const self = this;
        let presupuestosFromServer = await self.proxy.get(self.cotId);
        alert(presupuestosFromServer);
    }
}

export = PresupuetosModel;