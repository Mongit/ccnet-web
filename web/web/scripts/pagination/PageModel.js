"use strict";
var PageModel = /** @class */ (function () {
    function PageModel(isSelected, pageNumber) {
        this.isSelected = ko.observable(isSelected);
        this.pageNumber = ko.observable(pageNumber);
    }
    return PageModel;
}());
module.exports = PageModel;
//# sourceMappingURL=PageModel.js.map