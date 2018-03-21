import IDictionaryString = require("./../dictionaries/iDictionaryString");
import HttpMethod = require("./httpMethod");

interface IModel {
    httpMethod: HttpMethod;
    endPont: string;
    urlParams: IDictionaryString;
    body: string;
}

export = IModel;
