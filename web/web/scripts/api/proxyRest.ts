import IModel = require("./iModel");
import HttpMethod = require("./httpMethod");
import ProxyBase = require("./proxyBase");

class ProxyRest extends ProxyBase {

    constructor(endPoint: string) {
        super(endPoint);
    }

    public async get<T>(id?: string, pageNumber?: number, pageSize?: number): Promise<T> {
        const self = this;
        let model: IModel = {
            body: "",
            endPoint: self.getUrlWithId(id, pageNumber, pageSize),
            httpMethod: HttpMethod.get,
            urlParams: {}
        };

        return this.serverCall<any>(model);
    }

    public async post<T>(body: any): Promise<T> {
        const self = this;
        let model: IModel = {
            body: JSON.stringify(body),
            endPoint: self.endPoint,
            httpMethod: HttpMethod.post,
            urlParams: {}
        };

        return this.serverCall<any>(model);
    }

    public async put<T>(id: string, body: any): Promise<T> {
        const self = this;
        let model: IModel = {
            body: JSON.stringify(body),
            endPoint: self.getUrlWithId(id),
            httpMethod: HttpMethod.put,
            urlParams: {}
        };

        return this.serverCall<any>(model);
    }

    public async delete<T>(id: string): Promise<T> {
        const self = this;
        let model: IModel = {
            body: "",
            endPoint: self.getUrlWithId(id),
            httpMethod: HttpMethod.delete,
            urlParams: {}
        };

        return this.serverCall<any>(model);
    }
}

export = ProxyRest;