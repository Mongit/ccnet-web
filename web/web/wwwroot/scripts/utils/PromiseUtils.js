"use strict";
var PromiseUtils = /** @class */ (function () {
    function PromiseUtils() {
    }
    PromiseUtils.toPromise = function (value) {
        var promise = new Promise(function (resolve, reject) {
            resolve(value);
        });
        return promise;
    };
    return PromiseUtils;
}());
module.exports = PromiseUtils;
//# sourceMappingURL=PromiseUtils.js.map