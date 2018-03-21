class PromiseUtils {

    public static toPromise<T>(value: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {            
            resolve(value);
        });

        return promise;
    }
}


export = PromiseUtils;