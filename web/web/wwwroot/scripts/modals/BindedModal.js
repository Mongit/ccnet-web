"use strict";
var Size = require("./../utils/Size");
var KoBinder = require("./../utils/KoBinder");
var BindedModal = /** @class */ (function () {
    function BindedModal(info) {
        this.title = ko.observable(info.title);
        this.templateBody = ko.observable(info.templateBody);
        this.templateFooter = ko.observable(info.templateFooter);
        this.model = info.model;
        this.size = info.size;
        this.selector = "GlobalModalContainer";
        this.info = info;
        this.modal = this.create();
        var self = this;
        info.model.setModal(self.modal);
    }
    BindedModal.prototype.getContainer = function () {
        var self = this;
        var container = $("#" + self.selector);
        if (container.length === 0) {
            $("<div id='" + self.selector + "'></div>").prependTo("body");
        }
        else {
            container.empty();
        }
        return container;
    };
    BindedModal.prototype.create = function () {
        var self = this;
        var myModal = $('<div class="modal" tabindex="-1" role="dialog">' +
            '    <div class="modal-dialog" role="document">' +
            '        <div class="modal-content">' +
            '            <div class="modal-header">   ' +
            '                <h5 class="modal-title" data-bind="text: title"></h5>' +
            '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '                    <span aria-hidden="true">&times;</span>' +
            '                 </button>' +
            '            </div>' +
            '            <div class="modal-body" data-bind="template: { name: templateBody(), data: model }">' +
            '            ' +
            '            </div>' +
            '            <div class="modal-footer" data-bind="template: { name: templateFooter(), data: model }">' +
            '         ' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>');
        var modal = myModal.find('div.modal-dialog');
        switch (self.size) {
            case Size.small:
                modal.addClass('modal-sm');
                break;
            case Size.medium:
                modal.addClass('modal-md');
                break;
            case Size.large:
                modal.addClass('modal-lg');
                break;
        }
        self.getContainer().append(myModal);
        KoBinder.bind(myModal, self);
        myModal.modal();
        if (self.info.onClose !== undefined) {
            myModal.on('hidden.bs.modal', self.info.onClose);
        }
        return myModal;
    };
    return BindedModal;
}());
module.exports = BindedModal;
//# sourceMappingURL=BindedModal.js.map