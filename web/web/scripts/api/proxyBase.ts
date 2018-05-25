import IModel = require("./iModel");

abstract class ProxyBase {
    protected endPoint: string;

    constructor(endPoint: string) {
        this.endPoint = endPoint;
    }
    
    protected getUrlWithId(id?: string, pageNumber?: number, pageSize?: number): string {
        const self = this;
        if (id === undefined || id === null || $.trim(id).length === 0) {
            if (pageNumber === undefined && pageSize === undefined || pageNumber === null && pageSize === null) {
                return self.endPoint;
            }
            return self.endPoint + "/" + pageNumber + "/" + pageSize;
        }
        if (pageNumber === undefined || pageNumber === null || pageSize === undefined || pageSize === null) {
            return self.endPoint + "/" + id;
        }

        return self.endPoint + "/" + id + "/" + pageNumber + "/" + pageSize;
    }

    protected async serverCall<T>(model: IModel): Promise<T> {

        let promise = $.ajax({
            url: 'ServerCall',
            method: 'POST',
            data: model,
        });

        promise.fail(function (a: any, b: any, c: any): void {
            console.error("Error calling server");
        });   

        return Promise.resolve(promise);


    }
}

export = ProxyBase;