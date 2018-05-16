import KoBinder = require("./../utils/KoBinder");
import StockModel = require("./StockModel");

$(async function () {
    KoBinder.bind($("#stockModel"), new StockModel());
});