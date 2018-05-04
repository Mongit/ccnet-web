import ProxyRest = require("./../api/proxyRest");

class ProductoModel {

    public remoteValue: KnockoutObservable<string>;
    public proxy: ProxyRest;

    constructor() {
        this.remoteValue = ko.observable();
        this.proxy = new ProxyRest("/api/Proveedores/search/term")
    }

    public async remoteHandler(term: string, callback): Promise<void> {
        const self = this;
        let response = await self.proxy.get(term, null, null);
        let proveedoresjson = JSON.parse((JSON.parse(JSON.stringify(response))));
        let arr = new Array();
        let i = 0;

        for (let proveedor of proveedoresjson) {
            i++;
            arr.push({ test: proveedor.empresa, val: i });
        }

        setTimeout( function () {
            callback(arr)
        });
    }
    
}

export = ProductoModel;
