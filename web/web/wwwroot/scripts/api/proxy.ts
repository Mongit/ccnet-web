import IDictionaryString = require("./../dictionaries/iDictionaryString");
import IModel = require("./iModel");
import HttpMethod = require("./httpMethod");
import ProxyBase = require("./proxyBase");



class Proxy extends ProxyBase {    
    
    constructor(endPoint: string) {
        super(endPoint);
    }   

    public async get<T>(urlParams: IDictionaryString = {}): Promise<T> {
        const self = this;
        let model: IModel = {
            body: "",
            endPoint: self.endPoint,
            httpMethod: HttpMethod.get,
            urlParams: urlParams
        };

        return this.serverCall<any>(model);
    }

    public async post<T>(body: any, urlParams: IDictionaryString = {}): Promise<T> {
        const self = this;
        let model: IModel = {
            body: JSON.stringify(body),
            endPoint: self.endPoint,
            httpMethod: HttpMethod.post,
            urlParams: urlParams
        };

        return this.serverCall<any>(model);
    }

    public async put<T>(body: any, urlParams: IDictionaryString = {}): Promise<T> {
        const self = this;
        let model: IModel = {
            body: JSON.stringify(body),
            endPoint: self.endPoint,
            httpMethod: HttpMethod.put,
            urlParams: urlParams
        };

        return this.serverCall<any>(model);
    }

    public async delete<T>(urlParams: IDictionaryString = {}): Promise<T> {
        const self = this;
        let model: IModel = {
            body: "",
            endPoint: self.endPoint,
            httpMethod: HttpMethod.delete,
            urlParams: urlParams
        };

        return this.serverCall<any>(model);
    }    
}



export = Proxy;