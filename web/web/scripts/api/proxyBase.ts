import IModel = require("./iModel");

abstract class ProxyBase {
    protected endPoint: string;

    constructor(endPoint: string) {
        this.endPoint = endPoint;
    }

    protected getUrlWithId(id?: string): string {
        const self = this;
        if (id === undefined || id === null || $.trim(id).length === 0) {
            return self.endPoint;
        }

        return self.endPoint + "/" + id;
    }

    protected async serverCall<T>(model: IModel): Promise<T> {

        let promise = $.ajax({
            url: 'ApiProxy/ServerCall',
            method: 'POST',
            data: model
        });

        return Promise.resolve(promise);
    }
}

export = ProxyBase;