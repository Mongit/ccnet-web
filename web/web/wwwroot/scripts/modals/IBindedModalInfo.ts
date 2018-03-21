import Size = require("./../utils/Size");
import IModalModel = require("./iModalModel");
interface IOnclose {
    (e: JQuery.Event<HTMLElement, null>): void;
}

export interface IBindedModalInfo {
    title: string;
    templateBody: string;
    templateFooter: string;
    model: IModalModel;
    size: Size;
    onClose?: IOnclose
}