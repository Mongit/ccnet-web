"use strict";
var ConfirmModel = /** @class */ (function () {
    function ConfirmModel(message) {
        this.message = ko.observable(message);
        this.result = ko.observable(false);
    }
    ConfirmModel.prototype.setToTrue = function () {
        var self = this;
        self.result(true);
        self.dialog.modal('hide');
    };
    ConfirmModel.prototype.setModal = function (modal) {
        var self = this;
        this.dialog = modal;
    };
    return ConfirmModel;
}());
module.exports = ConfirmModel;
//# sourceMappingURL=confirmModal.js.map