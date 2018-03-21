"use strict";
var KoBinder = /** @class */ (function () {
    function KoBinder() {
    }
    KoBinder.bind = function (view, model) {
        var domObj = view.get()[0];
        ko.cleanNode(domObj);
        ko.applyBindings(model, domObj);
    };
    return KoBinder;
}());
module.exports = KoBinder;
//# sourceMappingURL=KoBinder.js.map