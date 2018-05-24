import IDictionaryString = require("./../dictionaries/iDictionaryString");
import HttpMethod = require("./httpMethod");

interface IModel {
    httpMethod: HttpMethod;
    endPoint: string;
    urlParams: IDictionaryString;
    body: string;
}

export = IModel;
